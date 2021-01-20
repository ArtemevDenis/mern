import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";

import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";

export const RegistrationPage = () => {
    let history = useHistory();
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '', password: '', passwordRepeat: '', name: ''
    })

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        history.push("/");
    }

    return (
        <div className="row">
            <div className="col s12 center-block">
                <h1>Сократи ссылку</h1>
                <div className="card light-blue lighten-5">
                    <div className="card-content black-text">
                        <span className="card-title">Регистрация</span>
                        <div className={'row'}>
                            <div className={'col s6'}><img
                                src={'https://www.linksrec.co.uk/media/1006/links-logo-scroll.png'} width={'100%'}
                                alt=''/>
                            </div>
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
                                <div className="input-field ">
                                    <input id="passwordRepeat"
                                           type="password"
                                           name={'passwordRepeat'}
                                           className="validate black-text"

                                           value={form.passwordRepeat}
                                           onChange={changeHandler}
                                    />
                                    <label htmlFor="passwordRepeat">Повторите пароль</label>
                                </div>
                                <div className="input-field ">
                                    <input id="name"
                                           type="text"
                                           name={'name'}
                                           className="validate black-text"

                                           value={form.name}
                                           onChange={changeHandler}
                                    />
                                    <label htmlFor="name">Имя</label>
                                </div>
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