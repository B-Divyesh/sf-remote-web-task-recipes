import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import './site.css';

if (new URLSearchParams(location.search).has('demo')) location.replace('/demo/?demo=1');
if ('serviceWorker' in navigator && location.protocol === 'https:') void navigator.serviceWorker.register('/sw.js');
