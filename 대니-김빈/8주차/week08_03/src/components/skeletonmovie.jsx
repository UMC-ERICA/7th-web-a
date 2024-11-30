import React from "react";
import SkeletonElement from "./SkeletonElement";
import styled from 'styled-components';

const MoviesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    max-width: 100%;
    gap: 30px;
    padding: 10px;
`;

const MoviesItem = styled.div`
    width: 140px;
    text-align: center;
    border-radius: 8px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SkeletonMovie = () => {
    return (
        <MoviesContainer>
            <MoviesItem>
                <SkeletonElement type="thumbnail" />
                <SkeletonElement type="title" />
                <SkeletonElement type="text" />
            </MoviesItem>
        </MoviesContainer>
    );
};

export default SkeletonMovie;
