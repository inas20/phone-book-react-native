

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

import {
  UPDATE_ACTIVE_CONTACT,
  SET_ACTIVE_CONTACT,
  UPDATE_CONTACT
} from './../../actionTypes';

const styles = StyleSheet.create({
  navBar: {
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  view: {
    paddingLeft: 10,
    paddingRight: 10
  },
  textInput: {
    height: 40
  },
  input: {
    height: 30,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5
  }
});

class Edit extends Component {

  constructor(props) {
    super(props);
    this.beforeEdit = this.props.contact;
  }

  goBackHandler() {
    this.props.setActiveContact(this.beforeEdit);
    this.props.navigator.pop();
  }

  saveHandler() {
    this.props.saveUpdatedContact(this.props.contact, this.props.index);
    this.props.navigator.pop();
  }

  updateValue(key) {
    return (value) => {
      this.props.onUpdateValue(key, value)
    };
  }

  renderScene() {
    return (
      <View>
        <NavigationBar
          style={ styles.navBar }
          leftButton={{ title: 'Back', handler: this.goBackHandler.bind(this) }}
          title={{title: 'Edit'}}
          rightButton={{ title: 'Save', handler: this.saveHandler.bind(this) }}
        />

        <View style={ styles.view }>
          <Text>Name</Text>
          <TextInput
            onChangeText={ this.updateValue('name').bind(this) }
            keyboardType={'default'}
            style={ styles.input }
            value={ this.props.contact.name }
          />

          <Text>Number</Text>
          <TextInput
            onChangeText={ this.updateValue('number').bind(this) }
            keyboardType={'numeric'}
            style={ styles.input }
            value={ this.props.contact.number }
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

Edit.propTypes = {
  onUpdateValue: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    contact: state.main.activeContact.object,
    index: state.main.activeContact.index
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateValue: (key, value) => {
      dispatch({
        type: UPDATE_ACTIVE_CONTACT,
        key,
        value
      });
    },
    setActiveContact: (contact, index) => {
      dispatch({
        type: SET_ACTIVE_CONTACT,
        contact,
        index
      })
    },
    saveUpdatedContact: (contact, index) => {
      dispatch({
        type: UPDATE_CONTACT,
        contact,
        index
      })
    }
  };
};

const EditConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);

export default EditConnected;