import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Loader from './components/Loader'
import ProtectedRoute from './components/ProtectedRoute'
import Projects from './pages/Projects'
import Login from './components/Login'
import Register from './components/Register'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import NotFound404 from './components/NotFound404'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<AuthenticatedRoute><Login /></AuthenticatedRoute>} />
        <Route path='/register' element={<AuthenticatedRoute><Register /></AuthenticatedRoute>} />
        <Route path='/' element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path='/project/:id' element={<ProtectedRoute><Loader /></ProtectedRoute>} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </Router>
  )
}

export default App
