import axios from 'axios';

const ROUNDS_API = "http://localhost:8080/rounds"


class RoundService {
        addRound(round,courseId,token){
            return  axios.post(`${ROUNDS_API}/saveRound/${courseId}`,round,{
                headers:{ 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`}})
        }

        getRounds(token){
            return axios.get(`${ROUNDS_API}/getRounds`,{
                headers:{'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
        }

        deleteRound(roundId,token){
            return axios.delete(`${ROUNDS_API}/deleteRound/${roundId}`,{
                headers:{'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
        }

        getBestEighteenHole(token){
            return axios.get(`${ROUNDS_API}/best-18-hole`,{
                headers:{'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
        }

        getBestNineHole(token){
            return axios.get(`${ROUNDS_API}/best-9-hole`,{
                headers:{'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
        }

        getHandicap(token){
            return axios.get(`${ROUNDS_API}/handicap`,{
                headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}})
        }

        updateRound(round,roundId,courseId,token){
            return axios.put(`${ROUNDS_API}/update-round/${roundId}/${courseId}`,round,{
                headers:{ 'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
        }

        getRoundById(roundId,token){
            return axios.get(`${ROUNDS_API}/get-round-by-id/${roundId}`,{
                headers:{'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
        }


       
}

export default new RoundService();