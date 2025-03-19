//import admin from "../config/firebase.ts";
import pkg  from 'pg';
const {Pool} =pkg;
import dotenv from 'dotenv';

dotenv.config({path:'../.env'});

import { inventoryResolvers } from "../api/inventory.js";
//import { randomizeCharmResolvers } from "../api/randomizer.js";
//import { expirationCharmsResolvers } from "../api/expiration.js";
import {auth_queryResolvers, auth_mutationResolvers} from "../api/auth.js";
//import { charmResolvers } from "../api/charms.js";
import { mergeResolvers } from "@graphql-tools/merge";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, 
  });
const resolvers = mergeResolvers([
    auth_queryResolvers,
    auth_mutationResolvers,
    inventoryResolvers,
    //randomizeCharmResolvers,
    //expirationCharmsResolvers,
    //charmResolvers,
])


export default resolvers;