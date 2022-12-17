import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  inputDefault: {
    padding: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 3,
    marginBottom: 6,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  return (
    <NativeTextInput
      style={error ? textInputStyle : styles.inputDefault}
      {...props}
    />
  );
};

export default TextInput;
