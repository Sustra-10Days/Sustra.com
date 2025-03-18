//import admin from "../config/firebase.ts";
import pkg  from 'pg';
const {Pool} =pkg;
import dotenv from 'dotenv';

dotenv.config({path:'../.env'});

import { inventoryResolvers } from "../api/inventory";
import { randomizeCharmResolvers } from "../api/randomizer";
import { expirationCharmsResolvers } from "../api/expiration";
import {auth_queryResolvers, auth_mutationResolvers} from "../api/auth.js";
import { mergeResolvers } from "@graphql-tools/merge";
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, 
  });
const resolvers = mergeResolvers([
    auth_queryResolvers,
    auth_mutationResolvers,
    inventoryResolvers,
    randomizeCharmResolvers,
    expirationCharmsResolvers,
])



/*{
    /*Query: {
        hello: ()=> "Hello guys!!!!",
        /*verify: async  ({ token }) => {
            try{
                const decodedToken =await admin.auth().verifyIdToken(token);
                const uid = decodedToken.uid;
                const email = decodedToken.email;
                const name = decodedToken.name;

                await registerUser(uid,email,name);
                console.log ("Authenticated user:", decodedToken);
                return `Hello, ${decodedToken.name || "User"}!`;
            }catch (error){
                console.error("Authentication error:", error);
                throw new Error("Invalid or expired token.");
            }
        }
    },
};*/
export default resolvers;