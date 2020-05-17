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
import {Spacer, Spacer0, Spacer2, Spacer1} from '../../components/Spacer';
import {Form} from '../../helper/react-native-autofocus';
import {Text, Card} from 'react-native-elements';
import ListItem from '../../components/ListItem';
import {Context} from '../../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import jsonServer from '../../api/jsonServer1';

const AddRequest = ({navigation}) => {
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
          const currentLongitude = await JSON.stringify(
            position.coords.longitude,
          );
          const currentLatitude = await JSON.stringify(
            position.coords.latitude,
          );
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
    try {
      if (description === '') {
        setError('Accident detail required');
        setVisibel(true);
      } else if (description.length < 20) {
        setError('Detail too short');
        setVisibel(true);
      } else {
        await getLocation();
        await getId();
        await jsonServer.post('/api/accident', {
          latitude,
          longitude,
          accidentUser: user,
          description: description,
        });
        await setDescription('');
        await setError('Request Added Succesfully');
        await Alert.alert(
          'Succesfully',
          'Your Request added succesfully. We will contact you shortly',
          [{text: 'OK', onPress: () => navigation.navigate('MyAccident')}],
          {cancelable: false},
        );
        // await navigation.navigate('MyAccident');
      }
    } catch (e) {
      await console.log(e.response.data);
    }
  };

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [user, setUser] = useState('');
  const [description, setDescription] = useState('');

  const [visibel, setVisibel] = useState(false);
  const [error, setError] = useState('');

  return (
    <View style={styles.container}>
      <View>
        <Spacer1 />
        <Title>Add Request</Title>
        <Spacer0 />
      </View>
      <View style={{width: '90%'}}>
        <TextInput
          label="Accident Detail"
          numberOfLines={10}
          multiline={true}
          placeholder="Describe the Accident"
          autoFocus={true}
          onChangeText={(text) => setDescription(text)}
          value={description}
          autoCapitalize="none"
          autoCorrect={false}
          mode="outlined"
        />
        <Spacer0 />
        <Button
          style={{width: '80%', alignSelf: 'center'}}
          onPress={sendRequest}
          mode="contained">
          Submit
        </Button>
      </View>
      <Snackbar
        visible={visibel}
        onDismiss={() => setVisibel(false)}
        action={{
          // label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        {error}
      </Snackbar>
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
