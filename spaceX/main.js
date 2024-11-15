import './style.css';
import { router } from './router.js';
import { navigateTo } from './utils.js';

// Handle navigation
window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', router);

// Handle clicks on links
document.addEventListener('click', e => {
  const { target } = e;
  if (target.matches('[data-link]')) {
    e.preventDefault();
    navigateTo(target.href);
  }
});