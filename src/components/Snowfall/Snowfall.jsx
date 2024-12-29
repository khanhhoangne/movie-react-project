import React, { useEffect } from 'react';

const Snowfall = () => {
  useEffect(() => {
    function createSnowflake() {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');

      // Randomize size for a lighter, elegant effect
      const size = Math.random() * 8 + 3; // Size between 3px and 11px
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;

      // Randomize horizontal position
      snowflake.style.left = `${Math.random() * 100}vw`;

      // Randomize fall speed
      const fallDuration = Math.random() * 5 + 5; // Duration between 5s and 10s
      snowflake.style.animationDuration = `${fallDuration}s`;

      // Randomize sway speed and range
      const swayDuration = Math.random() * 3 + 2; // Sway duration between 2s and 5s
      snowflake.style.animationDelay = `${Math.random() * 2}s`; // Delay between 0s and 2s
      snowflake.style.animationTimingFunction = 'ease-in-out';
      snowflake.style.setProperty('--sway-duration', `${swayDuration}s`);

      // Add snowflake to container
      const container = document.getElementById('snowfall-container');
      container.appendChild(snowflake);

      // Remove snowflake after it finishes falling
      snowflake.addEventListener('animationend', () => {
        snowflake.remove();
      });
    }

    // Create snowflakes periodically, but limit the number on screen
    const interval = setInterval(() => {
      if (document.getElementsByClassName('snowflake').length < 20) {
        createSnowflake();
      }
    }, 500); // Add a snowflake every 500ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <div style={{ zIndex: '2' }} id="snowfall-container"></div>;
};

export default Snowfall;
