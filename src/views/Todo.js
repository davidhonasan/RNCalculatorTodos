import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Button, Modal} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import {API, graphqlOperation} from 'aws-amplify';
import {createTodo, updateTodo} from '../graphql/mutations';
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

  async function addTodoItem() {
    try {
      const todo = {text: 'new ' + Math.random().toString(), done: false};
      setTodos([...todos, todo]);
      await API.graphql(graphqlOperation(createTodo, {input: todo}));
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }

  async function toggleTodoDone(item) {
    try {
      console.log('yes');
      const todoDetails = {id: item.id, text: item.text, done: item.done};
      // setTodos([...todos, todoDetails]);

      console.log(todoDetails);
      await API.graphql({query: updateTodo, variables: {input: todoDetails}});
    } catch (err) {
      console.log('error updating todo:', err);
    }
  }

  return (
    <View>
      <Button title="Add something" onPress={() => addTodoItem()} />
      {/* <Modal transparent={true}></Modal> */}
      <FlatList
        data={todos}
        renderItem={({item}) => {
          return (
            <View style={todoStyle.li}>
              <Text style={todoStyle.liText}>{item.text}</Text>
              {/* <CheckBox
                disabled={false}
                value={item.done}
                onValueChange={() => toggleTodoDone(item)}
                tintColors={{true: 'green', false: 'black'}}
              /> */}
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
