const firebase = require('firebase');

async function firebaseAuth(req, res, next) {

    var user = firebase.auth().currentUser;
    res.locals.currentUser = user;
    if(user==null){
        console.log("bshjcdbs")
        return res.status(401).json({"message": "Not authorized"})
    }
    console.log("authorized")
    next();
  }

module.exports = firebaseAuth;