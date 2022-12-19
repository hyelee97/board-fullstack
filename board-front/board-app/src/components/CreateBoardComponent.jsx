import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';

function CreateBoardComponent() {
    const navigate = useNavigate();
    const params = useParams();
    console.log("###params.no=", params.no);

    const [type, setType] = useState('1');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [memberNo, setMemberNo] = useState('');
    const [no, setNo] = useState(params.no);
    const [pageTitle, setPageTitle] = useState('');
    //console.log("###no=",no);

    //this.setState로 this.state에 정의된 변수에 값을 대입하게 해주는 함수를 선언.
    const changeTypeHandler = (event) => {
        setType(event.target.value);
    }

    const changeTitleHandler = (event) => {
        setTitle(event.target.value);
    }

    const changeContentsHandler = (event) => {
        setContents(event.target.value);
    }

    const changeMemberNoHandler = (event) => {
        setMemberNo(event.target.value);
    }

    // 'Save' 버튼을 클릭시 API에 글 작성 리퀘스트를 보내는 함수를 선언
    const createBoard = (event) => {
        event.preventDefault();
        let board = {
            type,
            title,
            contents,
            memberNo
        };
        //console.log("board => " + JSON.stringify(board));

        if (no === '_create') {
            BoardService.createBoard(board).then(res => {
                navigate('/board');
            });
        }else{
            BoardService.updateBoard(no, board).then(res => {
                navigate('/board');
            });
        }
    }

    // 글 작성 취소버튼이 클릭되었을때 글목록 페이지로 이동하는 함수를 선언
    const cancel = () => {
        navigate('/board');
    }

    useEffect(() => {
        if (no === '_create') {
            setPageTitle("새글을 작성해주세요");
            return;
        } else {
            //db연동 상세내역 조회
            BoardService.getOneBoard(no).then((res) => {
                let board = res.data;
                setType(board.type);
                setTitle(board.title);
                setContents(board.contents);
                setMemberNo(board.memberNo);
                setPageTitle(board.no +"번 글을 수정해주세요.");
            });
        }
    }, []);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">{pageTitle}</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Type </label>
                                    <select placeholder="type" name="type" className="form-control"
                                        value={type || '1'} onChange={changeTypeHandler}>
                                        <option value="1">자유게시판</option>
                                        <option value="2">질문과 답변</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label> Title </label>
                                    <input type="text" placeholder="title" name="title" className="form-control"
                                        value={title || ''} onChange={changeTitleHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Contents  </label>
                                    <textarea placeholder="contents" name="contents" className="form-control"
                                        value={contents || ''} onChange={changeContentsHandler} />
                                </div>
                                <div className="form-group">
                                    <label> MemberNo  </label>
                                    <input placeholder="memberNo" name="memberNo" className="form-control"
                                        value={memberNo || ''} onChange={changeMemberNoHandler} />
                                </div>
                                <br/>
                                <button type="submit" className="btn btn-success" onClick={createBoard}>Save</button>
                                <button type="button" className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CreateBoardComponent;