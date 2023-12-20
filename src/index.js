import React from 'react';
//import ReactDOM from 'react-dom/client'; 
import {createRoot} from 'react-dom/client';   
import './index.css';
import App from './App';
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
crossorigin=""/>

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);

