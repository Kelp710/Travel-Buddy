
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { useState } from "react";

export const Login = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email.value, password.value);
      };
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const handleChangeEmail = (event) => {
        setEmail(event.currentTarget.value);
      };
      const handleChangePassword = (event) => {
        setPassword(event.currentTarget.value);
      };
  
      return(
        <div>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>メールアドレス</label>
            <input name="email" type="email" placeholder="email" onChange={(event) => handleChangeEmail(event)}/>
          </div>
          <div>
            <label>パスワード</label>
            <input name="password" type="password" onChange={(event) => handleChangePassword(event)}/>
          </div>
          <div>
            <button>Log In{password}</button>
          </div>
          <div>
          ユーザ登録は<Link to={'/signup'}>こちら</Link>から
        </div>
        </form>
      </div>
      )
    };
    
  
