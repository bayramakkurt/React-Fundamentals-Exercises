import React from 'react'
import '../css/Product.css'
import { useNavigate } from 'react-router-dom';

function Product({product}) {
   const {
    id,
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
    dimensions: { depth, height, width },
    images,
    thumbnail,
    tags,
    shippingInformation,
    warrantyInformation,
    returnPolicy,
    meta: { barcode, createdAt, updatedAt, qrCode },
    reviews,
    sku,
    weight
    } = product;

    const navigate = useNavigate();
  return (
    <div className="product-card" key={id}>
      <div className="product-image-wrapper">
        <img
          src={images[0] || thumbnail}
          alt={title}
          className="product-image"
        />
        {discountPercentage > 0 && (
          <div className="product-discount-badge">-{discountPercentage.toFixed(0)}%</div>
        )}
        <span className={`product-stock-badge ${stock > 0 ? "in-stock" : "out-of-stock"}`}>
          {stock > 0 ? "Stokta" : "Tükendi"}
        </span>
      </div>

      <div className="product-content">
        <p className="product-brand">{brand}</p>
        <h3 className="product-title">{title}</h3>

        <p className="product-description">
          {description.length > 75 ? description.slice(0, 75) + "..." : description}
        </p>

        <div className="product-rating">
          <span className="rating-star">⭐ {rating.toFixed(1)}</span>
        </div>

        <div className="product-tags">
          {tags.slice(0, 2).map((tag) => (
            <span key={tag} className="product-tag">{tag}</span>
          ))}
        </div>

        <div className="product-footer">
          <div className="product-price-section">
            <span className="product-original-price">${(price / (1 - discountPercentage / 100)).toFixed(2)}</span>
            <span className="product-price">${price.toFixed(2)}</span>
          </div>
          <button 
            onClick={() => navigate("/product-details/" + id)} 
            className="product-btn"
          >
            Detaya Git
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product