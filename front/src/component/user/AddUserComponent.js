// UserListComponent.js에서 Add User 버튼을 눌렀을 때
import React, {Component} from "react";
import ApiService from "../../ApiService";

class AddUserComponent extends Component{
    constructor (props){
        super(props);
        
        // 입력받을 유저의 정보
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            message: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    saveUser = (e) => {
        e.preventDefault(); //새로고침 방지

        let user = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            salary: this.state.salary,
        }

        ApiService.addUser(user)
        .then ( res => {
            this.setState({
                message: user.username + '님이 성공적으로 등록되었습니다.'
            })
            console.log(this.state.message);
            this.props.history.push('/users');
        })
        .catch( err => {
            console.log('saveUser() 에러', err);
        });
    }

    render(){
        return(
            <div>
                <h2>Add User</h2>
                <form>
                    {/* 각 input마다 onChange를 두고 setState로 실시간 state값을 저장 */}
                    <div>
                        <label>User Name:</label>
                        <input type="text" placeholder="input your username " name="username"
                        value={this.state.username} onChange={this.onChange}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" placeholder="input your password" name="password"
                        value={this.state.password} onChange={this.onChange}/>
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

export default AddUserComponent;