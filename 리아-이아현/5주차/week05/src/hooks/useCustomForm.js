import { useState } from "react";
import { validateEmail, validatePassword } from "../utils/validate";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (name === "email") {
      setErrors({
        ...errors,
        email: !validateEmail(value) ? "올바른 이메일 형식이 아닙니다. 다시 확인해주세요!" : "",
      });
    } else if (name === "password") {
      setErrors({
        ...errors,
        password: !validatePassword(value)
          ? "비밀번호는 8 ~ 16자리 사이로 입력해주세요!"
          : "",
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const isFormValid = !Object.values(errors).some((error) => error);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isFormValid,
  };
};

export default useForm;
