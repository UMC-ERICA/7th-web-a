import { useState, useEffect } from "react";

function useForm({ initialValues, validate, onSubmit }) {
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const handleChangeInput = (name, value) => {
        setValues({ 
            ...values,
            [name]: value
        });
    };

    const handleBlur = (name) => {
        setTouched({
            ...touched,
            [name]: true
        });
    };

    const getTextInputProps = (name) => {
        const value = values[name];
        const onChange = (event) => handleChangeInput(name, event.target.value);
        const onBlur = () => handleBlur(name);

        return { value, onChange, onBlur };
    };

    const handleSubmit = () => {
        console.log('handleSubmit 호출됨');
        const newErrors = validate(values);
        setErrors(newErrors);
        setTouched(Object.keys(values).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {}));

        if (Object.keys(newErrors).length === 0) {
            console.log('유효성 검사 통과, onSubmit 호출');
            onSubmit(values);
        } else{
            console.log('유효성 검사 실패, onSubmit 호출 안 됨');
        }
    };

    useEffect(() => {
        const newErrors = validate(values);
        setErrors(newErrors);
    }, [validate, values]);

    return { values, errors, touched, getTextInputProps, handleSubmit };
}

export default useForm;
