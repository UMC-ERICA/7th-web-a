import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  0% { background-color: #333; }
  50% { background-color: #444; }
  100% { background-color: #333; }
`;

const SkeletonContainer = styled.div`
  width: 180px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 10px;
  overflow: hidden;
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  animation: ${loadingAnimation} 1.5s infinite ease-in-out;
`;

const SkeletonText = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  animation: ${loadingAnimation} 1.5s infinite ease-in-out;
`;

const MovieSkeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonImage />
      <SkeletonText />
    </SkeletonContainer>
  );
};

export default MovieSkeleton;
