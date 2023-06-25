import express from 'express';

const dashboard = express.Router();

dashboard.get('/dashboard', (req, res) =>
  res.render('dashboard', {
    title: '| Dashboard',
  }),
);

export default dashboard;
