'use strict';

const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // Instance method to return an object with only the user instance information that is safe to save to a JWT
    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance, hence the use of 'this'
      return { id, username, email};
    }

    // Instance method to validate the User instance hashed password.
    // It will accept a password string and return 'true' if there is a match with the User instance's hashedPassword.
    // If there is no match, it will return false
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    // Static method to get the current user by id that accepts an ID, and will use the currentUser scope to return a User with that ID
    static getUserById(id) {
      return User.scope('currentUser').findByPk(id);
    }

    // Static method for user login
    // This method accepts an object with the 'credential' and 'password' keys. It searches for one User with the specified credential
    // (either username or email). If a user is found, the method will validate the password by passing it into the instance's .validatePassword method.
    // If the password is valid, the method returns the user by using the currentUser scope
    static async login({credential, password}) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      // Note that the 'password' argument passed into the user.validatePassword
      // in this conditional is the password value received by the LOGIN STATIC METHOD (passed into validatePassword for comparison)
      if(user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id)
      }
    }

    // Static method for sign-up
    // This method accepts an object with a username, email, and password key. The password is hashed using the bcryptjs hashSync method.
    // It then creates a user with the username, email, and hashedPassword. It returns the created user using the currentUser scope
    static async signup({username, email, password}) {
      const hashedPassword = bcrypt.hashSync(password);
      const newUser = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(newUser.id);
    }

    static associate(models) {
      // define association here
    }


  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        // could potentially have used isEmai: false instead of custom validator
        isNotEmail(value) {
          if (validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }

    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    // Default Scope that will execute any time a query is made without specifying a scope.
    // This scope excludes the hashedPassword, email, createdAt, and updatedAt fields
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    // Define additional scopes
    scopes: {
      // currentUser scope returns all data fields EXCEPT the hashedPassword
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      },
      // loginUser scope used only when verifying a user's login credentials. Returns ALL fields
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
