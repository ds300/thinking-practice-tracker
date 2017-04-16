// @flow

import React, {Component} from 'react';
import './App.css';
import NewTypeForm from './NewTypeForm';
import Form from './Form';
import {pure} from 'react-derivable';
import {TextArea} from './components';

import $State, {$StringifiedPersistentState, $route} from './State';

const $makeNewType = $route.derive(0).is('new-type');

const $makeNewEntry = $route.derive(0).is('new-entry');

const $newEntryType = $route
  .derive(1)
  .mDerive(name => $State.get().getIn(['types', name]));

class App extends Component {
  render() {
    if ($makeNewType.get()) {
      return (
        <NewTypeForm
          onSave={type => {
            $State.swap(state =>
              state.setIn(['types', type.get('name')], type),
            );
            window.location.hash = '';
          }}
        />
      );
    } else if ($makeNewEntry.get() && $newEntryType.get()) {
      return (
        <Form
          formType={$newEntryType.get()}
          onSave={entry => {
            $State.swap(state => state.update('entries', es => es.push(entry)));
          }}
        />
      );
    }
    return (
      <div>
        <a href="#/new-type">make new type</a>
        {$State.get().get('types').keySeq().map(name => (
          <div>
            <a href={`#/new-entry/${name}`}>{name}</a>
          </div>
        ))}
        <div>
          <TextArea
            value={$StringifiedPersistentState.get()}
            onChange={e => $StringifiedPersistentState.set(e.target.value)}
          />
        </div>
      </div>
    );
  }
}

export default pure(App);
