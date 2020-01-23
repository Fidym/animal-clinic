// import * as functions from 'firebase-functions';

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data: any, context: any) => {
  // data can contain any custom data we send along with this call to the function
  //  mi esetünkben az user email címe lesz akit adminnak akarunk
  // get user and add custom claim
  return admin.auth().getUserByEmail(data).then((user: any) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    })
  }).then(() => {
    return {
      message: `Success! ${data} has been made an admin`
    }
  }).catch((err: any) => {
    return err;
  })
})
