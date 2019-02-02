import React, { Component } from 'react'
import { ScrollView } from 'react-native';
import Idea from '../Idea';

export default class Ideas extends Component {
  async componentDidMount() {
    await this.props.fetchIdeas();
  }

  render() {
    const ideas = this.props.ideas || [];
    return (
      <ScrollView>
        {ideas.map((idea, index) => <Idea key={index} idea={idea}/>)}
      </ScrollView>
    );
  }
}