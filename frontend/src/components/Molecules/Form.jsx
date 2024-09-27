import { Controller } from "react-hook-form";

const Form = ({
  label,
  type,
  name,
  errors,
  control,
  rules,
  placeholder,
  onChange,
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
            {...(type === "file" ? {} : field)}
            onChange={type === "file" ? onChange : field.onChange}
          />
        )}
      />
      {errors[name] && <p>{errors[name].message}</p>}
    </div>
  );
};

export default Form;
