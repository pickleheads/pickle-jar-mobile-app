import React, { Component } from 'react';
import { StyleSheet, ScrollView, Button, View } from 'react-native';
import AddIdea from './components/AddIdea';
import ListIdeas from './components/ListIdeas';
import { api } from './components/api';

const ADD_IDEAS = 'add-ideas';
const LIST_ACTIVE_IDEAS = 'list-active-ideas';
const LIST_ARCHIVED_IDEAS = 'list-archived-ideas';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: LIST_ACTIVE_IDEAS,
      ideas: [],
    };
  }

  changePage(page) {
    this.setState({ currentPage: page });
  }

  async fetchIdeas(status = 'active') {
    const query = { status };
    const options = { query };
    try {
      const { ideas } = await api.listIdeas(options);
      this.setState({ ideas });
    } catch (e) {
      alert(e);
    }
  }

  render() {
    let Page;
    switch (this.state.currentPage) {
      case ADD_IDEAS:
        Page = AddIdea;
        break;
      case LIST_ACTIVE_IDEAS:
      default:
        Page = ListIdeas;
        break;
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.nav}>
          <Button color="#920089"
                  title="List Active Ideas"
                  onPress={async () => {
                    await this.fetchIdeas('active');
                    this.changePage(LIST_ACTIVE_IDEAS)
                  }}/>
          <Button color="teal"
                  title="List Archived Ideas"
                  onPress={async () => {
                    await this.fetchIdeas('archived');
                    this.changePage(LIST_ARCHIVED_IDEAS);
                  }}/>
          <Button color="#0092fe"
                  title="Add Idea"
                  onPress={() => this.changePage(ADD_IDEAS)}/>
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
    flexDirection: 'column',
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
  },
});
