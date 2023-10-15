import React from 'react'
import SideBar from './components/SideBar'
import {
    BrowserRouter, 
    Routes, 
    Route 
} from 'react-router-dom'
import Home from './routes/Home'
import ToDo from './routes/ToDo'
import Error from './routes/Error'


function App() {
    return ( 
        <BrowserRouter>
            <SideBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="todo" element={<ToDo />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App