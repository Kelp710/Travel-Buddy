import { auth } from '../firebase';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';


export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password);
  };
    const handleChangeEmail = (event) => {
      setEmail(event.currentTarget.value);
    };
    const handleChangePassword = (event) => {
      setPassword(event.currentTarget.value);
    };

    return(
      <div className='sign_in'>

        <Grid 
          container
          direction="column"
          justifyContent="space-around"
          alignItems="center"
            >
                      <div className="back_box"></div>
      <div className='box_items'>
      <h1 className='signin_title'>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className='sign_mail'>
          <label>Email</label>
          <input name="email" type="email" className='input_box' placeholder="email" onChange={(event) => handleChangeEmail(event)}/>
        </div>
        <div className='sign_pass'>
          <label>Password</label>
          <input name="password" type="password" className='input_box' onChange={(event) => handleChangePassword(event)}/>
        </div>
        <div>
        <button className='signin_button btn-custom '>Sign In</button>
        </div>
      </form>
      <Link to={'/login'} className="to_login">Back to LogIn page</Link>
      </div>
      </Grid> 

    </div>
    )
  };
  