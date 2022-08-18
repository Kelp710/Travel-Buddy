
import { Fragment } from "react";
import { Home } from "./components/homepage";
import { Login } from "./components/login";
import { SignUp } from "./components/sign";
import { AuthProvider } from './context/authcontext';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import PrivateRoute from './components/privateroute';
import PublicPoute from './components/publicroute';

import SmoothScroll from "smooth-scroll";
import "./App.css";
import PublicRoute from "./components/publicroute";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});



const App = () => {

  return (
    <AuthProvider>
    <div>
    <BrowserRouter>
    <Fragment>
    <Routes>
      <Route exact path="/" element={<PrivateRoute/>}>
       <Route exact path="/" element={<Home/>} />
    </Route>
    <Route path="/login" element={<PublicRoute/>}>
      <Route path ="/login" element={<Login/>} />
      </Route>
      <Route path="/signup" element={<PublicPoute/>}>
      <Route path="/signup" element={<SignUp />} />
      </Route>
          </Routes>
          </Fragment>
        </BrowserRouter>
    </div>
    </AuthProvider>
  );
};

export default App;
