// frontend/src/components/hungerSystem.jsx

// Food configuration for each page
export const PAGE_FOODS = {
  'projects': { emoji: '🍎', name: 'Apple', color: '#ff6b6b' },
  'github-projects': { emoji: '🍕', name: 'Pizza', color: '#ffa500' },
  'about': { emoji: '🍔', name: 'Burger', color: '#32cd32' },
  'skills': { emoji: '🧁', name: 'Cupcake', color: '#ff69b4' },
  'contact': { emoji: '🍓', name: 'Strawberry', color: '#ff1493' },
  'weather': { emoji: '☕', name: 'Coffee', color: '#8b4513' },
  'news': { emoji: '🍰', name: 'Cake', color: '#dda0dd' }
};

// Pages that have food icons
export const FOOD_PAGES = Object.keys(PAGE_FOODS);

// Hunger level constants
export const HUNGER_LEVELS = {
  STARVING: { min: 0, max: 25, state: 'starving' },
  HUNGRY: { min: 26, max: 50, state: 'hungry' },
  SATISFIED: { min: 51, max: 75, state: 'satisfied' },
  FULL: { min: 76, max: 100, state: 'full' }
};

// Points per food item (7 foods total = ~14% each for 100%)
export const FOOD_POINTS = Math.floor(100 / FOOD_PAGES.length);

// Storage keys
const STORAGE_KEYS = {
  HUNGER_LEVEL: 'bot_hunger_level',
  COLLECTED_FOODS: 'bot_collected_foods',
  LAST_RESET: 'bot_last_reset'
};

// Get current hunger level from localStorage
export const getHungerLevel = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.HUNGER_LEVEL);
  return stored ? parseInt(stored, 10) : 0;
};

// Set hunger level in localStorage
export const setHungerLevel = (level) => {
  const clampedLevel = Math.max(0, Math.min(100, level));
  localStorage.setItem(STORAGE_KEYS.HUNGER_LEVEL, clampedLevel.toString());
  return clampedLevel;
};

// Get collected foods from localStorage
export const getCollectedFoods = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.COLLECTED_FOODS);
  return stored ? JSON.parse(stored) : [];
};

// Set collected foods in localStorage
export const setCollectedFoods = (foods) => {
  localStorage.setItem(STORAGE_KEYS.COLLECTED_FOODS, JSON.stringify(foods));
  return foods;
};

// Check if food is already collected for a page
export const isFoodCollected = (page) => {
  const collectedFoods = getCollectedFoods();
  return collectedFoods.includes(page);
};

// Collect food for a page
export const collectFood = (page) => {
  if (!PAGE_FOODS[page] || isFoodCollected(page)) {
    return { success: false, message: 'Food already collected or invalid page' };
  }

  const collectedFoods = getCollectedFoods();
  const newCollectedFoods = [...collectedFoods, page];
  setCollectedFoods(newCollectedFoods);

  const currentHunger = getHungerLevel();
  const newHunger = setHungerLevel(currentHunger + FOOD_POINTS);

  return {
    success: true,
    food: PAGE_FOODS[page],
    newHungerLevel: newHunger,
    totalCollected: newCollectedFoods.length,
    isFullyFed: newHunger >= HUNGER_LEVELS.FULL.min
  };
};

// Get current hunger state
export const getHungerState = (hungerLevel = null) => {
  const level = hungerLevel !== null ? hungerLevel : getHungerLevel();
  
  for (const [key, config] of Object.entries(HUNGER_LEVELS)) {
    if (level >= config.min && level <= config.max) {
      return config.state;
    }
  }
  return 'hungry'; // default fallback
};

// Check if page has food available
export const hasFood = (page) => {
  return FOOD_PAGES.includes(page) && !isFoodCollected(page);
};

// Get food for specific page
export const getPageFood = (page) => {
  return PAGE_FOODS[page] || null;
};

// Reset hunger system
export const resetHungerSystem = () => {
  localStorage.removeItem(STORAGE_KEYS.HUNGER_LEVEL);
  localStorage.removeItem(STORAGE_KEYS.COLLECTED_FOODS);
  localStorage.setItem(STORAGE_KEYS.LAST_RESET, new Date().toISOString());
  
  return {
    hungerLevel: 0,
    collectedFoods: [],
    hungerState: 'starving'
  };
};

// Get hunger status summary
export const getHungerStatus = () => {
  const hungerLevel = getHungerLevel();
  const collectedFoods = getCollectedFoods();
  const hungerState = getHungerState(hungerLevel);
  
  return {
    hungerLevel,
    hungerState,
    collectedFoods,
    totalFoods: FOOD_PAGES.length,
    remainingFoods: FOOD_PAGES.length - collectedFoods.length,
    isFullyFed: hungerLevel >= HUNGER_LEVELS.FULL.min,
    availablePages: FOOD_PAGES.filter(page => !collectedFoods.includes(page))
  };
};

// Get hunger-aware messages - UPDATED with better flow
export const getHungerMessage = (currentPage) => {
  const status = getHungerStatus();
  const { hungerState, hungerLevel, remainingFoods, isFullyFed, collectedFoods } = status;

  // Homepage specific messages - only show after page messages are done
  if (currentPage === 'portfolio') {
    if (collectedFoods.length === 0) {
      return "I'm hungry! 🥺 Please collect food from different pages! Start with Projects! 🍎";
    } else if (remainingFoods > 0) {
      return `Great! You fed me ${collectedFoods.length} time${collectedFoods.length > 1 ? 's' : ''}! 😊 Look for ${remainingFoods} more foods on other pages!`;
    } else {
      return "Thank you for feeding me completely! I'm so happy and full! 😍💖";
    }
  }

  // Don't show hunger messages on pages - let the greeting handle it first
  return null;
};

// Get collection guidance message - NEW
export const getCollectionGuidanceMessage = (currentPage, totalCollected) => {
  const availablePages = FOOD_PAGES.filter(page => !isFoodCollected(page));
  
  if (availablePages.length === 0) {
    return "Amazing! You found all the food! I'm completely satisfied! 😍💖";
  }

  // Suggest next pages to visit
  const nextPages = availablePages.slice(0, 2);
  const pageNames = nextPages.map(page => {
    switch(page) {
      case 'projects': return 'Projects';
      case 'github-projects': return 'GitHub Projects';
      case 'about': return 'About';
      case 'skills': return 'Skills';
      case 'contact': return 'Contact';
      case 'weather': return 'Weather';
      case 'news': return 'News';
      default: return page;
    }
  });

  if (pageNames.length === 1) {
    return `Look in ${pageNames[0]} for more food! 𓌉◯𓇋`;
  } else {
    return `Look in ${pageNames[0]} or ${pageNames[1]} for more food! 🍽️`;
  }
};

// Get celebration message for food collection
export const getCelebrationMessage = (food, newHungerLevel) => {
  const celebrations = [
    `Yummy! Thanks for the ${food.name}! ${food.emoji}`,
    `Delicious ${food.name}! ${food.emoji} Nom nom!`,
    `So tasty! I love ${food.name}! ${food.emoji}`,
    `Thank you! That ${food.name} was perfect! ${food.emoji}`
  ];
  
  const message = celebrations[Math.floor(Math.random() * celebrations.length)];
  
  if (newHungerLevel >= HUNGER_LEVELS.FULL.min) {
    return `${message} I'm completely full now! 😍💖`;
  }
  
  return message;
};

// Auto-reset system (optional - resets hunger after 24 hours)
export const checkAutoReset = () => {
  const lastReset = localStorage.getItem(STORAGE_KEYS.LAST_RESET);
  if (!lastReset) {
    localStorage.setItem(STORAGE_KEYS.LAST_RESET, new Date().toISOString());
    return false;
  }
  
  const resetDate = new Date(lastReset);
  const now = new Date();
  const hoursSinceReset = (now - resetDate) / (1000 * 60 * 60);
  
  // Auto-reset after 24 hours
  if (hoursSinceReset >= 24) {
    resetHungerSystem();
    return true;
  }
  
  return false;
};