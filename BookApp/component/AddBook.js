import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Form,
  TouchableOpacity,
} from 'react-native';
import axios from 'react-native-axios';

class AddBook extends Component {
  state = {
    bookId: '',
    bookName: '',
    bookISBN: '',
  };
  componentDidMount() {
    axios.get('http://localhost:8080/library/findAll').then(response => {
      console.warn(response.data);
      // TableBook(response.data);
      this.setState({tableDetail: response.data});
    });
  }
  updateState(text, field) {
    if (field == 'bookName') {
      this.setState({
        bookName: text,
      });
    } else if (field == 'bookISBN') {
      this.setState({
        bookISBN: text,
      });
    }
  }
  onSubmit = () => {
    const collection = {
      // bookId: '1',
      bookName: this.state.bookName,
      bookISBN: this.state.bookISBN,
    };
    // (collection.bookName = this.state.bookName),
    //   (collection.bookISBN = this.state.bookISBN),
    console.warn(collection);
    console.log(collection);
    // var url = 'http://localhost:8080/library/saveBook';

    // fetch(url, {
    //   method: 'POST',
    //   body: collection,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(res => res.json())
    //   .then(response => console.log('Success:', JSON.stringify(response)))
    //   .catch(error => console.error('Error:', error));

    axios
      .post('http://localhost:8080/library/saveBook', {
        // bookId: '1',
        bookName: this.state.bookName,
        bookISBN: this.state.bookISBN,
      })
      .then(response => {
        console.warn(response);
      });
  };
  render() {
    return (
      <View>
        <TextInput
          placeholder="Book Name"
          name="bookName"
          style={styles.input}
          onChangeText={text => this.updateState(text, 'bookName')}
        />
        <TextInput
          placeholder="Book ISBN"
          name="bookISBN"
          style={styles.input}
          onChangeText={text => this.updateState(text, 'bookISBN')}
        />

        <TouchableOpacity onPress={() => this.onSubmit()} style={styles.btn}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  input: {
    color: 'black',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'gray',
    alignItems: 'center',
  },
});

export default AddBook;
