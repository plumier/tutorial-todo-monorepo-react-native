import bcrypt from "bcrypt"
import {authorize,route} from "plumier"

import {db} from "../../../model/db"
import {User} from "../../../model/domain"

function ownerOrAdmin() {
    return authorize.custom(async info => {
        const {role , user, parameters } = info 
        return role.some(x =>x==="Admin") || parameters[0] === user.userId
    }, "Admin | Owner")
}

export class UsersController{
    // POST /api/v1/users
    @authorize.public()
    @route.post("")
        async save(data: User) {
        //const data = await user;
        console.log(data)
        const password = await bcrypt.hash(data.password, 10)
        return db("User").insert({ ...data, password, role: "User" })
    }
    //GET /api/v1/users
    @authorize.role("Admin")
    //@authorize.public()
    @route.get("")
    list(offset: number,limit: number){
        return db("User").where({deleted:0}).offset(offset).limit(limit)
        .orderBy("createdAt","desc")
    }
   
    //@authorize.role('Admin')
    //GET /api/v1/users/:id
    @ownerOrAdmin()
    @route.get(":id")
    async get(id: number){
        //let id =await Id;
        console.log(id)
        //const id = await usId;
        //console.log(db("User").where({id}).first())
        return db("User").where({id}).first()
    }

    //PUT /api/v1/users/:id
    @ownerOrAdmin()
    @route.put(":id")
    async modify(id: number,data: User){
        const password = await bcrypt.hash(data.password,10)
        return db("User").update({...data,password}).where({id})
    }

    //DELETE /api/v1/users/:id
    @ownerOrAdmin()
    @route.delete(":id")
    delete(id: number){
        return db("User").update({deleted: 1}).where({id})
    }
}