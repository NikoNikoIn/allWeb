import SideBar from './components/SideBar'
import {
    BrowserRouter, 
    Routes, 
    Route 
} from 'react-router-dom'
import Home from './routes/Home.tsx'
import ToDo from './routes/ToDo.tsx'
import Error from './routes/Error.tsx'
import Money from './routes/Money.tsx'
import './App.scss'  


function App() {
    return ( 
        <BrowserRouter>
            <SideBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='todo' element={<ToDo />} />
                <Route path='money' element={<Money />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App