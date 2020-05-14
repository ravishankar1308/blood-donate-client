import AsyncStorage from '@react-native-community/async-storage';

import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer1';
// import trackerApi from '../api/tracker';
import {navigate} from '../routes/navigationRef';

const authURL = '/api/auth';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signin':
      return {errorMessage: '', token: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {token: null, errorMessage: ''};
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({type: 'signin', payload: token});
    await navigate('mainFlow');
  } else {
    navigate('SignIn');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

const signup = (dispatch) => async (username, email, password, role) => {
  try {
    const response = await jsonServer.post(`${authURL}/signup`, {
      username,
      email,
      password,
      role,
    });
    await AsyncStorage.setItem('token', response.data.token);
    await navigate('mainFlow');
    await dispatch({type: 'signin', payload: response.data.token});
  } catch (err) {
    await console.log(err.response.data);
    await dispatch({
      type: 'add_error',
      payload: err.response.data.message,
    });
  }
};

const signin = (dispatch) => {
  return async ({username, password}) => {
    try {
      const response = await jsonServer.post('/api/auth/signin', {
        username,
        password,
      });
      await AsyncStorage.setItem('token', response.data.token);
      await dispatch({type: 'signin', payload: response.data.token});
      await navigate('mainFlow');
    } catch (err) {
      // console.log({consoleLogErrorMessege: err.response.data.message});
      dispatch({
        type: 'add_error',
        payload: err.response.data.message,
      });
    }
  };
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({type: 'signout'});
  navigate('SignIn');
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup, clearErrorMessage, tryLocalSignin},
  {token: null, errorMessage: ''},
);
