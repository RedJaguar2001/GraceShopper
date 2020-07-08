const express = require('express')
const userRoute = express()
const port = 3000
const { createUser, getAllUsers, getUserInfo } = require('../db/users');



userRoute.get('/', (req, res, next)=>{
  console.log('Entered SearchResults Router GET / ');
  res.send({
  message: "You successfully reach search results GET/"

  })
  next()

})

userRoute.get('/allusers', async(req, res, next)=>{

  const { allusers } = req.params;

  try {
  const users =  await getAllUsers(allusers);
    res.send({
      users,
      message: 'successfully retrieved users'
    })
  } catch ({ error}) {
    next({ error});
  
  }
});

  userRoute.get('/userdetails', async(req, res, next)=>{
    const { userdetails } = req.params;
    try {

    const userinfo = await getUserInfo(userdetails);
      res.send({
        userinfo,
        message: 'successfully retrieved users info'
      })
    } catch ({ error}) {
      next({ error});
    
    }
  });


module.exports= userRoute