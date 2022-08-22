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
import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore/lite";
import Grid from '@mui/material/Grid';


export const Destinations = () => {
const {user}=useAuthContext()
  const user_id = user.multiFactor.user.uid
  const [destinations, setDestinations] = useState([])
  
  useEffect( async() => {
    const docRef = query(collection(db, "users"),where("user", '==', user_id), orderBy('point'))
    // .orderBy('population')
  
    getDocs(docRef).then(snapshot => {
      let results = []
  
      snapshot.docs.forEach(doc => {
        console.log(doc)
        results.push({ id: doc.id, ...doc.data() })

      })
      setDestinations(results)
    })
  }, [])
  // const q = query(collection(db, "users"), where("memo", "==", "test"));

  // const querySnapshot = async() =>{
  //   console.log(await getDocs(q).er)
  
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });}


  // const snapshot = async() => await citiesRef.where('memo', '==', "sos").get();
  // if (snapshot.empty) {
  //   console.log('No matching documents.');
  //   return;
  // }
  // console.log(snapshot)  
  // Array.snapshot.forEach(doc => {
  //   console.log(doc.id, '=>', doc.data());
  // });


//   const citiesRef = collection(db,'users');
// const snapshot = await citiesRef.where('user_id', '==', user_id).get();
// if (snapshot.empty) {
//   console.log('No matching documents.');
//   return;
// }

// snapshot.forEach(doc => {
//   console.log(doc.id, '=>', doc.data());
// });
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
        <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345 }} key={i} className="my_card">
        <CardMedia
          component="img"
          height="140"
          src= {d.country_pic}
          alt="green iguana"
          style={styles}
        />
        <CardContent>
          {d.point}
          <Typography gutterBottom variant="h5" component="div">
          {d.country}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {d.memo}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href={`https://en.wikipedia.org/wiki/${d.country}`}>Wiki</Button>
          <Button size="small">Learn More</Button>
        </CardActions> 
      </Card>    
      </Grid>
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