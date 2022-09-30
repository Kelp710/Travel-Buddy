
import { auth, provider } from '../firebase';
import { Link } from 'react-router-dom';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import { FcGoogle } from 'react-icons/fc';

export const Login = () => {
    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email.value, password.value);
          } catch (error) {
            console.log(error);
            setError(error.message);
          }
      };

      const handleLogin = async (event) => {
        try {
          await auth.signInWithPopup(provider);
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
      };

      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');

      const handleChangeEmail = (event) => {
        setEmail(event.currentTarget.value);
      };
      const handleChangePassword = (event) => {
        setPassword(event.currentTarget.value);
      };
  
      return(
        <div className='log_in'>
          <Grid 
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
            >
          <div className="back_box"></div>
            <div className='box_items'>
              <h1 className='login_title'>Log In</h1>
                <form onSubmit={handleSubmit} className="login_box">
                  <div className="login_error">{error && <p style={{ color: 'red' }} >{error}</p>}</div>
                  <div className='input_boxes'>
                    <div className='mail_box'>
                       <label>Email</label>
                       <input name="email" type="email" className='input_box' placeholder="email" onChange={(event) => handleChangeEmail(event)}/>
                    </div>
                    <div className='pass_box'>
                       <label>Password</label>
                       <input name="password" type="password" className='input_box' onChange={(event) => handleChangePassword(event)}/>
                    </div>
                 </div>
                 <button className='login_button btn-custom '>Log In</button>
                 <hr className='login_line'/>
                 <button onClick={handleLogin} className="google_button btn-custom"><FcGoogle/> Log in</button>
              <div className='sign_new'>
              <Link to={'/signup'}>Sign up here</Link>
        </div>
        </form>
        </div>   
        </Grid>
      </div>
      )
    };
    
  
