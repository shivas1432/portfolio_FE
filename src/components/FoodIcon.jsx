// frontend/src/components/FoodIcon.jsx

import React, { useState, useEffect } from 'react';
import { getPageFood, collectFood, hasFood } from './hungerSystem';

const FoodIcon = ({ currentPage, onFoodCollected }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCollecting, setIsCollecting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');

  // Check if this page has food and show/hide accordingly
  useEffect(() => {
    setIsVisible(hasFood(currentPage));
  }, [currentPage]);

  // Don't render if no food available
  if (!isVisible) {
    return null;
  }

  const food = getPageFood(currentPage);
  if (!food) {
    return null;
  }

  const handleFoodClick = async () => {
    if (isCollecting) return;

    setIsCollecting(true);

    // Collect the food
    const result = collectFood(currentPage);

    if (result.success) {
      // Show celebration animation
      setCelebrationMessage(`+${result.food.name}! ${result.food.emoji}`);
      setShowCelebration(true);

      // Notify parent component
      if (onFoodCollected) {
        onFoodCollected(result);
      }

      // Hide food icon after collection animation
      setTimeout(() => {
        setIsVisible(false);
      }, 500);

      // Hide celebration message
      setTimeout(() => {
        setShowCelebration(false);
      }, 1500);
    }

    setIsCollecting(false);
  };

  return (
    <>
      {/* Food Icon */}
      <div className="food-icon-container">
        <div
          className={`food-icon ${currentPage}-page ${isCollecting ? 'food-collected' : ''}`}
          onClick={handleFoodClick}
          style={{
            cursor: isCollecting ? 'not-allowed' : 'pointer',
            opacity: isCollecting ? 0.7 : 1
          }}
          title={`Click to collect ${food.name}! Feed the hungry bot! 🤖`}
        >
          {food.emoji}
        </div>
      </div>

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="collection-celebration">
          <div className="celebration-text">
            {celebrationMessage}
          </div>
        </div>
      )}
    </>
  );
};

export default FoodIcon;