import { FormSchemaType } from '../../utils/hooks/useForm/types';

export interface FormValuesInterface {
  email: string;
  passphrase: string;
}

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
