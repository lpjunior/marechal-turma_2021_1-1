package edu.senac.rj.todo.repository;

import edu.senac.rj.todo.model.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository("toDoRepository")
public interface ToDoRepository extends JpaRepository<ToDo, UUID> {
}
