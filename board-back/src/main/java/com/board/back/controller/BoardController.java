package com.board.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.board.back.model.Board;
import com.board.back.service.BoardService;

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

}
