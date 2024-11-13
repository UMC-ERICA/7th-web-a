import React from "react";
import SkeletonElement from "./SkeletonElement";
import styled from 'styled-components';

const MoviesItem = styled.div`
    width: 170px;
    text-align: center;
    border-radius: 8px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SkeletonMovie = () => {
    return (
        <MoviesItem>
            <SkeletonElement type="thumbnail" />
            <SkeletonElement type="title" />
            <SkeletonElement type="text" />
        </MoviesItem>
    );
};

export default SkeletonMovie;
