import React, {useState} from 'react';
import {View, Alert, StyleSheet, TextInput, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {API} from 'aws-amplify';

const Calculator = () => {
  const [selectedOperator, setSelectedOperator] = useState('add');
  const [leftNumInput, setLeftNumInput] = useState();
  const [rightNumInput, setRightNumInput] = useState();

  async function calculate(numA, numB, op) {
    if (isNaN(numA) || isNaN(numB)) {
      return 'One or both of the operands is empty.';
    }
    let answer = '';
    // numA = parseInt(numA, 10);
    // numB = parseInt(numB, 10);
    // switch (op) {
    //   case '+':
    //     answer = numA + numB;
    //     break;
    //   case '-':
    //     answer = numA - numB;
    //     break;
    //   case '*':
    //     answer = numA * numB;
    //     break;
    //   case '/':
    //     answer = numA / numB;
    //     break;
    //   default:
    //     return 'No valid operator is selected';
    // }
    // return answer.toString();

    const apiName = 'calculator';
    const path = '/calculate';
    const myInit = {
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        leftOperand: numA,
        rightOperand: numB,
        operator: op,
      },
    };

    await API.get(apiName, path, myInit)
      .then(response => {
        answer = response.toString();
      })
      .catch(error => {
        console.log(error.response);
      });
    return answer;
  }

  return (
    <View style={calculatorStyles.container}>
      <View style={calculatorStyles.calculator}>
        <TextInput
          style={calculatorStyles.input}
          onChangeText={setLeftNumInput}
          value={leftNumInput}
          placeholder="Left Operand"
          placeholderTextColor="grey"
          keyboardType="numeric"
        />
        <Picker
          style={calculatorStyles.operator}
          dropdownIconColor="black"
          selectedValue={selectedOperator}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedOperator(itemValue)
          }>
          <Picker.Item label="+" value="add" />
          <Picker.Item label="-" value="subtract" />
          <Picker.Item label="X" value="multiply" />
          <Picker.Item label="/" value="divide" />
        </Picker>
        <TextInput
          style={calculatorStyles.input}
          onChangeText={setRightNumInput}
          value={rightNumInput}
          placeholder="Right Operand"
          placeholderTextColor="grey"
          keyboardType="numeric"
        />
      </View>
      <Button
        title="Calculate"
        color="black"
        onPress={async () => {
          Alert.alert(
            'Calculator',
            await calculate(leftNumInput, rightNumInput, selectedOperator),
          );
        }}
      />
    </View>
  );
};

const calculatorStyles = StyleSheet.create({
  container: {
    padding: 25,
  },
  calculator: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  operator: {
    flex: 1,
    color: 'black',
  },
  input: {
    color: 'black',
    flex: 1,
    padding: 15,
    borderColor: 'lightgray',
    borderBottomWidth: 1,
  },
});

export default Calculator;
