import React from 'react'
import {Link} from "react-router-dom";

export const ListLinks = ({links}) => {

    if (!links.length) {
        return <p>Ссылок пока что нет!</p>
    }
    return <table>
        <thead>
        <tr>
            <td>№</td>
            <td>Источник</td>
            <td>Сокращенная</td>
            <td>Подробнее</td>
        </tr>
        </thead>
        <tbody>
        {links.map((link, index) => {
            return <tr key={link._id}>
                <td>{index + 1}</td>
                <td>{link.from}</td>
                <td>{link.to}</td>
                <td><Link to={`/detail/${link._id}`}>открыть</Link></td>
            </tr>
        })}
        </tbody>
    </table>
}