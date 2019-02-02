import React, { Component } from 'react';
import { StyleSheet, ScrollView, Button, View } from 'react-native';
import AddIdea from './components/AddIdea';
import ListIdeas from './components/ListIdeas';
import { api } from './components/api';

const ADD_IDEAS = 'add-ideas';
const LIST_IDEAS = 'list-ideas';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: LIST_IDEAS,
      ideas: []
    }
  }

  changePage(page) {
    this.setState({ currentPage: page });
  }

  async fetchIdeas() {
    try {
      const { ideas } = await api.listIdeas();
      this.setState({ ideas });
    } catch (e) {
      alert(e)
    }
  }

  render() {
    let Page;
    switch (this.state.currentPage) {
      case ADD_IDEAS:
        Page = AddIdea;
        break;
      case LIST_IDEAS:
      default:
        Page = ListIdeas;
        break;
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.nav}>
          <Button color="#0092fe"
                  title="Add Idea"
                  onPress={() => this.changePage(ADD_IDEAS)}/>
          <Button color="#920089"
                  title="List Ideas"
                  onPress={() => this.changePage(LIST_IDEAS)}/>
        </View>
        <Page fetchIdeas={this.fetchIdeas.bind(this)}
              ideas={this.state.ideas}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    display: 'flex',
    flexDirection: 'column'
  },
  nav: {
    display: 'flex',
    flexDirection: 'row'
  }
});
