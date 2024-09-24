import React from "react";
import { Controller } from "react-hook-form";

const Form = ({
  label,
  type,
  name,
  errors,
  control,
  rules,
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            type={type}
            id={name}
            placeholder={placeholder}
            {...field}
          />
        )}
      />
      {errors[name] && <p>{errors[name].message}</p>}
    </div>
  );
};

export default Form;
