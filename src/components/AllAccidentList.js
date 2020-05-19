import React from 'react';
import {Button, Card, Paragraph, Text, Title} from 'react-native-paper';
import {View} from 'react-native';

const AllAccidentList = ({data}) => {
    return (
        <>
            {data.accident.map()}
            <Card style={{width: '90%', alignSelf: 'center', marginVertical: 5}}>
                <Card title="Card Title" subtitle="Card Subtitle"/>
                <Card.Content>
                    <Title>{JSON.stringify(data.accident)}</Title>
                    <Paragraph></Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button>Status</Button>
                </Card.Actions>
            </Card>
        </>
    );
};

export default AllAccidentList;
