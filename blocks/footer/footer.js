import { readBlockConfig } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  /*
  const ul = document.createElement('div');
  ul.className = 'footer-menu';
  [...block.children].forEach((row) => {
    //const li = document.createElement('div');
    //li.innerHTML = row.innerHTML;
    let contents = row.innerHTML;
    ul.innerHTML += contents;
  });
  block.textContent = '';
  block.append(ul);
  */
  const cfg = readBlockConfig(block);
  block.textContent = '';
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();
  const footer = document.createElement('div');
  footer.className = 'footer-wrap';
  footer.innerHTML = html;
  const footerBlock = footer.querySelector(':scope > div');
  if (footerBlock.firstElementChild) {
    const menu = footerBlock.firstElementChild;
    menu.className = 'footer-menu';
  }
  if (footerBlock.nextElementSibling) {
    const featuredProducts = footerBlock.nextElementSibling;
    featuredProducts.className = 'footer-featured-products';
    if (featuredProducts.nextElementSibling) {
      const copyright = featuredProducts.nextElementSibling;
      copyright.className = 'copyright';
    }
  }
  block.append(footer);
}
