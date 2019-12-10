import React from 'react';
import firebase from 'react-native-firebase';
//import { ScrollView, View, Text, TextInput, Button } from 'react-native';
import { FlatList, Button, View, Text, TextInput } from 'react-native';

//https://invertase.io/blog/getting-started-with-cloud-firestore-on-react-native

class Todos extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('todos');
    this.unsubscribe = null;

    this.state = {
        textInput: '',
        loading: true,
        todos: [],
    };
  }
  componentDidMount() {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
  }

  componentWillUnmount() {
      this.unsubscribe();
  }
  onCollectionUpdate = (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      const { title, complete } = doc.data();
      
      todos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        complete,
      });
    });
  
    this.setState({ 
      todos,
      loading: false,
   });
  }
  render() {
    
    return (
      <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.todos}
            renderItem={({ item }) => <Text>{item.title}</Text>}
          />
      </View>
    );
  }
}

export default Todos;