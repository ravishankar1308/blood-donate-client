import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {
  ActivityIndicator,
  Headline,
  Button,
  Snackbar,
  Title,
  TextInput,
  Avatar,
  Card,
  Paragraph,
} from 'react-native-paper';
import {Spacer, Spacer0, Spacer2, Spacer1} from '../../components/Spacer';
import {Form} from '../../helper/react-native-autofocus';
import {Text} from 'react-native-elements';
import ListItem from '../../components/ListItem';
import {Context} from '../../context/AccidentContext';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import jsonServer from '../../api/jsonServer1';
import AccidentListItem from '../../components/AccidentListItem';

const MyAccident = () => {
  const {state, getAccident} = useContext(Context);

  useEffect(() => {
    console.log('rav1');
    (async () => {
      const value = await AsyncStorage.getItem('ID');
      // await navigation.addListener('willFocus', () => {
      getAccident('Pending', value);
      // });
      await console.log(value);
    })();
    console.log('ravi2');
  }, []);

  return (
      <>
        <Headline style={{alignSelf: 'center', marginVertical: 15}}>
          Accident List
        </Headline>
        <ScrollView>
          <AccidentListItem data={state.accident}/>
        </ScrollView>
      </>
  );
};

export default MyAccident;
