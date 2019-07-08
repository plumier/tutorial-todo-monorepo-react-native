import {authorize} from "plumier"
import {bind,route} from "plumier"
import {db} from "../../../model/db"
import {Todo, LoginUser} from "../../../model/domain"
import { listenerCount } from "cluster";


function ownerOrAdmin(){
    return authorize.custom(async info => {
        const {role, parameters, user} =  info;
        const todo: Todo = await db("Todo").where({id : parameters[0]}).first()
        return role.some(x => x === "Admin") || todo && todo.userId === user.userId
    }, "Admin | Owner")
}

export class TodosController{
    //POST /api/v1/todos
    @route.post("")
    save(data:Todo,@bind.user() user: LoginUser){
        return db("Todo").insert(<Todo>{...data,userId: user.userId})
    }

    //GET /api/v1/todos?offset=<number>&limit=<number>
    @route.get("")
    list(offset: number, limit: number, @bind.user() user:LoginUser){
        return db("Todo").where({deleted: 0,userId : user.userId})
        .offset(offset).limit(limit).orderBy("createdAt","desc")
    }


    //GET /api/v1/todos/:id
    @route.get(":id")
    get(id: number){
        return db("Todo").where({id}).first()
    }

    //PUT /api/v1/todos/:id
    @ownerOrAdmin()
    @route.put(":id")
    modify(id: number, data: Todo){
        return db("Todo").update(data).where({id})
    }

    //DELETE /api/v1/todos/:id
    @ownerOrAdmin()
    @route.delete(":id")
    delete(id: number){
        return db("Todo").update({deleted:true}).where({id})
    }
} 