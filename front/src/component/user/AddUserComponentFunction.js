// UserListComponent.js에서 Add User 버튼을 눌렀을 때
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../ApiService";

const AddUserComponent = () =>{
    const navigate = useNavigate();
    // 입력받을 유저의 정보
    const [users, setUsers] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        age: '',
        salary: '',
    });

    const onChange = (e) => {
        setUsers({
            ...users,
            [e.target.name] : e.target.value,
        })
    }

    const saveUser = (e) => {
        e.preventDefault(); //새로고침 방지

        const user = {
            username: users.username,
            password: users.password,
            firstName: users.firstName,
            lastName: users.lastName,
            age: users.age,
            salary: users.salary,
        }

        ApiService.addUser(user)
        .then ( res => {
            navigate('/users');
        })
        .catch( err => {
            console.log('saveUser() 에러', err);
        });
    }

    return(
        <div>
            <h2>Add User</h2>
            <form>
                {/* 각 input마다 onChange를 두고 setUsers로 실시간 state값을 저장 */}
                <div>
                    <label>User Name:</label>
                    <input type="text" placeholder="input your username " name="username"
                    value={users.username} onChange={onChange}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder="input your password" name="password"
                    value={users.password} onChange={onChange}/>
                </div>
                <div>
                    <label>First Name:</label>
                    <input type="text" placeholder="input your first name" name="firstName"
                    value={users.firstName} onChange={onChange}/>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" placeholder="input your last name" name="lastName"
                    value={users.lastName} onChange={onChange}/>
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" placeholder="input your age" name="age"
                    value={users.age} onChange={onChange}/>
                </div>
                <div>
                    <label>Salary:</label>
                    <input type="number" placeholder="input your salary" name="salary"
                    value={users.salary} onChange={onChange}/>
                </div>

                {/* 버튼을 누를 시 API통신으로 DB에 저장 */}
                <button type="button" onClick={saveUser}>Save</button>
            </form>
        </div>
    )
}

export default AddUserComponent;