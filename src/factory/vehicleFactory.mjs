import VehicleService from '../service/vehicleService.mjs';
import VehicleController from '../controller/vehicleController.mjs';

const vehicleFactory = () => {
  const vehicleService = new VehicleService();
  return new VehicleController({ vehicleService });
};

export default vehicleFactory;
