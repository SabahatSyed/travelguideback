var express = require('express');
var router = express.Router();
const firebase=require('../db');
const User=require('../models/user')
const Service=require('../models/Services')
const firebaseAuth = require('../middleware/firebase-auth');
const firestore=firebase.firestore();
/* GET home page. */


router.post('/login',async function(req, res, next) {
    
    const {email, password} = req.body;
    console.log("sdgb",req.body)
firebase.auth().signInWithEmailAndPassword(email, password)
.then((userCredential) => {
    console.log("geloo")
var user = userCredential.user;
    console.log("logged in",userCredential.email)
    res.send(userCredential.email)

})

.catch((error) => {

var errorCode = error.code;
var errorMessage = error.message;
console.log(error)
});

 });



router.get('/traveler',firebaseAuth,async function(req, res, next) {
   try {
    const users=await firestore.collection('users');
    const data=await users.get();
    const usersArray=[];
    if(data.empty){
        res.status(404).send('No record found');
    }
    else{
        data.forEach(doc=>{
            if(doc.data().role=='Traveller'){
            const user=new User(
                doc.data()
            );
            
            usersArray.push(user);}
        });
        res.send(usersArray);
    }
   } catch (error) {
    res.status(400).send(error.message)
   }
});

router.get('/guides',firebaseAuth,async function(req, res, next) {
    try {
     const users=await firestore.collection('users');
     const data=await users.get();
     const usersArray=[];
     if(data.empty){
         res.status(404).send('No record found');
     }
     else{
         data.forEach(doc=>{
             if(doc.data().role=='Guider'){
             const user=new User(
                 doc.data()
             );
             
             usersArray.push(user);}
         });
         res.send(usersArray);
     }
    } catch (error) {
     res.status(400).send(error.message)
    }
 });


 router.get('/guidesdetail/:gid',firebaseAuth,async function(req, res, next) {
    try {
     const services=await firestore.collection('users');
     const data=await services.get();
     const servicesArray=[];
     if(data.empty){
         res.status(404).send('No record found');
     }
     else{
         data.forEach(doc=>{
             if(doc.data().email==req.params.gid){
             const service=new Service(
                 doc.data()
             );
             
             servicesArray.push(service);}
         });
         res.send(servicesArray);
     }
    } catch (error) {
     res.status(400).send(error.message)
    }
 });

 router.get('/logout', function(req , res){
    firebase.auth().signOut().then(() => {
        res.send("logged out")
    }).catch((error) => {
    // An error happened.
    });
    });

module.exports = router;
