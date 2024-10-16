import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorText = styled.div`
    display: grid;
    color: black;
    margin-top: 10px;
    font-size: 50px;
    text-align: center;
    justify-content: center;
    align-content: center;
    height: 60vh;
`;


const NotFoundPage = () => {
    return (
        <>
            <ErrorText>죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다. <br />
                존재하지 않는 주소를 입력하셨거나, <br />
                요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다. <br />
                궁금한 점이 있으시면 언제든 고객센터를 통해 문의해 주시기 바랍니다.
            </ErrorText>
            <Link to="/">메인으로</Link>
        </>
    );
};

export default NotFoundPage;
