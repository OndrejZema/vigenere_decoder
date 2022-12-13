import { SET_CRYPTOGRAM, SET_KEY, SET_KEYS_LENGTH, SET_KEY_LENGTH, SET_LANGUAGE, SET_MESSAGE } from "../actions/DecoderActions"

export interface IKeyLength {
    name: string
    value: number
}

export interface IDecoderState {
    cryptogram: string
    cryptogramFile?: File
    language: string
    languageFile?: File
    keysLength: Array<IKeyLength>
    key: string
    loadedMessage: boolean
    message: string
    keyLength: number
}
export interface IDecoderActionState {
    cryptogram?: string
    cryptogramFile?: File
    language?: string
    languageFile?: File
    keysLength?: Array<IKeyLength>
    key?: string
    message?: string
    loadedMessage?: boolean
    keyLength?: number

}
export interface IDecoderAction {
    type: string
    payload: IDecoderActionState
}
export const decoderInitialState: IDecoderState = {
    cryptogram: "",
    cryptogramFile: undefined,
    language: "",
    languageFile: undefined,
    keysLength: [],
    key: "",
    message: "",
    loadedMessage: false,
    keyLength: 0

}
export const decoderReducer = (state: IDecoderState = decoderInitialState, action: IDecoderAction): IDecoderState => {
    switch (action.type) {
        case SET_CRYPTOGRAM:
            return {
                ...state,
                cryptogram: action.payload.cryptogram ? action.payload.cryptogram : "",
                cryptogramFile: action.payload.cryptogramFile ? action.payload.cryptogramFile : undefined
            }
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.payload.language ? action.payload.language : "",
                languageFile: action.payload.languageFile ? action.payload.languageFile : undefined
            }
        case SET_KEYS_LENGTH:
            return {
                ...state,
                keysLength: action.payload.keysLength ? action.payload.keysLength : []
            }
        case SET_KEY:
            return {
                ...state,
                key: action.payload.key ? action.payload.key : ""
            }
        case SET_MESSAGE:
            return {
                ...state,
                loadedMessage: true,
                message: action.payload.message ? action.payload.message : ""
            }
        case SET_KEY_LENGTH:
            return {
                ...state,
                keyLength: action.payload.keyLength ? action.payload.keyLength : 0
            }

        default: return state
    }
}