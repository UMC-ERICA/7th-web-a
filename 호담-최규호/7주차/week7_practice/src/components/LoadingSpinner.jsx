import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Spinner = () => {
    return (
        <SpinnerWrapper>
            <ClipLoader color="#000000" margin={5} size={15} />
        </SpinnerWrapper>
    );
};

export default Spinner;