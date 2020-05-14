import React, {useState} from 'react';
import {
  View,
  StyleShet,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

const BlogForm = ({onSubmit, initialValues}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  return (
    <View>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        defaultValue={initialValues.title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Content</Text>
      <TextInput
        defaultValue={initialValues.content}
        style={styles.input}
        onChangeText={(text) => setContent(text)}
      />
      <Button title="console" onPress={() => console.log(title, content, id)} />
      <Button title="Save Blog" onPress={() => onSubmit(title, content)} />
    </View>
  );
};

BlogForm.defaultProps = {
  initialValues: {
    title: '',
    content: '',
  },
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

export default BlogForm;
