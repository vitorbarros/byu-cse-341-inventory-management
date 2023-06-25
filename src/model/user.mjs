import { ObjectId } from 'mongodb';
import client from '../infra/database/mongodb.mjs';
import envs from '../config/envs.mjs';

export default class User {
  constructor({ googleId, displayName, firstName, lastName, image }) {
    this.collection = 'users';
    this.googleId = googleId;
    this.displayName = displayName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.image = image;
  }

  create = () =>
    client.db(envs.MONGO_DB_NAME).collection(this.collection).insertOne({
      googleId: this.googleId,
      displayName: this.displayName,
      firstName: this.firstName,
      lastName: this.lastName,
      image: this.image,
    });

  findAll = async () => {
    const cursor = await client
      .db(envs.MONGO_DB_NAME)
      .collection(this.collection)
      .find({});

    return cursor.toArray();
  };

  findBy = ({ field, value }) => {
    let parsedValue = value;
    if (field === '_id') {
      parsedValue = new ObjectId(value);
    }

    return client
      .db(envs.MONGO_DB_NAME)
      .collection(this.collection)
      .findOne({ [field]: parsedValue });
  };

  update = async ({ id }) =>
    client
      .db(envs.MONGO_DB_NAME)
      .collection(this.collection)
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            googleId: this.googleId,
            displayName: this.displayName,
            firstName: this.firstName,
            lastName: this.lastName,
            image: this.image,
          },
        },
      );

  delete = ({ id }) =>
    client
      .db(envs.MONGO_DB_NAME)
      .collection(this.collection)
      .deleteOne({ _id: new ObjectId(id) });
}
