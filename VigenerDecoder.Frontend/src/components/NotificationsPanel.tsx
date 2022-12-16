import React from 'react'
import { GlobalContext } from '../store/GlobalContextProvider'
import { Notification } from './Notification'


export const NotificationsPanel = () => {

    const { notificationState } = React.useContext(GlobalContext)

    return (
        <div className='notification-panel'>
            {notificationState.notifications.map(item => {
                return <Notification
                    notification={item}
                />
            })}
        </div>
    )
}