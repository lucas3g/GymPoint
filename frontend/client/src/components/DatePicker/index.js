import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import pt from 'date-fns/locale/pt-BR';
import { useField } from '@rocketseat/unform';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function DatePickerInput({ name, setChange, selectedDate }) {
  const { fieldName, registerField, defaultValue } = useField(name);
  const [selected, setSelected] = useState(defaultValue && defaultValue);
  const ref = useRef();

  useEffect(() => {
    setSelected(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleChange(date) {
    setSelected(date);
    if (setChange) {
      setChange(date);
    }
  }

  return (
    <>
      <DatePicker
        name={fieldName}
        selected={selected}
        onChange={handleChange}
        locale={pt}
        dateFormat="P"
        placeholderText="Escolha a data"
        ref={ref}
      />
    </>
  );
}
DatePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  setChange: PropTypes.func,
  selectedDate: PropTypes.shape(),
};

DatePickerInput.defaultProps = {
  setChange: PropTypes.null,
  selectedDate: PropTypes.null,
};
