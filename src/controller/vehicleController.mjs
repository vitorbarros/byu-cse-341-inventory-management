export default class VehicleController {
  constructor({ vehicleService }) {
    this.vehicleService = vehicleService;
  }

  create = async (req, res) => {
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
      if (req.body[property] === undefined) {
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

  update = async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({ message: 'Invalid id' });
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

    try {
      await this.vehicleService.update({
        id: req.params.id,
        buyer: req.body?.buyer ? req.body.buyer : '',
        name,
        make,
        year,
        color,
        stock,
        price,
        sold,
        description,
        category,
      });

      return res.status(204).json({});
    } catch (e) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  delete = async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    try {
      await this.vehicleService.delete({ id: req.params.id });

      return res.status(200).json({ message: 'Vehicle deleted' });
    } catch (e) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}
