import React, {useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import AllAccidentList from '../../components/AllAccidentList';
import {Context} from '../../context/AccidentContext';

const AllAccident = ({navigation}) => {

    const {state, getAllAccident} = useContext(Context);

    useEffect(() => {
        console.log('rav1');
        getAllAccident();

        // (async (id) => {
        //   const value = await AsyncStorage.getItem('ID');
        //   await setId(value);
        //   await console.log({getdid: value});
        //   await getAccident(status, value);
        // })();

        // const listiner = navigation.addListener('didFocus', async () => {
        //   await console.log({isaaassds: id});
        //   await getAccident(status, id);
        // });
    }, []);
    console.log(state);
    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignSelf: 'center',
                    marginVertical: 15,
                }}>
                <Button
                    style={{flex: 1}}
                    contentStyle={{backgroundColor: '#4c4ce3'}}
                    mode="contained"
                    // onPress={() => getAccident('Pending', id)}
                >
                    Pendingss
                </Button>
                <Button
                    style={{flex: 1}}
                    contentStyle={{backgroundColor: '#008d02'}}
                    mode="contained"
                    // onPress={() => getAccident('Success', id)}
                >
                    Success
                </Button>
            </View>
            <View>
                <AllAccidentList data={state}/>
                <Card style={{width: '90%', alignSelf: 'center', marginVertical: 5}}>
                    <Card title="Card Title" subtitle="Card Subtitle"/>
                    <Card.Content>
                        <Title>Name</Title>
                        <Paragraph>Email Address</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Button>Status</Button>
                    </Card.Actions>
                </Card>
            </View>
        </>
    );
};

export default AllAccident;
