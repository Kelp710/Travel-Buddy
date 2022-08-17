import { auth } from '../firebase';
import {useNavigate, Navigate} from "react-router-dom"
import { useAuthContext } from '../context/authcontext';

export const Navigation = (props) => {
  const usenavigate = useNavigate();
  const { user } = useAuthContext();


  const handleLogout = () => {
    auth.signOut();
    usenavigate('/login')
    usenavigate(0);
  };
  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a className='navbar-brand page-scroll' href='#page-top'>
            Travel buddy
          </a>{' '}
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='#header' className='page-scroll'>
                Top
              </a>
            </li>
            <li>
              <a href='#about' className='page-scroll'>
                Countries
              </a>
            </li>
            <li>
              <a onClick={handleLogout} style={{color: "#F89C05"}}>
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
