import axios from "axios";
import { PrismaClient } from '@prisma/client';
import JWTServices from "../../services/jwt";

const prismaClient = new PrismaClient();
interface GoogleTokenResult {
    iss?: string;
    azp?: string;
    aud?: string;
    sub?: string;
    email?: string;
    email_verified?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    kid?: string;
    typ?: string;
    alg?: string;
    nbf?: string;
}
const queries ={
    verifyGoogleToken:async (parent:any,{token}:{token:string})=>{
       const googleToken=token;
       const googleOauthURL =new URL("https://oauth2.googleapis.com/tokeninfo");
         googleOauthURL.searchParams.set("id_token",googleToken);
         const {data}= await axios.get<GoogleTokenResult>(googleOauthURL.toString(),{responseType:'json'});
         if(data.email && data.given_name && data.picture){
             const user= await prismaClient.user.findUnique({where:{email:data.email}});
             if(!user){
                 await prismaClient.user.create({
                     data:{
                         email:data.email,
                         firstName:data.given_name,
                         lastName:data.family_name,
                         profileImageUrl:data.picture
                     }
                 })
             }
         }
         const userinDb= await prismaClient.user.findUnique({where:{email:data.email}});
         if(!userinDb){
             throw new Error("User not found");
         }
         const Usertoken = JWTServices.generateTokenForUser(userinDb);
    },
}
export const resolvers = {queries};
