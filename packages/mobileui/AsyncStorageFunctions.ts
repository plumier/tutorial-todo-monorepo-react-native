import {AsyncStorage} from 'react-native'

// ##################################################################### //
// ############################# FUNCTION ############################## //
// ##################################################################### //

// --------- TOKEN -------- //
export async function storeToken(token:string){
    try{
        console.log('storing:'+token)
        await AsyncStorage.setItem('token','Bearer '+token)
    } catch(eror){
        console.log(eror)
    }
}
export async function getToken():Promise<String>{
    try{
        return await AsyncStorage.getItem('token')
    }catch(error){
        return error.toString()
    }
}
// --- USERID | NOT USED -- //
export async function storeUserId(userId:string){
    console.log('storing :'+userId)
    try{
        await AsyncStorage.setItem('userId',userId)
    }catch(error){
        console.log(error)
    }
}
export async function getUserId():Promise<String>{
    try{
        const value = await AsyncStorage.getItem('userId')
        console.log('mengambil :'+value)
        return value
    }catch(error){
        return error.toString()
    }
}
// ----- LOGIN STATUS ----- //
export async function setUserLogged(isLogged:boolean){
    try{
        AsyncStorage.setItem('loggedIn',isLogged?'true':'false')
    }catch(error){}
}
export async function userIsLogged() : Promise<boolean>{
    try{
        const value= await AsyncStorage.getItem('loggedIn')
        return value =='true'
    }catch(error){
        console.log(error)
        return false
    }
}
// --------- EMAIL -------- //
export async function setEmail(email:string){
    try{
        AsyncStorage.setItem('email',email)
    }catch(error){
        console.log(error)
    }
}
export async function getEmail(){
    try{
        const value =AsyncStorage.getItem('email')
        return value
    }catch(error){
        console.log(error)
    }
}
// --------- CLEAR -------- //
export async function clearUserCredentials(){
    try{
        await AsyncStorage.clear()
    }catch(error){

    }
}
// -------- CONFIG -------- //
export async function configOnlyIncomplete(preference:string){
    try{
        await AsyncStorage.setItem('onlyIncomplete',preference)
    }catch(error){
        console.log(error)
    }
}
export async function getConfigOnlyIncomplete(){
    try{
        const value =await AsyncStorage.getItem('onlyIncomplete')
        return value
    }catch(error){
        console.log(error)
    }
}