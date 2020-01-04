import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import PropTypes, { object, any } from 'prop-types';

import { selectStyle } from '~/styles/select';

export default function ReactSelect({
  name,
  label,
  options,
  defaultValue,
  ...rest
}) {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}

      <Select
        name={name}
        options={options}
        styles={selectStyle}
        value={value}
        getOptionValue={option => option.value}
        getOptionLabel={option => option.label}
        placeholder="Selecione um plano"
        noOptionsMessage={() => 'Nenhum resultado'}
        {...rest}
      />
    </>
  );
}

ReactSelect.propTypes = {
  options: PropTypes.arrayOf(object).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.objectOf(any),
    PropTypes.arrayOf(any),
  ]),
};

ReactSelect.defaultProps = {
  label: '',
  defaultValue: null,
};
