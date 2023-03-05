import axios from 'axios';

// 스프링부트와 연결할 기본 URL 설정
const USER_API_BASE_URL = "/users";

class ApiService{
    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUsersByID(userID) {
        return axios.get(USER_API_BASE_URL+ '/' + userID);
    }

    deleteUser(userID){
        return axios.delete(USER_API_BASE_URL+ '/' + userID);
    }

    addUser(user){
        return axios.post(USER_API_BASE_URL, user);
    }

    editUser(user){
        return axios.put(USER_API_BASE_URL+ '/' + user.id, user);
    }

    loginUser(user){
        return axios.post(USER_API_BASE_URL+ '/login', user);
    }
}

export default new ApiService();