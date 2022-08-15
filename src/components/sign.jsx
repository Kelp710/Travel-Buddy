import { auth } from '../firebase';
import { useState } from 'react';
import { useAuthContext } from '../context/authcontext';


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
      <div>
      <h1>ユーザ登録</h1>
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
          <button>{password}</button>
        </div>
      </form>
    </div>
    )
  };
  