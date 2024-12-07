import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  0% { background-color: #333; }
  50% { background-color: #444; }
  100% { background-color: #333; }
`;

const SkeletonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: black;
  color: white;
  padding: 50px;
  height: 100vh;
  width: 100%;
  gap: 20px;
`;

const SkeletonPoster = styled.div`
  width: 500px;
  height: 600px;
  border-radius: 10px;
  animation: ${loadingAnimation} 1.5s infinite ease-in-out;
`;

const SkeletonInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

type SkeletonTextProps = {
  height?: string;
  width?: string;
};

const SkeletonText = styled.div<SkeletonTextProps>`
  height: ${(props) => props.height || "200px"};
  width: ${(props) => props.width || "100%"};
  border-radius: 5px;
  animation: ${loadingAnimation} 1.5s infinite ease-in-out;
`;

const MovieDetailSkeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonPoster />
      <SkeletonInfoContainer>
        <SkeletonText height="40px" width="100%" />
        <SkeletonText height="60px" width="50%" />
        <SkeletonText height="80px" width="80%" />
        <SkeletonText height="300px" />
      </SkeletonInfoContainer>
    </SkeletonContainer>
  );
};

export default MovieDetailSkeleton;
