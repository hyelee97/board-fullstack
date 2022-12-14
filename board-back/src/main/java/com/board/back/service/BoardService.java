package com.board.back.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.board.back.Repository.BoardRepository;
import com.board.back.exception.ResourceNotFoundException;
import com.board.back.model.Board;
import com.board.back.util.PagingUtil;

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

	public ResponseEntity<Map<String, Boolean>> deleteBoard(Integer no) {
		Board board = boardRepository.findById(no)
		.orElseThrow( () -> new ResourceNotFoundException("Not exist Board Data by no : ["+no+"]"));

		boardRepository.delete(board);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deleted Board Data by id : ["+no+"]", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	public int findAllCount() {
		return (int) boardRepository.count();
	}

	// get paging boards data
	public ResponseEntity<Map> getPagingBoard(Integer p_num) {
		Map result = null;
		
		PagingUtil pu = new PagingUtil(p_num, 5, 5); // ($1:????????? ?????? ?????????, $2:??????????????? ????????? ??? ???, $3:??? ???????????? ????????? ????????? ????????? ??? )
		List<Board> list = boardRepository.findFromTo(pu.getObjectStartNum(), pu.getObjectCountPerPage());
		pu.setObjectCountTotal((int)boardRepository.count());
		pu.setCalcForPaging();
		
		System.out.println("p_num : "+p_num);
		System.out.println(pu.toString());
		
		if (list == null || list.size() == 0) {
			return null;
		}
		
		result = new HashMap<>();
		result.put("pagingData", pu);
		result.put("list", list);
		//result.put("listCount", pu.getObjectCountTotal());
		
		return ResponseEntity.ok(result);
	}

}
