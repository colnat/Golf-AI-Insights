import '/src/CSS/Modal.css'
import PropTypes from 'prop-types';
const Modal = ({handleTrue, handleFalse, message,buttonTrue,buttonFalse }) => {
    return (
        <>
            <div className='modal'>
                <div className='modal-content'>
                    <p className='modal-description '>{message}</p>
                </div>
                <div className='modal-button-wrapper'>
                     <button className='modal-button modal-cancel' onClick={handleFalse}>{buttonFalse}</button>
                    <button className='modal-button modal-delete' onClick={handleTrue}>{buttonTrue}</button>
                </div>  
            </div>
        </>
    );
};

Modal.propTypes = {
  handleTrue: PropTypes.func.isRequired, 
  handleFalse: PropTypes.func.isRequired, 
  message: PropTypes.string.isRequired,
  buttonTrue: PropTypes.string.isRequired,
  buttonFalse: PropTypes.string.isRequired
};

export default Modal