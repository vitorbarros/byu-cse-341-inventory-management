import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Vehicles Management API',
    description:
      'Vehicles API documentation. You can test this API directly here!',
  },
  host: 'byu-cse-341-inventory-management.onrender.com',
  basePath: '/',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [],
  definitions: {
    Vehicle: {
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
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['../../app.mjs'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
