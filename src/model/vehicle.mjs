import client from '../infra/database/mongodb.mjs';
import envs from '../config/envs.mjs';

export default class Vehicle {
  constructor({
    name,
    make,
    year,
    color,
    stock,
    price,
    sold,
    description,
    category,
    buyer,
  }) {
    this.collection = 'vehicles';
    this.name = name;
    this.make = make;
    this.year = year;
    this.color = color;
    this.stock = stock;
    this.price = price;
    this.sold = sold;
    this.description = description;
    this.category = category;
    this.buyer = buyer;
  }

  create = () =>
    client.db(envs.MONGO_DB_NAME).collection(this.collection).insertOne({
      name: this.name,
      make: this.make,
      year: this.year,
      color: this.color,
      stock: this.stock,
      price: this.price,
      sold: this.sold,
      description: this.description,
      category: this.category,
      buyer: this.buyer,
    });

  findAll = async () => {
    const cursor = await client
      .db(envs.MONGO_DB_NAME)
      .collection(this.collection)
      .find({});

    return cursor.toArray();
  };
}
