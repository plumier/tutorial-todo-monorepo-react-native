import Koa from "koa";
import Plumier, { Configuration, WebApiFacility } from "plumier";
import {JwtAuthFacility} from "@plumier/jwt"



export function createApp(config?:Partial<Configuration>): Promise<Koa> {
    //let secret1 = process.env.JWT_SECRET
    return new Plumier()
    
        .set(config || {})
        .set(new WebApiFacility())
        .set(new JwtAuthFacility({secret: "asdasdasdasd"}))
        .initialize()
}
