import {route} from "plumier"
import {db} from "../../../model/db"
import {Todo, Message} from "../../../model/domain"

export class MessageController {
    @route.post("")
    save(data: Message){
        console.log(data.messageText)
        return db("message").insert(data)
    }

    @route.get(":id")
    list(id: number){
        return db("message").where({receiverId:id})
    }
} 