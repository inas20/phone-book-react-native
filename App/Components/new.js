import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar';
import {
  AppRegistry,
  View,
  Text,
  TextInput,
  Navigator,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import { ADD_CONTACT } from './../../actionTypes';

const styles = StyleSheet.create({
  navBar: {
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  view: {
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    height: 30,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5
  }
});

const defaultContact = {
  name: '',
  number: '',
};

class New extends Component {
  constructor(props) {
    super(props);

    this.contact = defaultContact;
  }

  backHandler() {
    this.props.navigator.pop();
  }

  updateValue(field) {
    return (value) => {
      this.contact[field] = value;
    };
  }

  addHandler() {
    this.props.onCreateNewContact(this.contact);
    this.contact = defaultContact;
    this.props.navigator.pop();
  }

  renderScene() {
    return (
      <View>
        <NavigationBar
          style={ styles.navBar }
          leftButton={{ title: 'Back', handler: this.backHandler.bind(this) }}
          title={{ title: 'New Contact' }}
          rightButton={{ title: 'Add', handler: this.addHandler.bind(this) }}
        />
        <View style={ styles.view }>
          <Text>Name</Text>
          <TextInput
            onChangeText={ this.updateValue('name').bind(this) }
            keyboardType={'default'}
            style={ styles.input }
          />

          <Text>Number</Text>
          <TextInput
            onChangeText={ this.updateValue('number').bind(this) }
            keyboardType={'numeric'}
            style={ styles.input }
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <Navigator renderScene={ this.renderScene.bind(this) } />
    )
  }
}

New.propTypes = {
  onCreateNewContact: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateNewContact: (contact) => {
      dispatch({
        type: ADD_CONTACT,
        value: contact
      })
    }
  }
};

const ConnectedNew = connect(
  mapStateToProps,
  mapDispatchToProps
)(New);

export default ConnectedNew;