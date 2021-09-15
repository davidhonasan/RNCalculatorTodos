import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Button, Modal} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import {API, graphqlOperation} from 'aws-amplify';
import {createTodo} from '../graphql/mutations';
import {listTodos} from '../graphql/queries';

const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log('error fetching todos');
    }
  }

  async function addTodo() {
    try {
      const todo = {text: 'new note', done: false};
      setTodos([...todos, todo]);
      await API.graphql(graphqlOperation(createTodo, {input: todo}));
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }

  async function updateTodo() {
    try {
      const todo = {text: 'new note', done: false};
      setTodos([...todos, todo]);
      await API.graphql(graphqlOperation(createTodo, {input: todo}));
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }

  return (
    <View>
      <Button title="Add something" onPress={() => addTodo()} />
      {/* <Modal transparent={true}></Modal> */}
      <FlatList
        data={todos}
        renderItem={({item}) => {
          return (
            <View style={todoStyle.li}>
              <Text style={todoStyle.liText}>{item.text}</Text>
              <CheckBox
                disabled={false}
                value={item.done}
                tintColors={{true: 'green', false: 'black'}}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const todoStyle = StyleSheet.create({
  li: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
  },
  liText: {
    fontSize: 20,
    flex: 1,
  },
});

export default Todo;
