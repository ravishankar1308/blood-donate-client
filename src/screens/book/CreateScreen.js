import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import {Context} from '../../context/BookContext';
import BookForm from '../../components/BookForm';

const CreateScreen = ({navigation}) => {
  const {state, addBook} = useContext(Context);

  const onSubmit = async (bookName, author, bookNumber) => {
    await addBook(bookName, author, bookNumber, () => {
      navigation.navigate('BookIndex');
    });
  };
  // const {data} = state;
  return (
    <View>
      <BookForm onSubmit={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
});

export default CreateScreen;
