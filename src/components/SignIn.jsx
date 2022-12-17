import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import * as yup from 'yup';
const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
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

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};
const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name={'username'} placeholder="username" />
      <FormikTextInput
        name={'password'}
        placeholder="password"
        secureTextEntry={true}
      />
      <Pressable style={styles.signInButton} onPress={() => onSubmit('login')}>
        <Text color={'secondary'} fontWeight="bold">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};
export default SignIn;
