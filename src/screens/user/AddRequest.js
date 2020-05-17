import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {
  ActivityIndicator,
  Headline,
  Button,
  Snackbar,
  Title,
  TextInput,
} from 'react-native-paper';
import {Spacer, Spacer0, Spacer2} from '../../components/Spacer';
import {Form} from '../../helper/react-native-autofocus';
import {Text, Card} from 'react-native-elements';
import ListItem from '../../components/ListItem';
import {Context} from '../../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';

const AddRequest = () => {

  const getLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        },
      );
      Geolocation.getCurrentPosition(
        async (position) => {
          const currentLongitude = await JSON.stringify(position.coords.longitude);
          const currentLatitude = await JSON.stringify(position.coords.latitude);
          await setLatitude(currentLatitude);
          await setLongitude(currentLongitude);
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('raviset');
      } else {
        alert('Permission Denied');
      }
    } catch (err) {
      alert('err', err);
      console.warn(err);
    }
  };

  const getId = async () => {
    try {
      const value = await AsyncStorage.getItem('ID');
      setUser(value);
      console.log(value);
    } catch (error) {
      console.log(error);
    }
  };

  const sendRequest = async () => {
      await getLocation();
      await getId();

  }

const [latitude,setLatitude] =useState('');
const [longitude,setLongitude] = useState('');
const [user,setUser] = useState('');
const [description,setDescription] = useState('');


  return (
    <View style={styles.container}>
        <Text>
            {longitude}
        </Text><Text>
            {latitude}
        </Text><Text>
            {user}
        </Text>
      <View>
        <Spacer0 />
        <Title>Add Request</Title>
        <Spacer0 />
      </View>
      <View style={{width: '90%'}}>
        <TextInput label="Detail" numberOfLines={6} multiline={true} />
        <Spacer0 />
        <Button
          style={{width: '80%', alignSelf: 'center'}}
          onPress={AddRequest}
          mode="contained">
          Submit
        </Button>
        <Button
          style={{width: '80%', alignSelf: 'center'}}
          onPress={sendRequest}
          mode="contained">
          Submit
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent:'flex-start',
    alignItems: 'center',
  },
});
export default AddRequest;
