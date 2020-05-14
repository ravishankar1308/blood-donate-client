import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import {Context} from '../../context/BlogContext';
import BlogForm from '../../components/BlogForm';

const CreateScreen = ({navigation}) => {
  const {addBlogsPost} = useContext(Context);

  const onSubmit = async (title, content) => {
    await addBlogsPost(title, content, () => {
      navigation.navigate('Index');
    });
  };
  return (
    <View>
      <BlogForm onSubmit={onSubmit} />
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
