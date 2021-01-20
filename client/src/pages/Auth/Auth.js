import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";


import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/AuthContext";

export const AuthPage = () => {
    let history = useHistory();
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler =  () => {
        history.push("/registration");
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userID)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s12 center-block">
                <h1>Сократи ссылку</h1>
                <div className="card light-blue lighten-5">
                    <div className="card-content black-text">
                        <span className="card-title">Вход</span>
                        <div className={'row'}>
                            <div className={'col s6'}>
                                <div className="input-field ">
                                    <input id="email"
                                           type="text"
                                           name={'email'}
                                           className="validate black-text"

                                           value={form.email}
                                           onChange={changeHandler}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field ">
                                    <input id="password"
                                           type="password"
                                           name={'password'}
                                           className="validate black-text"

                                           value={form.password}
                                           onChange={changeHandler}
                                    />
                                    <label htmlFor="password">Пароль</label>
                                </div>
                            </div>
                            <div className={'col s6'}><img
                                src={'https://www.linksrec.co.uk/media/1006/links-logo-scroll.png'} width={'100%'}
                                alt=''/>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className={'btn amber darken-3 waves-effect waves-light'}
                                style={{marginRight: 10}}
                                onClick={loginHandler}
                                disabled={loading}
                        >Войти
                        </button>
                        <button
                            className={'btn waves-effect waves-light'}
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}