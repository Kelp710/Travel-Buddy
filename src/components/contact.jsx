import { useState } from 'react'
import emailjs from 'emailjs-com'
import Grid from '@mui/material/Grid';
import Select from 'react-select'
import countryList from "../data"

const initialState = {
  name: '',
  email: '',
  message: '',
}

export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState)
  const [country, setCountry] = useState("")
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [memo, setMessage] = useState("")

  
  const options = 
    countryList.map((country, id) =>(
    { value: {id}.id, label: {country}.country }),)
  
  const handleCountry = e => {
      setCountry(e.label);
    };

	const changeImg = (e) => {
		setSelectedFile(URL.createObjectURL(e.target.files[0]));
		setIsFilePicked(true);
	};
  const changeMemo = (e) => {
    setMessage(e.target.value)
  }

  const clearState = () => setState({ ...initialState })

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
              <h1>{country}</h1>
              <img src={selectedFile}></img>
              <form name='sentMessage' validate onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                    <Select className="select_country" options={options} onChange={(e) => handleCountry(e)} />

                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                    <input type="file" name="file" onChange={changeImg} />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <textarea
                    name='message'
                    id='message'
                    className='form-control'
                    rows='4'
                    placeholder='Message'
                    required
                    onChange={changeMemo}
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

