import React, {useContext} from 'react'

import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {SidebarData} from "./SidebarData";



export const Navbar = () => {

    const history = useHistory()
    const {logout} = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        logout()
        history.push('/')
    }
    return (
        <nav >

            <ul>
                {SidebarData.map((item, index) => {
                    return <li key={index}><NavLink to={item.path}>{item.title}</NavLink></li>
                })}
                <li></li>
            </ul>
        </nav>
    )
}
