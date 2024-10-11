export const commonInputProps = {
  size: 'large',
  style: { minWidth: '202px' },
};

export const formInputsStyle = {
  display: 'flex',
  columnGap: '24px',
};

export const genderSelectProps = {
  placeholder: 'Gender',
  // defaultValue: 'default value',
  options: [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'none',
      label: 'Prefer not to answer',
    },
  ],
  rules: [
    {
      required: true,
      message: 'Please select your gender',
    },
  ],
};
