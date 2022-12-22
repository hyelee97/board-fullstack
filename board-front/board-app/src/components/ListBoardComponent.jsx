import React, { useState, useEffect } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate, Link } from 'react-router-dom';
//import axios from 'axios';

function ListBoardComponent(props) {
    const navigate = useNavigate();

    const [boards, setBoards] = useState([]);
    const [p_num, setPNum] = useState('1'); //현재 페이지 번호를 저장하기 위한 p_num 파라미터    
    const [paging, setPaging] = useState({}); //페이징 처리를 위한 paging 객체

    const createBoard = () => {
        navigate(`/create-board/_create`);
    }

    useEffect(() => {
        /*
        axios.get('http://localhost:8080/api/board')
        .then(response => setBoards(response.data))
        .catch(error => console.log(error))
        */
        console.log("###ListBoardComponent start"); 

        //db연동 리스트 조회
        listBoard(p_num);

    }, [p_num]); //마운트 될때만 실행

    const listBoard = (p_num) => {
        console.log("pageNum : "+ p_num);
        //db연동 리스트 조회
        BoardService.getBoards(p_num).then((res) => {
             console.log(res.data);
             setBoards(res.data.list);
             setPNum(res.data.pagingData.currentPageNum);
             setPaging(res.data.pagingData);
         });        
         //console.log(boards);
    }

    // 페이지 버튼을 표시하는 함수
    function viewPaging() {
        const pageNums = [];

        for (let i = paging.pageNumStart; i <= paging.pageNumEnd; i++ ) {
            pageNums.push(i);
        }

        return (pageNums.map((page) => 
            <li className="page-item" key={page.toString()} >
                <Link className="page-link" onClick = {() => listBoard(page)}>{page}</Link>
            </li>
        ));
        
    }

    //이전 페이지 이동버튼을 출력하는 함수
    function isPagingPrev(){
        if (paging.prev) {
            return (
                <li className="page-item">
                    <Link className="page-link" onClick = {() => listBoard( (paging.currentPageNum - 1) )} tabindex="-1">Previous</Link>
                </li>
            );
        }
    }

    //다음 페이지 이동 버튼을 출력하는 함수
    function isPagingNext(){
        if (paging.next) {
            return (
                <li className="page-item">
                    <Link className="page-link" onClick = {() => listBoard( (paging.currentPageNum + 1) )} tabIndex="-1">Next</Link>
                </li>
            );
        }
    }

    //첫페이지 이동 버튼을 출력하는 함수
    function isMoveToFirstPage() {
        if (p_num !== 1) {
            return (
                <li className="page-item">
                    <Link className="page-link" onClick = {() => listBoard(1)} tabIndex="-1">Move to First Page</Link>
                </li>
            );
        }
    }

    //마지막 페이지 이동 버튼을 출력하는 함수
    function isMoveToLastPage() {
        if (p_num !== paging.pageNumCountTotal) {
            return (
                <li className="page-item">
                    <Link className="page-link" onClick = {() => listBoard( (paging.pageNumCountTotal) )} tabIndex="-1">LastPage({paging.pageNumCountTotal})</Link>
                </li>
            );
        }
    }

    return (
        <div>
            <h2 className="text-center">Boards List</h2>
            <button className="btn btn-primary" onClick={() => createBoard() }>글작성</button>
            <div className ="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>글 번호</th>
                            <th>타이틀 </th>
                            <th>작성자 </th>
                            <th>작성일 </th>
                            <th>갱신일 </th>
                            <th>좋아요수</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        boards.map(
                            board =>
                            <tr key = {board.no}>
                                <td> {board.no} </td>
                                <td><Link to="/read-Board" state={{board:board}}>{board.title}</Link></td>
                                <td> {board.memberNo} </td>
                                <td> {board.createdTime} </td>
                                <td> {board.updatedTime} </td>
                                <td> {board.likes} </td>
                                <td> {board.counts} </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div className ="row">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {
                            isMoveToFirstPage()
                        }
                        {
                            isPagingPrev()
                        }
                        {
                            viewPaging()
                        }
                        {
                            isPagingNext()
                        }
                        {
                            isMoveToLastPage()
                        }
                    </ul>
                </nav>
            </div>            
        </div>
    );
};

export default ListBoardComponent;