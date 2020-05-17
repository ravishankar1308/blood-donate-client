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
  Avatar, Card, Paragraph
} from 'react-native-paper';
import {Spacer, Spacer0, Spacer2, Spacer1} from '../../components/Spacer';
import {Form} from '../../helper/react-native-autofocus';
import {Text} from 'react-native-elements';
import ListItem from '../../components/ListItem';
import {Context} from '../../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import jsonServer from '../../api/jsonServer1';



const MyAccident = () => {
  const token = AsyncStorage.getItem('token');

  return (
      <View>
        <Headline style={{alignSelf:'center',marginVertical:15}}>Accident List</Headline>
    <View style={{marginBottom:10,marginHorizontal:'5%'}}>
      <Card >

        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <View style={{height:200,width:'100%',backgroundColor:'yellow'}}>
          <Text>dfd</Text>
        </View>
        {/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}
        <Card.Actions>
          <Button>Pending</Button>
        </Card.Actions>
      </Card>
    </View>
      </View>
  );
};

export default MyAccident;
