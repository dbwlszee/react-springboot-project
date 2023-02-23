package com.example.back.Service;

import com.example.back.model.Users;
import com.example.back.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersServiceImpl implements UsersService{
    @Autowired
    private UsersRepository usersRepository;

    @Override
    public List<Users> listAll() {
        return usersRepository.findAll();
    }

    @Override
    public Users save(Users users) {
        return usersRepository.save(users);
    }

    @Override
    public Users get(Integer id) {
        return usersRepository.findById(id).get();
    }

    @Override
    public void delete(Integer id) {
        usersRepository.deleteById(id);
    }
}
