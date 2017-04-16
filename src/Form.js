// @flow

import React from 'react';
import {pure} from 'react-derivable';
import {atom} from 'derivable';
import type {Atom} from 'derivable';
import {Map, List} from 'immutable';
import {Input, TextArea, Button} from './components';

export default pure(
  class Form extends React.Component {
    props: {
      formType: Map<'name' | 'fields', any>,
      onSave?: Map<string, any> => void,
    };

    $FormValues: Atom<Map<string, any>> = atom(Map());
    $Iteration = atom(0);

    formValueChanged = (name: string, e) =>
      this.$FormValues.swap(fv => fv.set(name, e.target.value));

    componentWillMount() {
      window.addEventListener('keyup', this.onKeyUp);
    }

    componentDidUnmount() {
      window.removeEventListener('keyup', this.onKeyUp);
    }

    onKeyUp = ev => {
      if (ev.which === 13) {
        this.onSave();
      }
    };

    onSave = () => {
      if (this.props.onSave) {
        this.props.onSave(
          this.$FormValues
            .get()
            .set('type', this.props.formType.get('name'))
            .set('datetime', new Date().toISOString())
            .set('utc_offset', new Date().getTimezoneOffset()),
        );
        this.$FormValues.set(Map());
        this.$Iteration.swap(i => i + 1);
      }
    };

    render() {
      const name = this.props.formType.get('name');
      const fields: List<Map<string, string>> = (this.props.formType.get(
        'fields',
      ): any);
      return (
        <div>
          <h2>{name}</h2>
          {fields.map((field, index) => {
            const type: string = field.get('type', '');
            const name: string = field.get('name', '');
            switch (type) {
              case 'NAME':
              case 'URL':
                return (
                  <Input
                    key={name + this.$Iteration.get()}
                    placeholder={name}
                    value={this.$FormValues.get(name).get()}
                    onInput={this.formValueChanged.bind(this, name)}
                  />
                );
              case 'NUMBER':
                return (
                  <Input
                    key={name + this.$Iteration.get()}
                    placeholder={name}
                    type="number"
                    value={this.$FormValues.get(name).get()}
                    onInput={this.formValueChanged.bind(this, name)}
                  />
                );
              case 'TEXT':
                return (
                  <TextArea
                    key={name + this.$Iteration.get()}
                    placeholder={name}
                    type="number"
                    value={this.$FormValues.get(name).get()}
                    onInput={this.formValueChanged.bind(this, name)}
                  />
                );
              default:
                throw Error(`unrecognized type ${type}`);
            }
          })}
          <Button onClick={this.onSave}>Save Entry</Button>
        </div>
      );
    }
  },
);
