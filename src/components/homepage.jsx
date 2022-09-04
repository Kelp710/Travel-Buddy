import { useState, useEffect } from "react";
import { Navigation } from "../components/navigation";
import { Header } from "../components/header";
import { Countries } from "../components/about";
import { Contact } from "../components/contact";
import "../App.css";
import axios from "axios";
import { Destinations } from "./destinations";

export const Home = () => {

  
    const [data, setData] = useState({});
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