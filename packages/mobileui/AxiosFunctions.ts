import Axios from 'axios';
import { Alert } from 'react-native';

import { getToken } from './AsyncStorageFunctions';


//---FIRST STEP---
//Open server directory and modify the .env file 
//replace the DB_URI with your database uri
//follow link below to see tutorial to create the database
//https://plumierjs.com/docs/tutorials/basic-sql/create-migration#execute-migrations-and-seeds

//---SECOND STEP---
//change the IP address to you computer ip in a local network
//make sure to use http if using a local network example : http://192.168.3.100:8000
//or you can use my API https://plumiertest123.herokuapp.com/ if you just want to try the native app

// --------- TYPES -------- //
export const apiUrl = ""
export const AxiosInstance = Axios.create({
  baseURL:apiUrl
})
// ------- FUNCTION ------- //
export function setAxiosDefaultUrl(){
    //AxiosInstance.defaults.baseURL=apiUrl
    AxiosInstance.interceptors.response.use(
      function (response) {
      return response;
    }, 
      function (error) {
      if(!error.response){
        //console.log(error)
        Alert.alert("Network Error","Please check your internet connection")
      }else{
        //console.log(error.response)
        if(typeof (error.response.data )==="string"){
          Alert.alert(error.response.data)
        }else if(typeof (error.response.data[0].messages[0])==="string"){
          Alert.alert(error.response.data[0].messages[0])
        }else{
          Alert.alert("Request failed",error.status)
        }
      }
      //return Promise.reject(error);
    });
  }
export async function setAxiosDefaultHeader(){
    AxiosInstance.defaults.headers.common['Authorization'] = await getToken();
}
