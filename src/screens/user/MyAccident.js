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
import {Context as AuthContext} from '../../context/AccidentContext';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import jsonServer from '../../api/jsonServer1';
import AccidentListItem from '../../components/AccidentListItem';

const MyAccident = ({navigation}) => {
  const {state, getAccident} = useContext(Context);


  useEffect(() => {
    console.log('rav1');
    const listiner = navigation.addListener('didFocus', async () => {
      await console.log({isaaassds: id});
      await getAccident(status, iddd);
    });
    (async () => {
      const value = await AsyncStorage.getItem('ID');
      setId(value);
      await console.log({getdid: value});
      await getAccident(status, value);


    })();

  }, []);

  const iddd = '5ebeb7517a43ff3dc01c7864';

  // console.log({outid:id});

  const [id, setId] = useState();
  const [status, setStatus] = useState('Pending');

  const getData = () => getAccident(status, id);

  return (
      <>
        <Text>id{id}</Text>
        {/*<Text>state{JSON.stringify(state.accident)}</Text>*/}
        <Headline
            style={{
              alignSelf: 'center',
              marginVertical: 10,
              fontWeight: 'bold',
              color: '#814be3',
            }}>
          Accident List
        </Headline>
        <View
            style={{
              flexDirection: 'row',
              width: '90%',
              alignSelf: 'center',
              marginBottom: 15,
            }}>
          <Button
              style={{flex: 1}}
              contentStyle={{backgroundColor: '#4c4ce3', boarderRadius: 0}}
              mode="contained"
              onPress={() => {
                setStatus('Pending');
                getData();
              }}>
            {' '}
            Pendind
          </Button>
          <Button
              style={{flex: 1}}
              contentStyle={{backgroundColor: '#008d02', boarderRadius: 0}}
              mode="contained"
              onPress={() => {
                setStatus('Success');
                getData();
              }}>
            {' '}
            Success
          </Button>
        </View>
        <ScrollView>
          <AccidentListItem data={state.accident}/>
        </ScrollView>
      </>
  );
};

export default MyAccident;
