import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {LinksPage} from "../pages/Links/Links";
import {CreateLinkPage} from "../pages/Links/CreateLink";
import {DetailsLinkPage} from "../pages/Links/DetailsLink";
import {AuthPage} from "../pages/Auth/Auth";
import {RegistrationPage} from "../pages/Auth/Registartion";
import {Todos} from "../pages/Todo/Todos";
import {Todo} from "../pages/Todo/Todo";
import {Dashboard} from "../pages/Dashboard";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path={"/links"} exact>
                    <LinksPage/>
                </Route>
                <Route path={"/links/create"} exact>
                    <CreateLinkPage/>
                </Route>
                <Route path={"/links/detail/:id"}>
                    <DetailsLinkPage/>
                </Route>
                <Route path={"/todos/:id"}>
                    <Todo/>
                </Route>
                <Route path={"/todos"}>
                    <Todos/>
                </Route>
                <Route path={"/dashboard"}>
                    <Dashboard/>
                </Route>
                <Redirect to={"/dashboard"}/>
            </Switch>

        )
    }
    return (
        <Switch>
            <Route path={"/"} exact>
                <AuthPage/>
            </Route>
            <Route path={"/registration"} exact>
                <RegistrationPage/>
            </Route>
            <Redirect to={"/"}/>
        </Switch>

    )
}