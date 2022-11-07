package edu.senac.rj.todo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.senac.rj.todo.model.ToDo;
import edu.senac.rj.todo.model.enums.TodoStatus;
import edu.senac.rj.todo.service.ToDoService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest
public class ToDoControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private ToDoService toDoService;

    @Test
    void getAllToDos() throws Exception {
        List<ToDo> toDoList = new ArrayList<>();
        toDoList.add(new ToDo("Comer três vezes", TodoStatus.PENDENTE));
        toDoList.add(new ToDo("Dormir PELO MENOS duas vezes", TodoStatus.PENDENTE));
        Mockito.when(toDoService.findAll()).thenReturn(toDoList);

        mockMvc.perform(get("/todos").contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", Matchers.hasSize(2))).andDo(print());
    }

    @Test
    void getToDo() throws Exception {
        var toDo = new ToDo("Comer três vezes", TodoStatus.PENDENTE);
        Mockito.when(toDoService.findById(any(UUID.class))).thenReturn(toDo);

        mockMvc.perform(
                        get("/todo/" + toDo.getId()).contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(content().json(new ObjectMapper().writeValueAsString(toDo), false))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void createToDo() throws Exception {
        var toDo = new ToDo("Entrar em férias", TodoStatus.PENDENTE);
        Mockito.when(toDoService.save(any(ToDo.class))).thenReturn(toDo);

        var mapper = new ObjectMapper();
        var jsonToDo = mapper.writeValueAsString(toDo);

        var resultActions = mockMvc.perform(
                post("/todo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonToDo)
        );

        resultActions
                .andExpect(status().isCreated())
                .andExpect(content().json(jsonToDo))
                .andExpect(jsonPath("$.description").value("Entrar em férias"));
    }

    @Test
    void editToDo() throws Exception {
        var toDo = new ToDo("Entrar em férias", TodoStatus.PENDENTE);
        Mockito.when(toDoService.save(any(ToDo.class))).thenReturn(toDo);

        var mapper = new ObjectMapper();
        var jsonToDo = mapper.writeValueAsString(toDo);

        var resultActions = mockMvc.perform(
                post("/todo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonToDo)
        );

        resultActions
                .andExpect(status().isCreated())
                .andExpect(content().json(jsonToDo))
                .andExpect(jsonPath("$.description").value("Entrar em férias"));
    }

    @Test
    void deleteToDo() throws Exception {
        var todoServiceMock = mock(ToDoService.class);
        doNothing().when(todoServiceMock).deleteById(any(UUID.class));

        mockMvc.perform(
                        delete("/todo/1").contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNoContent());
    }
}
