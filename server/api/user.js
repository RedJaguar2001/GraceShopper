const express = require('express');
const userRoute = express.Router();
const { createUser, getAllUsers, getUserInfo } = require('../db');

userRoute.use('/', (req, res, next)=>{
  console.log('Entered SearchResults Router GET / ');

  next();
})

userRoute.get('/', async(req, res)=>{
    
    const users = await getAllUsers();

    res.send({users});
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


module.exports= userRoute;