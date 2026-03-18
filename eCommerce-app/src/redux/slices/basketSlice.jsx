import { createSlice } from "@reduxjs/toolkit";


const getFromBasketToLocalStorage = () => {
    const basket = localStorage.getItem('basket');
    if (basket) {
        return JSON.parse(basket);
    } else {
        return [];
    }
}

const initialState = {
    products : getFromBasketToLocalStorage(),
    drawer: false,
    totalAmount: 0
}

const writeFromBasketToLocalStorage = (basket) => {
    localStorage.setItem('basket', JSON.stringify(basket));
}



export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.products && state.products.find((p) => p.id === action.payload.id);
            if (findProduct) {
                const extractedProduct = state.products.filter((product) => product.id !== action.payload.id);
                findProduct.quantity += action.payload.quantity;
                state.products = [...extractedProduct, findProduct];
                writeFromBasketToLocalStorage(state.products);
            }else{
                state.products = [...state.products, {...action.payload}];
                writeFromBasketToLocalStorage(state.products);
            }
        },

        removeFromBasket: (state, action) => {
            state.products = state.products.filter((product) => product.id !== action.payload);
            writeFromBasketToLocalStorage(state.products);
        },

        setDrawer: (state) => {
            state.drawer = !state.drawer;
        },

        calculateBasket: (state) => {
            state.totalAmount = 0;
            state.products.forEach((product) => {
                state.totalAmount += product.price * product.quantity;
            });
        }
    },
    extraReducers: (builder) => {}
})

export const {addToBasket, removeFromBasket, setDrawer, calculateBasket} = basketSlice.actions
export default basketSlice.reducer 

