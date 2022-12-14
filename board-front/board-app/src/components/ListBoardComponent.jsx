import React, { useState, useEffect } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate, Link } from 'react-router-dom';
import PagingComponent from './paging/PagingComponent';

function ListBoardComponent(props) {
    const navigate = useNavigate();

    const [boards, setBoards] = useState([]);
    const [p_num, setPNum] = useState(1); //현재 페이지 번호를 저장하기 위한 p_num 파라미터    
    const [paging, setPaging] = useState({}); //페이징 처리를 위한 paging 객체
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    const createBoard = () => {
        navigate(`/create-board/_create`);
    }

    useEffect(() => {
        console.log("###ListBoardComponent start"); 

        //db연동 리스트 조회
        listBoard(p_num);

    }, [p_num]); //마운트 될때만 실행

    const listBoard = (p_num) => {
        console.log("pageNum : "+ p_num);
        //db연동 리스트 조회
        BoardService.getBoards(p_num).then((res) => {
            setBoards(res.data.list);
            setPNum(res.data.pagingData.currentPageNum);
            setPaging(res.data.pagingData);
            setTotalItemsCount(res.data.pagingData.objectCountTotal);
            
            console.log("res.data.pagingData : "+ JSON.stringify(res.data.pagingData));
         });        
         //console.log(boards);
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
            <div>
                <PagingComponent currentPage={p_num} totalItemsCount={totalItemsCount} setPNum={setPNum} 
                countPerPage={paging.objectCountPerPage} pageNumCountPerPage={paging.pageNumCountPerPage} />
            </div>           
        </div>
    );
 
};


export default ListBoardComponent;