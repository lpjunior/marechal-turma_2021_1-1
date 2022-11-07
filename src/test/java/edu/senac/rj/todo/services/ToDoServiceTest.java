package edu.senac.rj.todo.services;

import edu.senac.rj.todo.model.ToDo;
import edu.senac.rj.todo.model.enums.TodoStatus;
import edu.senac.rj.todo.repository.ToDoRepository;
import edu.senac.rj.todo.service.ToDoService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ToDoServiceTest {

    @Autowired
    private ToDoRepository toDoRepository;

    @AfterEach
    void tearDown() {
        toDoRepository.deleteAll();
    }

    @Test
    void findAll() {
        var toDo = new ToDo("Dormir 8h por dia", TodoStatus.PENDENTE);
        toDoRepository.save(toDo);

        var toDoService = new ToDoService(toDoRepository);
        List<ToDo> toDoList = toDoService.findAll();
        var lastToDo = toDoList.get(toDoList.size() - 1); // n-1

        assertEquals(toDo.getNome(), lastToDo.getNome());
        assertEquals(toDo.getStatus(), lastToDo.getStatus());
        assertEquals(toDo.getId(), lastToDo.getId());
    }

    @Test
    void findById() {
        var toDo = new ToDo("Dormir 8h por dia", TodoStatus.PENDENTE);
        var toDoSaved = toDoRepository.save(toDo);

        var toDoService = new ToDoService(toDoRepository);
        var toDoFinded = toDoService.findById(toDoSaved.getId());

        assertEquals(toDo.getNome(), toDoFinded.getNome());
        assertEquals(toDo.getStatus(), toDoFinded.getStatus());
        assertEquals(toDo.getId(), toDoFinded.getId());
    }

    @Test
    void saveToDo() {
        var toDoService = new ToDoService(toDoRepository);
        var toDo = new ToDo("Fix DI on ToDoServiceTest", TodoStatus.PENDENTE);

        toDoService.save(toDo);
        assertEquals(1.0, toDoRepository.count());
    }

    @Test
    void saveAllToDo() {
        var toDoList = new ArrayList<ToDo>();
        var toDoService = new ToDoService(toDoRepository);
        var toDo1 = new ToDo("Fix DI on ToDoServiceTest", TodoStatus.PENDENTE);
        var toDo2 = new ToDo("Create test to SaveAll", TodoStatus.PENDENTE);
        var toDo3 = new ToDo("Create test to edit", TodoStatus.PENDENTE);

        toDoList.add(toDo1);
        toDoList.add(toDo2);
        toDoList.add(toDo3);

        toDoService.saveAll(toDoList);
        assertEquals(3.0, toDoRepository.count());
    }

    @Test
    void editToDo() {
        var toDoService = new ToDoService(toDoRepository);
        var toDo = new ToDo("Test Edit", TodoStatus.PENDENTE);
        toDoService.save(toDo);

        toDo.setStatus(TodoStatus.EM_ANDAMENTO);
        toDoService.save(toDo);

        assertEquals(1.0, toDoRepository.count());
    }

    @Test
    void deleteToDo() {
        var toDoService = new ToDoService(toDoRepository);
        var toDo = new ToDo("Test delete", TodoStatus.PENDENTE);

        var toDoSaved = toDoService.save(toDo);
        toDoService.deleteById(toDoSaved.getId());

        assertEquals(0, toDoRepository.count());
    }
}
