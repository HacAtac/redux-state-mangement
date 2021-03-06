const { Service } = require("@apollo/protobufjs");
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async () => {
      return User.find();
    },
    user: async (parent, { email }, context, info) => {
      return User.findOne({ email });
      console.log(email);
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // addUser: async (parent, { firstName, password, email }, context, info) => {
    //   const user = await User.create({ firstName, password, email });
    //   const token = signToken(user);
    //   return { token, user };
    // },
    login: async (parent, args) => {
      const user = await User.findOne({
        $or: [{ email: args.email }],
      });

      if (!user) {
        throw new AuthenticationError("Invalid Credentials");
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new AuthenticationError("Invalid Credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, args) => {
      const { _id, ...rest } = args;
      const service = await User.findOneAndUpdate(_id, rest);
      console.log(service);
      return { service };
    },

    //removeUser so that it sets isActive to false instead of deleting the user
    removeUser: async (parent, args) => {
      const { _id } = args;
      const service = await User.findOneAndUpdate(_id, { isActive: false });
      console.log(service);
      return { service };
    },
  },
};

module.exports = resolvers;
