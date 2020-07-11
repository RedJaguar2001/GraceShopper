const express = require('express')
const userRoute = express()
const port = 3000
const { createUser, getAllUsers, getUserInfo } = require('../db/users');



userRoute.get("/userrouterhealth", (req, res, next)=>{
  console.log('Entered User Router GET / ');
  res.send({
  message: "You successfully reach User Health which seems fine"

  })
  next()

})

userRoute.post("/", async (req, res, next) => {
  const {name, username, password, email} = req.body;

  try {
      
      const createdauser = await createUser({
        name, username, password, email
 
      })

      res.send({
          message: 'new user created',
          data: createdauser,
          status: true
      })
  } catch (error) {
      next(error)
  }
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
    const { userDetails } = req.params;
    try {

    const userInfo = await getUserInfo(userDetails);
      res.send({
        userInfo,
        message: 'successfully retrieved users info'
      })
    } catch ({ error}) {
      next({ error});
    
    }
  });


module.exports= userRoute