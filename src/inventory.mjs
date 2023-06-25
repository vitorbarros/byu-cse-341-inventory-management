import express from 'express';
import vehicleFactory from './factory/vehicleFactory.mjs';

const inventory = express.Router();

const vFactory = vehicleFactory();

inventory.post('/vehicle', (req, res) =>
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create vehicle payload',
      schema: {
        name: 'Fusca',
        make: 'Volkswagen',
        year: 1969,
        color: 'red',
        stock: 1,
        price: 10000,
        sold: false,
        description: 'Fusca 1969',
        category: 'classic',
        buyer: '',
      }
  } */
  vFactory.create(req, res),
);

inventory.get('/vehicle', (req, res) => vFactory.findAll(req, res));

inventory.put('/vehicle/:id', (req, res) =>
  // #swagger.parameters['id'] = { description: 'Vehicle id to be updated' }
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Update vehicle payload',
      schema: {
        name: 'Fusca',
        make: 'Volkswagen',
        year: 1969,
        color: 'red',
        stock: 1,
        price: 10000,
        sold: false,
        description: 'Fusca 1969',
        category: 'classic',
        buyer: '',
      }
  } */
  vFactory.update(req, res),
);
inventory.delete('/vehicle/:id', (req, res) =>
  // #swagger.parameters['id'] = { description: 'Vehicle id to be deleted' }
  vFactory.delete(req, res),
);

inventory.get('/vehicle', (req, res) => res.render('vehicle'));

export default inventory;
