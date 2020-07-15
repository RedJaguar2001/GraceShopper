const express = require('express');
const userRouter = express();
const { createUser, getAllUsers, getUserInfo, doesUserExist } = require('../db/users');

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

      // status 201 means resource created
      res.status(201).json({
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

  userRouter.get('/userdetails', async(req, res, next)=>{
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
