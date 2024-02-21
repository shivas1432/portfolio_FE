import React, { useState } from 'react';

// Getting better with React hooks - February 2024
const Interactive9047 = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div className="interactive-component">
            <h3>Interactive Component 9047</h3>
            <p>Learning useState hook - February 2024</p>
            
            <div className="counter-section">
                <p>Count: {count}</p>
                <button onClick={handleIncrement}>Increment</button>
            </div>
            
            <div className="input-section">
                <input 
                    type="text" 
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Type something..."
                />
                <p>You typed: {text}</p>
            </div>
            
            <small>Created: 2024-02-21</small>
        </div>
    );
};

export default Interactive9047;
