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
export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      url
      ...RepositoryFields
    }
  }
  ${REPOSITORY_FIELDS}
`;
export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
