export interface IDecoderState {
}
export interface IDecoderActionState{
}
export interface IDecoderAction {
        type: string
        payload: IDecoderActionState
}
export const decoderInitialState: IDecoderState = {
}
export const decoderReducer = (state: IDecoderState = decoderInitialState, action: IDecoderAction): IDecoderState => {
    switch (action.type) {
        default: return state
    }
}