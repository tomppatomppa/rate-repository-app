import { StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes } from 'react-router-native';
import AppBar from './AppBar';
import MyReviews from './MyReviews';

import RepositoryList from './RepositoryList';
import Review from './Review';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Signup from './Signup';
import SingleRepository from './SingleRepository';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<SignIn />} replace />
        <Route path="/signout" element={<SignOut />} replace />
        <Route path="/:id" element={<SingleRepository />} replace />
        <Route path="/review" element={<Review />} replace />
        <Route path="/signup" element={<Signup />} replace />
        <Route path="/myreviews" element={<MyReviews />} replace />
      </Routes>
    </View>
  );
};

export default Main;
