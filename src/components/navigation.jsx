import { auth } from '../firebase';
import {useNavigate} from "react-router-dom"

export const Navigation = (props) => {
  const usenavigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    usenavigate('#/login')
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
              <a href='#add' className='page-scroll'>
                Add
              </a>
            </li>
            <li>
              <a href='#destinations' className='page-scroll'>
                Destinations
              </a>
            </li>
            <li>
              <a onClick={handleLogout} className="logout">
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
