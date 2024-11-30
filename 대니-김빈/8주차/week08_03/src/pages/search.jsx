import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import MoviesList from '../components/MovieList';
import SkeletonMovie from '../components/skeletonmovie';

const PageWrapper = styled.div`
    padding: 20px;
    color: white;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const SearchInput = styled.input`
    width: 80%;
    height: 70px;
    padding-left: 10px;
    font-size: 24px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const SearchButton = styled.button`
    font-size: 16px;
    color: white;
    width: 10%;
    height: 70px;
    background-color: #F42E61;
    border: none;
    border-radius: 4px;
    padding: 0px;
    margin: 0px;
    cursor: pointer;
    box-sizing: border-box;
    &:hover {
        background-color: #c02050;
    }
`;

const SkeletonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
`;

const NoResultsMessage = styled.p`
    color: #FFFFFF;
    font-size: 30px;
    margin-top: 20px;
`;

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('query') || '';  // URL의 'query' 파라미터를 가져옴
    const [query, setQuery] = useState(queryParam);
    const [lastQuery, setLastQuery] = useState(queryParam);
    const [searchUrl, setSearchUrl] = useState(null);
    const [skeletonCount, setSkeletonCount] = useState(5);

    const { data, isLoading, isError } = useCustomFetch(searchUrl);

    // query 값이 변경되면 URL에 반영
    useEffect(() => {
        if (queryParam !== query) {
            setQuery(queryParam);
            setSearchUrl(`/search/movie?query=${encodeURIComponent(queryParam)}&include_adult=false&language=ko-KR&page=1`);
        }
    }, [queryParam]);

    const handleSearch = () => {
        if (query) {
            setLastQuery(query);
            setSkeletonCount(30);
            setSearchParams({ query });  // URL에 쿼리 파라미터 설정
            setSearchUrl(`/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=ko-KR&page=1`);
        }
    };

    return (
        <PageWrapper>
            <SearchContainer>
                <SearchInput 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="영화제목을 입력해주세요" 
                />
                <SearchButton onClick={handleSearch}>검색</SearchButton>
            </SearchContainer>

            {isLoading && (
                <SkeletonContainer>
                    {[...Array(skeletonCount)].map((_, index) => (
                        <SkeletonMovie key={index} />
                    ))}
                </SkeletonContainer>
            )}

            {isError && <p>오류가 발생했습니다. 다시 시도해주세요.</p>}

            {data && data.results && data.results.length === 0 && (
                <NoResultsMessage>해당하는 검색어 "{lastQuery}"에 대한 데이터가 없습니다.</NoResultsMessage>
            )}

            {data && data.results && data.results.length > 0 && (
                <MoviesList movies={data.results} />
            )}  
        </PageWrapper>
    );
};

export default SearchPage;
