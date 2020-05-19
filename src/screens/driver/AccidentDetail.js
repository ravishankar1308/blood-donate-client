import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Button, Card, Paragraph, Title, Snackbar} from 'react-native-paper';
import moment from 'moment';
import MapView from 'react-native-maps';
import axios from 'axios';
import jsonServer from '../../api/jsonServer1';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Picker} from '@react-native-community/picker';

const AccidentDetail = ({navigation}) => {
    console.log(navigation.getParam('id'));

    useEffect(() => {
        jsonServer
            .get(`api/accident/${navigation.getParam('id')}`)
            .then(async (response) => {
                await setStatus(response.data.status);
                await setUser(response.data.accidentUser);
                await setData(response.data);

            });
        console.log(data);
    }, []);

    const changeStatus = async (data) => {
        await jsonServer
            .put(`api/accident/${navigation.getParam('id')}`, {status: data})
            .then(async (response) => {
                await setVisible(true);
                await setStatus(change);
                await setChange(status);
            });
    };

    const [data, setData] = useState('');
    const [user, setUser] = useState('');
    const [status, setStatus] = useState('');

    const [change, setChange] = useState('');

    const [visible, setVisible] = useState(false);
    return (
        <View style={{marginHorizontal: 15, marginTop: 15}}>
            <Card>
                <Card.Content>
                    <Title>Name : {user.name}</Title>
                    <Text>Email Address: {user.email}</Text>
                    <Text>{moment(data.createdAt).format('Do MMM YYYY')}</Text>
                    <Paragraph>{data.description}</Paragraph>
                </Card.Content>

                <View
                    style={{
                        height: 200,
                        width: '100%',
                        backgroundColor: 'white',
                    }}>
                    {data.location && (
                        <Card.Content>
                            <MapView
                                // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={{height: '100%', width: '100%'}}
                                mapType="standard"
                                pitchEnabled={false}
                                showsUserLocation={false}
                                followsUserLocation={false}
                                zoomControlEnabled={false}
                                showsCompass={false}
                                showsBuildings={false}
                                // showsTraffic={true}
                                initialRegion={{
                                    latitude: parseInt(data.location.latitude),
                                    longitude: parseInt(data.location.longitude),
                                    latitudeDelta: 1,
                                    longitudeDelta: 1,
                                }}>
                                <MapView.Marker
                                    coordinate={{
                                        latitude: parseInt(data.location.latitude),
                                        longitude: parseInt(data.location.longitude),
                                    }}
                                    title="sdsadsa"
                                    description="asdsad"
                                />
                            </MapView>
                        </Card.Content>
                    )}
                </View>

                <Card.Content>
                    <View
                        style={{
                            borderColor: 'grey',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: '#ffffff10',
                            marginVertical: 20,
                        }}>
                        <Picker
                            selectedValue={status}
                            style={{height: 50, width: '100%', margin: 2, color: '#00000090'}}
                            onValueChange={(data) => {
                                changeStatus(data);
                            }}>
                            <Picker.Item label="Pending" value="Pending"/>
                            <Picker.Item label="Success" value="Success"/>
                        </Picker>
                    </View>
                </Card.Content>
                <Card.Content>
                    <View style={{flexDirection: 'row'}}>

                        <View style={{flexDirection: 'row', flex: 5}}>
                            <View style={{marginTop: 5}}>
                                <Entypo name="user" size={20} color="#0a00b6"/>
                            </View>
                            <Title style={{marginLeft: 10}}>Age: {user.age}</Title>
                        </View>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <View style={{marginTop: 5}}>
                                <Fontisto name="blood-drop" size={20} color="#ff1122"/>
                            </View>
                            <Title style={{marginLeft: 10}}>{user.bloodType}</Title>
                        </View>
                    </View>
                </Card.Content>
            </Card>
            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
            >
                Change Status Succesfully
            </Snackbar>
        </View>
    );
};

export default AccidentDetail;
