/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStore } from 'redux';
import {
  ActivityIndicator,
  FlatList,
  TextInput,
  Dimensions,
  Button,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableOpacity
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import { SET_ACTIVE_CONTACT, UPDATE_SEARCH } from './../../actionTypes';
import firebase from 'react-native-firebase';

const { width, height } = Dimensions.get('window');

export default class main extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    
    this.state = {
      users: [],
      loading: true,
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      enableEmptySections: false
    });
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
        rightButton={{ tintColor: '#000', title: '+', handler: this.AddNewContact.bind(this) }}
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

componentDidMount(){
  this.unsubcribe=this.ref.onSnapshot((querySnapshot)=>{
    const contacts = [];
    
      querySnapshot.forEach((doc) => {
       
        contacts.push({
          key: doc.id, // Document ID
          doc, // DocumentSnapshot
          Name=doc.data.Name,
          PhoneNumber=doc.data.PhoneNumber,
        });
      });
      this.setState({
          users:contacts,
        loading: false,
      });
  });
}

AddNewContact=()=>{
  this.ref.add({

  }).then((data)=>{
    console.log('New contact is added=${data}');
      
    this.setState({

        loading: true,
      });

  }).catch((error)=>{
    console.log('Error adding new contact = ${error}');
    this.setState({
      
        loading: true,
      });
  });
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
  
