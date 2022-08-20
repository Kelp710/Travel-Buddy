import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { auth, db } from '../firebase';
import { useAuthContext } from '../context/authcontext';
import { collection, query, where, getDocs } from "firebase/firestore";

export const Destinations = () => {
  const {user}=useAuthContext()
  const user_id = user.multiFactor.user.uid
  
  const citiesRef = db.collection('users');
  console.log(citiesRef)
  
  const snapshot = async() => await citiesRef.where('memo', '==', "sos").get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }
  console.log(snapshot)
  Array.snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
//   const citiesRef = collection(db,'users');
// const snapshot = await citiesRef.where('user_id', '==', user_id).get();
// if (snapshot.empty) {
//   console.log('No matching documents.');
//   return;
// }

// snapshot.forEach(doc => {
//   console.log(doc.id, '=>', doc.data());
// });
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="img.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           " destination.country"
          </Typography>
          <Typography variant="body2" color="text.secondary">
            "destination.memo"
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }