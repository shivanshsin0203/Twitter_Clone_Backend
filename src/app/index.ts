import express from "express";
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from '@apollo/server/express4'
import bodyParser from "body-parser";
import e from "express";

export async function initServer(){
    const app = express();
    app.use(bodyParser.json());
    const graphQlserver = new ApolloServer({
        typeDefs:`
        type Query{
            hello:String
            }`,
        resolvers:{
            Query:{
                hello:()=> "Hello World"
            }
        }
    });
    await graphQlserver.start();
    app.use('/graphql',expressMiddleware(graphQlserver));
    return app;
}