import { createStore, combineReducers } from 'redux';
import * as actionTypes from './actionTypes';


const initialState = {
  contacts: [
    {
      name: 'A',
     
      number: 123123123
    },
    {
      name: 'B',
     
      number: 111111111
    },
    {
      name: 'C',
   
      number: 55555555
    }
  ],
  activeContact: null,
  search: ''
};

const main = (state = initialState, action) => {

  if (action.type === actionTypes.SET_ACTIVE_CONTACT) {
    return Object.assign({}, state, {
      activeContact: { object: Object.assign({}, action.contact), index: action.index }
    })
  }

  if (action.type === actionTypes.ADD_CONTACT) {
    return Object.assign({}, state, {
      contacts: [...state.contacts, action.value]
    });
  }

  if (action.type === actionTypes.UPDATE_ACTIVE_CONTACT) {
    return Object.assign({}, state, {
      activeContact: Object.assign({}, state.activeContact, {
        object: Object.assign({}, state.activeContact.object, {
          [action.key]: action.value
        })
      })
    });
  }

  if (action.type === actionTypes.UPDATE_CONTACT) {
    return Object.assign({}, state, {
      contacts: [
        ...state.contacts.slice(0, action.index),
        Object.assign({}, state.contacts[action.index], state.activeContact.object),
        ...state.contacts.slice(action.index + 1)
      ]
    });
  }

  if (action.type === actionTypes.UPDATE_SEARCH) {
    return Object.assign({}, state, {
      search: action.value
    });
  }

  return state;
};

export default createStore(combineReducers({
  main
}));