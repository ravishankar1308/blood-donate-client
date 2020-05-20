import React, {useContext, useEffect} from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {Context} from '../../context/BlogContext';

import IndexScreen from './IndexScreen';

const ShowScreen = ({navigation}) => {
  const {getBooks, state} = useContext(Context);

  console.log(navigation.getParam('_id'));

  const blogPost = state.find(
    (state) => state._id === navigation.getParam('_id'),
  );
  console.log(blogPost);
  return (
    <View>
      {/*<Button*/}
      {/*    title='Edit'*/}
      {/*    onPress={() => navigation.navigate('Edit', {_id: navigation.getParam('_id')})}*/}
      {/*/>*/}
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Edit', {_id: navigation.getParam('_id')})
        }>
          <Text>shan</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});

export default ShowScreen;
