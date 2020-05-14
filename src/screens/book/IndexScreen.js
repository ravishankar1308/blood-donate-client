import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Context as BookContext} from '../../context/BookContext';
import {Context as AuthContext} from '../../context/AuthContext';

import AsyncStorage from '@react-native-community/async-storage';

const IndexScreen = ({navigation}) => {
  //console.log(props);
  const {state, getBook, deleteBook} = useContext(BookContext);
  const {signout} = useContext(AuthContext);

  useEffect(() => {
    console.log(getBook());
    getBook();
    const listiner = navigation.addListener('didFocus', () => {
      getBook();
    });
  }, []);
  // console.log({'blogData' :state});

  const deleteAlert = (item) =>
    Alert.alert(
      'Do you want delete',
      'My Alert Msg',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Casncel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteBook(item.id)},
      ],
      {cancelable: false},
    );

  const logout = () => {
    return signout;
  };

  const token = AsyncStorage.getItem('token');

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BookShow', {
                  id: item.id,
                  name: item.bookName,
                });
              }}>
              <View style={styles.row}>
                <Text style={styles.title}>
                  {' '}
                  {item.bookName} {item.author} {item.bookNumber}{' '}
                </Text>
                <TouchableOpacity
                  // onPress={() => deleteBlogPost(item._id)}
                  onPress={() => deleteAlert(item)}>
                  <Text>ravi</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <Button title="signout" onPress={logout()} />
      <Button title="tok" onPress={() => console.log(token)} />
    </View>
  );
};

IndexScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'All Books',
    headerRight: () => (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('BookCreate')}>
          <Text>rasii</Text>
        </TouchableOpacity>
      </View>
    ),
  };
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopWidth: 1,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
