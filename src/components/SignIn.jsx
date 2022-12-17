import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.secondary,
    padding: 14,
  },
  flexInputItem: {
    padding: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 3,
    marginBottom: 12,
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
    <Formik initialValues={{ name: '', password: '' }} onSubmit={onSubmit}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};
const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.flexInputItem}
        name={'name'}
        placeholder="name"
      />
      <FormikTextInput
        style={styles.flexInputItem}
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
