import React, { useState } from 'react';
import './SweetCard.css';

const SweetCard = ({ sweet, onPurchase, onDelete, onRestock, isAdmin }) => {
  const [purchaseQty, setPurchaseQty] = useState(1);
  const [restockQty, setRestockQty] = useState(10);
  const [showActions, setShowActions] = useState(false);

  const handlePurchase = () => {
    if (purchaseQty > 0 && purchaseQty <= sweet.quantity) {
      onPurchase(sweet._id, purchaseQty);
      setPurchaseQty(1);
    }
  };

  const handleRestock = () => {
    if (restockQty > 0) {
      onRestock(sweet._id, restockQty);
      setRestockQty(10);
    }
  };

  return (
    <div className="sweet-card">
      <div className="sweet-image">
        {sweet.imageUrl ? (
          <img src={sweet.imageUrl} alt={sweet.name} />
        ) : (
          <div className="sweet-placeholder">🍬</div>
        )}
        {sweet.quantity === 0 && (
          <div className="out-of-stock-badge">Out of Stock</div>
        )}
      </div>

      <div className="sweet-details">
        <h3>{sweet.name}</h3>
        <p className="sweet-category">{sweet.category}</p>
        {sweet.description && (
          <p className="sweet-description">{sweet.description}</p>
        )}
        
        <div className="sweet-footer">
          <div className="sweet-info">
            <span className="sweet-price">${sweet.price.toFixed(2)}</span>
            <span className={`sweet-stock ${sweet.quantity < 10 ? 'low-stock' : ''}`}>
              Stock: {sweet.quantity}
            </span>
          </div>

          <div className="purchase-section">
            <div className="quantity-control">
              <button 
                onClick={() => setPurchaseQty(Math.max(1, purchaseQty - 1))}
                disabled={sweet.quantity === 0}
              >
                -
              </button>
              <input 
                type="number" 
                value={purchaseQty}
                onChange={(e) => setPurchaseQty(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={sweet.quantity}
                disabled={sweet.quantity === 0}
              />
              <button 
                onClick={() => setPurchaseQty(Math.min(sweet.quantity, purchaseQty + 1))}
                disabled={sweet.quantity === 0}
              >
                +
              </button>
            </div>
            <button 
              className="btn-purchase"
              onClick={handlePurchase}
              disabled={sweet.quantity === 0}
            >
              {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
            </button>
          </div>

          {isAdmin && (
            <div className="admin-actions">
              <button 
                className="btn-toggle-actions"
                onClick={() => setShowActions(!showActions)}
              >
                Admin Actions {showActions ? '▲' : '▼'}
              </button>
              
              {showActions && (
                <div className="admin-panel">
                  <div className="restock-section">
                    <input 
                      type="number"
                      value={restockQty}
                      onChange={(e) => setRestockQty(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      placeholder="Qty"
                    />
                    <button 
                      className="btn-restock"
                      onClick={handleRestock}
                    >
                      Restock
                    </button>
                  </div>
                  <button 
                    className="btn-delete"
                    onClick={() => onDelete(sweet._id)}
                  >
                    Delete Sweet
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetCard;