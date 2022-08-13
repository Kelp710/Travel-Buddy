import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import axios from "axios";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});



const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  },[]);

  const [data, setData] = useState({});
	const url = "http://127.0.0.1:8000/";

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
      <Header data={landingPageData.Header} />
      <About data={data.About}/>
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery}/>
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default App;
