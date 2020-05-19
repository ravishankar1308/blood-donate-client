import React, {useEffect} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {Button, Card, Headline, Paragraph, Title} from 'react-native-paper';
import {Text} from 'react-native-elements';
import jsonServer from '../api/jsonServer1';

// import Moment from 'react-moment';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Spacer} from './Spacer';
import moment from 'moment';

const AccidentListItem = ({data}) => {
    const getAccident = (dispatch) => {
        return async (status, ID) => {
            const response = await jsonServer.get(
                `api/accident?status=${status}&accidentUser=${ID}`,
            );
            await dispatch({type: 'get_accident', payload: response.data});
        };
    };

    // useEffect(() => {
    //   const response = jsonServer.get(`/api/location?id=${item.location}`);
    //   console.log(response);
    // }, []);

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                    return (
                        <View style={{marginBottom: 20, marginHorizontal: '5%'}}>
                            <Card>
                                <Card.Content>
                                    <Title>{moment(item.createdAt).format('MMM Do YY')}</Title>
                                    <Paragraph>{item.description}</Paragraph>
                                </Card.Content>

                                <View
                                    style={{
                                        height: 200,
                                        width: '100%',
                                        backgroundColor: 'white',
                                    }}>
                                    {/*<Text>{JSON.stringify(item.location)}</Text>*/}
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
                                            latitude: parseInt(item.location.latitude),
                                            longitude: parseInt(item.location.longitude),
                                            latitudeDelta: 1,
                                            longitudeDelta: 1,
                                        }}>
                                        <MapView.Marker
                                            coordinate={{
                                                latitude: parseInt(item.location.latitude),
                                                longitude: parseInt(item.location.longitude),
                                            }}
                                            title="sdsadsa"
                                            description="asdsad"
                                        />
                                    </MapView>
                                </View>
                                <Card.Actions>
                                    <Button>{item.status}</Button>
                                </Card.Actions>
                            </Card>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default AccidentListItem;
