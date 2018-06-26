

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  Navigator,
  StyleSheet,
  
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import { connect } from 'react-redux';

class Contact extends Component {

  constructor() {
    super();
  }

  goBackHandler() {
    this.props.navigator.pop();
  }

  editHandler() {
    this.props.navigator.push({
      id: 'edit'
    });
  }

  renderScene() {
    return (
      <View style={styles.view}>
        <NavigationBar
          statusBar={{ hideAnimation: 'none', showAnimation: 'none' }}
          style={ styles.navBar }
          leftButton={{ title: 'Back', handler: this.goBackHandler.bind(this) }}
          title={{ title: 'Contact' }}
          rightButton={{ title: 'Edit', handler: this.editHandler.bind(this) }}
        />
        <View style={ styles.container }>
          
          <View style={ styles.contactInfo }>
            <Text>Name: { this.props.contact.name }</Text>
            <Text>Number: { this.props.contact.number }</Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  view: {
    flex: 1
  },
  container: {
    flexDirection: 'row'
  },
  containerInfo: {
    flexDirection: 'column'
  },
  
});

const mapStateToProps = (state) => {
  return {
    contact: state.main.activeContact.object
  };
};

const ContactConnected = connect(
  mapStateToProps
)(Contact);

export default ContactConnected;