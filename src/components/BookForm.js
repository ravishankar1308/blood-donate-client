import React, {useState} from 'react';
import {
  View,
  StyleShet,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

const BookForm = ({onSubmit, initialValues}) => {
  const [bookName, setBookName] = useState(initialValues.bookName);
  const [author, setAuthor] = useState(initialValues.author);
  const [bookNumber, setBootNumber] = useState(initialValues.bookNumber);

  return (
    <View>
      <Text style={styles.label}>bookName</Text>
      <TextInput
        style={styles.input}
        defaultValue={initialValues.bookName}
        onChangeText={(text) => setBookName(text)}
      />
      <Text style={styles.label}>author</Text>
      <TextInput
        defaultValue={initialValues.author}
        style={styles.input}
        onChangeText={(text) => setAuthor(text)}
      />
      <Text style={styles.label}>bookNumber</Text>
      <TextInput
        defaultValue={initialValues.bookNumber}
        style={styles.input}
        onChangeText={(text) => setBootNumber(text)}
      />
      <Button
        title="Save Book"
        onPress={() => onSubmit(bookName, author, bookNumber)}
      />
    </View>
  );
};

BookForm.defaultProps = {
  initialValues: {
    bookName: '',
    author: '',
    bookNumber: '',
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

export default BookForm
