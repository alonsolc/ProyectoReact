import axios from 'axios';

//const route = "http://localhost:3001/api";
const route = "http://18.210.95.163:3001/api";

class serviceMainUsers {

    listUsers(){
        return axios.get(`${route}/user/`);
    }

    averageAges(){
        return axios.get(`${route}/user/average/`);
    }

    reportOne(){
        return axios.get(`${route}/user/reportOne/`);
    }

    getUser(id) {
        return axios.get(`${route}/user/${id}`);
    }

    createUser(dataUser) {
        return axios.post(`${route}/user/`, dataUser);
    }

    updateUser(id,dataUser) {
        return axios.put(`${route}/user/${id}`, dataUser);
    }

    /*deleteUser(id){
        return axios.delete(`${route}/user/${id}`);
    }*/
}

export default (new serviceMainUsers());