import './site.css';
import { focusRouteHeading } from './route-focus';

if (new URLSearchParams(location.search).get('demo') === '1') {
  location.replace('/demo/?demo=1');
} else {
  focusRouteHeading();
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname))) void navigator.serviceWorker.register('/sw.js');
}
