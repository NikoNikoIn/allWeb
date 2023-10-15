import React from 'react'
import SideBar from './components/SideBar'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from 'react-router-dom'
import Home from './routes/Home'
import ToDo from './routes/ToDo'
import Error from './routes/Error'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/todo',
        element: <ToDo />
    },
    {
        path: '*',
        element: <Error />
    }
])

function App() {
    return ( 
        <div>
            <SideBar />
            <RouterProvider router={router} />
        </div>
    )
}

export default App