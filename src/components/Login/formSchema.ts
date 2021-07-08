import { FormSchemaType } from 'reactjs-use-form';

export const formSchema: FormSchemaType = {
  email: {
    value: '',
    required: true,
  },
  passphrase: {
    value: '',
    required: true,
    validator: (passphrase) => {
      return passphrase.length <= 6 ? 'Passphrase must be at least 6 characters long' : '';
    },
  },
};
