import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import Select from 'react-select';

import { Container } from './styles';

export default function ReactSelect({ name, options, setChange }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState(defaultValue && defaultValue);
  const ref = useRef();

  useEffect(() => setValue(defaultValue), [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleChange(data) {
    setValue(data);
    if (setChange) {
      setChange(data);
    }
  }

  return (
    <Container>
      <Select
        name={fieldName}
        options={options}
        value={value}
        defaultValue
        placeholder="Selecione o plano"
        onChange={handleChange}
        ref={ref}
        className="selectInput"
      />

      {error && <span>{error}</span>}
    </Container>
  );
}

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  setChange: PropTypes.func,
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
};

ReactSelect.defaultProps = {
  setChange: PropTypes.null,
};
