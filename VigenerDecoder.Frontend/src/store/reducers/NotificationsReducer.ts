import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../actions/NotificationsActions"

export interface INotification{
    id: string
    title:string
    text: string
    variant: string
}

export interface INotificationsState {
    notifications: Array<INotification>
}
export interface INotificationsActionState{
    notification?: INotification
    id?:string
}
export interface INotificationsAction {
        type: string
        payload: INotificationsActionState
}
export const notificationsInitialState: INotificationsState = {
    notifications: []
}
export const notificationsReducer = (state: INotificationsState = notificationsInitialState, action: INotificationsAction): INotificationsState => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return {...state, 
            notifications: action.payload.notification ?[...state.notifications, action.payload.notification] :state.notifications}
        case REMOVE_NOTIFICATION:
            return {
                ...state,
                notifications: action.payload.id? state.notifications.filter(item => item.id !== action.payload.id) :state.notifications
            }
            default: return state
    }
}