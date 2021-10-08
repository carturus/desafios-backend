const fetch = require('node-fetch')
const fs = require('fs')
let profileFacebook={}
const setProfileFacebook=(profile)=>{
    profileFacebook= {
      name: profile.name.familyName + " " + profile.name.givenName,
      mail: profile.emails[0].value,
      picture: profile.photos[0].value
    }
    fetch(profileFacebook.picture)
      .then(res =>
        res.body.pipe(fs.createWriteStream('imagenProfile.jpeg'))
      )
      return profileFacebook;
  }


  const getProfileFacebook=()=>{
    return profileFacebook;
  }
  module.exports={setProfileFacebook,getProfileFacebook}