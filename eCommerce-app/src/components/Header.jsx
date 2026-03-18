import React, { useState } from 'react'
import '../css/Header.css';
import logo from '../images/ecommerce-logo.png';
import { RiShoppingBasketFill } from "react-icons/ri";
import { MdOutlineLightMode } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';
import { setSearchTerm } from '../redux/slices/productSlice';

function Header() {

  const [theme, setTheme] = useState(true);

  const navigate = useNavigate();

  const {products} = useSelector((store) => store.basket)
  const {searchTerm} = useSelector((store) => store.product)

  const dispatch = useDispatch();

  const changeTheme = () => {
  
    const root  = document.getElementById('root');
    if(theme){
      root.style.backgroundColor = 'black';
      root.style.color = 'white';
    }else{
      root.style.backgroundColor = 'white';
      root.style.color = 'black';
    }
    setTheme(!theme);
  }


  return (
    <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <div className='flex-row' onClick={() => navigate('/') } style={{cursor:'pointer'}}>
            <img src={logo} className='logo'/>
            <p className='logo-text'>E-Commerce React</p>
        </div>

        <div className='flex-row'>
            <input
              type="text"
              className='search-input'
              placeholder='Arama Yap...'
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
            <div>
              {theme ? <MdOutlineLightMode onClick={changeTheme} className='icon' /> : <IoMoon onClick={changeTheme} className='icon'/>}
              <Badge onClick={() => dispatch(setDrawer())} badgeContent={products.length} color="success">
                <RiShoppingBasketFill  className='icon'/>
              </Badge>
              
            </div>
        </div>
    </div>
  )
}

export default Header