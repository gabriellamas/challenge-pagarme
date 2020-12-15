import React from 'react';
import {Container} from './styles'

const Input = ({
  id,
  value,
  type,
  onChange,
  error,
  onBlur,
  placeholder,
  className,
  maxLength
}) => {
  return (
    <Container className={className} value={value}>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
      />
      <label htmlFor={id}>{placeholder}</label>
      {error && <p className="error">{error}</p>}
    </Container>
  );
};

export default Input;