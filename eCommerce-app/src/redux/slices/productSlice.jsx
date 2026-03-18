import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

//Product Slice'ımızı oluşturuyoruz. Reducer'larımızı ve initialState'imizi burada tanımlayacağız.
//initialState: Uygulamanın ilk açılışında product ile ilgili hangi verilerin nasıl görüneceğini tanımladığımız obje.
const initialState = {
    products: [],
    selectedProduct: {},
    loading: false,
    searchTerm: ''
}

const BASE_URL = 'https://dummyjson.com/';

export const getAllProducts = createAsyncThunk(
    'getAllProducts',
    async () => {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
    }
)



//createSlice fonksiyonu ile productSlice'ımızı oluşturuyoruz. Reducer'larımızı ve extraReducer'larımızı burada tanımlayacağız.
//reducers: state'i değiştirecek fonksiyonları tanımladığımız obje. extraReducers: createAsyncThunk ile oluşturduğumuz async action'ların state'i nasıl değiştireceğini tanımladığımız fonksiyon.(API çağrıları için kullanacağız.)
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    },
    extraReducers: (builder) => {
        //getAllProducts action'ının pending durumunda loading'i true yapıyoruz. API çağrısı başladığında kullanıcıya bir yükleniyor göstermek isteyebiliriz.
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true;
        })
        //getAllProducts action'ının fulfilled durumunda loading'i false yapıyoruz ve products array'ini API'den gelen verilerle dolduruyoruz.
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
        })  
    }
})

//Reducer'larımızı export ediyoruz ki store'umuzda kullanabilelim.
export const {setSelectedProduct, setSearchTerm} = productSlice.actions
export default productSlice.reducer