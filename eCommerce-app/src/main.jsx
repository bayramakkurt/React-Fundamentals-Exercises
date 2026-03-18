
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.jsx'
import { BrowserRouter } from 'react-router-dom'

//Redux store'umuza erişebilmek için Provider ile App'i sarmalıyoruz. Store'u Provider'a prop olarak veriyoruz.
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>

    </Provider>
)
