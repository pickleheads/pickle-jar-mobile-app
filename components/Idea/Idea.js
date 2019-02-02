import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Idea extends Component {
  render() {
    const idea = this.props.idea;
    if (!idea) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {idea.idea}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'yellow',
    borderWidth: 1,
    borderColor: 'black'
  },
  text: {
    fontSize: 20
  }
});