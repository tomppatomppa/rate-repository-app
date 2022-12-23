import { gql } from '@apollo/client';

export const REPOSITORY_FIELDS = gql`
  fragment RepositoryFields on Repository {
    description
    forksCount
    fullName
    id
    language
    ratingAverage
    reviewCount
    stargazersCount
    ownerAvatarUrl
  }
`;

//
export const REVIEW_FIELDS = gql`
  fragment ReviewFields on Reviews {
    createdAt
    id
    rating
    user {
      id
      username
    }
    text
  }
`;
