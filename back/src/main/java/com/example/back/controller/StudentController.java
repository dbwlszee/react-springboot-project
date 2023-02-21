package com.example.back.controller;

import com.example.back.Service.UsersService;
import com.example.back.model.Users;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class StudentController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/add")
    public String add(@RequestBody Users users){
        usersService.saveUsers(users);
        return "New student is added";
    }

    @GetMapping
    public List<Users> listAll(){
        return usersService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Users> get(@PathVariable int id){
        try{
            Users users=usersService.get(id);
            return new ResponseEntity<Users>(users,HttpStatus.OK);

        }catch (NoSuchElementException e){
            return new ResponseEntity<Users>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Users> update(@RequestBody Users users, @PathVariable int id){
        try{
            Users existingUsers = usersService.get(id);
            usersService.saveUsers(users);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<Users>(HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id){
        usersService.delete(id);
        return id + "is deleted";
    }
}
