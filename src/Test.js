/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, Fragment } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import Picker from "react-native-picker-select";
import {
  sequentialFinding,
  findingStatiNumber,
  attachString
} from "./utilities/Utilities";

/* Static Initialization */
const instructions = [
  "3, 5, 9, 15, X. Please create new function for finding X value.",
  "(Y + 24) + (10 × 2) = 99. Please create new function for finding Y value.",
  "If 1 = 5 , 2 = 25 , 3 = 325 , 4 = 4325 Then 5 = X. Please create new function for finding X value."
];
const explanations = [
  "Answer is 23. \n3 is an initial number. The follow in sequence are initial \nplus 2 multiple by position minus one.",
  "Answer 55. You can solve by rearrange the question to\nY = (99 - 24) - (10 x 2).",
  "Answer 54325. This is a trick question, it simply put position of number in front of initial number."
];
const applicationWidth = Dimensions.get("window").width;

/* Component */
export default class App extends Component<Props> {
  state = {
    question: null,
    value: "",
    answer: null
  };
  solveEquation = (question, value) => {
    switch (Number(question)) {
      case 1:
        return sequentialFinding(value);
      case 2:
        return findingStatiNumber();
      case 3:
        return attachString(value);
      default:
        return 0;
    }
  };
  onSolveEquation = () => {
    const { question, value } = this.state;
    if (isNaN(value)) {
      alert("Your input is not a number!");
      this.setState({ value: 0 });
      return;
    }
    const result = this.solveEquation(question, value);
    this.setState({ answer: result });
  };

  onChangeValue = value => {
    this.setState({ value, answer: null });
  };
  onChangeQuestion = question => {
    this.setState({ question, value: "", answer: null });
  };
  render() {
    const { question, value, answer } = this.state;
    const instruction = instructions[question - 1];
    const explanation = explanations[question - 1];
    const questions = [
      { label: "Finding the next sequence", value: 1 },
      { label: "Finding Y value", value: 2 },
      { label: "Finding next value after 5", value: 3 }
    ];
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to the Demo!</Text>
        <View style={styles.pickerContainer}>
          <Picker
            placeholder={{
              label: "Select a question",
              value: null
            }}
            style={{ ...pickerSelectStyles }}
            value={question}
            items={questions}
            onValueChange={this.onChangeQuestion}
          />
        </View>

        <View style={styles.divider} />
        {question ? (
          <Fragment>
            <Text style={styles.questions}>{instruction}</Text>
            <View style={styles.divider} />
            <Text style={styles.instructions}>{explanation}</Text>
            {question === 2 ? null : (
              <View>
                <Text style={styles.instructions}>
                  Want to find other position ?
                </Text>
                <TextInput
                  placeholder={"Please input your position to find the number."}
                  style={styles.input}
                  onChangeText={this.onChangeValue}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.onSolveEquation}
                >
                  <Text style={styles.buttonText}>Solve</Text>
                </TouchableOpacity>
              </View>
            )}
          </Fragment>
        ) : (
          <Text style={styles.instructions}>
            Please select one of our question!
          </Text>
        )}
        <View style={styles.divider} />
        {answer ? (
          <Text style={styles.questions}>
            Answer for position {value} is {answer}
          </Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  questions: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  input: {
    width: applicationWidth - 30,
    alignSelf: "stretch",
    textAlign: "right",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 15,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "white",
    color: "black"
  },
  picker: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "white",
    color: "black"
  },
  pickerContainer: {
    marginLeft: 20,
    marginRight: 20
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    borderStyle: "solid",
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 5,
    paddingBottom: 5
  },
  button: {
    alignSelf: "stretch",
    width: applicationWidth - 30,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 4,
    marginHorizontal: 15,
    justifyContent: "center"
  },
  buttonText: {
    color: "green",
    textAlign: "center"
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...styles.picker
  },
  inputAndroid: {
    ...styles.picker
  }
});
