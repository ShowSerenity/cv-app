// src/components/AddSkillForm/AddSkillForm.tsx

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddSkillForm.scss';
import Button from '../shared/Button/Button';
import type { AddSkillFormValues } from '../../types';

type AddSkillFormProps = {
  onSubmit: (values: { name: string; range: number }) => Promise<void>;
  isSubmittingExternally: boolean;
};

const validationSchema = Yup.object({
  name: Yup.string().required('Skill name is a required field'),
  range: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '') {
        return NaN;
      }
      return value;
    })
    .typeError("Skill range must be a 'number' type")
    .required('Skill range is a required field')
    .min(10, 'Skill range must be greater than or equal to 10')
    .max(100, 'Skill range must be less than or equal to 100')
});

const initialValues: AddSkillFormValues = {
  name: '',
  range: ''
};

const AddSkillForm: React.FC<AddSkillFormProps> = ({
  onSubmit,
  isSubmittingExternally
}) => {
  const formik = useFormik<AddSkillFormValues>({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values, helpers) => {
      await onSubmit({
        name: values.name.trim(),
        range: Number(values.range)
      });

      helpers.resetForm();
    }
  });

  const isSubmitDisabled =
    !formik.isValid || isSubmittingExternally || !formik.dirty;

  return (
    <form className="add-skill-form" onSubmit={formik.handleSubmit} noValidate>
      <div className="add-skill-form__field">
        <label className="add-skill-form__label" htmlFor="name">
          Skill name:
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={`add-skill-form__input ${
            formik.touched.name && formik.errors.name
              ? 'add-skill-form__input--error'
              : ''
          }`}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter skill name"
        />
        {formik.touched.name && formik.errors.name ? (
          <p className="add-skill-form__error">{formik.errors.name}</p>
        ) : null}
      </div>

      <div className="add-skill-form__field">
        <label className="add-skill-form__label" htmlFor="range">
          Skill range:
        </label>
        <input
          id="range"
          name="range"
          type="text"
          inputMode="numeric"
          className={`add-skill-form__input ${
            formik.touched.range && formik.errors.range
              ? 'add-skill-form__input--error'
              : ''
          }`}
          value={formik.values.range}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter skill range"
        />
        {formik.touched.range && formik.errors.range ? (
          <p className="add-skill-form__error">{formik.errors.range}</p>
        ) : null}
      </div>

      <Button
        text={isSubmittingExternally ? 'Adding...' : 'Add skill'}
        type="submit"
        variant="primary"
        disabled={isSubmitDisabled}
      />
    </form>
  );
};

export default AddSkillForm;