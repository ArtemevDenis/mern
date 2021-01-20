import React, {useState} from 'react'
import {BrowserRouter as Router} from "react-router-dom";

import {AuthContext} from "./context/AuthContext";

import {useAuth} from "./hooks/auth.hook";

import {useRoutes} from "./hooks/routes";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";
import {Footer} from "./components/Footer";
import {Header} from "./components/Header";

import './style/main.css'

function App() {

    const [isShowSidebar, setIsShowSidebar] = useState(false)
    const {token, login, logout, userID, ready} = useAuth()
    const isAuth = !!token;
    const routes = useRoutes(isAuth);
    if (!ready) {
        return <Loader/>
    }


    const sidebarHandler = () => {
        setIsShowSidebar(!isShowSidebar)
    }

    return (
        <AuthContext.Provider value={{token, login, logout, userID, isAuth}}>
            <Router>
                <main className={isShowSidebar ? 'main--sidebar' : 'main'}>
                    <Header
                        sidebarHandler={sidebarHandler}
                        isShowSidebar={isShowSidebar}/>
                    {isShowSidebar &&
                    <div className={'sidebar'}>
                        {isAuth &&
                        <Navbar
                            sidebarHandler={sidebarHandler}
                            isShowSidebar={isShowSidebar}/>
                        }
                    </div>
                    }
                    <div className='container'>
                        {routes}
                    </div>
                    <Footer/>
                </main>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
