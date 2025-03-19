import admin from "../config/firebase.js";
import pkg  from 'pg';
const {Pool} =pkg;
import dotenv from "dotenv";

dotenv.config({path:'./backend/.env'});

const connectionString = process.env.DATABASE_URL;
//console.log(connectionString)
const pool = new Pool({
    connectionString: connectionString,
});

export const auth_queryResolvers = {
    Query: {
        hello: () => "hello!!",
        verify: async  (_:any,{ token }:{token:string}) => {
            try{
                //console.log(token)
                const decodedToken =await admin.auth().verifyIdToken(token);
                const uid = decodedToken.uid;
                const email = decodedToken.email;
                const name = decodedToken.name;
                const picture = decodedToken.picture;
        
                //console.log ("Authenticated user:", decodedToken);
                return {
                    success:true,
                    message: "User authenticated",
                    user:{
                        id: uid,
                        email: email,
                        name: name,
                        picture: picture,
                    }
                };
            }catch (error){
                console.error("Authentication error:", error);
                throw new Error("Invalid or expired token.");
            }
        },

    },
};
export const auth_mutationResolvers = {
    Mutation: {
        registerUser: async (
            _parent:any,{id,email,name,picture}: 
            {id:string, 
            email:string,
            name?:string,
            picture?:string}
        ) =>{
            try{
                const client = await pool.connect();
                const checkQuery = 'SELECT * FROM "User" WHERE id = $1 OR email = $2';
                const checkValues = [id, email];
                const checkResult = await client.query(checkQuery, checkValues);
        
                if (checkResult.rows.length > 0) {
                    console.log('User already exists in the database');
                    client.release();
                    return {success: false};
                }
                const insertQuery = 'INSERT INTO "User" (id, email,name,"profileImage","googleId") VALUES ($1, $2,$3,$4,$5) RETURNING *';
                const insertValues = [id, email,name||null,picture||null,id];
                const result = await client.query(insertQuery, insertValues);
                console.log('User added:', result.rows[0]);
                client.release();
                return {success:true};
            }catch (err) {
                console.error('Error processing user registration:', err);
            }
        },
        editUser: async(_parent:any, {uid,faculty,major,name,profileImage,studentId,year}:
            {uid:string,
            faculty?: string,
            major?:string, 
            name?:string,
            profileImage?:string,
            studentId?:string,
            year?:number}) => {
            try{
                const client = await pool.connect();
                
                const fieldsToUpdate: string[] = [];
                const values: any[] = [];
                if(faculty!==undefined){
                    fieldsToUpdate.push('faculty = $'+(values.length+1));
                    values.push(faculty)
                }
                if(major!==undefined){
                    fieldsToUpdate.push('major = $'+(values.length+1));
                    values.push(major)
                }
                if(name!==undefined){
                    fieldsToUpdate.push('name = $'+(values.length+1));
                    values.push(name)
                }
                if(profileImage!==undefined){
                    fieldsToUpdate.push('"profileImage" = $'+(values.length+1));
                    values.push(profileImage)
                }
                if(studentId==undefined){
                    fieldsToUpdate.push('"studentId" = $'+(values.length+1));
                    values.push(studentId)
                }
                if(year==undefined){
                    fieldsToUpdate.push('year = $'+(values.length+1));
                    values.push(year)
                }
                if(fieldsToUpdate.length ===0 ){
                    client.release();
                    return {success:false,message:'No fields to update'};
                }
                values.push(uid);
                console.log(uid)
                const query = `UPDATE "User" SET ${fieldsToUpdate.join(', ')} WHERE id = $${values.length} RETURNING *`;
                const result = await client.query(query, values);
                //console.log(result)
                client.release();

                if (result.rows.length > 0) {
                    return { success: true, message: 'User updated successfully', user: result.rows[0] };
                } else {
                    return { success: false, message: 'User not found' };
                }
        }catch(err){
            console.error('Error updating user:', err);
            return { success: false, message: 'Database error' }
        }

        },

    },
};