import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";
import {ListLinks} from "../../components/ListLinks";

export const LinksPage = () => {

    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [links, setLinks] = useState([]);


    const fetchLinks = useCallback(async () => {
        try {
            const data = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(data)
        } catch (e) {
        }
    }, [token, request])
    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])


    if (loading) {
        return <Loader/>
    }
    return (
        <>{!loading && <ListLinks links={links}/>}</>
    )
}