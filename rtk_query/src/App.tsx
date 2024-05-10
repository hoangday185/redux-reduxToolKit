import { ToastContainer } from 'react-toastify'
import './App.css'
import Blog from './pages/blog'
import { Fragment } from 'react/jsx-runtime'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Blog />
    </Fragment>
  )
}

export default App
