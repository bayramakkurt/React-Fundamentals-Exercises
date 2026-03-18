import { useEffect } from 'react'
import './App.css'
import PageContainer from '../src/container/PageContainer';
import Header from '../src/components/Header';
import RouterConfig from './config/RouterConfig';
import Loading from './components/Loading';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateBasket, removeFromBasket, setDrawer } from './redux/slices/basketSlice';

function App() {  

  const {products, drawer, totalAmount} = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [products])

  return (
    <div>
      <PageContainer>
        <Header/>
        <RouterConfig/>
        <Loading/>
        <Drawer open={drawer} onClose={() => dispatch(setDrawer())} anchor='right'>
          <div
            style={{
              width: 380,
              maxWidth: '95vw',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%)'
            }}
          >
            <div
              style={{
                padding: '18px 16px',
                borderBottom: '1px solid #e5edff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                background: '#ffffff',
                zIndex: 2
              }}
            >
              <h3 style={{ margin: 0, fontSize: 18, color: '#1a2a4a' }}>Sepetim ({products.length})</h3>
              <button
                onClick={() => dispatch(setDrawer())}
                style={{
                  border: 'none',
                  background: '#eef3ff',
                  color: '#2b4db7',
                  padding: '8px 10px',
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Kapat
              </button>
            </div>

            <div style={{ padding: 12, overflowY: 'auto', flex: 1 }}>
              {products.length === 0 ? (
                <div
                  style={{
                    marginTop: 20,
                    border: '1px dashed #d5e0ff',
                    borderRadius: 14,
                    padding: 20,
                    textAlign: 'center',
                    color: '#60719a',
                    background: '#fbfcff'
                  }}
                >
                  Sepetiniz bos. Urun ekleyerek baslayabilirsiniz.
                </div>
              ) : (
                products.map((product) => (
                  <div
                    key={product.id}
                    style={{
                      display: 'flex',
                      gap: 12,
                      border: '1px solid #e5edff',
                      borderRadius: 14,
                      padding: 10,
                      marginBottom: 10,
                      background: '#ffffff',
                      boxShadow: '0 8px 20px rgba(22, 45, 120, 0.06)'
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ width: 72, height: 72, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 700,
                          color: '#1a2a4a',
                          fontSize: 14,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {product.title}
                      </p>
                      <p style={{ margin: '6px 0 0', color: '#6d7fa8', fontSize: 12 }}>
                        Adet: {product.quantity}
                      </p>
                      <p style={{ margin: '4px 0 0', color: '#2b4db7', fontWeight: 700, fontSize: 14 }}>
                        ${(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromBasket(product.id))}
                      style={{
                        border: 'none',
                        background: '#ffe7ea',
                        color: '#c62f49',
                        borderRadius: 10,
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: '8px 10px',
                        height: 'fit-content'
                      }}
                    >
                      Sil
                    </button>
                  </div>
                ))
              )}
            </div>

            <div
              style={{
                borderTop: '1px solid #e5edff',
                padding: 16,
                position: 'sticky',
                bottom: 0,
                background: '#ffffff'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ color: '#5f7098', fontWeight: 600 }}>Total Amount</span>
                <span style={{ color: '#15338d', fontWeight: 800, fontSize: 22 }}>${totalAmount.toFixed(2)}</span>
              </div>
              <button
                style={{
                  width: '100%',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: '#ffffff',
                  background: 'linear-gradient(135deg, #2f67ff 0%, #1d43b8 100%)'
                }}
              >
                Siparisi Tamamla
              </button>
            </div>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  )
}

export default App
