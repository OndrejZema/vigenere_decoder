import React from "react"
import { IDecoderAction, IKeyLength } from "../reducers/DecoderReducer"

export const SET_CRYPTOGRAM: string = "SET_CRYPTOGRAM"
export const SET_LANGUAGE: string = "SET_LANGUAGE"
export const SET_KEYS_LENGTH: string = "SET_KEYS_LENGTH"
export const SET_KEY: string = "SET_KEY"
export const SET_MESSAGE: string = "SET_MESSAGE"
export const SET_LOADED: string = "SET_LOADED"
export const SET_KEY_LENGTH: string = "SET_KEY_LENGTH"

interface IDecodeResult{
    msg: string
    key: string
}

export const setCryptogramText = (dispatch: React.Dispatch<IDecoderAction>, cryptogram: string) => {
    dispatch({type: SET_CRYPTOGRAM, payload:{cryptogram: cryptogram}})
}

export const setKeysLength = (dispatch: React.Dispatch<IDecoderAction>, keysLength: Array<IKeyLength>) => {
    dispatch({type: SET_KEYS_LENGTH, payload:{keysLength: keysLength}})
}
export const setMessage = (dispatch: React.Dispatch<IDecoderAction>, decodeResult: IDecodeResult) => {
    dispatch({type: SET_MESSAGE, payload: {message: decodeResult.msg, key: decodeResult.key}})
}

export const setKeyLength = (dispatch: React.Dispatch<IDecoderAction>, keyLength: number) => {
    dispatch({type: SET_KEY_LENGTH, payload:{keyLength: keyLength}})
}

export const setCryptogramFile = (dispatch: React.Dispatch<IDecoderAction>, files: Array<File>) => {

    const reader = new FileReader()
    reader.readAsText(files[0])
    reader.onload = (e) => {
        // setImageURI(`${e.target?.result}`)
        if(!e.target || !e.target.result){
            console.log("Chyba behem nacitani")
            return
        }
        // console.log(files[0].name)
        // console.log(e!.target.result)
        if (!e || !e.target || !e.target.result){
            return
        }
        dispatch({type: SET_CRYPTOGRAM, payload: {
            cryptogram: (e.target.result).toString(),
            cryptogramFile: files[0] 
        }})
    }
}

export const setLanguageFile = (dispatch: React.Dispatch<IDecoderAction>, files: Array<File>) => {
    const reader = new FileReader()
    reader.readAsText(files[0])
    reader.onload = (e) => {
        // setImageURI(`${e.target?.result}`)
        if(!e.target || !e.target.result){
            console.log("Chyba behem nacitani")
            return
        }
        // console.log(files[0].name)
        // console.log(e!.target.result)
        if (!e || !e.target || !e.target.result){
            return
        }
        dispatch({type: SET_LANGUAGE, payload: {
            language: (e.target.result).toString(),
            languageFile: files[0] 
        }})
    }

}

