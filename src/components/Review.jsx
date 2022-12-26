import { Formik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import Text from './Text';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const initialValues = {
  repositoryName: 'swr',
  ownerName: 'zeit',
  rating: '12',
  text: 'testing',
};
const validationSchema = yup.object().shape({
  ownerName: yup.string().required('repository owner name is required'),
  repositoryName: yup.string().required('repository name is required'),
  rating: yup
    .number('Only numbers')
    .min(0, 'Rating is a required number between 0 and 100')
    .max(100, 'Rating is a required number between 0 and 100')
    .required('Rating is required'),
  text: yup.string(),
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    padding: 14,
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    borderRadius: 3,
    padding: 8,
  },
});
const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name={'ownerName'} placeholder="Repository owner name" />
      <FormikTextInput name={'repositoryName'} placeholder="Repository name" />
      <FormikTextInput name={'rating'} placeholder="Rating between 0 and 100" />
      <FormikTextInput name={'text'} placeholder="Review" />
      <Pressable style={styles.signInButton} onPress={onSubmit}>
        <Text color={'secondary'} fontWeight="bold">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};
export const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};
const Review = () => {
  const navigate = useNavigate();
  const [mutation] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    try {
      const { data } = await mutation({
        variables: {
          review: {
            ...values,
            rating: Number(values.rating),
          },
        },
      });
      navigate(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;
