import {domain, val, authorize} from "plumier";
import {uniqueEmail, messageVal} from "../validator/unique-email-validator"


export type UserRole = "User" | "Admin"

@domain() 
export class Domain {
    constructor(
        //@val.optional()
        @authorize.role("Machine")
        public id: number =0,
        //@val.optional()
        @authorize.role("Machine")
        public createdAt:Date= new Date(),
        @val.optional()
        public deleted:boolean = false
    ) {}
}

@domain()
export class User extends Domain{
    constructor(
        @val.email()
        @uniqueEmail()
        public email: string,
        public password: string,
        public name: string,
        //@val.optional()
        @authorize.role("Admin") //to secure the domain from set
        public role: UserRole
    ){super()}
}

@domain()
export class Todo extends Domain{
    constructor(
        public todo: string,
        //@val.optional()
        @authorize.role("Machine")
        public userId: number,
        @val.optional()
        public completed: boolean = false
    ){super()}
}

@domain()
export class Message extends Domain{
    constructor(
        @val.optional()
        public messageId: number,
        public senderId : number,
        public receiverId : number,
        @messageVal()
        public messageText: string 
    ){super()}
}

@domain()
export class LoginUser{
    constructor(
        public userId:number,
        public role: UserRole
    ){}
}


