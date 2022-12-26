import React, { useState } from "react";
import './PagingStyle_square.css';
import Pagination from "react-js-pagination";

export const PagingComponent = ({ currentPage, totalItemsCount, setPNum, countPerPage, pageNumCountPerPage }) => {
  return (
    <Pagination shape="rounded"
    activePage={currentPage} // 현재 페이지
    itemsCountPerPage={5} // 한 페이지랑 보여줄 아이템 갯수
    totalItemsCount={totalItemsCount} // 총 아이템 갯수
    pageRangeDisplayed={5} // Paginator 내에서 보여줄 페이지의 범위
    prevPageText={"‹"} // "이전"을 나타낼 텍스트 (prev, <, ...)
    nextPageText={"›"} // "다음"을 나타낼 텍스트 (next, >, ...)          
    onChange={setPNum} // 페이지 변경을 핸들링하는 함수
    />
  );
};

export default PagingComponent;