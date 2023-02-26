import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../ApiService";
import styles from './UserListComponentFunction.module.css';

const UserListComponent = () =>{
    const navigate = useNavigate();
    const [userList, setUserList] = useState({
        users:[],
        message: null
    });

    // 마운트 되면 실행. component에 있는 함수
    useEffect(() => {
        reloadUserList();
    }, []);

    const reloadUserList = () => {
        ApiService.fetchUsers()
            .then( res => {
                setUserList({
                    users: res.data
                })
            })
            .catch(err => {
                console.log('reloadeUserList() Error!', err);
            });
    }

    // API통신을 통해 DB에서 해당 유저 삭제.
    const deleteUser = (userID) =>{
        ApiService.deleteUser(userID)
            .then( res => {
                setUserList({
                    // state의 users배열에서 삭제된 해당 유저의 ID를 제외
                    users: userList.users.filter( user=>
                        user.id !== userID)
                });
            })
            .catch(err => {
                console.log('deleteUser() Error!', err);
            })
    }

    const editUser = (ID) => {
        // 브라우저 로컬스토리지를 사용해 해당 유저의 id를 일시 저장
        window.localStorage.setItem("userID", ID);
        // route를 통해 EditUserComponent.js로 이동.
        navigate('/edit-users');
    }

    const addUser = () => {
        window.localStorage.removeItem("userID");
        // route를 통해 /add-user로 이동. 이후 AddUserComponent.js파일을 보여준다.
        navigate('/add-users');
    }


    return (
        <div className={styles.user}>
            <h2 className={styles.titleH2}>📃 User List</h2>
            <button className={styles.buttonTitle} onClick={addUser}>Add User</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>UserName</th>
                        <th>Age</th>
                        <th>Salary</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.users.map( user=>(
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.username}</td>
                                <td>{user.age}</td>
                                <td>{user.salary}</td>
                                <td>
                                    <button onClick={()=>editUser(user.id)}>Edit</button>
                                    <button onClick={()=>deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )    
}

export default UserListComponent;