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
        if( location.state.board !== null ){
            BoardService.getOneBoard(location.state.board.no).then((res) => {
                setBoard(res.data);
            });
        }
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

    const goToUpdate = (no) => {
        navigate(`/create-board/${no}`);
    }

    const deleteView = async (no) => {
        if(window.confirm("글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다.")) {
            BoardService.deleteBoard(location.state.board.no).then((res) => {
                //console.log("Delete result => " + JSON.stringify(res));
                if( res.status === 200 ){
                    alert("글 삭제 완료했습니다.");
                    navigate('/board'); 
                } else {
                    alert("글 삭제 실패했습니다.");
                }
            });
        }
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
                        <button className="btn btn-primary" onClick={() => (
                            goToUpdate(board.no))} style={{marginLeft:"10px"}}>글수정하기</button>
                        <button className="btn btn-primary" onClick={() => (
                            deleteView(board.no))} style={{marginLeft:"10px"}}>글삭제</button>
                </div>
            </div>

        </div>
    );

};

export default ReadBoardComponent;