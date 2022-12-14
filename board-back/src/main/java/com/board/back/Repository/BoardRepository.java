package com.board.back.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.board.back.model.Board;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    
}
