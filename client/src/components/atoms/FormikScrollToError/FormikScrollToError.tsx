import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';

interface FormikScrollToErrorProps {
  formId: string;
}

const FormikScrollToError: React.FC<FormikScrollToErrorProps> = ({
  children,
  formId,
}) => {
  const { isSubmitting } = useFormikContext();

  useEffect(() => {
    if (!formId) return;

    const form = document.getElementById(formId);
    if (form) {
      const tagError = document.querySelector('.NewPostScreen_error__iAPfr');
      tagError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [formId, isSubmitting]);

  return <div id={formId}>{children}</div>;
};

export default FormikScrollToError;
