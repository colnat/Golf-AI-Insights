
import { useState, useEffect } from 'react';
import CourseService from './Service-API-Calls/CourseService.jsx';
import '/src/CSS/AddCourse.css';
import { useNavigate,useParams} from "react-router-dom";
import set from "lodash/set";


const AddCourse = () => {
        const [errorMessage, setErrorMessage] = useState('');
        const navigate = useNavigate();
        const { id } = useParams();
        const token = localStorage.getItem("token");
        const [course, setCourse] = useState({
                courseName: '',
                courseRating: 0,
                courseLocation: '',
                courseHolesList: Array(9).fill().map((_, i) => ({
                        courseHoleNumber: i + 1,
                        courseHolePar: 0,
                        courseHoleLength: 0,
                }))

        });

        //Uses set from lodash to update the values in the holes array
        const handleChange = (e) => {
                const { name, value } = e.target;
                const courseCopy = JSON.parse(JSON.stringify(course));
                set(courseCopy, name, value);
                setCourse(courseCopy);
        };

        const addCourse = (e) => {
                e.preventDefault();
                console.log("Course being sent:", course);
                CourseService.addCourse(course,token).then(() => {
                        setErrorMessage('');
                        setCourse({
                                courseName: '',
                                courseRating: 0,
                                courseLocation: '',
                                courseHolesList: Array(9).fill().map((_, i) => ({
                                        courseHoleNumber: i + 1,
                                        courseHolePar: 0,
                                        courseHoleLength: 0,
                                }))
                        })
                }).catch(error => {
                        console.error('Error adding course:', error);
                        setErrorMessage('Error saving course');
                });

        }

        const updateCourse = (e) => {
                e.preventDefault();
                CourseService.updateCourse(id, course,token).then(() => {
                        setErrorMessage('');
                        alert('Course updated');
                }).catch(error => {
                        console.error('Error adding course:', error);
                        setErrorMessage('Error saving course');
                })
        }

        //If this is an update request fill out the form with the old course data
        useEffect(() => {
                if (id !== 'new') {
                        CourseService.getCourseById(id,token)
                                .then((response) => {
                                        setCourse(response.data);
                                }).catch((error) => console.log(error));
                }
        }, [id, setCourse,token]);

        return (
                <>


                        <div className='center-add-course'>

                                <h1 className='add-course-header'>Add 9 Hole Course</h1>

                                {/* Get information about course */}
                                <form className='center-add-course add-course-form'>

                                        <label>Course Name</label>
                                        <input className="add-course-input name"
                                                type="text"
                                                placeholder="Enter course name"
                                                name="courseName"
                                                value={course.courseName}
                                                onChange={handleChange} />

                                        <label>Course Rating</label>
                                        <input className="add-course-input rating"
                                                type="number"
                                                placeholder="Rating 1-10"
                                                name="courseRating"
                                                max={10}
                                                min={1}
                                                value={course.courseRating}
                                                onChange={handleChange} />

                                        <label>Course Location</label>
                                        <input className='add-course-input location'
                                                type="text"
                                                placeholder='Optional'
                                                name="courseLocation"
                                                value={course.courseLocation}
                                                onChange={handleChange} />

                                        {/* Navigate to add 18 hole course */}
                                        <button className='switch-course' onClick={() => navigate('/add-course18/new')}>Add 18 Hole Course</button>

                                        {/* Get information about holes (par and length) */}
                                        <div className='holes'>
                                                {course.courseHolesList.map((hole, index) => (
                                                        <div className='hole' key={index}>
                                                                <h3>Hole {hole.courseHoleNumber}</h3>
                                                                <label>Enter the Par</label>
                                                                <input className='add-course-input '
                                                                        type="number"
                                                                        name={`courseHolesList[${index}].courseHolePar`}
                                                                        value={hole.courseHolePar}
                                                                        placeholder='Par 3 to 5'
                                                                        onChange={handleChange} />
                                                                <label>Hole Length</label>
                                                                <input className='add-course-input'
                                                                        type="number"
                                                                        name={`courseHolesList[${index}].courseHoleLength`}
                                                                        value={hole.courseHoleLength}
                                                                        onChange={handleChange} />
                                                        </div>

                                                ))}

                                        </div>

                                        {errorMessage && <div className="error">{errorMessage}</div>}

                                        <button className="save-button" type="submit" onClick={id != 'new' ? updateCourse : addCourse}>Save Course </button>
                                </form>

                        </div>




                </>


        )
};
export default AddCourse;
