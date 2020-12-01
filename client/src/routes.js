import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {LinksPage} from "./pages/Links";
import {CreateLinkPage} from "./pages/CreateLink";
import {DetailsLinkPage} from "./pages/DetailsLink";
import {AuthPage} from "./pages/Auth";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path={"/links"} exact>
                    <LinksPage/>
                </Route>
                <Route path={"/create"} exact>
                    <CreateLinkPage/>
                </Route>
                <Route path={"/detail/:id"}>
                    <DetailsLinkPage/>
                </Route>
                <Redirect to={"/create"}/>
            </Switch>

        )
    }
    return (
        <Switch>
            <Route path={"/"} exact>
                <AuthPage/>
            </Route>
            <Redirect to={"/"}/>
        </Switch>

    )
}