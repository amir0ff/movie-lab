export type FormInputType = {
  value: ValueType;
  required: boolean;
  validator?: ValidatorFuncType;
};

export type ValidatorFuncType = (value: ValueType, values?: ValuesType) => string;

export type FormSchemaType = {
  [key: string]: FormInputType;
};

type DirtyType = boolean;

export type IsDirtyType = {
  [key: string]: DirtyType;
};

export type IsRequiredType = IsDirtyType;

export type ValueType = string;

export type ValuesType = {
  [key: string]: ValueType;
};

export type ErrorType = {
  hasError: boolean;
  message: string;
};

export type ErrorsType = {
  [key: string]: ErrorType;
};
