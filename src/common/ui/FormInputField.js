import { TextField } from "@mui/material";
import React from "react";

function FormInputField({
  label,
  name,
  value,
  onChange,
  helperText,
  disabled = false,
}) {
  return (
    <TextField
      required
      disabled={disabled}
      name={name}
      label={label}
      variant="outlined"
      size="small"
      value={value}
      onChange={onChange}
      helperText={helperText}
      InputLabelProps={{ shrink: true }}
    />
  );
}

export default FormInputField;
