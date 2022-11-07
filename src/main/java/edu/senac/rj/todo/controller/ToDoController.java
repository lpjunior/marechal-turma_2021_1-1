package edu.senac.rj.todo.controller;

import edu.senac.rj.todo.model.ToDo;
import edu.senac.rj.todo.service.ToDoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/app")
@Tag(name = "ToDo Controller", description = "Controller responsible for managing the registration of todos")
public class ToDoController {

    private final ToDoService service;

    public ToDoController(ToDoService service) {
        this.service = service;
    }

    @GetMapping(value = "/todos", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Returns all registered todos", responses = {@ApiResponse(description = "Success when executing", responseCode = "200", content = @Content)})
    ResponseEntity<List<ToDo>> getAllTodos() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/todo/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Returns a registered todo", responses = {@ApiResponse(description = "Success when executing", responseCode = "200", content = @Content)})
    ResponseEntity<ToDo> getToDo(@PathVariable UUID id) {
        return new ResponseEntity<>(service.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/todo", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Define a todo", responses = {@ApiResponse(description = "Success in definition", responseCode = "201", content = @Content)})
    ResponseEntity<ToDo> create(@RequestBody ToDo toDo) {
        return new ResponseEntity<>(service.save(toDo), HttpStatus.CREATED);
    }

    @PostMapping(value = "/todos", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Set multiple todos", responses = {@ApiResponse(description = "Success in definition", responseCode = "201", content = @Content)})
    ResponseEntity<List<ToDo>> create(@RequestBody List<ToDo> toDos) {
        return new ResponseEntity<>(service.saveAll(toDos), HttpStatus.CREATED);
    }

    @PutMapping(value = "/todo", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update a todo", responses = {@ApiResponse(description = "Success in updating", responseCode = "204")})
    ResponseEntity<ToDo> update(@RequestBody ToDo toDo) {
        return new ResponseEntity<>(service.save(toDo), HttpStatus.NO_CONTENT);
    }

    @PutMapping(value = "/todos", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update multiple todos", responses = {@ApiResponse(description = "Success in updating", responseCode = "204")})
    ResponseEntity<List<ToDo>> update(@RequestBody List<ToDo> toDos) {
        return new ResponseEntity<>(service.saveAll(toDos), HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("todo/{id}")
    @Operation(summary = "Delete a todo", responses = {@ApiResponse(description = "Success in deleting", responseCode = "204")})
    ResponseEntity<?> delete(@PathVariable UUID id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
