import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    const goTodo = () => {
        navigate('/todo')
    }


    return (
        <div className="app-header">
            <div className="app-header-title">
                <h1>一个笔记</h1>
                <p onClick={goTodo}>一个待办</p>
            </div>
            <div className="text" onClick={logout}>退出登录</div>
        </div>
    )
}

export default Header