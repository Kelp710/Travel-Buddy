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
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore/lite";


export const Destinations = () => {
const {user}=useAuthContext()
  const user_id = user.multiFactor.user.uid
  const [destinations, setDestinations] = useState([])
  
  useEffect(() => {
    const docRef = query(collection(db, "users"),where("user", '==', user_id))

  
    getDocs(docRef).then(snapshot => {
      let results = []
  
      snapshot.docs.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() })

      })
      setDestinations(results)
    })
  }, [])
  console.log(destinations)
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
    return (<div>

      {destinations.map((d, i)=>(
       
      <Card sx={{ maxWidth: 345 }} key={i}>
         <h2>{d.file}</h2>
        <CardMedia
          component="img"
          height="140"
          src= {d.file}
          alt="green iguana"
          style={styles}
        />
        <CardContent>

          <Typography gutterBottom variant="h5" component="div">
          {d.country}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {d.memo}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>        ))}
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
    );
  }