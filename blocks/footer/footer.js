import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

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
  console.log(footerPath)
  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();
  let footer = document.createElement('div');
  footer.className = 'footer-wrap';
  footer.innerHTML = html;
  let footerBlock = footer.querySelector(':scope > div');
  let menu = footerBlock.firstElementChild;
  menu.className = 'footer-menu';
  let featuredProducts = footerBlock.nextElementSibling;
  console.log(featuredProducts)
  featuredProducts.className = 'footer-featuredProducts'
  let copyright = featuredProducts.nextElementSibling;
  copyright.className = 'copyright';
  block.append(footer);
}
