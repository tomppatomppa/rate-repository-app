import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        cursor
        node {
          ...RepositoryFields
        }
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${REPOSITORY_FIELDS}
`;
export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      reviews(first: $first, after: $after) {
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
        pageInfo {
          hasNextPage
          endCursor
        }
      }
      url
      ...RepositoryFields
    }
  }
  ${REPOSITORY_FIELDS}
`;
export const ME = gql`
  query ($includeReviews: Boolean = false, $first: Int, $after: String) {
    me {
      id
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          cursor
          node {
            createdAt
            id
            text
            rating
            user {
              id
              username
            }
            repository {
              name
              url
              fullName
              id
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
