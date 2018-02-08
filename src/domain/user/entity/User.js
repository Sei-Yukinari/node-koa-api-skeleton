const { attributes } = require('structure');

const User = attributes({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  age: Number,
})(
  class User {
    toEntity() {
      return this;
    }

    toDatabase() {
      const { name } = this;
      return { name };
    }

    isLegal() {
      return this.age >= User.MIN_LEGAL_AGE;
    }

  });

User.MIN_LEGAL_AGE = 21;

module.exports = User;
