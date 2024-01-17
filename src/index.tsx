import React from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

const element = createRoot(document.getElementById('root') as HTMLDivElement);

element.render(<Root />);
