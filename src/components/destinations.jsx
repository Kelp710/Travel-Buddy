import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react'
import { auth, db } from '../firebase';
import { useAuthContext } from '../context/authcontext';
import { getFirestore, collection, query, where, getDocs, orderBy, deleteDoc, doc,onSnapshot, refEqual } from "firebase/firestore";
import Grid from '@mui/material/Grid';

export const Destinations = () => {
  const {user}=useAuthContext()
    const user_id = user.multiFactor.user.uid
    const [destinations, setDestinations] = useState([])

    const deleteCard= async (e) =>{
      const doc_id =e.target.attributes[0].nodeValue
      const docRef = doc(db, "users", doc_id)
      await deleteDoc(docRef)

    }

    useEffect( async() => {
     const docRef = query(collection(db, "users"),where("user", '==', user_id),orderBy('point', 'desc'))
      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() })
        });
        setDestinations(results)
      });
  }, [])

  const styles = {
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9,
      marginTop:'30'
    }
  };

  return (<div id='destinations'>
    <div className='cards '>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
      {destinations.map((d, i)=>(
        <div key={i}>
        <Grid item xs={12} sm={6} md={4}>
      <button name={d.id} onClick={(e)=> deleteCard(e)} className="delete_button"></button>
      <Card sx={{ maxWidth: 345 }} className="my_card">
        <CardMedia
          component="img"
          src= {d.country_pic}
          alt="Destinations_of_mine"
          className="card_pic"
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div" >
          {d.country}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {d.point}
          </Typography>
        </CardContent>
        <CardActions className='links'>
          <Button  sx={{fontSize: 13}} href={`https://en.wikipedia.org/wiki/${d.country}`}>Wiki</Button>
          <Button  sx={{fontSize: 13}}>Learn More</Button>
        </CardActions> 
      </Card>    
      </Grid>
      </div>
          ))}
          </Grid>
          </div>
       <footer id='footer'>
        <div className='container text-center'>
          <p>
            &copy; 2020 Issaaf Kattan React Land Page Template. Design by{' '}
            <a href='http://www.templatewire.com' rel='nofollow'>
              TemplateWire
            </a>
          </p>
        </div>
        </footer>
    </div>
    );
  }