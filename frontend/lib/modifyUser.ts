import { gql } from "@apollo/client";


export const modify = gql`
  mutation EditUser($uid: String!, $major: String!, $name: String!) {
    editUser(uid: $uid, major: $major, name: $name) {
      success
      message
    }
  }
`;