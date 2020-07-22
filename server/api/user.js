const express = require('express');
const userRouter = express();
const { createUser, getAllUsers, getUserInfo, doesUserExist, login, loginWithToken, } = require('../db');

userRouter.post("/register", async (req, res, next) => {
  const values = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };

  try {
    // make sure we have valid data from the client
    for (const key in values) {
      // protect against keys on the prototype chain
      if (values.hasOwnProperty(key)) {
        const value = values[key];

        if (
          !value || (typeof value !== "string") || !value.trim().length
        ) {
          return res.status(400).json({
            error: `${key} is required, must be a string, and cannot be empty.`
          });
        }
        else
          // trim all strings before insertion into db
          values[key] = value.trim();
      }
    }

      // check to see if a user with this username / email exists
      const [exists, column] = await doesUserExist(values.username, values.email);

      if (exists) {
        // status 409 means conflict with server state
        return res.status(409).json({
          error: `A user with this ${column} already exists.`
        });
      }

      const [user, token] = await createUser(values);

      // don't send the user's password to the front end
      delete user.password;

      console.log(user, token);

      // status 201 means resource created
      res.status(201).json({
        user,
        token
      });
  } catch (error) {
    console.error("register error", error);
      next(error);
  }
});

// eslint-disable-next-line complexity
userRouter.post("/login/token", async (req, res, next) => {
  let token = '';

  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== "undefined") {
    token = bearerHeader.split(' ')[1];
  } else {
    res.status(403).json({
      error: "Token is required, and must be sent in an authorization bearer header."
    });
  }

  try {
    const user = await loginWithToken(token);

    if (!user) {
      return res.status(403).json({
        error: "Invalid token."
      });
    }

    delete user.password;

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// eslint-disable-next-line complexity
userRouter.post("/login", async (req, res, next) => {
  const values = {
    password: req.body.password,
    email: req.body.email
  };

  // make sure we have valid data from the client
  for (const key in values) {
    // protect against keys on the prototype chain
    if (values.hasOwnProperty(key)) {
      const value = values[key];

      if (
        !value || (typeof value !== "string") || !value.trim().length
      ) {
        return res.status(400).json({
          error: `${key} is required, must be a string, and cannot be empty.`
        });
      }
      else
        // trim all strings before insertion into db
        values[key] = value.trim();
    }
  }

  try {
    const [exists] = await doesUserExist("", values.email);

    if (!exists) {
      return res.status(404).json({
        error: "No user with that email exists."
      });
    }


    const [user, token] = await login(values.email, values.password);

    if (!user) {
      return res.status(401).json({
        error: "Invalid password."
      });
    }

    delete user.password;

    res.json({
      user,
      token
    });
  } catch (error) {
    next(error);
  }
});

userRouter.get('/allusers', async(req, res, next)=>{
  const { allusers } = req.params;
  try {
  const users =  await getAllUsers(allusers);
    res.send({
      users,
      message: 'successfully retrieved users'
    });
  } catch ({ error}) {
    next({ error});
  }
});


//Phone number must be passed in as a string, FYI
userRouter.post('/details', async (req, res) =>{
  const values = {
  fullAddress: req.body.fullAddress,
  billingAddress: req.body.billingAddress,
  fullName: req.body.fullName,
  phoneNumber: req.body.phoneNumber,
  
  };

console.log(typeof values.phoneNumber)

  try {
    // make sure we have valid data from the client
    for (const key in values) {
      // protect against keys on the prototype chain
      if (values.hasOwnProperty(key)) {
        const value = values[key];


        if (
          !value || (typeof value !== "string") || !value.trim().length
        ) {
          return res.status(400).json({
            error:`${key} is required, must be a string, and cannot be empty.` 
            
          });
        }
        else
          // trim all strings before insertion into db
          values[key] = value.trim();
      }
    }
      const [user_details] = await getUserInfo(values);

      console.log(user_details);
      
     

      // status 201 means resource created
      res.status(201).json({
       user_details


      });

    } catch ({ error}) {
      next({ error});
    }
});

  userRouter.get('/details', async(req, res, next)=>{
    const { userDetails } = req.params;
    try {
    const userInfo = await getUserInfo(userDetails);
      res.send({
        userInfo,
        message: 'successfully retrieved users info'
        
      });
    } catch ({ error}) {
      next({ error});
    }
  });

module.exports= userRouter;
