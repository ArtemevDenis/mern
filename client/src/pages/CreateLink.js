import React, {useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const CreateLinkPage = () => {

    const history = useHistory()

    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState("");

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
                console.log(data)
            } catch (e) {

            }
        }
    }
    return (
        <div className={'row'}>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field ">
                    <input id="link"
                           type="text"
                           name={'link'}
                           className="validate black-text"

                           value={link}
                           onChange={e => setLink(e.target.value)}
                           onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>

            </div>
        </div>
    )
}