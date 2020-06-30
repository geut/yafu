import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'

ReactDOM.render(
  <div>
    <style jsx global>{`
      :root {
        --base-font-size: 18px;
        --base-line-height: calc(32 / 18);
        --spacing: 8px;
  
        font-size: 18px;
        --type-ratio: 1.250;
        --h6-font-size: 1rem;
        --h5-font-size: calc(var(--h6-font-size) * var(--type-ratio));
        --h4-font-size: calc(var(--h5-font-size) * var(--type-ratio));
        --h3-font-size: calc(var(--h4-font-size) * var(--type-ratio));
        --h2-font-size: calc(var(--h3-font-size) * var(--type-ratio));
        --h1-font-size: calc(var(--h2-font-size) * var(--type-ratio));

        --font-family-heading: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Lucida Grande", sans-serif;
        --font-family-body: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Lucida Grande", sans-serif;
        --font-family-monospace: monospace;
  
        --main-color: #181818;
        --action-color: #035599;

        --grey50: #fafbfc;

      }

      * {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: var(--font-family-body);
        font-size: var(--base-font-size);
      }
    `}</style>    
    <App/>
  </div>,
  document.getElementById('root')
)
