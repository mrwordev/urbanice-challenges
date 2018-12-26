import React, { Component } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

import { storageRemoveHistory } from "../utilities/Utilities";

const applicationWidth = Dimensions.get("window").width;
/* Component */
export default class HistoryModal extends Component<Props> {
  onClearHistory = async () => {
    const { onCloseModal } = this.props;
    const result = await storageRemoveHistory();
    if (result) {
      onCloseModal();
    }
  };
  renderChild = (message, index) => {
    return (
      <View key={index} style={styles.record}>
        <Text>{message}</Text>
      </View>
    );
  };
  render() {
    const { histories, onCloseModal } = this.props;
    return (
      <TouchableOpacity onPress={onCloseModal} style={styles.container}>
        <View style={styles.content}>
          <ScrollView>
            {histories ? histories.map(this.renderChild) : null}
          </ScrollView>
          <View style={styles.clearContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onClearHistory}
            >
              <Text style={styles.buttonText}>Clear History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center"
  },
  clearContainer: {
    height: 50
  },
  content: {
    marginVertical: 200,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: "white"
  },
  record: {
    marginVertical: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "lightgrey"
  },
  button: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 4,
    justifyContent: "center"
  },
  buttonText: {
    color: "red",
    textAlign: "center"
  }
});
