import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import {Context} from '../../context/BookContext';
import BookForm from '../../components/BookForm';

const EditScreen = ({navigation}) => {
  const id = navigation.getParam('id');

  const {getBook, editBook, state} = useContext(Context);

  const book = state.find((book) => book.id === id);

  // const blog = navigation.getParam('id');

  const onSubmit = (bookName, author, bookNumber) => {
    editBook(bookName, author, bookNumber, id, () => {
      console.log(id);
      getBook();
      navigation.pop();
    });
  };

  return (
    <View>
      <BookForm
        initialValues={{
          bookName: book.bookName,
          author: book.author,
          bookNumber: book.bookNumber,
        }}
        onSubmit={onSubmit}
        // onSubmit={() => console.log(id)}
      />
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

export default EditScreen;
