import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {message} from 'antd';
import md5 from 'js-md5';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [messageApi] = message.useMessage();
    const navigate = useNavigate()
    if (localStorage.getItem("user")) {
        navigate('/');
    }
    let handleRegister = async () => {
        if (password !== password1) {
            messageApi.error('两次密码不一致');
            return
        }
        fetch(`/api/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": md5(username),
                "password": md5(password)
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.code === 200) {
                    navigate('/login')
                    messageApi.success(`${username} 注册成功`);
                    return
                }
                messageApi.error(data.message);
            })
            .catch(error => {
                // 处理请求错误
                messageApi.error(error);
            })
    }

    return (
        <div className="container dark">
            <div className="app register">
                <div className="app-header app-header-login">
                    <h1>注册</h1>
                    <Link to="/login">
                        登录
                    </Link>
                </div>
                <div className="form">
                    <form>
                        <div className="label">
                            <label>
                                用户名:
                            </label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>

                        </div>
                        <div className="label">
                            <label>
                                密码:
                            </label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="label">
                            <label>
                                再次输入密码:
                            </label>
                            <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)}/>
                        </div>
                        <div className="login-button">
                            <button type="button" onClick={handleRegister}>
                                注册
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
