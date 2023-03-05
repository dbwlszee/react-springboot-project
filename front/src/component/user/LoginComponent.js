import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../ApiService';
import styles from './LoginComponent.module.css'

//username과 password를 받아서 로그인한다.
const LoginComponent = () => {
    const navigate = useNavigate();
    
    //입력받을 유저의 username과 password
    const [inputLog, setinputLog] = useState({
        username: '',
        password: '',
    });

    const handleInputLog = (e) => {
        setinputLog({
            ...inputLog,
            [e.target.name] : e.target.value,
        });
    }    

    const onClickLogin = (e) => {
        e.preventDefault();

        const user = {
            username: inputLog.username,
            password: inputLog.password,
        }

        ApiService.loginUser(user)
            .then( res=> {
                if(res.data.username === undefined){
                    //id가 일치하지 않는 경우 userId = undefined
                    alert("입력하신 ID가 일치하지 않습니다.");
                } else if (res.data.username === null){
                    //id 일치 password 불일치
                    alert("입력하신 비밀번호가 일치하지 않습니다.")
                } else if (res.data.username === inputLog.username){
                    // id, password 모두 일치
                    alert("로그인 성공");

                    //sessionStorige에 id를 key값들로 저장
                    sessionStorage.setItem("user_id", inputLog.username);
                    sessionStorage.setItem("name", res.data.username);
                }

                //작업 완료되면 페이지 이동
                navigate('/users');
            })
            .catch( err => {
                console.log('onClickLogin() 에러', err);
            });
    }
    
    return(
        <div className={styles.loginPage}>
            <form className={styles.form}>
                <h1>Welcome</h1>
                <input 
                    type="text" 
                    placeholder="username" 
                    name="username" 
                    value={inputLog.username}
                    onChange={handleInputLog}/>
                <input 
                    type="password" 
                    placeholder="password" 
                    name="password" 
                    value={inputLog.password}
                    onChange={handleInputLog}/>
                <div>
                    <button type="button" onClick={onClickLogin}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginComponent;