import React, {useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import AllAccidentList from '../../components/AllAccidentList';
import {Context} from '../../context/AuthContext';

const AllUser = ({navigation}) => {
    const {state, getUserList} = useContext(Context);

    useEffect(() => {
        const verify = true;
        const bloodType = 'B+';
        const age = 25;
        const verifyUser = false;
        getUserList(age, bloodType, verifyUser);
        console.log('effect');
        // getAllAccident('Pending');
        // const listiner = navigation.addListener('didFocus', () => {
        //   getAllAccident('Pending');
        // });
    }, []);
    console.log(state.userList);

    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignSelf: 'center',
                    marginVertical: 15,
                }}>
                <Text>{JSON.stringify(state.userList)}</Text>
                <Button
                    style={{flex: 1}}
                    contentStyle={{backgroundColor: '#4c4ce3'}}
                    mode="contained"
                    // onPress={() => getAllAccident('Pending')}
                >
                    Pending
                </Button>
                <Button
                    style={{flex: 1}}
                    contentStyle={{backgroundColor: '#008d02'}}
                    mode="contained"
                    // onPress={() => getAllAccident('Success')}
                >
                    Approved
                </Button>
            </View>
            <View>
                <Text>sd</Text>
                {/*<AllAccidentList data={state} navigation={navigation} />*/}
            </View>
        </>
    );
};

export default AllUser;
