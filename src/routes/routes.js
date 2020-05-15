import {createStackNavigator} from 'react-navigation-stack';
// import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
// import {createAppContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import AccountScreen from '../screens/profile/AccountScreen';

import IndexScreen from '../screens/blogspot/IndexScreen';
import CreateScreen from '../screens/blogspot/CreateScreen';
import ShowScreen from '../screens/blogspot/ShowScreen';
import EditScreen from '../screens/blogspot/EditScreen';

import BookIndexScreen from '../screens/book/IndexScreen';
import BookCreateScreen from '../screens/book/CreateScreen';
import BookShowScreen from '../screens/book/ShowScreen';
import BookEditScreen from '../screens/book/EditScreen';

import AccountInfo from '../screens/user/AccountInfo';
import AddRequest from '../screens/user/AddRequest';
import MyAccident from '../screens/user/MyAccident';

import AccidentDetail from '../screens/driver/AccidentDetail';
import AllAccident from '../screens/driver/AllAccident';
import Donar from '../screens/driver/Donar';
import DonarDetail from '../screens/driver/DonarDetail';

import AuthLoading from '../screens/auth/AuthLoading';

import ResolveAuthScreen from './ResolveAuthScreen';

const appNavigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen,
    BookIndex: BookIndexScreen,
    BookShow: BookShowScreen,
    BookCreate: BookCreateScreen,
    BookEdit: BookEditScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    Loading: AuthLoading,
    Resolve: ResolveAuthScreen,
  },
  // {
  //   initialRouteName: 'Resolve',
  //   defaultNavigationOptions: {
  //     title: 'Business Search',
  //   },
  // },
);

const switchNavigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
      SignIn: SignInScreen,
      SignUp: SignUpScreen,
    }),
    userFlow: createMaterialBottomTabNavigator({
      MyAccident: MyAccident,
      AccountInfo: AccountInfo,
      AddRequest: AddRequest,
    }),
    driverFlow: createMaterialBottomTabNavigator({
      AllAccident: AllAccident,
      Donar: Donar,
    }),
    mainFlow: createMaterialBottomTabNavigator(
      {
        MyAccident: MyAccident,
        bookFlow: createStackNavigator({
          BookIndex: BookIndexScreen,
          BookShow: BookShowScreen,
        }),
        BookCreate: BookCreateScreen,
        Account: AccountScreen,
      },
      {
        initialRouteName: 'bookFlow',
        activeColor: '#f0edf6',
        inactiveColor: '#3e2465',
        barStyle: {backgroundColor: '#694fad'},
      },
    ),
  },
  {
    // initialRouteName: 'loginFlow',
    defaultNavigationOptions: {
      title: 'Login',
    },
  },
);

const RouteNavigator = createAppContainer(switchNavigator);

export default RouteNavigator;
