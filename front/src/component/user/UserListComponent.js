import React, {Component} from "react";
import ApiService from "../../ApiService";
import styles from './UserListComponent.module.css';

class UserListComponent extends Component{

    constructor(props){
        super(props);

        this.state = {
            users:[],
            message: null
        }
    }

    // 마운트 되면 실행. component에 있는 함수
    componentDidMount(){
        this.reloadUserList();
    }
    reloadUserList = () => {
        ApiService.fetchUsers()
            .then( res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err => {
                console.log('reloadeUserList() Error!', err)
            })
    }

    // API통신을 통해 DB에서 해당 유저 삭제.
    deleteUser = (userID) =>{
        ApiService.deleteUser(userID)
            .then( res => {
                this.setState({
                    message: "User Deleted Successfully."
                });
                this.setState({
                    // state의 users배열에서 삭제된 해당 유저의 ID를 제외
                    users: this.state.users.filter( user=>
                        user.id !== userID)
                });
            })
            .catch(err => {
                console.log('deleteUser() Error!', err)
            })
    }

    editUser = (ID) => {
        // 브라우저 로컬스토리지를 사용해 해당 유저의 id를 일시 저장
        window.localStorage.setItem("userID", ID);
        // route를 통해 EditUserComponent.js로 이동.
        this.props.history.push('/edit-user');
    }

    addUser = () => {
        window.localStorage.removeItem("userID");
        // route를 통해 /add-user로 이동. 이후 AddUserComponent.js파일을 보여준다.
        this.props.history.push('/add-user');
    }

    render() {
        return (
            <div className={styles.user}>
                <h2 className={styles.titleH2}>📃 User List</h2>
                <button onClick={this.addUser}>Add User</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>UserName</th>
                            <th>Age</th>
                            <th>Salery</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map( user=>(
                                <tr key={user.id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.age}</td>
                                    <td>{user.salary}</td>
                                    <td>
                                        <button onClick={()=>this.editUser(user.id)}></button>
                                        <button onClick={()=>this.deleteUser(user.id)}></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )    
    }
}

export default UserListComponent;