import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $password: String!, $email: String!) {
    addUser(firstName: $firstName, password: $password, email: $email) {
      token
      user {
        _id
        firstName
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $_id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $address: String
    $city: String
    $state: String
    $zip: String
  ) {
    updateUser(
      _id: $_id
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      address: $address
      city: $city
      state: $state
      zip: $zip
    ) {
      firstName
      lastName
      email
      password
      address
      city
      state
      zip
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($_id: ID!) {
    removeUser(_id: $_id) {
      _id
    }
  }
`;
