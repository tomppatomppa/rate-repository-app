import { Formik } from 'formik';
import React from 'react';
import Text from './Text';
import * as yup from 'yup';
import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .max(30, 'Maximum length for username is 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'minimum length is 5 characters')
    .max(50, 'maximum length is 50 characters')
    .required('Password is a required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords do not match'),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    padding: 14,
  },
  signUpButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    borderRadius: 3,
    padding: 8,
  },
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name={'username'} placeholder="Username" />
      <FormikTextInput
        name={'password'}
        placeholder="Password"
        secureTextEntry={true}
      />
      <FormikTextInput
        name={'passwordConfirm'}
        placeholder="Confirm password"
        secureTextEntry={true}
      />
      <Pressable style={styles.signUpButton} onPress={onSubmit}>
        <Text color={'secondary'} fontWeight="bold">
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const Signup = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [mutate] = useMutation(CREATE_USER);

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await mutate({
        variables: {
          user: { username, password },
        },
      });
      signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpContainer onSubmit={onSubmit} />;
};

export default Signup;
