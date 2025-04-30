//This will be the main home page. Here I want users insights displayed, their most recent rounds, favourite courses, best rounds, and handicap.
//I should add somthing where a user can add their location and the AI can recommend 
//A possible feature could be users could add friends and compare stats
import { useState, useEffect } from 'react';
import '/src/CSS/Dashboard.css';
import { useNavigate } from "react-router-dom";
import RoundService from './Service-API-Calls/RoundService.jsx';
import CourseService from './Service-API-Calls/CourseService.jsx';
import InsightsService from './Service-API-Calls/InsightsService.jsx';
import { BeatLoader } from 'react-spinners';
import Modal from './Modal.jsx';

const Dashboard = () => {
    const navigate = useNavigate();
    const [bestEighteenHole, setBestEighteenHole] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [bestNineHole, setBestNineHole] = useState([]);
    const [favouriteCourse, setFavouriteCourse] = useState([]);
    const [mostPlayedCourse, setMostPlayedCourse] = useState([]);
    const [handicap, setHandicap] = useState("");
    const [insights, setInsights] = useState("");
    const token = localStorage.getItem("token");
    const [confirmLogout, setConfirmLogout] = useState({
        show: false,
    });


    // Getting the users location to use for the AI to suggest courses near them
    //store thier location in the browser
    const getUserLocation = () => {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const userLocation = JSON.stringify({ latitude, longitude });
                        resolve(userLocation);
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        resolve(null);
                    }
                );
            }
            else {
                console.error('Location is not supported');
                resolve(null);
            }
        });

    }


    const logout = () => {
        navigate('/login');
        localStorage.removeItem("token");
        setConfirmLogout({
            show: false
        });
    };

    const logoutConfirmation = () => {
        setConfirmLogout({
            show: true
        });
    };

    const logoutFalse = () => {
        setConfirmLogout({
            show: false
        });
    };



    useEffect(() => {
        const fetchUserStats = async () => {
            setLoading(true)
            try {

                const userLocation = await getUserLocation();

                const [insightsRes, handicapRes, bestEighteenHoleRes, bestNineHoleRes, favouriteCourseRes, mostPlayedCourseRes] = await Promise.all([
                    InsightsService.getInsights(userLocation, token),
                    RoundService.getHandicap(token),
                    RoundService.getBestEighteenHole(token),
                    RoundService.getBestNineHole(token),
                    CourseService.findFavouriteCourse(token),
                    CourseService.findMostPlayedCourse(token)

                ]);

                setInsights(insightsRes.data);
                setHandicap(handicapRes.data);
                setBestEighteenHole(bestEighteenHoleRes.data);
                setBestNineHole(bestNineHoleRes.data);
                setFavouriteCourse(favouriteCourseRes.data);
                setMostPlayedCourse(mostPlayedCourseRes.data);

            }
            catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };
        fetchUserStats();
    }, [token]);

    if (isLoading) {
        return (
            <div className='center-loader'>
                <BeatLoader />
            </div>
        )
    }

    return (
        <>
            {/* Display the handicap. If it returns 101 the user does not have enough 18 hole rounds */}
            <div className='handicap-box'>
                <div className='handicap'>
                    {handicap == 101 ? <h3>N/A</h3> : <h3>{handicap}</h3>}
                </div>
                <p className='handicap-label'>Handicap Index</p>
            </div>


            <h1 className='dashboard-home'>Welcome to Your Dashboard</h1>
            <h2 className='dashboard-home'>Improvement Starts Here</h2>

            {confirmLogout.show && (
                <div className='center-modal'>
                    <Modal
                        handleTrue={logout}
                        handleFalse={logoutFalse}
                        message={"Are you sure you want to logout?"}
                        buttonTrue='Logout'
                        buttonFalse='Cancel'
                    />
                </div>

            )}
            <div className='button-container'>
                <button onClick={() => navigate('/add-course18/new')} className='dashboard-buttons'>Add New Course</button>
                <button onClick={() => navigate('/add-round18/new')} className='dashboard-buttons'>Add New Round</button>
                <button onClick={() => navigate('/manage-courses')} className='dashboard-buttons'>Manage Courses</button>
                <button onClick={() => navigate('/manage-rounds')} className='dashboard-buttons'>Manage Rounds</button>
                <button className='dashboard-buttons' onClick={() => logoutConfirmation()}>Logout</button>
            </div>

            <div className='center-user-stats'>

                <>
                    {/* Display the users insights */}
                    <h2>Your Insights</h2>
                    <p className='insights'>{insights}</p>

                    {/* Display thier best 18 hole round */}
                    <h2>Best 18 Hole Round</h2>
                    {bestEighteenHole == null ? <p className='no-data'>Must have at least one eighteen hole round</p> :
                        <table className='course-table'>
                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Date Played</th>
                                    <th>Fairways Hit</th>
                                    <th>Three Putts</th>
                                    <th>Slices and Draws</th>
                                    <th>Round Score</th>
                                    <th>Course Par</th>
                                </tr>

                            </thead>

                            <tbody>
                                <tr>
                                    <td>{bestEighteenHole.course.courseName}</td>
                                    <td>{new Date(bestEighteenHole.datePlayed).toLocaleString("en-US", {
                                        timeZone: 'UTC',
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}</td>
                                    <td>{bestEighteenHole.fairwaysHit}</td>
                                    <td>{bestEighteenHole.threePutts}</td>
                                    <td>{bestEighteenHole.slicesOrDraws}</td>
                                    <td>{bestEighteenHole.roundScore}</td>
                                    <td>{bestEighteenHole.course.eighteenHolePar}</td>
                                </tr>
                                <tr>
                                    <td colSpan="7">
                                        <table className='hole-table'>
                                            <tbody>
                                                <tr>
                                                    <th>Hole</th>
                                                    {bestEighteenHole.roundHolesList.map((roundHole) => (
                                                        <td key={roundHole.id} >
                                                            {roundHole.roundHoleNumber}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <th>Score</th>
                                                    {bestEighteenHole.roundHolesList.map((roundHole) => (
                                                        <td key={roundHole.id} >
                                                            {roundHole.holeScore}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <th>Par</th>
                                                    {bestEighteenHole.course.courseHolesList.map((courseHole) => (
                                                        <td key={courseHole.id}>{courseHole.courseHolePar}</td>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    }

                    {/* Display the users best 9 hole round */}
                    <h2>Best 9 Hole Round</h2>
                    {bestNineHole == null ? <p className='no-data'>Must have at least one nine hole round</p> :

                        <table className='course-table'>
                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Date Played</th>
                                    <th>Fairways Hit</th>
                                    <th>Three Putts</th>
                                    <th>Slices and Draws</th>
                                    <th>Round Score</th>
                                    <th>Course Par</th>
                                </tr>

                            </thead>

                            <tbody>
                                <tr>
                                    <td>{bestNineHole.course.courseName}</td>
                                    <td>{new Date(bestNineHole.datePlayed).toLocaleString("en-US", {
                                        timeZone: 'UTC',
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}</td>
                                    <td>{bestNineHole.fairwaysHit}</td>
                                    <td>{bestNineHole.threePutts}</td>
                                    <td>{bestNineHole.slicesOrDraws}</td>
                                    <td>{bestNineHole.roundScore}</td>
                                    <td>{bestNineHole.course.nineHolePar}</td>
                                </tr>
                                <tr>
                                    <td colSpan="7">
                                        <table className='hole-table'>
                                            <tbody>
                                                <tr>
                                                    <th>Hole</th>
                                                    {bestNineHole.roundHolesList.map((roundHole) => (
                                                        <td key={roundHole.id} >
                                                            {roundHole.roundHoleNumber}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <th>Score</th>
                                                    {bestNineHole.roundHolesList.map((roundHole) => (
                                                        <td key={roundHole.id} >
                                                            {roundHole.holeScore}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <th>Par</th>
                                                    {bestNineHole.course.courseHolesList.map((courseHole) => (
                                                        <td key={courseHole.id}>{courseHole.courseHolePar}</td>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    }

                    {/* Display what thier favourite course is */}
                    <h2>Favourite Course</h2>
                    {favouriteCourse == null ? <p className='no-data'>Must have at least one course added</p> :
                        <table className='course-table'>
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
                                    <td>{favouriteCourse.courseName}</td>
                                    <td>{favouriteCourse.courseRating}</td>
                                    <td>{favouriteCourse.courseType == 18 ? favouriteCourse.eighteenHolePar : favouriteCourse.nineHolePar}</td>
                                    <td>{favouriteCourse.courseLocation}</td>
                                </tr>
                                <tr>
                                    <td colSpan="4">
                                        <table className='hole-table'>
                                            <tbody>
                                                <tr>
                                                    <th>Hole</th>
                                                    {favouriteCourse.courseHolesList.map((courseHole) => (
                                                        <td key={courseHole.id} >
                                                            {courseHole.courseHoleNumber}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <th>Par</th>
                                                    {favouriteCourse.courseHolesList.map((courseHole) => (
                                                        <td key={courseHole.id} >
                                                            {courseHole.courseHolePar}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <th>Length</th>
                                                    {favouriteCourse.courseHolesList.map((courseHole) => (
                                                        <td key={courseHole.id} >
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



                    }

                    {/* Display the users most played course */}
                    <h2>Most Played Course</h2>
                    {mostPlayedCourse == null ? <p className='no-data'>Need At least one round</p> :
                        <table className='course-table'>
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
                                    <td>{mostPlayedCourse.courseName}</td>
                                    <td>{mostPlayedCourse.courseRating}</td>
                                    <td>{mostPlayedCourse.courseType == 18 ? favouriteCourse.eighteenHolePar : favouriteCourse.nineHolePar}</td>
                                    <td>{mostPlayedCourse.courseLocation}</td>
                                </tr>
                                <tr>
                                    <td colSpan="4">
                                        <table className='hole-table'>
                                            <tbody>
                                                <tr>
                                                    <th>Hole</th>
                                                    {mostPlayedCourse.courseHolesList.map((courseHole) => (
                                                        <td key={courseHole.id} >
                                                            {courseHole.courseHoleNumber}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <th>Par</th>
                                                    {mostPlayedCourse.courseHolesList.map((courseHole) => (
                                                        <td key={courseHole.id} >
                                                            {courseHole.courseHolePar}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <th>Length</th>
                                                    {mostPlayedCourse.courseHolesList.map((courseHole) => (
                                                        <td key={courseHole.id} >
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
                    }
                </>


            </div>



        </>

    )
}

export default Dashboard;

