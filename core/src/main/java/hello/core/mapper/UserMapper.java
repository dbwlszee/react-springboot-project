package hello.core.mapper;

import hello.core.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    List<UserVO> userList();
    UserVO fetchUserByID(int id);
    void updateUser(UserVO user);
    void insertUser(UserVO user);
    void deleteUser(int id);

}
