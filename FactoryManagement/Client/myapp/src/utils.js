import axios from 'axios'

const get_all_authorized_users = (url) => 
{
   return axios.get(url)
}

const post_auth_info = (url, obj) => 
{
   return axios.post(url, obj)
}

const getDataFromServer = (url, token) => 
{
   return axios.get(url, {headers : {"x-access-token" : token}})
}

const postDataToServer = (url, obj, token) => 
{
   return axios.post(url, obj, {headers : {"x-access-token" : token}})
}

const putDataToServer = (url, obj, token) => 
{
   return axios.put(url, obj, {headers : {"x-access-token" : token}})
}

const deleteDataFromServer = (url, token) => 
{
   return axios.delete(url, {headers : {"x-access-token" : token}})
}


export default {get_all_authorized_users, post_auth_info, getDataFromServer, postDataToServer, putDataToServer, deleteDataFromServer };
