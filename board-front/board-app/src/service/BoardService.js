import axios from 'axios';

//Spring boot api url 정의
const BOARD_API_BASE_URL = "http://localhost:8080/api/board";

class BoardService {
    //글목록 데이터 가져오는 함수
    getBoards() {
        return axios.get(BOARD_API_BASE_URL);
    }

    // 글 작성 함수를 추가 : axios의 post함수를 사용해서 통신
    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }
}

export default new BoardService();