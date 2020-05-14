import React, {useContext, useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Context} from '../../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {Text} from 'react-native-elements';
import {Spacer, Spacer0} from '../../components/Spacer';
import {Button, Title} from 'react-native-paper';
import NavLink from '../../routes/NavLink';
import {Form, TextInput} from '../../../src/helper/react-native-autofocus';
import ModalDropdown from 'react-native-modal-dropdown';

const SignUpScreen = ({navigation}) => {
  const {state, signin, signup, clearErrorMessage} = useContext(Context);

  const token = AsyncStorage.getItem('token');

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState(['user', 'admin']);

  const [data, setData] = useState({
    email: '',
    password: '',
    age: '',
    bloodType: '',
    donate: '',
    verify: false,
    role: 'user',
  });

  return (
    <View style={styles.container}>
      {/*<LoginFrom onSubmit={signin} />*/}
      <Text h3 style={{alignSelf: 'center'}}>
        Blood Donate Title?
      </Text>
      <Title style={{alignSelf: 'center', fontSize: 25}}> Sign Up</Title>
      <Spacer />
      <Form>
        <TextInput
          placeholder="Email"
          // autoFocus={true}
          label="Email"
          onChangeText={(text) => setData({...data, email: text})}
          value={data.email}
          autoCapitalize="none"
          autoCorrect={false}
          mode="outlined"
        />
        <TextInput
          placeholder="Password"
          label="Password"
          onChangeText={(text) => setData({...data, password: text})}
          value={data.password}
          secureTextEntry
          mode="outlined"
        />
        <TextInput
          placeholder="Age"
          label="Age"
          keyboardType="decimal-pad"
          onChangeText={(text) => setData({...data, age: text})}
          value={data.age}
          secureTextEntry
          mode="outlined"
        />
      </Form>
      <Button
        onPress={() => signup(userName, email, password, roles)}
        mode="contained">
        Register
      </Button>
      <Spacer0 />
      <Button onPress={() => navigation.navigate('SignIn')}>
        Already have an account? Sign in instend
      </Button>
      <NavLink text="Already have an account?" routeName="SignIn" />
      <Text>{JSON.stringify(data)}</Text>
      <Spacer />
    </View>
  );
};

SignUpScreen.navigationOptions = ({navigation}) => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
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
});

// SignUpScreen.navigationOptions = ({navigation}) => {
//     return {
//         headerShown: false,
//     };
// };

export default SignUpScreen;
