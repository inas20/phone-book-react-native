import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  Navigator,
  TouchableOpacity
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import { SET_ACTIVE_CONTACT, UPDATE_SEARCH } from './../../actionTypes';

class Main extends Component {

  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      enableEmptySections: false
    });
  }

  componentDidMount() {
  }

  renderContactRow(contact, _, index) {
    const handlePress = () => {

      this.props.setActiveContact(contact, parseInt(index, 10));

      this.props.navigator.push({ id: 'contact' });
    };

    return (
      <TouchableOpacity onPress={ handlePress }>
        <View style={ styles.contactRow }>
    
          <View style={ styles.contactInfo }>
            <Text>{ contact.name }</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  addNewHandler() {
    this.props.navigator.push({ id: 'new' });
  }

  handleUpdateSearch(value) {
    this.props.updateSearch(value);
  }

  renderScene() {
    let listViewStyles = styles.listView;
    let noContacts = <View></View>;
    let listView = <View></View>;
    this.dataSource = this.dataSource.cloneWithRows(this.props.contacts);

    if (!this.props.contacts.length) {
      noContacts = <View style={ styles.noContacts }><Text>No contacts</Text></View>;
    } else {
      listView = <ListView
        dataSource={ this.dataSource }
        renderRow={ this.renderContactRow.bind(this) }
        style={ styles.listView }
      />;
    }

    return (
      <View style={ styles.view }>
        <NavigationBar
          style={ styles.navBar }
          title={{ title: 'Contacts' }}
          rightButton={{ tintColor: '#000', title: '+', handler: this.addNewHandler.bind(this) }}
        />
        <View style={ styles.searchContainer }>
          <TextInput
            style={ styles.searchField }
            placeholder={ 'Search' }
            value={ this.props.search }
            onChangeText={ this.handleUpdateSearch.bind(this) }
          />
        </View>
        { listView }
        { noContacts }
      </View>
    )
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  navBar: {
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1
  },
  searchContainer: {
    padding: 5,
    backgroundColor: '#eeeeee'
  },
  searchField: {
    height: 20,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    padding: 5,
    fontSize: 13,
    backgroundColor: '#ffffff'
  },
  listView: {
  },
  contactRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  
  contactInfo: {
    margin: 5
  },
  noContacts: {
    paddingTop: 20,
    flex: 1,
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    contacts: state.main.contacts.filter(contact => {
      if (!state.main.search || !state.main.search.length) {
        return true;
      }

      return contact.name.toLowerCase().indexOf(state.main.search.toLowerCase()) >= 0;
    }),
    search: state.main.search
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveContact: (contact, index) => {
      dispatch({
        type: SET_ACTIVE_CONTACT,
        contact,
        index
      })
    },
    updateSearch: value => {
      dispatch({
        type: UPDATE_SEARCH,
        value
      })
    }
  };
};

const MainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default MainConnected