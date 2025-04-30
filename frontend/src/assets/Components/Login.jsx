import { useState } from 'react';
import AuthService from './Service-API-Calls/AuthService.jsx';
import '/src/CSS/loginRegister.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const login = (e) => {
    e.preventDefault();
    const user = { email, password};
    AuthService.login(user).then((response) => {
     const token  =  response.data.token;
     localStorage.setItem("token", token);
     navigate('/dashboard');
    }).catch(error => console.error('Error logging in:', error, setErrorMessage('Email or password incorrect or missing information'))
    )
  };

  return (
  
      

        <div className="center">
          

          <h2 className=''>Login</h2>
         <form className='login-register-form'>
            
            <label className='login-register'>Email</label>
              <input
                className="login-register-input"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            
            
              <label className='login-register'>Password</label>
              <input
                className="login-register-input"
                placeholder="Enter your password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            
          </form>
          <button className="button" type="submit" onClick={login}>
              Login
            </button>
    
          <button onClick={() => navigate('/register')} className="button">Need to Create an Account?</button>
          {errorMessage && <div className="error">{errorMessage}</div>}
      
          </div>
        
     
    

  )

};
export default Login;