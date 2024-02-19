import express from "express";
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from '@apollo/server/express4'
import bodyParser from "body-parser";
import e from "express";
import { user } from "./user";
import { queries } from "./user/queries";
export async function initServer(){
    const app = express();
    app.use(bodyParser.json());
    const graphQlserver = new ApolloServer({
        typeDefs:`
        ${user.type}
        type Query{
            ${user.queries}
            }`,
        resolvers:{
            Query:{
               ...user.resolvers.queries
            }
        }
    });
    await graphQlserver.start();
    app.use('/graphql',expressMiddleware(graphQlserver));
    return app;
}