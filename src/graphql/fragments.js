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
