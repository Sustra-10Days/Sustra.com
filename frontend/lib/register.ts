import { gql } from "@apollo/client";

export const Register = gql`
  mutation RegisterUser($id: String!, $email: String!, $name: String!, $picture: String) {
    registerUser(id: $id, email: $email, name: $name, picture: $picture) {
      success
    }
  }
`;