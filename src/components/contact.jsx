import { useState } from 'react'
import emailjs from 'emailjs-com'
import Grid from '@mui/material/Grid';
import Select from 'react-select'
import countryList from "../data"
import { connectFirestoreEmulator } from 'firebase/firestore';
import { useAuthContext } from '../context/authcontext';
import { auth, db } from '../firebase';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";


export const Contact = ({inputData, setInputData}) => {
  const {user}=useAuthContext()


  
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
const handleChange = (e) => {
    if (e.target.name=="file"){ 
      const file = URL.createObjectURL(e.target.files[0])
      setInputData((prevState) => ({ ...prevState, "file": file }))
      console.log(inputData)
    }else if(e.target.name=="memo"){
    setInputData((prevState) => ({ ...prevState, "memo": e.target.value }))
  }
  else {
    setInputData((prevState) => ({ ...prevState, "country": "" }))
    setInputData((prevState) => ({ ...prevState, "country": e.label }))
    console.log(inputData);}
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(inputData)
    try {
    await addDoc(collection(db, "users"), {
    user: user.multiFactor.user.uid,
    country: inputData.country,
    memo: inputData.memo,
    file: inputData.file
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
              <img src={inputData.file}></img>
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
                    <input type="file" name="file" onChange={handleChange} />
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

      <div id='footer'>
        <div className='container text-center'>
          <p>
            &copy; 2020 Issaaf Kattan React Land Page Template. Design by{' '}
            <a href='http://www.templatewire.com' rel='nofollow'>
              TemplateWire
            </a>
          </p>
        </div>
        
      </div>
    </div>
  )
}