import { useState, useEffect } from 'react';
import CourseService from './Service-API-Calls/CourseService.jsx';
import '/src/CSS/Manage.css';
import '/src/CSS/Modal.css'
import Pagination from './Pagination.jsx';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";
import Modal from "./Modal.jsx"
const ManageCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [confirmDelete, setConfirmDelete] = useState ({
    show: false, 
    courseId: null,
});


//Called when user first clicks delete and renders Modal
  const deleteConfirmation = (courseId) => {
      setConfirmDelete({
            show: true, 
            courseId,
      });
  };

  const deleteCourse = async () => {
    try{
      await CourseService.deleteCourse(confirmDelete.courseId,token);
      const response = await CourseService.getCourses(token);
      setCourses(response.data);
    } catch(error){
      console.log(error);
    } finally{
      setConfirmDelete({
        show: false, 
        courseIdId: null,
      });
    }
  };

    //If user cancels
  const deleteCourseFalse = () => {
    setConfirmDelete({
          show: false, 
          courseIdId: null,
    });
  };

  useEffect(() => {
   const fetchUserCourses = async () => {
    setLoading(true)
    try{
      const response = await CourseService.getCourses(token);
      setCourses(response.data);
    }
    catch(error){
      setLoading(false)
      console.log(error)
    }
    finally{
      setLoading(false)
    }
   };
   fetchUserCourses();
    
  }, [token])

  //Used to search courses
  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(search.toLocaleLowerCase())
  );
 
  //These three variables are used for the pagination component
   const indexOfLastCourse = currentPage * coursesPerPage;
   const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
   const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

   if(isLoading){
    return (
      <div className='center-loader'>
          <BeatLoader/>
      </div>
  )
   }
  
   return (
    <>
  <h1 className='manage-header'>Your Courses</h1>

    
    <input
          className="search-box"
          placeholder="Search By Course Name"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
       
       {confirmDelete.show && (
            <div className='center-modal'>
                    <Modal
                    handleTrue={deleteCourse}
                    handleFalse={deleteCourseFalse}
                    message={"Are you sure you want to delete this course? Doing so will delete all rounds associated"}
                    buttonTrue='Delete'
                    buttonFalse='Cancel'
                />
            </div>
              
        )};
      
        <>
          {currentCourses.map((course) => (
          <div key={course.id} className='center-user-courses'>

            <table className='course-table' >
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Course Rating</th>
                  <th>Course Par</th>
                  <th>Course Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{course.courseName}</td>
                  <td>{course.courseRating}</td>
                  {/* Show course par. If 18 hole course show 18 hole par else show 9 hole par. Every Course has a 9 and 18 hole par */}
                  <td>{course.courseType == 18 ? course.eighteenHolePar : course.nineHolePar}</td>
                  <td>{course.courseLocation}</td>

                </tr>
                {/* Creating a separate table to map the holes horizontally below the course */}
                <tr>
                  <td colSpan="7">
                    <table className='hole-table'>
                      <tbody>
                        <tr>
                          <th>Hole</th>
                          {course.courseHolesList.map((courseHole) => (
                            <td key={courseHole.id} >
                              {courseHole.courseHoleNumber}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <th>Par</th>
                          {course.courseHolesList.map((courseHole) => (
                            <td key={courseHole.id} >
                              {courseHole.courseHolePar}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <th>Length</th>
                          {course.courseHolesList.map((courseHole) => (
                            <td key={courseHole.id}>
                              {courseHole.courseHoleLength}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>


              </tbody>

            </table>
            <div className='manage-button-container'>
                <button className='delete-button' onClick={() => deleteConfirmation(course.id)}>Delete</button>
                {/* If user wants to update send the id of the course as a param and navigate to the appropriate add course */}
                <button className='update-button' onClick={() =>{course.courseType == 18 ? navigate('/add-course18/' + course.id) : navigate('/add-course/' + course.id)}}>Update</button>
            </div>
          </div>

        ))}
        <Pagination
          itemsPerPage={coursesPerPage}
          totalItems={courses.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      
        </>
  
        




    </>
  )
}

export default ManageCourses
