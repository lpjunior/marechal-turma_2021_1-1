package edu.senac.rj.todo.service;

import edu.senac.rj.todo.model.ToDo;
import edu.senac.rj.todo.repository.ToDoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ToDoService {
    private final ToDoRepository toDoRepository;

    public ToDoService(ToDoRepository toDoRepository) {
        this.toDoRepository = toDoRepository;
    }

    public List<ToDo> findAll() {
        return toDoRepository.findAll();
    }

    public ToDo findById(UUID toDoId) {
        return toDoRepository.findById(toDoId).orElse(new ToDo());
    }

    public ToDo save(ToDo toDo) {
        return toDoRepository.save(toDo); // implementa o upsert
    }

    public List<ToDo> saveAll(List<ToDo> toDoList) {
        return toDoRepository.saveAll(toDoList);
    }

    public void deleteById(UUID toDoId) {
        toDoRepository.deleteById(toDoId);
    }
}
