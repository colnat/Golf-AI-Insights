import { useState, useEffect } from 'react';
import RoundService from './Service-API-Calls/RoundService.jsx';
import '/src/CSS/Manage.css';
import Pagination from './Pagination.jsx';
import Modal from './Modal.jsx';
import '/src/CSS/Modal.css'
import { BeatLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";
const ManageRounds = () => {
    const navigate = useNavigate();
    const [rounds, setRounds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roundsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [isLoading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const [confirmDelete, setConfirmDelete] = useState ({
        show: false, 
        roundId: null,
    });

    //Called when user first clicks delete and renders Modal
    const deleteConfirmation = (roundId) => {
        setConfirmDelete({
            show: true, 
            roundId,
        });
    };
    
    //If user confirms deletion
    const deleteRound = async () => {
        try {
            await RoundService.deleteRound(confirmDelete.roundId,token);  
            const response = await RoundService.getRounds(token);
            setRounds(response.data);
        } catch (error) {
            console.log(error);
        } finally{
            setConfirmDelete({
                show: false, 
                roundId: null,
            });
        }
    };

    //If user cancels
    const deleteRoundFalse = () => {
        setConfirmDelete({
            show: false, 
            roundId: null,
        });
    };

    useEffect(() => {
    const fetchUserRounds = async () => {
    setLoading(true)
    try{
        const response = await RoundService.getRounds(token);
        setRounds(response.data);
    }
    catch(error){
      setLoading(false)
      console.log(error)
    }
    finally{
      setLoading(false)
    }
   };
   fetchUserRounds();
    }, [token])

    //Used to search by course name or by a date
    const filteredCRounds = rounds.filter((round) =>
        round.course.courseName.toLowerCase().includes(search.toLocaleLowerCase()) ||
        new Date(round.datePlayed).toLocaleDateString("en-US",{timeZone: 'UTC',day:"numeric",month:"long",year:"numeric"}).toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

    //These three variables are used for the pagination component
    const indexOfLastRound = currentPage * roundsPerPage;
    const indexOfFirstRound = indexOfLastRound - roundsPerPage;
    const currentRounds = filteredCRounds.slice(indexOfFirstRound, indexOfLastRound);

    if(isLoading){
        return (
          <div className='center-loader'>
              <BeatLoader/>
          </div>
      )
    }

    return (
        <>
        <h1 className='manage-header'>Your Rounds</h1>

        <input
          className="search-box"
          placeholder="Search By Course Name or Date"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
    
            {confirmDelete.show && (
            <div className='center-modal'>
                    <Modal
                    handleTrue={deleteRound}
                    handleFalse={deleteRoundFalse}
                    message={"Are you sure you want to delete this round?"}
                    buttonTrue='Delete'
                    buttonFalse='Cancel'
                />
            </div>
              
            )}
       
       
        
        <> 
            {currentRounds.map((round) => (
                <div key={round.id} className='center-user-courses'>
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
                            <tr key={round.id}>
                                <td>{round.course.courseName}</td>
                                <td>{new Date(round.datePlayed).toLocaleDateString("en-US", {
                                    timeZone: 'UTC',
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}</td>
                                <td>{round.fairwaysHit}</td>
                                <td>{round.threePutts}</td>
                                <td>{round.slicesOrDraws}</td>
                                <td>{round.roundScore}</td>
                                {/* Show course par. If 18 hole round show 18 hole par else show nine hole par. Every Course has a 9 and 18 hole par  */}
                                <td>{round.roundLength == 18 ? round.course.eighteenHolePar : round.course.nineHolePar}</td>
                            </tr>
                            {/* Creating a separate table to map the holes horizontally below the course */}
                            <tr>
                                <td colSpan="7">
                                    <table className='hole-table'>
                                        <tbody>
                                            <tr>
                                                <th>Hole</th>
                                                {round.roundHolesList.map((roundHole) => (
                                                    <td key={roundHole.id}>{roundHole.roundHoleNumber}</td>
                                                ))}
                                            </tr>
                                            <tr>
                                                <th>Score</th>
                                                {round.roundHolesList.map((roundHole) => (
                                                    <td key={roundHole.id}>{roundHole.holeScore}</td>
                                                ))}
                                            </tr>
                                            <tr>
                                            <th>Par</th>
                                            {round.course.courseHolesList.map((courseHole) => (
                                                <td key={courseHole.id}>{courseHole.courseHolePar}</td>
                                            ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                   
                    </table>
                    <div className='manage-button-container'>
                        <button className='delete-button' onClick={() => deleteConfirmation(round.id)}>Delete</button>
                        {/* If user wants to update send the id of the round as a param and navigate to the appropriate add round */}
                        <button className='update-button' onClick={() =>{round.roundLength == 18 ? navigate('/add-round18/' + round.id) : navigate('/add-round/' + round.id)}}>Update</button>
                
                    </div>
                 
                </div>
            ))}
            
            <Pagination
                itemsPerPage={roundsPerPage}
                totalItems={rounds.length}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        
        </> 
        
            
        </>
    )


}

export default ManageRounds
