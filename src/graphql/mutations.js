import { gql } from '@apollo/client';

export const AUTHORIZE_USER = gql`
  mutation authorize($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
