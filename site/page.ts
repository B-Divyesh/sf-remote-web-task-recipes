import './site.css';
import { focusRouteHeading } from './route-focus';

focusRouteHeading();
if ('serviceWorker' in navigator && (location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname))) void navigator.serviceWorker.register('/sw.js');
