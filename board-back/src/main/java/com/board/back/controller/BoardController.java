package com.board.back.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.board.back.model.Board;
import com.board.back.service.BoardService;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@CrossOrigin(origins = "http://localhost:3000") //CORS 문제를 해결
@RestController
@RequestMapping("/api")
public class BoardController {
    
    @Autowired
	private BoardService boardService;

    // get all board 
	@GetMapping("/board")
	public List<Board> getAllBoards() {
		return boardService.getAllBoard();
	}
	// create board
	@PostMapping("/board")
	public Board createBoard(@RequestBody Board board) {
		return boardService.createBoard(board);
	}

	// get board
	@GetMapping("/board/{no}")
	public ResponseEntity<Board> getBoardByNo( @PathVariable Integer no) {
		log.info("### no="+no);
		return boardService.getBoard(no);
	}

	// update board
	@PutMapping("/board/{no}")
	public ResponseEntity<Board> updateBoardByNo(
			@PathVariable Integer no, @RequestBody Board board){
		
		return boardService.updateBoard(no, board);
	}

	// delete board
	@DeleteMapping("/board/{no}")
	public ResponseEntity<Map<String,Boolean>> deleteBoardByNo(
		@PathVariable Integer no) {

			return boardService.deleteBoard(no);
	}

	@GetMapping("/board2")
	public List<Board> getAllBoards2(@PathVariable int page, @PathVariable int size, Pageable pageable) {
		Page<Board> borad = boardService.getAllBoard2(pageable);
		List<Board> boards = borad.getContent();
		return boards;
	}
	
}
