import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {message} from "antd";
import md5 from 'js-md5';


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messageApi] = message.useMessage();
    const navigate = useNavigate();
    if (localStorage.getItem("user")) {
        navigate('/');
    }

    let handleLogin = async () => {
        fetch(`/api/login/`, {
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
                if (data.code === 200) {
                    localStorage.setItem("user", JSON.stringify({
                        "username": md5(username),
                        "password": md5(password),
                        "id": data.data.id
                    }))
                    messageApi.success(`${username} 欢迎您使用一个笔记`)
                    navigate('/')
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
            <div className="app login">
                <div className="app-header app-header-login">
                    <h1>登录</h1>
                    <Link to="/register">
                        注册
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
                        <div className="login-button">
                            <button type="button" onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
