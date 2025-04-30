
import { useState } from 'react';
import AuthService from './Service-API-Calls/AuthService.jsx';
import { useNavigate } from "react-router-dom";
//import { useNavigate } from 'react-router-dom
import '/src/CSS/loginRegister.css';
const RegisterUser = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  
  const saveUser = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password };
    if(password !== confirmPassword){
      setErrorMessage('Passwords do not match');
    } else{
      AuthService.register(user).then(() => {
        navigate('/login');
      }).catch(error => console.error('Error registering:', error, setErrorMessage('Email already exists or missing information'))
  
      );
    }
  };


  return (
    <>
     
        <div className='center'>
          <h2 className=''>Register</h2>
          <form className='login-register-form'>
            <div>
              <label className='login-register'>First Name</label>
              <input className='login-register-input' placeholder="Enter your first name"
                name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
              <label className='login-register'>Last Name</label>
              <input className='login-register-input'
                placeholder="Enter your last name" name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
              <label className='login-register'>Email</label>
              <input className='login-register-input' placeholder="Enter your email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className='login-register'>Password</label>
              <input type='password' className='login-register-input' placeholder="Enter your password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label className='login-register'>Confirm Password</label>
              <input type='password' className='login-register-input' placeholder="Confirm password" name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            
          </form>
          <button type="submit" className='button' onClick={saveUser}>Register</button>
          <button className=' button' onClick={() => { navigate('/login') }}> Already Have an Account?</button>
          {errorMessage && <div className="error"> {errorMessage} </div>}
        </div>
      

    </>
  )
};

export default RegisterUser;