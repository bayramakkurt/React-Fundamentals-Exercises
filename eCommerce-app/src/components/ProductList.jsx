import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'
import Product from './Product'

function ProductList() {

    const dispatch = useDispatch()
  const {products = [], searchTerm = ''} = useSelector((store) => store.product)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    const filteredProducts = products.filter((product) => {
      const normalizedSearch = String(searchTerm).trim().toLowerCase();
      if (!normalizedSearch) return true;

      const title = String(product?.title || '').toLowerCase();

      return title.includes(normalizedSearch);
    });

  return (
    <div className='flex-row' style={{flexWrap:'wrap', gap: '24px', marginTop:'50px', padding: '0 20px', justifyContent: 'center'}}>
        {
            filteredProducts && filteredProducts.map((product) => <Product key={product.id} product={product}/>)
        }
    </div>
  )
}

export default ProductList