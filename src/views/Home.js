import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import styles from '../Stylesheet';

const Home = ({navigation}) => {
  return (
    <View style={[styles.container, homeStyles.container]}>
      <Text style={styles.title}>React Native</Text>
      <Text style={styles.title}>Test App</Text>
      <View style={homeStyles.buttonContainer}>
        <LinkButton
          title="Calculator"
          onPress={() => navigation.navigate('Calculator')}
        />
        <LinkButton title="Todo" onPress={() => navigation.navigate('Todo')} />
      </View>
    </View>
  );
};

const LinkButton = props => {
  return (
    <View style={homeStyles.button}>
      <Button title={props.title} onPress={props.onPress} color="black" />
    </View>
  );
};

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Home;
