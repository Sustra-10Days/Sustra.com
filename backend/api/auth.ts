import admin from "../config/firebase.ts";
import {Pool} from 'pg';
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString,
});

const registerUser = async (uid,email,name,picture) =>{
    try{
        const client = await pool.connect();

        const checkQuery = 'SELECT * FROM users WHERE id = $1 OR email = $2';
        const checkValues = [uid, email];
        const checkResult = await client.query(checkQuery, checkValues);

        if (checkResult.rows.length > 0) {
            console.log('User already exists in the database');
            client.release();
            return;
        }

        const insertQuery = 'INSERT INTO users (id, email,name,profileImage) VALUES ($1, $2,$3,$4) RETURNING *';
        const insertValues = [uid, email,name,picture];
        const result = await client.query(insertQuery, insertValues);
        console.log('User added:', result.rows[0]);
        client.release();
    }catch (err) {
        console.error('Error processing user registration:', err);
    }
}
async  ({ token }) => {
    try{
        const decodedToken =await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
        const email = decodedToken.email;
        const name = decodedToken.name;
        const picture = decodedToken.picture;

        await registerUser(uid,email,name,picture);
        console.log ("Authenticated user:", decodedToken);
        return `Hello, ${decodedToken.name || "User"}!`;
    }catch (error){
        console.error("Authentication error:", error);
        throw new Error("Invalid or expired token.");
    }
}