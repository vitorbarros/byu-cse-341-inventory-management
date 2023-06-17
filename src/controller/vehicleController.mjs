export default class VehicleController {
  constructor({ vehicleService }) {
    this.vehicleService = vehicleService;
  }

  create = async (req, res) => {
    const isInvalidString = (property) =>
      !req.body[property] || typeof req.body[property] !== 'string';

    if (!req.body) {
      return res.status(400).json({ message: 'Invalid body' });
    }

    const requiredProperties = [
      'name',
      'make',
      'year',
      'color',
      'stock',
      'price',
      'sold',
      'description',
      'category',
    ];

    let invalidProperty = null;

    requiredProperties.forEach((property) => {
      if (isInvalidString(property)) {
        invalidProperty = property;
      }
    });

    if (invalidProperty) {
      return res.status(400).json({ message: `Invalid ${invalidProperty}` });
    }

    const {
      name,
      make,
      year,
      color,
      stock,
      price,
      sold,
      description,
      category,
    } = req.body;

    const vehicle = await this.vehicleService.create({
      name,
      make,
      year,
      color,
      stock,
      price,
      sold,
      description,
      category,
      buyer: req.body?.buyer ? req.body.buyer : '',
    });

    return res.status(201).json({ id: vehicle.insertedId });
  };

  findAll = async (req, res) => {
    const vehicles = await this.vehicleService.findAll();

    if (!vehicles) {
      return res.status(404).json({ message: 'vehicles not found' });
    }

    return res.status(200).json(vehicles);
  };
}
