import { useState, useEffect } from 'react';
import CourseService from './Service-API-Calls/CourseService.jsx';
import RoundService from './Service-API-Calls/RoundService.jsx'
import { useNavigate, useParams } from "react-router-dom";
import '/src/CSS/AddRound.css';
import set from "lodash/set";

const AddRound = () => {

        const [errorMessage, setErrorMessage] = useState('');
        const [courseId, setCourseId] = useState();
        const navigate = useNavigate();
        const { id } = useParams();
        const [courseNameList, setCourseNameList] = useState([]);
        const token = localStorage.getItem("token");
        const [round, setRound] = useState({
                datePlayed: '',
                fairwaysHit: 0,
                threePutts: 0,
                slicesOrDraws: 0,
                roundHolesList: Array(9).fill().map((_, i) => ({
                        roundHoleNumber: i + 1,
                        holeScore: 0,
                }))
        })

        //Uses set from lodash to update the values in the holes array
        const handleChange = (e) => {
                const { name, value } = e.target;
                const roundCopy = JSON.parse(JSON.stringify(round));
                set(roundCopy, name, value);
                setRound(roundCopy);
        };


        //If the user selects the default course in the dropdown then onChange will not be called so I set the first course manually
        useEffect(() => {
                CourseService.getCourses(token).then((response) => {
                        setCourseNameList(response.data)
                        if (response.data.length > 0) {
                                setCourseId(response.data[0].id);
                        }
                }).catch((error) => console.log(error));
        }, [token])

        const updateRound = (e) => {
                e.preventDefault();
                RoundService.updateRound(round, id, courseId,token).then(() => {
                        setErrorMessage('');
                        alert('Round updated');
                }).catch(error => {
                        console.error('Error updating round:', error);
                        setErrorMessage('Error updating round');
                })
        }

        //If this is an update request fill out the form with the old round data
        useEffect(() => {
                if (id !== 'new') {
                        RoundService.getRoundById(id,token)
                                .then((response) => {
                                        setRound(response.data);
                                }).catch((error) => console.log(error));
                }
        }, [id, setRound,token]);

        const addRound = (e) => {
                e.preventDefault();
                setErrorMessage('');
                RoundService.addRound(round, courseId,token).then(() => {
                        setRound({
                                datePlayed: '',
                                fairwaysHit: 0,
                                threePutts: 0,
                                slicesOrDraws: 0,
                                roundHolesList: Array(9).fill().map((_, i) => ({
                                        roundHoleNumber: i + 1,
                                        holeScore: '',
                                }))
                        })
                }).catch(error => {
                        console.log('Error adding round', error);
                        setErrorMessage('Error saving round');
                });
        }


        return (
                <>

                        <div className='center-add-round'>

                                <h1 className='add-round-title'>Add 9 Hole Round</h1>
                                <form className='center-add-round add-round-form'>
                                        {/* Display users courses in dropdown */}
                                        <label>Course Played</label>

                                        <select className=' pick-course custom-select'
                                                value={courseId}
                                                onChange={(e) => {
                                                        const selectedValue = e.currentTarget.value;
                                                        setCourseId(selectedValue);
                                                        console.log("Selected course type:", selectedValue);
                                                }}>
                                                {courseNameList.map((item) => (
                                                        <option key={item.id} value={item.id}>
                                                                {item.courseName}
                                                        </option>
                                                ))}
                                        </select>
                                        {/* Get other info about the round */}
                                        <label>Date Played</label>
                                        <input className="add-round-input date"
                                                type="date"
                                                name="datePlayed"
                                                value={round.datePlayed}
                                                onChange={handleChange} />

                                        <label>Number of Fairways Hit</label>
                                        <input className="add-round-input round-info"
                                                type="number"
                                                name="fairwaysHit"
                                                value={round.fairwaysHit}
                                                onChange={handleChange} />

                                        <label>Number of Three Putts</label>
                                        <input className="add-round-input round-info"
                                                type="number"
                                                name="threePutts"
                                                value={round.threePutts}
                                                onChange={handleChange} />

                                        <label>Number of Slices or Draws</label>
                                        <input className="add-round-input round-info"
                                                type="number"
                                                name="slicesOrDraws"
                                                value={round.slicesOrDraws}
                                                onChange={handleChange} />

                                        {/* Navigate to add 18 hole round page  */}
                                        <button className='switch-round' onClick={() => navigate('/add-round18/new')}>Add 18 Hole Round</button>

                                        {/* Get scores from the round */}
                                        <div className='holes'>

                                                {round.roundHolesList.map((hole, index) => (
                                                        <div className='hole' key={index}>
                                                                <h3>Hole {hole.roundHoleNumber}</h3>

                                                                <label>Enter Your Score</label>
                                                                <input className='add-round-input'
                                                                        type="number"
                                                                        name={`roundHolesList[${index}].holeScore`}
                                                                        value={hole.holeScore}
                                                                        onChange={handleChange} />
                                                        </div>

                                                ))}

                                        </div>
                                        {errorMessage && <div className="error">{errorMessage}</div>}
                                        <button className="save-button" type="submit" onClick={id != 'new' ? updateRound : addRound}>Save Round</button>
                                </form>


                        </div>





                </>
        )
}

export default AddRound;