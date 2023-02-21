package com.example.back.Service;

import com.example.back.model.Users;

import java.util.List;

public interface UsersService {

    public List<Users> listAll();
    public Users saveUsers(Users users);
    public Users get(Integer id);
    public void delete(Integer id);
}
