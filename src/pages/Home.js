import React, {Fragment} from "react";
import {Form} from '../components/Form'
import {Notes} from "../components/Notes";

export const Home = () =>{
    const notes = [...Array(3)
        .keys()]
        .map(item => ({id: item, title: `Note ${item}`}))
    return(
        <Fragment>
            <Form/>
            <hr/>
            <Notes notes={notes}/>

        </Fragment>
    )
}