import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../redux/slices/appSlice'
import productReducer from '../redux/slices/productSlice'
import basketReducer from '../redux/slices/basketSlice'

//State Management için store oluşturduk. Reducer'ları burada tanımlayacağız.
export default configureStore({
  reducer: {
    //Reducer'larımızı burada tanımlıyoruz. Reducer'larımızı import edip buraya ekleyeceğiz.
    app: appReducer,
    product: productReducer,
    basket: basketReducer
  }
})

