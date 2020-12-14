import React, {useReducer} from "react";
import {AlertContext} from "./alertContext";
import {alertReducer} from './alertReducer'

export const AlertState = ({children}) => {
    const [state, dispatch] = useReducer(alertReducer, {visible: false})
    return(
        <AlertContext.Provider>
            {children}
        </AlertContext.Provider>
    )
}