import React from 'react';
import {View, Text,Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const AllAccident = () => {
    return (
        <View>
            <Button title='clear'
                    onPress={() =>AsyncStorage.clear()}/>
            <Text>AllAccident</Text>
        </View>
    );
};

export default AllAccident;
