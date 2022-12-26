import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query ($orderBy: AllRepositoriesOrderBy) {
    repositories(orderBy: $orderBy) {
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
      reviews {
        edges {
          node {
            createdAt
            id
            rating
            user {
              id
              username
            }
            text
          }
        }
      }
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
