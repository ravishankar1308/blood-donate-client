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
import {Context as BlogContext} from '../../context/BlogContext';

const IndexScreen = ({navigation}) => {
  //console.log(props);
  const {state, getBlogPost, deleteBlogPost} = useContext(BlogContext);

  useEffect(() => {
    console.log(getBlogPost());
    getBlogPost();
    const listiner = navigation.addListener('didFocus', () => {
      getBlogPost();
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
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteBlogPost(item._id)},
      ],
      {cancelable: false},
    );

  return (
    <View>
      {/*<Text>ravis</Text>*/}
      {/*<Button*/}
      {/*    title="Add "*/}
      {/*    onPress={() => navigation.navigate('Create')}*/}
      {/*/>*/}
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Show', {_id: item._id});
              }}>
              <View style={styles.row}>
                <Text style={styles.title}>
                  {' '}
                  {item.title} {item.content}{' '}
                </Text>
                <TouchableOpacity
                  // onPress={() => deleteBlogPost(item._id)}
                  onPress={() => deleteAlert(item)}>
                    <Text>inde</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
          <Text>raM</Text>
      </TouchableOpacity>
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
