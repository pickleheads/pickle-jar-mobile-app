import React, { Component } from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import { api } from '../api';

export default class AddIdea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idea: ''
    };
  }

  async submit() {
    const idea = this.state.idea;
    this.setState({ idea: '' });
    const body = { idea };
    const options = { body };
    await api.addIdea(options);
    await this.props.fetchIdeas();
  }

  render() {
    return (
      <View>
        <Text>Form</Text>
        <TextInput onChangeText={(idea) => this.setState({ idea })}
                   value={this.state.idea}
        />
        <Button title="Submit" onPress={this.submit.bind(this)}/>
      </View>
    );
  }
}