import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class ListBoardComponent2 extends Component {

    //컴포넌트에서 state를 설정할 때는 constructor 메서드를 작성하여 설정한다. 
    //constructor는 클래스형 컴포넌트의 생성자 메서드로 반드시 super(props)를 호출해 주어야 한다. 
    constructor(props){

        //현재 클래스형 컴포넌트가 상속받고 있는 
        //리액트의 Component 클래스가 지닌 생성자 함수를 호출해 준다.
        super(props);

        //state는 컴포넌트 내부에서 바뀔 수 있는 값
        //state의 초기값 설정
        this.state = {
            boards: []
        }

        this.createBoard = this.createBoard.bind(this);
    }

    //외부 API 호출이 필요
    componentDidMount() {
        //db연동 리스트 조회
        BoardService.getBoards().then((res) => {
            this.setState({boards: res.data}); //this.state에 선언한 변수의 값을 변경하기 위해선 setState를 사용해야함.
        });
    }

    createBoard() {
        this.props.history.push('/create-board/');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Boards List</h2>
                <div className ="row">
                    <button className="btn btn-primary" onClick={this.createBoard}>글작성</button>
                </div>
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
                                this.state.boards.map(
                                    board =>
                                    <tr key = {board.no}>
                                        <td> {board.no} </td>
                                        <td> {board.title} </td>
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
    }
}

export default ListBoardComponent2;