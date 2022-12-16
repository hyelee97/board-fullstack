import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useLocation , useNavigate } from 'react-router-dom';
import BoardService from '../service/BoardService';

const ReadBoardComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    //const params  = useParams();

    const [board, setBoard] = useState([]);

    useEffect(() => {
        //db연동 상세내역 조회
        BoardService.getOneBoard(location.state.board.no).then((res) => {
            setBoard(res.data);
        });
        console.log("###ReadBoardComponent start"); 

    }, []);

    const returnBoardType = (typeNo) => {
        let type = null;
        if (typeNo === 1) {
            type = "자유게시판";

        } else if (typeNo === 2 ) {
            type = "질문과 답변 게시판";

        } else {
            type = "타입 미지정";
        }

        return (
            <div className = "row">
                <label>* Board Type </label> {type}
            </div>
        )

    }

    const returnDate = (cTime, uTime) => {
        return (
            <div className = "row">
                <label>* 생성일 : [ {cTime} ]<br></br>* 수정일 : [ {uTime} ] </label>
            </div>
        )
    }

    const goToList = () => {
        navigate('/board');
    }


    return (
        <div>
            <div className = "card col-md-6 offset-md-3">
                <h3 className ="text-center"> Read Detail</h3>
                <div className = "card-body">
                        {returnBoardType(board.type)} 
                        <div className = "row">      
                            <label> * Title </label> {board.title}
                        </div>
                        <div className = "row">
                            <label> * Contents </label> <br></br>
                            <textarea value={board.contents} readOnly/> 
                        </div >
                        <div className = "row">
                            <label> * MemberNo  </label> {board.memberNo}
                        </div>
                        {returnDate(board.createdTime, board.updatedTime) }
                        <button className="btn btn-primary" onClick={goToList} style={{marginLeft:"10px"}}>글목록</button>
                </div>
            </div>

        </div>
    );

};

export default ReadBoardComponent;