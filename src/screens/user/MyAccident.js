import React from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';



const MyAccident = () => {
  const token = AsyncStorage.getItem('token');

  return (
    <View>
      <Text>MyAccident</Text>
        <Button title='clear'
                onPress={() =>AsyncStorage.clear()}/>
        {
            <Text>{JSON.stringify(token)}</Text>
        }
    </View>
  );
};

export default MyAccident;
