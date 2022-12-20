import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS } from './fragments';
export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        cursor
        node {
          ...RepositoryFields
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
`;
