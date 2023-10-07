import React from "react";
import styles from "../styles/groceryItem.module.css";
const Input = ({
  type = "text",
  label,
  name,
  value,
  placeholder,
  onChangeHandller,
}) => {
  return (
    <div className={styles.inputMainDiv}>
      <label className={styles.labelName}>{label}</label>
      <input
        className={styles.inputStyle}
        type={type}
        name={name}
        value={value}
        onChange={onChangeHandller}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
