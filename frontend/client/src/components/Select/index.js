import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import { SelectOptions } from './styles';

export default function ReactSelect({
  name,
  options,
  setChange,
  defaultValueSelected,
}) {
  const { fieldName, registerField, defaultValue } = useField(name);
  const [value, setValue] = useState(defaultValue && defaultValue);
  const ref = useRef();

  useEffect(() => setValue(defaultValueSelected), [defaultValueSelected]);

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
    <SelectOptions
      name={fieldName}
      options={options}
      value={value}
      defaultValue={defaultValueSelected}
      placeholder="Selecione um plano"
      onChange={handleChange}
      ref={ref}
      className="selectInput"
    />
  );
}

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  setChange: PropTypes.func,
  defaultValueSelected: PropTypes.shape(),
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
};

ReactSelect.defaultProps = {
  setChange: PropTypes.null,
  defaultValueSelected: PropTypes.null,
};
