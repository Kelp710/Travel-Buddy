import { useState } from 'react'
import emailjs from 'emailjs-com'
import Grid from '@mui/material/Grid';
import Select from 'react-select'
import countryList from "../data"
import { useAuthContext } from '../context/authcontext';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";


export const Contact = ({inputData, setInputData}) => {
  const {user}=useAuthContext()
  
  const options = 
    countryList.map((country, id) =>(
    { id: {id}.id, label: {country}.country, "target": {"name":"country"} }),)
  
const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY

const handleChange = async(e) => {
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
      `https://api.unsplash.com/search/photos?page=1&query=${e.label}&client_id=${UNSPLASH_KEY}&order_by=popular&orientation=landscape&count=1&per_page=4&content_filter=high`
    );
    data.json().then(snapshot => {
      setInputData((prevState) => ({ ...prevState, "country_pic": snapshot.results[0].urls.raw }))
    })}
  }

  const initial={
    memo:"",
    country:"",
    country_pic:"",
    point:"",
    timeStamp:""
}

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
    await addDoc(collection(db, "users"), {
    user: user.multiFactor.user.uid,
    country: inputData.country,
    memo: inputData.memo,
    point: inputData.point,
    country_pic: inputData.country_pic,
    timeStamp:e.timeStamp
    });

    } catch (error) {
    console.log(error);
    }
    // await setInputData((prevState) => ({ ...prevState, "country": "" }))
    // await setInputData((prevState) => ({ ...prevState, "memo": ""}))
    // await setInputData((prevState) => ({ ...prevState, "point": "" }))
    setInputData({...initial})
    setInputData((prevState) => ({ ...prevState, "country": options[0].label }))
    console.log(inputData.country)
    };
    console.log(options)
  return (
      <div id='add'>
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
                  Add a country you want to go with memo and How much you want ot go
                </p>
              </div>
              <form name='sentMessage' validate onSubmit={onSubmit}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      {/* value need to be adequate */}
                    <Select 
                    className="select_country" 
                    type="text" 
                    name='country' 
                    placeholder="Country"
                    value={{ id: 0, label: inputData.country, "target": {"name":"country"} }}
                    options={options}
                    getOptionValue={option => option.id}
                    onChange={handleChange}
                    />

                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                    <input type="number" min="0" max="100" name="point" placeholder='Out of 100' value={inputData.point} required className='point' onChange={handleChange} />
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
                    maxlength="140"
                    onChange={handleChange}
                  ></textarea>
                  <p className='help-block text-danger'></p>
                </div>
                <div id='success'></div>
                <button type='submit' className='btn btn-custom btn-lg'>
                  Submit
                </button>
              </form>
            </div>
          </div>
          </Grid>
        </div>

      </div>
  )
}