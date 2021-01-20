import React from 'react'
import '../style/header.css'

export const Header = (props) => {
    return (
        <header className='header'>Header
            <button onClick={props.sidebarHandler}>{props.isShowSidebar ? 'hide' : 'show'}</button>
        </header>
    )
}