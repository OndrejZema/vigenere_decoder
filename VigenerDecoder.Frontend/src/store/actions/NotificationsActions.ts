import React from "react"
import { INotificationsAction } from "../reducers/NotificationsReducer"


export const ADD_NOTIFICATION: string = "ADD_NOTIFICATION"
export const REMOVE_NOTIFICATION: string = "REMOVE_NOTIFICATION"


export const createNotification = (dispatch: React.Dispatch<INotificationsAction>, title: string, text: string, variant: string, time?: number) => {

    let id = `alert ${Date.now()}`
    if(time){
        setInterval(()=>{
            removeNotification(dispatch, id)
        }, time)
    }
    dispatch({type: ADD_NOTIFICATION, payload:{notification: {id: id, title: title, text: text, variant: variant}}})
}

export const removeNotification = (dispatch: React.Dispatch<INotificationsAction>, id: string) => {
    dispatch({type: REMOVE_NOTIFICATION, payload:{id: id}})
}