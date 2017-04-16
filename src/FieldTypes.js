// @flow

export type FieldType = 'NUMBER' | 'NAME' | 'URL' | 'TEXT';
export const FieldTypes: {[FieldType]: FieldType} = {
  NUMBER: 'NUMBER',
  NAME: 'NAME',
  URL: 'URL',
  TEXT: 'TEXT',
};

export default FieldTypes;
