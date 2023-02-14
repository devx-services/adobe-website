import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {

  /* change to ul, li */

  [...block.children].forEach((row) => {
    row.className = 'cards-item';
    [...row.children].forEach((div) => {
      if (div.innerHTML === '') {
        div.remove();
      }
      if (div.querySelector('a') && div.childElementCount === 1) {
        div.className = 'card-link';
      } else if (div.querySelector('picture')) {
        div.className = 'card-image'
      } else {
        div.className = 'card-text'
      };
        block.querySelectorAll('.primary').forEach(((link) => link.classList.remove("button", "primary")))
        block.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])))
    });
  })
}
