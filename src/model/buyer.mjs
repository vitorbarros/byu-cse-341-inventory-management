import { ObjectId } from 'mongodb';
import client from '../infra/database/mongodb.mjs';
import envs from '../config/envs.mjs';

export default class Buyer {
  constructor({ fullName, email, phoneNumber, address, zipCode, city, state }) {
    this.collection = 'buyers';
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.state = state;
  }

  create = () =>
    client.db(envs.MONGO_DB_NAME).collection(this.collection).insertOne({
      fullName: this.fullName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address,
      zipCode: this.zipCode,
      city: this.city,
      state: this.state,
    });

  findAll = async () => {
    const cursor = await client
      .db(envs.MONGO_DB_NAME)
      .collection(this.collection)
      .find({});

    return cursor.toArray();
  };

  update = async ({ id }) =>
    client
      .db(envs.MONGO_DB_NAME)
      .collection(this.collection)
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            fullName: this.fullName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            address: this.address,
            zipCode: this.zipCode,
            city: this.city,
            state: this.state,
          },
        },
      );

  delete = ({ id }) =>
    client
      .db(envs.MONGO_DB_NAME)
      .collection(this.collection)
      .deleteOne({ _id: new ObjectId(id) });
}
