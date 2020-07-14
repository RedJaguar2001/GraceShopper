const express = require('express')
const userRouter = express()
const { createUser, getAllUsers, getUserInfo, getUserByUsername } = require('../db/users');

const jwt = require('jsonwebtoken');


userRouter.get("/userrouterhealth", (req, res, next)=>{
  console.log('Entered User Router GET / ');
  res.send({
  message: "You successfully reach User Health which seems fine"
  })
  next()
})


usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const token = jwt.sign({ 
        id: user.id, 
        username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });

      res.send({ 
        message: "you're logged in!",
        token 
      });
    } else {
      next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Username or password is incorrect'
      });
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post('/register', async (req, res, next) => {
  const { username, password, name, location } = req.body;

  try {
    const _user = await getUserByUsername(username);
  
    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    }

    const user = await createUser({
      username,
      password,
      name,
      email
    });

    const token = jwt.sign({ 
      id: user.id, 
      username
    }, process.env.JWT_SECRET, {
      expiresIn: '1w'
    });

    res.send({ 
      message: "thank you for signing up",
      token 
    });
  } catch ({ name, message }) {
    next({ name, message });
  } 
});

userRouter.get('/allusers', async(req, res, next)=>{
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

  userRouter.get('/userdetails', async(req, res, next)=>{
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

module.exports= userRouter