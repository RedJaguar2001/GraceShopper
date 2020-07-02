const userRouter = require('express').Router()
const {  createUser, getUsers, } = require('../db/users');

usersRouter.get('/', async (req, res) => {
    const users = await getUsers();
  
    res.send({
      users
    });
  });

usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const _user = await getUsers(username);
  
      if (_user) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }
  
      const user = await createUser({
        username,
        password
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
      next({ name, message })
    } 
  });

userRouter.post('/login', async (req, res, next) => {
        const { username, password } = req.body;
      
        
        if (!username || !password) {
          next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
          });
        }
      
        try {
          const user = await getUsers(username);
      
          if (user && user.password == password) {
            const token = jwt.sign({ 
                id: user.id, 
                username: user.username
              }, process.env.JWT_SECRET, {
                expiresIn: '1w'
              });
          
              res.send({ 
                message: "thank you for logging in",
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

module.exports = userRouter
