import express from 'express';

const login = express.Router();

login.get('/login', (req, res) =>
  res.render('login', {
    title: '| Login',
  }),
);

export default login;
