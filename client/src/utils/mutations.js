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
