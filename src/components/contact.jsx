import { useState } from 'react'
import emailjs from 'emailjs-com'
import Grid from '@mui/material/Grid';
import Select from 'react-select'
import countryList from "../data"
import { connectFirestoreEmulator } from 'firebase/firestore';

const initialState = {
  name: '',
  email: '',
  message: '',
}

export const Contact = ({inputData, setInputData}) => {
  const [{ name, email, message }, setState] = useState(initialState)
	// const [isFilePicked, setIsFilePicked] = useState(false);


  
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
  // {e.target.name=="file" ? (setInputData((prevState) => ({ ...prevState, "file": e.target.files[0] }))): setInputData((prevState) => ({ ...prevState, "memo": e.target.value }))}
  // console.log(inputData)
    if (e.target.name=="file"){ 
      const file = URL.createObjectURL(e.target.files[0])
      setInputData((prevState) => ({ ...prevState, "file": file }))
      console.log(inputData)
    }else if(e.target.name=="memo"){
    setInputData((prevState) => ({ ...prevState, "memo": e.target.value }))
    console.log(inputData)
  }
  else {
    setInputData("")
    setInputData((prevState) => ({ ...prevState, "country": e.label }))
    console.log(inputData);}
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, message)
    emailjs
      .sendForm(
        'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID'
      )
      .then(
        (result) => {
          console.log(result.text)
          clearState()
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  const clearState = () => setState({ ...initialState })

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
              <form name='sentMessage' validate onSubmit={handleSubmit}>
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

