import { gql } from '@apollo/client';

export const AUTHORIZE_USER = gql`
  mutation authorize($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation review($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($reviewId: ID!) {
    deleteReview(id: $reviewId)
  }
`;
