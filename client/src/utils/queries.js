import { gql } from "@apollo/client";

// export const QUERY_USER = gql`
//   query user($email: String!) {
//     user(email: $email) {
//       _id
//       email
//       firstName
//       lastName
//       email
//       isActive
//       address
//       city
//       state
//       zip
//     }
//   }
// `;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      email
      firstName
      lastName
      isActive
      address
      city
      state
      zip
    }
  }
`;
