 import axios from 'axios';

const USER_API = "http://localhost:8080/auth"

class AuthService{
    register(user){
        return axios.post(`${USER_API}/register`,user)
    }

     login(user){ 
        return axios.post(`${USER_API}/login`, user, {
            headers: { 'Content-Type': 'application/json'}
        });
    
        
        
    }
}
export default new AuthService();