import User from '../model/user.mjs';

export default class UserService {
  constructor() {
    this.user = null;
  }

  async findOrCreate(profile) {
    this.user = new User({});

    const user = await this.user.findBy({
      field: 'googleId',
      value: profile.id,
    });
    if (user) {
      return user;
    }
    this.user = new User({
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value,
    });
    return this.user.create();
  }
}
