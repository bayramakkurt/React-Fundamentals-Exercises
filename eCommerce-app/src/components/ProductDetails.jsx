import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedProduct } from '../redux/slices/productSlice';
import '../css/ProductDetails.css'
import { addToBasket } from '../redux/slices/basketSlice';

function ProductDetails() {
    const {id} = useParams();
    const {products, selectedProduct} = useSelector((store) => store.product)
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const { 
    title, 
    description, 
    category, 
    price, 
    discountPercentage, 
    rating, 
    stock, 
    brand, 
    availabilityStatus, 
    minimumOrderQuantity, 
    dimensions: { depth, height, width } = {}, 
    images = [], 
    thumbnail, 
    tags = [], 
    shippingInformation, 
    warrantyInformation, 
    returnPolicy, 
    meta: { barcode, createdAt, updatedAt, qrCode } = {}, 
    reviews = [], 
    sku, 
    weight 
    } = selectedProduct || {};

    useEffect(() => {
        getProductById();
    }, [id])

    const getProductById = () =>{
        const product = products.find((p) => p.id == id);
        if (product) {
            dispatch(setSelectedProduct(product));
        }
    }

    const addBasket = () => {
        const payload = {
            id,
            title,
            price,
            description,
            image: images[0] || thumbnail,
            quantity
        }
        dispatch(addToBasket(payload));
    }       

  return (
    <div className="detail-container">
      {/* SOL: Görseller */}
      <div className="detail-left">
        <div className="detail-image-wrapper">
          <img
            src={images[0] || thumbnail}
            alt={title}
            className="detail-main-image"
          />
          <span className="detail-discount-badge">-{discountPercentage}%</span>
        </div>

        <div className="detail-image-list">
          {images.map((img, i) => (
            <img key={i} src={img} alt={`${title} ${i + 1}`} className="detail-thumb" />
          ))}
        </div>
      </div>

      {/* SAĞ: Ürün bilgileri */}
      <div className="detail-right">
        <div className="detail-header">
          <p className="detail-brand">{brand}</p>
          <p className={`detail-stock-badge ${stock > 0 ? "in-stock" : "out-stock"}`}>
            {availabilityStatus}
          </p>
        </div>

        <h1 className="detail-title">{title}</h1>

        <div className="detail-rating-section">
          <span className="detail-rating">⭐ {rating}</span>
          <span className="detail-divider">•</span>
          <span className="detail-reviews-count">{reviews.length} yorum</span>
        </div>

        <div className="detail-price-section">
          <span className="detail-original-price">${(price / (1 - discountPercentage / 100)).toFixed(2)}</span>
          <span className="detail-price">${price}</span>
        </div>

        <p className="detail-description">{description}</p>

        {/* TAGS */}
        {tags.length > 0 && (
          <div className="detail-tags">
            {tags.map((tag) => (
              <span key={tag} className="detail-tag-item">{tag}</span>
            ))}
          </div>
        )}

        {/* QUANTITY & BUTTONS */}
        <div className="detail-actions">
          <div className="quantity-control">
            <button 
              className="qty-btn minus"
              onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
            >
              −
            </button>
            <input 
              type="number" 
              className="qty-input" 
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val > 0 && val <= stock) setQuantity(val);
              }}
              min="1"
              max={stock}
            />
            <button 
              className="qty-btn plus"
              onClick={() => setQuantity(prev => prev < stock ? prev + 1 : stock)}
            >
              +
            </button>
          </div>
          <button onClick={addBasket} className="detail-btn-primary">🛒 Sepete Ekle ({quantity})</button>
        </div>

        {/* EXTRA INFO */}
        <div className="detail-specs">
          <div className="spec-row">
            <span className="spec-label">📦 Kategori</span>
            <span className="spec-value">{category}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">🏷️ SKU</span>
            <span className="spec-value">{sku}</span>
          </div>
          {weight && (
            <div className="spec-row">
              <span className="spec-label">⚖️ Ağırlık</span>
              <span className="spec-value">{weight}g</span>
            </div>
          )}
          {width && (
            <div className="spec-row">
              <span className="spec-label">📐 Boyut</span>
              <span className="spec-value">{width} x {height} x {depth}cm</span>
            </div>
          )}
          {shippingInformation && (
            <div className="spec-row">
              <span className="spec-label">🚚 Kargo</span>
              <span className="spec-value">{shippingInformation}</span>
            </div>
          )}
          {warrantyInformation && (
            <div className="spec-row">
              <span className="spec-label">✅ Garanti</span>
              <span className="spec-value">{warrantyInformation}</span>
            </div>
          )}
          {returnPolicy && (
            <div className="spec-row">
              <span className="spec-label">↩️ İade</span>
              <span className="spec-value">{returnPolicy}</span>
            </div>
          )}
        </div>
      </div>

      {/* ALT: Yorumlar */}
      <div className="detail-reviews">
        <div className="reviews-header">
          <h2>📝 Müşteri Yorumları</h2>
          <p className="reviews-summary">
            Toplam <strong>{reviews.length}</strong> yorum · Ortalama ⭐ <strong>{rating}</strong>
          </p>
        </div>

        <div className="reviews-list">
          {reviews && reviews.length > 0 ? (
            reviews.map((rev, i) => (
              <div key={i} className="review-card">
                <div className="review-header">
                  <p className="review-name">{rev.reviewerName}</p>
                  <span className="review-rating">⭐ {rev.rating}</span>
                </div>
                <p className="review-comment">{rev.comment}</p>
              </div>
            ))
          ) : (
            <p className="no-reviews">Henüz yorum yok. İlk yorum yapan siz olun!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails