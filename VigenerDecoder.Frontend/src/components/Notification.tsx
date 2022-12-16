import React from 'react'
import Alert from 'react-bootstrap/Alert';
import { removeNotification } from '../store/actions/NotificationsActions';
import { GlobalContext } from '../store/GlobalContextProvider';
import { INotification } from '../store/reducers/NotificationsReducer';

interface NotificationProps {
    notification: INotification
}

export const Notification = (props: NotificationProps) => {

    const { notificationsDispatch } = React.useContext(GlobalContext)

    return (
        <Alert
        className='m-1 notification'
            onClick={() => { removeNotification(notificationsDispatch, props.notification.id) }}
            variant={props.notification.variant}
        >
            <Alert.Heading>
                {props.notification.title}
            </Alert.Heading>
            {props.notification.text}
        </Alert>
    )
}