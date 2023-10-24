import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  icon,
  onIconClick,
}) => (
  <div className="input-field">
    {label && <label htmlFor={name}>{label}</label>}
    <Input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {icon && <StyledIcon icon={icon} onClick={onIconClick} />}
  </div>
);

const Input = styled.input`
  padding: 13px;
  border-radius: 10px;
  border: 1px solid #ababab;
  background: #fff;
  width: 89%;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  cursor: pointer;
`;
export default InputField;
