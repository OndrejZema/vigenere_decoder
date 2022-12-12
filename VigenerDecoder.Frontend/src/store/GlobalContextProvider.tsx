import React from 'react'
import { decoderInitialState, decoderReducer, IDecoderAction, IDecoderState } from './reducers/DecoderReducer'

interface IGlobalContext{
    decoderState: IDecoderState
    decoderDispatch: (action: IDecoderAction) => void
}

export const GlobalContext = React.createContext<IGlobalContext>({

    decoderState: decoderInitialState,
    decoderDispatch: () => {}

})

interface GlobalContextProviderProps{
    children: React.ReactNode
}

export const GlobalContextProvider = (props: GlobalContextProviderProps) =>{

    const [decoderState, decoderDispatch] = React.useReducer(decoderReducer, decoderInitialState)

    const store = React.useMemo(()=>({
        decoderState, decoderDispatch
    }), [decoderState, decoderDispatch])

    return (
        <GlobalContext.Provider value={store}>
            {props.children}
        </GlobalContext.Provider>
    )

}