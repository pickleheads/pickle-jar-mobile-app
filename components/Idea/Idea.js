import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { api } from '../api';

export default class Idea extends Component {
  async archiveIdea() {
    const ideaId = this.props.idea._id;
    await api.archiveIdea({ query: { ideaId } });
    await this.props.onAction();
  }

  async deleteIdea() {
    const ideaId = this.props.idea._id;
    await api.deleteIdea({ query: { ideaId } });
    await this.props.onAction();
  }

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
        <Button title='Archive'
                onPress={this.archiveIdea.bind(this)}/>
        <Button color="red"
                title='Delete'
                onPress={this.deleteIdea.bind(this)}/>
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
    borderColor: 'black',
  },
  text: {
    fontSize: 20,
  },
});