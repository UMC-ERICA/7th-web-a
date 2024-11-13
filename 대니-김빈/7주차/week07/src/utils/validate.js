const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

function validateUser(values) {
    const errors = {};

    if (!emailPattern.test(values.email)) {
        errors.email = '올바른 이메일 형식이 아닙니다. 다시 확인해주세요!';
    }

    if (values.password.length < 8 || values.password.length > 16) {
        errors.password = '비밀번호는 8 ~ 16자 사이로 입력해주세요!';
    }

    return errors;
}

function validateSignUp(values) {
    const errors = validateUser(values);

    if (!values.re_password) {
        errors.re_password = '비밀번호 검증 또한 필수 요소입니다!';
    } else if (values.re_password !== values.password) {
        errors.re_password = '비밀번호가 일치하지 않습니다. 다시 확인해주세요!';
    }

    return errors;
}

function validateLogin(values) {
    return validateUser(values);
}

export { validateLogin, validateSignUp };
