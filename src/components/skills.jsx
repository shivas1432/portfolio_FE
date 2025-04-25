import React, { useState, useEffect, useRef } from 'react';

function Skills() {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [positions, setPositions] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Define skills with professional tech stack icons and labels
  const skills = {
    blue: [ // Frontend Technologies
      { icon: "brand-html5", label: "" },
      { icon: "brand-css3", label: "" },
      { icon: "brand-javascript", label: "" },
      { icon: "brand-react", label: "" },
      { icon: "brand-tailwind", label: "" }
    ],
    yellow: [ // Tools & DevOps
      { icon: "brand-git", label: "" },
      { icon: "brand-github", label: "" },
      { icon: "brand-visual-studio", label: "" },
      { icon: "brand-npm", label: "" }
    ],
    orange: [ // Backend Technologies
      { icon: "brand-nodejs", label: "" },
      { icon: "brand-python", label: "" },
      { icon: "api", label: "" },
      { icon: "server", label: "" }
    ],
    green: [ // Databases
      { icon: "brand-mongodb", label: "" },
      { icon: "sql", label: "" },
      { icon: "database", label: "" },
      { icon: "database-cog", label: "" }
    ]
  };

  // Define initial positions that look like the first image
  const initialLayout = [
    // Green bubbles (Databases - scattered around)
    { color: "green", icon: "brand-mongodb", x: 25, y: 20 },
    { color: "green", icon: "sql", x: 75, y: 20 },
    { color: "green", icon: "database", x: 15, y: 50 },
    { color: "green", icon: "database-cog", x: 60, y: 60 },
    
    // Yellow bubbles (Tools)
    { color: "yellow", icon: "brand-git", x: 45, y: 15 },
    { color: "yellow", icon: "brand-github", x: 80, y: 90 },
    { color: "yellow", icon: "brand-visual-studio", x: 40, y: 50 },
    { color: "yellow", icon: "brand-npm", x: 25, y: 85 },
    
    // Orange bubbles (Backend)
    { color: "orange", icon: "brand-nodejs", x: 70, y: 40 },
    { color: "orange", icon: "brand-python", x: 85, y: 70 },
    { color: "orange", icon: "api", x: 20, y: 85 },
    { color: "orange", icon: "server", x: 55, y: 30 },
    
    // Blue bubbles (Frontend - scattered)
    { color: "blue", icon: "brand-html5", x: 40, y: 40 },
    { color: "blue", icon: "brand-css3", x: 15, y: 80 },
    { color: "blue", icon: "brand-javascript", x: 50, y: 80 },
    { color: "blue", icon: "brand-react", x: 80, y: 80 },
    { color: "blue", icon: "brand-tailwind", x: 65, y: 50 }
  ];
  
  // Handle window resizing
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      
      // Reset positions on resize
      setInitialized(false);
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (!containerRef.current || initialized) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    // Convert percentage positions to actual pixels
    const actualPositions = initialLayout.map(item => ({
      ...item,
      x: (item.x / 100) * width,
      y: (item.y / 100) * height
    }));
    
    setPositions(actualPositions);
    setInitialized(true);
  }, [initialized, windowSize]); // Re-initialize when window size changes

  // Get organized position for when hovered
  const getOrganizedPosition = (skill, index, category) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    
    const centerX = containerRef.current.clientWidth / 2;
    const centerY = containerRef.current.clientHeight / 2;
    
    // Scaling factor for different screen sizes
    const getScaleFactor = () => {
      const width = windowSize.width;
      if (width < 400) return 0.5;
      if (width < 576) return 0.6;
      if (width < 768) return 0.7;
      if (width < 1024) return 0.8;
      if (width < 1440) return 0.9;
      return 1;
    };
    
    // Handle mobile screens with different aspect ratios
    const isLandscape = windowSize.width > windowSize.height;
    const isShortScreen = windowSize.height < 500;
    
    const scaleFactor = getScaleFactor();
    
    // Adjust vertical spacing for landscape mode on mobile
    const verticalCompression = isLandscape && isShortScreen ? 0.6 : 1;
    
    switch (category) {
      case "blue":
        return { 
          x: centerX - (220 * scaleFactor) + index * (110 * scaleFactor), 
          y: centerY - (200 * scaleFactor * verticalCompression)
        };
      case "yellow":
        return { 
          x: centerX - (200 * scaleFactor), 
          y: centerY - (120 * scaleFactor * verticalCompression) + index * (80 * scaleFactor * verticalCompression)
        };
      case "orange":
        return { 
          x: centerX + (200 * scaleFactor), 
          y: centerY - (120 * scaleFactor * verticalCompression) + index * (80 * scaleFactor * verticalCompression)
        };
      case "green":
        return { 
          x: centerX - (170 * scaleFactor) + index * (110 * scaleFactor), 
          y: centerY + (200 * scaleFactor * verticalCompression)
        };
      default:
        return { x: centerX, y: centerY };
    }
  };

  // Get icon element based on icon name
  const getIcon = (iconName) => {
    const iconSize = windowSize.width < 576 ? 18 : 
                     windowSize.width < 768 ? 20 : 
                     windowSize.width < 1024 ? 22 : 24;
                     
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={iconSize} height={iconSize} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <use href={`https://cdn.jsdelivr.net/npm/@tabler/icons@2.40.0/tabler-sprite.svg#tabler-${iconName}`} />
      </svg>
    );
  };

  // Draw curved paths
  const getCurvedPath = (startX, startY, endX, endY, curveDirection) => {
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    
    // Scale curve intensity based on screen size
    const getCurveIntensity = () => {
      const width = windowSize.width;
      if (width < 576) return 30;
      if (width < 768) return 40;
      if (width < 1024) return 45;
      return 50;
    };
    
    const curveIntensity = getCurveIntensity();
    
    let controlX, controlY;
    
    switch (curveDirection) {
      case "up":
        controlX = midX;
        controlY = midY - curveIntensity;
        break;
      case "down":
        controlX = midX;
        controlY = midY + curveIntensity;
        break;
      case "left":
        controlX = midX - curveIntensity;
        controlY = midY;
        break;
      case "right":
        controlX = midX + curveIntensity;
        controlY = midY;
        break;
      default:
        controlX = midX;
        controlY = midY;
    }
    
    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  };

  // Generate a straight path with gaps
  const getStraightPathWithGaps = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Skip if too close
    const minDistance = windowSize.width < 576 ? 35 : 50;
    if (distance < minDistance) return null;
    
    // Calculate direction vector
    const dirX = dx / distance;
    const dirY = dy / distance;
    
    // Create gaps by starting away from bubbles
    // Scale bubble size based on screen size
    const bubbleRadius = windowSize.width < 576 ? 15 : 
                        windowSize.width < 768 ? 18 : 
                        windowSize.width < 1024 ? 21 : 25;
                        
    const startX = x1 + dirX * bubbleRadius;
    const startY = y1 + dirY * bubbleRadius;
    const endX = x2 - dirX * bubbleRadius;
    const endY = y2 - dirY * bubbleRadius;
    
    return `M ${startX} ${startY} L ${endX} ${endY}`;
  };

  // Determine if we should create a connection between two bubbles
  const shouldConnect = (bubble1, bubble2) => {
    // For initial state, connect if they're the same color or reasonably close
    if (!hovered) {
      const dx = bubble1.x - bubble2.x;
      const dy = bubble1.y - bubble2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Scale connection distance based on screen size
      const maxDistance = windowSize.width < 576 ? 200 : 
                         windowSize.width < 768 ? 250 : 
                         windowSize.width < 1024 ? 280 : 300;
      const minDistance = windowSize.width < 576 ? 35 : 50;
      
      return (bubble1.color === bubble2.color || distance < maxDistance) && distance > minDistance;
    }
    return false;
  };

  // Get path stroke color based on bubble colors
  const getConnectionColor = (bubble1, bubble2) => {
    if (bubble1.color === bubble2.color) {
      switch (bubble1.color) {
        case "blue": return "rgba(59, 130, 246, 0.2)";
        case "yellow": return "rgba(250, 204, 21, 0.2)";
        case "orange": return "rgba(251, 146, 60, 0.2)";
        case "green": return "rgba(74, 222, 128, 0.2)";
        default: return "rgba(209, 213, 219, 0.2)";
      }
    }
    return "rgba(209, 213, 219, 0.2)"; // Default light connection
  };
  
  // Generate small decoration bubbles
  const renderDecorationBubbles = () => {
    // Adjust number of decoration bubbles based on screen size
    const bubbleCount = windowSize.width < 576 ? 15 : 
                       windowSize.width < 768 ? 20 : 
                       windowSize.width < 1024 ? 25 : 30;
                       
    const bubbles = [];
    for (let i = 0; i < bubbleCount; i++) {
      // Scale size based on screen dimensions
      const maxSize = windowSize.width < 576 ? 4 : 
                     windowSize.width < 768 ? 5 : 
                     windowSize.width < 1024 ? 5.5 : 6;
      
      const size = 2 + Math.random() * maxSize;
      const colors = ["bubble-blue", "bubble-yellow", "bubble-orange", "bubble-green"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      
      bubbles.push(
        <div
          key={`dot-${i}`}
          className={`decoration-bubble ${color}`}
          style={{
            width: size,
            height: size,
            left: left,
            top: top,
            animationDelay: `${i * 0.2}s`
          }}
        />
      );
    }
    return bubbles;
  };

  // Check for touch devices to make interaction more responsive
  const isTouchDevice = typeof window !== 'undefined' ? 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0) : false;

  return (
    <div className="skills-container">
      {/* Add Tabler Icons CDN */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.40.0/tabler-icons.min.css" />
      
      <div 
        ref={containerRef}
        className="skills-network"
        onMouseEnter={() => !isTouchDevice && setHovered(true)}
        onMouseLeave={() => !isTouchDevice && setHovered(false)}
        onClick={() => isTouchDevice && setHovered(!hovered)} // Toggle on touch
      >
        {/* Category labels - only show when hovered */}
        {hovered && (
          <>
            <div className="category-label top-label">FRONTEND TECHNOLOGIES</div>
            <div className="category-label left-label">TOOLS & DEVOPS</div>
            <div className="category-label right-label">BACKEND TECHNOLOGIES</div>
            <div className="category-label bottom-label">DATABASES</div>
          </>
        )}

        {/* Central hub - only when hovered */}
        {hovered && (
          <div className="central-hub blue-bg">
            SKILLS
          </div>
        )}
        
        {/* Connections */}
        <svg className={`connections-svg ${hovered ? 'hidden' : ''}`}>
          {/* Initial connections between bubbles */}
          {positions.map((bubble1, i) => (
            positions.slice(i + 1).map((bubble2, j) => {
              if (shouldConnect(bubble1, bubble2)) {
                const path = getStraightPathWithGaps(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
                if (!path) return null;
                
                return (
                  <path
                    key={`connection-${i}-${j}`}
                    d={path}
                    stroke={getConnectionColor(bubble1, bubble2)}
                    strokeWidth="1"
                    fill="none"
                  />
                );
              }
              return null;
            })
          ))}
        </svg>
        
        {/* Organized connections when hovered */}
        {hovered && (
          <svg className="connections-svg organized">
            <defs>
              <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="rgba(59, 130, 246, 0.5)" />
              </marker>
              <marker id="arrowYellow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="rgba(250, 204, 21, 0.5)" />
              </marker>
              <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="rgba(251, 146, 60, 0.5)" />
              </marker>
              <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="rgba(74, 222, 128, 0.5)" />
              </marker>
            </defs>
            
            {/* Blue connections */}
            {skills.blue.map((_, i) => {
              if (!containerRef.current) return null;
              const centerX = containerRef.current.clientWidth / 2;
              const centerY = containerRef.current.clientHeight / 2;
              const pos = getOrganizedPosition(_, i, "blue");
              
              return (
                <path
                  key={`blue-${i}`}
                  d={getCurvedPath(pos.x, pos.y, centerX, centerY, "up")}
                  className="curved-path blue-path"
                />
              );
            })}
            
            {/* Yellow connections */}
            {skills.yellow.map((_, i) => {
              if (!containerRef.current) return null;
              const centerX = containerRef.current.clientWidth / 2;
              const centerY = containerRef.current.clientHeight / 2;
              const pos = getOrganizedPosition(_, i, "yellow");
              
              return (
                <path
                  key={`yellow-${i}`}
                  d={getCurvedPath(pos.x, pos.y, centerX, centerY, "left")}
                  className="curved-path yellow-path"
                />
              );
            })}
            
            {/* Orange connections */}
            {skills.orange.map((_, i) => {
              if (!containerRef.current) return null;
              const centerX = containerRef.current.clientWidth / 2;
              const centerY = containerRef.current.clientHeight / 2;
              const pos = getOrganizedPosition(_, i, "orange");
              
              return (
                <path
                  key={`orange-${i}`}
                  d={getCurvedPath(pos.x, pos.y, centerX, centerY, "right")}
                  className="curved-path orange-path"
                />
              );
            })}
            
            {/* Green connections */}
            {skills.green.map((_, i) => {
              if (!containerRef.current) return null;
              const centerX = containerRef.current.clientWidth / 2;
              const centerY = containerRef.current.clientHeight / 2;
              const pos = getOrganizedPosition(_, i, "green");
              
              return (
                <path
                  key={`green-${i}`}
                  d={getCurvedPath(pos.x, pos.y, centerX, centerY, "down")}
                  className="curved-path green-path"
                />
              );
            })}
            
            {/* Moving dots along paths */}
            <>
              {/* Blue dots */}
              {skills.blue.map((_, i) => {
                if (!containerRef.current) return null;
                const centerX = containerRef.current.clientWidth / 2;
                const centerY = containerRef.current.clientHeight / 2;
                const pos = getOrganizedPosition(_, i, "blue");
                
                // Adjust number of dots based on screen size
                const dotCount = windowSize.width < 576 ? 2 : 3;
                
                const dots = [];
                for (let j = 0; j < dotCount; j++) {
                  dots.push(
                    <circle
                      key={`blue-dot-${i}-${j}`}
                      r={windowSize.width < 576 ? 2 : 3}
                      className="animated-dot blue-dot"
                      style={{
                        animationDelay: `${j * 1}s`,
                        offset: j * (1/dotCount)
                      }}
                    >
                      <animateMotion
                        path={getCurvedPath(pos.x, pos.y, centerX, centerY, "up")}
                        dur={windowSize.width < 576 ? "4s" : "3s"}
                        begin={`${j * 1}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  );
                }
                return <g key={`blue-dot-group-${i}`}>{dots}</g>;
              })}
              
              {/* Yellow dots */}
              {skills.yellow.map((_, i) => {
                if (!containerRef.current) return null;
                const centerX = containerRef.current.clientWidth / 2;
                const centerY = containerRef.current.clientHeight / 2;
                const pos = getOrganizedPosition(_, i, "yellow");
                
                // Adjust number of dots based on screen size
                const dotCount = windowSize.width < 576 ? 2 : 3;
                
                const dots = [];
                for (let j = 0; j < dotCount; j++) {
                  dots.push(
                    <circle
                      key={`yellow-dot-${i}-${j}`}
                      r={windowSize.width < 576 ? 2 : 3}
                      className="animated-dot yellow-dot"
                      style={{
                        animationDelay: `${j * 1}s`,
                        offset: j * (1/dotCount)
                      }}
                    >
                      <animateMotion
                        path={getCurvedPath(pos.x, pos.y, centerX, centerY, "left")}
                        dur={windowSize.width < 576 ? "4s" : "3s"}
                        begin={`${j * 1}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  );
                }
                return <g key={`yellow-dot-group-${i}`}>{dots}</g>;
              })}
              
              {/* Orange dots */}
              {skills.orange.map((_, i) => {
                if (!containerRef.current) return null;
                const centerX = containerRef.current.clientWidth / 2;
                const centerY = containerRef.current.clientHeight / 2;
                const pos = getOrganizedPosition(_, i, "orange");
                
                // Adjust number of dots based on screen size
                const dotCount = windowSize.width < 576 ? 2 : 3;
                
                const dots = [];
                for (let j = 0; j < dotCount; j++) {
                  dots.push(
                    <circle
                      key={`orange-dot-${i}-${j}`}
                      r={windowSize.width < 576 ? 2 : 3}
                      className="animated-dot orange-dot"
                      style={{
                        animationDelay: `${j * 1}s`,
                        offset: j * (1/dotCount)
                      }}
                    >
                      <animateMotion
                        path={getCurvedPath(pos.x, pos.y, centerX, centerY, "right")}
                        dur={windowSize.width < 576 ? "4s" : "3s"}
                        begin={`${j * 1}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  );
                }
                return <g key={`orange-dot-group-${i}`}>{dots}</g>;
              })}
              
              {/* Green dots */}
              {skills.green.map((_, i) => {
                if (!containerRef.current) return null;
                const centerX = containerRef.current.clientWidth / 2;
                const centerY = containerRef.current.clientHeight / 2;
                const pos = getOrganizedPosition(_, i, "green");
                
                // Adjust number of dots based on screen size
                const dotCount = windowSize.width < 576 ? 2 : 3;
                
                const dots = [];
                for (let j = 0; j < dotCount; j++) {
                  dots.push(
                    <circle
                      key={`green-dot-${i}-${j}`}
                      r={windowSize.width < 576 ? 2 : 3}
                      className="animated-dot green-dot"
                      style={{
                        animationDelay: `${j * 1}s`,
                        offset: j * (1/dotCount)
                      }}
                    >
                      <animateMotion
                        path={getCurvedPath(pos.x, pos.y, centerX, centerY, "down")}
                        dur={windowSize.width < 576 ? "4s" : "3s"}
                        begin={`${j * 1}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  );
                }
                return <g key={`green-dot-group-${i}`}>{dots}</g>;
              })}
            </>
          </svg>
        )}

        {/* Render main bubbles */}
        {positions.map((bubble, i) => {
          const organizedPos = hovered
            ? getOrganizedPosition(bubble, skills[bubble.color].findIndex(skill => skill.icon === bubble.icon), bubble.color)
            : { x: bubble.x, y: bubble.y };
          
          // Get skill label from the skills object
          const skillObject = skills[bubble.color].find(skill => skill.icon === bubble.icon);
          const skillLabel = skillObject ? skillObject.label : bubble.icon;
          
          return (
            <div
              key={`bubble-${i}`}
              className={`skill-bubble ${bubble.color}-bg`}
              style={{
                left: organizedPos.x,
                top: organizedPos.y,
              }}
            >
              <i className={`ti ti-${bubble.icon}`}></i>
              <span className="skill-label">{skillLabel}</span>
            </div>
          );
        })}

        {/* Floating background decoration dots */}
        {renderDecorationBubbles()}
        
        {/* Instructions for touch devices */}
        {isTouchDevice && (
          <div className="touch-instruction" style={{ opacity: hovered ? 0 : 0.8 }}>
            Tap to interact
          </div>
        )}
      </div>
    </div>
  );
}

export default Skills;