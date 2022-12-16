import React from 'react'
import { decoderInitialState, decoderReducer, IDecoderAction, IDecoderState } from './reducers/DecoderReducer'
import { INotificationsAction, INotificationsState, notificationsInitialState, notificationsReducer } from './reducers/NotificationsReducer'

interface IGlobalContext{
    decoderState: IDecoderState
    decoderDispatch: (action: IDecoderAction) => void

    notificationState: INotificationsState
    notificationsDispatch: (action: INotificationsAction) => void
}

export const GlobalContext = React.createContext<IGlobalContext>({

    decoderState: decoderInitialState,
    decoderDispatch: () => {},
    notificationState: notificationsInitialState,
    notificationsDispatch: () => {}


})

interface GlobalContextProviderProps{
    children: React.ReactNode
}

export const GlobalContextProvider = (props: GlobalContextProviderProps) =>{

    const [decoderState, decoderDispatch] = React.useReducer(decoderReducer, decoderInitialState)
    const [notificationState, notificationsDispatch] = React.useReducer(notificationsReducer, notificationsInitialState)

    const store = React.useMemo(()=>({
        decoderState, decoderDispatch,
        notificationState, notificationsDispatch
    }), [decoderState, decoderDispatch, notificationState, notificationsDispatch])

    return (
        <GlobalContext.Provider value={store}>
            {props.children}
        </GlobalContext.Provider>
    )

}