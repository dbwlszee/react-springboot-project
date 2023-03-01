import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../ApiService';
import styles from './Form.module.css';

// /edit-user 경로로 이동 시 출력

const EditUserComponent = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState({
        id: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        age: '',
        salary: '',
    });

    // 처음 렌더링 시 한 번만 실행.
    // Class Component의 ComponentDidMount()를 대신한다.
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = () => {
        // localStorage에 저장한 "userID"값으로 API통신을 통해 유저정보를 DB에서 불러온다.
        ApiService.fetchUsersByID(window.localStorage.getItem("userID"))
            .then( res => {
                let user = res.data;
                // setState를 통해 정보를 업데이트 후 API통신을 통해 유저정보를 DB에 저장.
                setUsers({
                    id: user.id,
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    salary: user.salary
                })
            })
            .catch( err => {
                console.log('loadUser() 에러', err);
            });
    }

    const onChange = (e) => {
        setUsers({
            ...users,
            [e.target.name] : e.target.value
        });
    }

    const saveUser = (e) => {
        // 새로고침 방지
        e.preventDefault();

        let user = {
            id: users.id,
            username: users.username,
            password: users.password,
            firstName: users.firstName,
            lastName: users.lastName,
            age: users.age,
            salary: users.salary,
        }

        ApiService.editUser(user)
            .then ( res => {
                navigate('/users');
            })
            .catch( err => {
                console.log('saveUser() 에러', err);
            });
    }


    return(
        <div className={styles.all}>
        <h2 className={styles.infoText}>Edit User</h2>
        <form className={styles.container}>
            {/* 각 input마다 onChange를 두고 setState로 실시간 state값을 저장 */}
            <div className={styles.controls}>
                {/* username은 readOnly */}
                <label>User Name:</label>
                <input type="text" readOnly={true} name="username"
                defaultValue={users.username}/>
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
            <div className={styles.controls}>
                <label>Age:</label>
                <input type="number" placeholder="input your age" name="age"
                value={users.age} onChange={onChange}/>
            </div>
            <div className={styles.controls}>
                <label>Salary:</label>
                <input type="number" placeholder="input your salary" name="salary"
                value={users.salary} onChange={onChange}/>
            </div>

            {/* 버튼을 누를 시 API통신으로 DB에 저장 */}
            <div>
                <button className={styles.formBtn} onClick={saveUser}>Save</button>
            </div>
        </form>
    </div>
    )
}

export default EditUserComponent;