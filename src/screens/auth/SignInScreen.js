import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import LoginFrom from '../../components/SignInForm';
import {Context} from '../../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';

const SignInScreen = ({navigation}) => {
  const {state, signin, clearErrorMessage} = useContext(Context);
  // const {  login} = useContext(Context);

  // const onSubmit= async (username,password) => {
  //     await login(username,password, () => {
  //         navigation.navigate('App');
  //     });
  // };

  const token = AsyncStorage.getItem('token');
  console.log(state);
  return (
    <View style={styles.login}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <LoginFrom onSubmit={signin} state={state} />
      <Button title="token" onPress={() => console.log({token, state})} />
      <Button title="Register" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
  login: {
    height: '100%',
    justifyContent: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginLeft: 15,
    marginTop: 10,
  },
});

SignInScreen.navigationOptions = ({navigation}) => {
  return {
    headerShown: false,
  };
};

export default SignInScreen;
