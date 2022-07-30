const config=require('./config');
const firebase=require('firebase');


const db=firebase.initializeApp(config.firebaseConfig);

module.exports=db;