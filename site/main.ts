import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import './site.css';

document.querySelector('#year')!.textContent = String(new Date().getFullYear());
if ('serviceWorker' in navigator && location.protocol === 'https:') void navigator.serviceWorker.register('/sw.js');
