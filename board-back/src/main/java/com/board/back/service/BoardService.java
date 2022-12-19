package com.board.back.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.board.back.Repository.BoardRepository;
import com.board.back.exception.ResourceNotFoundException;
import com.board.back.model.Board;

@Service
public class BoardService {
	@Autowired
	private BoardRepository boardRepository;

	// get boards data
	public List<Board> getAllBoard() {
		return boardRepository.findAll();
	}

	// create board
	public Board createBoard(Board board) {
		return boardRepository.save(board);
	}

	// get board one by id
	public ResponseEntity<Board> getBoard(Integer no) {
		Board board = boardRepository.findById(no)
				.orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : [" + no + "]"));
		return ResponseEntity.ok(board);
	}

	// update board
	public ResponseEntity<Board> updateBoard(Integer no, Board updatedBoard) {
		Board board = boardRepository.findById(no)
		.orElseThrow( () -> new ResourceNotFoundException("Not exist Board Data by no : ["+no+"]"));
		board.setType(updatedBoard.getType());
		board.setTitle(updatedBoard.getTitle());
		board.setContents(updatedBoard.getContents());
		board.setMemberNo(updatedBoard.getMemberNo());
		board.setUpdatedTime(new Date());

		Board endUpdateBoard = boardRepository.save(board);
		return ResponseEntity.ok(endUpdateBoard);
	}	

}
