import axios from 'axios';

const COURSE_API = "http://localhost:8080/courses"


class CourseService{
    addCourse(course,token){
        return axios.post(`${COURSE_API}/saveCourse`,course,{
            headers:{ 'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
    }

    getCourses(token){
        return axios.get(`${COURSE_API}/getCourses`,{
            headers:{ 'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
    }

    deleteCourse(courseId,token){
        return  axios.delete(`${COURSE_API}/delete-course/${courseId}`,{
            headers:{ 'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
    }

    findFavouriteCourse(token){
        return axios.get(`${COURSE_API}/favourite-course`,{
            headers:{ 'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
    }

    findMostPlayedCourse(token){
        return axios.get(`${COURSE_API}/most-played-course`,{
            headers:{ 'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
    }

    updateCourse(courseId,course,token){
        return axios.put(`${COURSE_API}/update-course/${courseId}`,course,{
            headers:{ 'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
    }

    getCourseById(courseId,token){
        return axios.get(`${COURSE_API}/get-course-by-id/${courseId}`,{
            headers:{ 'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
    }
    
}
export default new CourseService();