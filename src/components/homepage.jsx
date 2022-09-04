import { useState, useEffect } from "react";
import { Navigation } from "../components/navigation";
import { Header } from "../components/header";
import { Countries } from "../components/about";
import { Contact } from "../components/contact";
import { useAuthContext } from '../context/authcontext';
import { auth } from '../firebase';
import {useNavigate, Navigate} from "react-router-dom"
import "../App.css";
import axios from "axios";
import { Destinations } from "./destinations";
import { inputAdornmentClasses } from "@mui/material";

export const Home = () => {

  
    const [data, setData] = useState({});
    const usenavigate = useNavigate();
    const { user } = useAuthContext();
  	const url = "https://travel-suggest-backend.herokuapp.com/";
    const [inputData, setInputData] = useState({
      memo:"",
      country:"",
      country_pic:"",
      point:"",
      timeStamp:""
  });
  
  // console.log(axios.get(url).data)
  
    useEffect(() => {
      axios.get(url).then((response) => {
        setData(response.data);
      });
    }, []);
    
  
    const isEmpty = Object.keys(data).length === 0;
  
    if (isEmpty) {
      return null;
    }

    const handleLogout = () => {
      auth.signOut();
      usenavigate('/login')
      usenavigate(0);
    };
  
    return (

      <div>

        <Navigation />
        <Header/>
        <Countries data={data.Countries}/>
        <Contact inputData={inputData} setInputData={setInputData}/>
        <Destinations inputData={inputData}/>
      </div>
    );
}