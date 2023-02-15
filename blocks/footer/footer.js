import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'footer-menu';
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
