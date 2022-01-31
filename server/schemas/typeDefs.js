const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    isActive: Boolean
    address: String
    city: String
    state: String
    zip: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
  }

  type Mutation {
    addUser(firstName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(
      _id: ID!
      firstName: String
      lastName: String
      email: String
      password: String
      address: String
      city: String
      state: String
      zip: String
    ): User
    removeUser(_id: ID!): User
  }
`;

module.exports = typeDefs;
