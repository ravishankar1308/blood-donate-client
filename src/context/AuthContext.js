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
      return {token: null, role: null, errorMessage: ''};
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({type: 'signin', payload: token});
    roleScreen(token);
  } else {
    navigate('SignIn');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

const signup = (dispatch) => async (data) => {
  try {
    const response = await jsonServer.post(`${authURL}/signup`, {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      age: data.age,
      bloodType: data.bloodType,
      donate: data.donate,
    });

    await AsyncStorage.setItem('token', response.data.token);
    await roleScreen(response.data.token);
    await dispatch({type: 'signin', payload: response.data.token});
  } catch (err) {
    await console.log(err.data.message);
    await dispatch({
      type: 'add_error',
      payload: err.response.data.message,
    });
  }
};

const roleScreen = async (token) => {
  const response = await jsonServer.post(
    `${authURL}/resolve`,
    {
      token: token,
    },
    {headers: {Authorization: `Bearer ${token}`}},
  );
  await console.log({comming: response.data});
  if (response.data === 'user') {
    navigate('userFlow');
  } else if (response.data === 'driver') {
    navigate('driverFlow');
  }
};

const signin = (dispatch) => {
  return async (data) => {
    try {
      const response = await jsonServer.post('/api/auth/signin', {
        email: data.email,
        password: data.password,
      });
      await dispatch({type: 'signin', payload: response.data.token});
      await roleScreen(response.data.token);
      await AsyncStorage.setItem('token', response.data.token);
    } catch ({err, response}) {
      dispatch({
        type: 'add_error',
        // payload: err.response.data.message,
        payload: response.data,
      });
    }
  };
};

// const signin = (dispatch) => {
//   return async ({username, password}) => {
//     try {
//       const response = await jsonServer.post('/api/auth/signin', {
//         username,
//         password,
//       });
//       await AsyncStorage.setItem('token', response.data.token);
//       await dispatch({type: 'signin', payload: response.data.token});
//       await navigate('mainFlow');
//     } catch (err) {
//       dispatch({
//         type: 'add_error',
//         payload: err.response.data.message,
//       });
//     }
//   };
// };

const errorMessage = (dispatch) => ({error}) => {
  dispatch({
    type: 'add_error',
    payload: error,
  });
};
const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('role');
  dispatch({type: 'signout'});
  navigate('SignIn');
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup, clearErrorMessage, tryLocalSignin, errorMessage},
  {token: null, errorMessage: ''},
);
