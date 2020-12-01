import React from 'react'
import {BrowserRouter as Router} from "react-router-dom";

import {AuthContext} from "./context/AuthContext";

import {useAuth} from "./hooks/auth.hook";

import {useRoutes} from "./routes";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";

import 'materialize-css'


function App() {
    const {token, login, logout, userID, ready} = useAuth()
    const isAuth = !!token;
    const routes = useRoutes(isAuth);
    if (!ready) {
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{token, login, logout, userID, isAuth}}>
            <Router>
                {isAuth && <Navbar/>}
                <div className={'container'}>
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
