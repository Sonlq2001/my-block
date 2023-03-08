import { FormikErrors, FormikValues, FormikTouched } from 'formik';
import get from 'lodash.get';

export const getErrorFormik = (
  errors: FormikErrors<FormikValues>,
  touched: FormikTouched<FormikValues>,
  name: string
) => {
  return (get(touched, name) && get(errors, name)) || '';
};
