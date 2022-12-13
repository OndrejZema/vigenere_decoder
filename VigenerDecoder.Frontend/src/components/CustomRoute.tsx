import React from 'react'
import { Navigation } from './Navigation'

interface CustomRouteProps{
    children: React.ReactNode
}

export const CustomRoute = (props: CustomRouteProps) => {

    return(
        <div className='d-flex flex-column vh-100'>
            <Navigation />
            {props.children}
        </div>
    )
}