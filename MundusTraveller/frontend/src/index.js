import App from "./components/App";

import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../static/css/index.css';
 
ReactDOM.render(
<React.StrictMode>
<App />
</React.StrictMode>,
document.getElementById('app')
);