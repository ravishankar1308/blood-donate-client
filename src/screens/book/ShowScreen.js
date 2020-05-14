import React, {useContext, useEffect} from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {Context} from '../../context/BookContext';
import IndexScreen from './IndexScreen';

const ShowScreen = ({navigation}) => {
  const {getBook, state} = useContext(Context);

  console.log(navigation.getParam('id'));
  const book = state.find((state) => state.id === navigation.getParam('id'));
  console.log(book);
  return (
    <View>
      <Text>{book.bookName}</Text>
      <Text>{book.author}</Text>
      <Text>{book.bookNumber}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({navigation}) => {
  const name = navigation.getParam('name');
  return {
    title: name,
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('BookEdit', {id: navigation.getParam('id')})
        }>
        <Text>sjbs</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});

export default ShowScreen;
