import admin from "../config/firebase.js";
import pkg  from 'pg';
const {Pool} =pkg;
import dotenv from "dotenv";

dotenv.config({path:'./backend/.env'});

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString,
});

export const auth_queryResolvers = {
    Query: {
        hello: () => "hello!!",
        verify: async  ({ token }:{token:string}) => {
            try{
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
        registerUser: async ({id,email,name,picture}:{id:string,email:string,name:string,picture:string}) =>{
            try{
                const client = await pool.connect();
        
                const checkQuery = 'SELECT * FROM users WHERE id = $1 OR email = $2';
                const checkValues = [id, email];
                const checkResult = await client.query(checkQuery, checkValues);
        
                if (checkResult.rows.length > 0) {
                    console.log('User already exists in the database');
                    client.release();
                    return;
                }
                const insertQuery = 'INSERT INTO users (id, email,name,profileImage) VALUES ($1, $2,$3,$4) RETURNING *';
                const insertValues = [id, email,name,picture];
                const result = await client.query(insertQuery, insertValues);
                console.log('User added:', result.rows[0]);
                client.release();
                return true;
            }catch (err) {
                console.error('Error processing user registration:', err);
            }
        },
    },
};