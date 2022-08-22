import { useState } from 'react'
import emailjs from 'emailjs-com'
import Grid from '@mui/material/Grid';
import Select from 'react-select'
import countryList from "../data"
import { connectFirestoreEmulator } from 'firebase/firestore';
import { useAuthContext } from '../context/authcontext';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore/lite";


export const Contact = ({inputData, setInputData}) => {
  const {user}=useAuthContext()
  const [img, setImg] = useState("");
const [res, setRes] = useState([]);




  
  const options = 
    countryList.map((country, id) =>(
    { id: {id}.id, label: {country}.country, "target": {"name":"country"} }),)
  
  
	// const changeImg = (e) => {
	// 	setSelectedFile(URL.createObjectURL(e.target.files[0]));
	// 	setIsFilePicked(true);
	// };
  // const changeMemo = (e) => {
  //   setMessage(e.target.value)
  // }

const handleChange = async(e) => {
  console.log(inputData)
  if (e.target.name ==="point"){
    setInputData((prevState) => ({ ...prevState, "point": e.target.value }))
  }
    else if(e.target.name=="memo"){
    setInputData((prevState) => ({ ...prevState, "memo": e.target.value }))
  }
  else {
    setInputData((prevState) => ({ ...prevState, "country": "" }))
    setInputData((prevState) => ({ ...prevState, "country": e.label }))
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${e.label}&client_id=BIWkxve6hsoQNq7zoauikNAOXOH03SEKh1futEFtnRA&order_by=popular&orientation=landscape&count=1&per_page=4&content_filter=high`
    );
    data.json().then(snapshot => {
      setInputData((prevState) => ({ ...prevState, "country_pic": snapshot.results[0].urls.raw }))
    })}
    console.log(inputData)
  }
  // const fetchRequest = async () => {
  //   const data = await fetch(
  //     `https://api.unsplash.com/search/photos?page=1&query=${inputData.country}&client_id=BIWkxve6hsoQNq7zoauikNAOXOH03SEKh1futEFtnRA`
  //   );
  //   const dataJ= async() => await data.json();
  //   const result = dataJ.results;
  //   console.log(result);
  //   setRes(result);
  // };

  const onSubmit = async (e) => {
    console.log(e)
    e.preventDefault();
    try {
    await addDoc(collection(db, "users"), {
    user: user.multiFactor.user.uid,
    country: inputData.country,
    memo: inputData.memo,
    point: inputData.point,
    country_pic: inputData.country_pic
    });
    } catch (error) {
    console.log(error);
    }
    console.log(inputData)
    };

  return (
    <div>
      <div id='contact'>
        <div className='container'>
        <Grid 
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
            >
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <h2>Add countries You wanna go.</h2>
                <p>
                  Add a country you wanna go with memo and Image
                </p>
              </div>
              <form name='sentMessage' validate onSubmit={onSubmit}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                    <Select 
                    className="select_country" 
                    type="text" 
                    name='country' 

                    options={options}
                    getOptionValue={option => option.id}
                    onChange={handleChange} />

                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                    <input type="number" min="0" max="100" name="point" required className='point' onChange={handleChange} />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <textarea
                    name='memo'
                    id='memo'
                    value={inputData.memo}
                    className='form-control'
                    rows='4'
                    placeholder='Message'
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className='help-block text-danger'></p>
                </div>
                <div id='success'></div>
                <button type='submit' className='btn btn-custom btn-lg'>
                  Send Message
                </button>
              </form>
            </div>
          </div>
          </Grid>
        </div>

      </div>
    </div>
  )
}