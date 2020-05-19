import AsyncStorage from '@react-native-community/async-storage';

import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer1';
// import trackerApi from '../api/tracker';
import {navigate} from '../routes/navigationRef';

const authURL = '/api/auth';

const accidentReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'get_accident':
      return {...state.accident, accident: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {token: null, role: null, errorMessage: ''};
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

const getAccident = (dispatch) => {
    return async (status, ID) => {
        const response = await jsonServer.get(
            `api/accident?status=${status}&accidentUser=${ID}`,
        );
        await dispatch({type: 'get_accident', payload: response.data});
    };
};

const getAllAccident = (dispatch) => {
    return async (status) => {
        const response = await jsonServer.get('api/accidents');
        if (status) {
            const filter = await response.data.filter(
                (data) => data.status == status,
            );
            await dispatch({type: 'get_accident', payload: filter});
        } else {
            await dispatch({type: 'get_accident', payload: response.data});
        }
    };
};

const addAccident = (dispatch) => {
    return async (latitude, longitude, user, description) => {
        const response = await jsonServer.post('/api/accident', {
            user: user,
            latitude: latitude,
            longitude: longitude,
            accidentUser: user,
            description: description,
        });
        await dispatch({type: 'get_accident', payload: response.data});
    };
};

const errorMessage = (dispatch) => ({error}) => {
  dispatch({
    type: 'add_error',
    payload: error,
  });
};

export const {Provider, Context} = createDataContext(
    accidentReducer,
    {
        addAccident,
        getAccident,
        clearErrorMessage,
        errorMessage,
        getAllAccident,
    },
    {},
);
