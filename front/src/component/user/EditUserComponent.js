import React, {Component} from 'react';
import { withRouter } from "./withRouter";
import ApiService from '../../ApiService';

// /edit-user 경로로 이동 시 출력

class EditUserComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            message: null
        }

        this.saveUser = this.saveUser.bind(this);
    }

    componentDidMount(){
        this.loadUser();
    }

    loadUser = () => {
        // localStorage에 저장한 "userID"값으로 API통신을 통해 유저정보를 DB에서 불러온다.
        ApiService.fetchUsersByID(window.localStorage.getItem("userID"))
            .then( res => {
                let user = res.data;
                // setState를 통해 정보를 업데이트 후 API통신을 통해 유저정보를 DB에 저장.
                this.setState({
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

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    saveUser = (e) => {
        // 새로고침 방지
        e.preventDefault();

        let user = {
            id: this.state.id,
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            salary: this.state.salary
        }

        ApiService.editUser(user)
            .then ( res => {
                this.setState({
                    message: user.username + '님의 정보가 성공적으로 수정되었습니다.'
                })
                console.log(this.state.message);
                this.props.navigate('/users');
            })
            .catch( err => {
                console.log('saveUser() 에러', err);
            });
    }

    render() {
        return(
            <div>
            <h2>Edit User</h2>
            <form>
                {/* 각 input마다 onChange를 두고 setState로 실시간 state값을 저장 */}
                <div>
                    {/* username은 readOnly */}
                    <label>User Name:</label>
                    <input type="text" readOnly={true} name="username"
                    defaultValue={this.state.username}/>
                </div>
                <div>
                    <label>First Name:</label>
                    <input type="text" placeholder="input your first name" name="firstName"
                    value={this.state.firstName} onChange={this.onChange}/>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" placeholder="input your last name" name="lastName"
                    value={this.state.lastName} onChange={this.onChange}/>
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" placeholder="input your age" name="age"
                    value={this.state.age} onChange={this.onChange}/>
                </div>
                <div>
                    <label>Salary:</label>
                    <input type="number" placeholder="input your salary" name="salary"
                    value={this.state.salary} onChange={this.onChange}/>
                </div>

                {/* 버튼을 누를 시 API통신으로 DB에 저장 */}
                <button onClick={this.saveUser}>Save</button>
            </form>
        </div>
        )
    }
}

export default withRouter(EditUserComponent);