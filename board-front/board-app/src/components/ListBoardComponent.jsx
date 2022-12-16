import React, { useState, useEffect } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function ListBoardComponent(props) {
    const navigate = useNavigate();

    const [boards, setBoards] = useState([]);

    const createBoard = () => {
        navigate('/create-board');
    }


    useEffect(() => {
        
        axios.get('http://localhost:8080/api/board')
        .then(response => setBoards(response.data))
        .catch(error => console.log(error))
        
        console.log("###ListBoardComponent start"); 

       //db연동 리스트 조회
       /*
        BoardService.getBoards().then((res) => {
            setBoards(res.data);
        });
        */

    }, []);


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
        </div>
    );
};

export default ListBoardComponent;