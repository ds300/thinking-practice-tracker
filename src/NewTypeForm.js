// @flow

import React from 'react';

import {List, Map} from 'immutable';
import {pure} from 'react-derivable';
import {atom, derivation} from 'derivable';
import {FieldTypes} from './FieldTypes';

import {Button, DeleteButton, Input, Dropdown} from './components';
import Form from './Form';

export default pure(
  class NewTypeForm extends React.Component {
    props: {
      onSave: Map<string, any> => void,
    };

    newField = () =>
      this.$Fields.swap(fs => fs.push(Map({type: 'NUMBER', name: ''})));

    save = () =>
      this.props.onSave(this.$formSpec.get());

    $Fields = atom((List(): List<Map<string, any>>));
    $Name = atom('');

    $formSpec = derivation(() =>
      Map({
        name: this.$Name.get(),
        fields: this.$Fields.get().filter(x => !fieldIsInvalid(x)),
      }),
    );

    $invalid = this.$Fields
      .derive(fs => fs.count() === 0)
      .or(this.$Name.derive(s => s.trim().length === 0))
      .or(this.$Fields.derive(fs => fs.filter(fieldIsInvalid).count() > 0));

    delete = index => this.$Fields.swap(fs => fs.delete(index));

    changeFieldName = (index, e) =>
      this.$Fields.swap(fs => fs.setIn([index, 'name'], e.target.value));

    changeFieldType = (index, e) =>
      this.$Fields.swap(fs => fs.setIn([index, 'type'], e.target.value));

    renderField = (field: Map<string, any>, index: number) => (
      <div key={index}>
        <DeleteButton onClick={this.delete.bind(this, index)}>×</DeleteButton>
        <Input
          value={field.get('name')}
          onInput={this.changeFieldName.bind(this, index)}
        />
        <Dropdown
          defaultValue={field.get('type')}
          onInput={this.changeFieldType.bind(this, index)}
        >
          {Object.keys(FieldTypes).map(fieldType => (
            <option key={fieldType} value={fieldType}>
              {fieldType}
            </option>
          ))}
        </Dropdown>
      </div>
    );

    nameChanged = e => this.$Name.set(e.target.value);

    render() {
      return (
        <Row>
          <div>
            <div>
              <Input value={this.$Name.get()} onInput={this.nameChanged} />
            </div>
            <Button onClick={this.newField}>new field</Button>
            <Button onClick={this.save} disabled={this.$invalid.get()}>
              save
            </Button>
            {this.$Fields.get().map(this.renderField)}
          </div>
          <Form formType={this.$formSpec.get()} />
        </Row>
      );
    }
  },
);

function fieldIsInvalid(field: Map<string, any>) {
  return !(field.get('type', '') in FieldTypes &&
    field.get('name', '').trim().length > 0);
}

import styled from 'styled-components';

const Row = styled.div`
  display: flex
  flex-flow: row;
  & > div {
    flex: 1;
  }
`;
