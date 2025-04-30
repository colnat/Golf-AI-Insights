import axios from 'axios';

const INSIGHTS_API = "http://localhost:8080/get-insights"

class Insights{
    getInsights(userLocation,token){
        return axios.get(`${INSIGHTS_API}/insights`,{params:{userLocation},
            headers:{ 'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
    }
}

export default new Insights();