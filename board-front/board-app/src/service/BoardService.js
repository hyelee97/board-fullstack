import axios from 'axios';

//Spring boot api url 정의
const BOARD_API_BASE_URL = "http://localhost:8080/api/board";

class BoardService {
    //글목록 데이터 가져오는 함수
    getBoards() { // eslint-disable-line no-unused-vars
        return axios.get(BOARD_API_BASE_URL);
    }

    // 글 작성 함수를 추가 : axios의 post함수를 사용해서 통신
    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }

    //글 상세보기 함수 추가; 경로 파라미터로 글 번호를 설정하여 통신한다.
    getOneBoard(no) {
        return axios.get(BOARD_API_BASE_URL + "/" + no);
    }

    // 글 수정 함수 추가; 경로 파라미터로 글 번호를 설정, 수정할 객체정보를 body에 담아 통신한다
    updateBoard(no, board) {
        return axios.put(BOARD_API_BASE_URL + "/" + no, board);
    }

    // 글 수정 함수 추가; 경로 파라미터로 글 번호를 설정, 글 번호에 해당하는 글을 삭제.
    deleteBoard(no) {
        return axios.delete(BOARD_API_BASE_URL + "/" + no);
    }

}

export default new BoardService();