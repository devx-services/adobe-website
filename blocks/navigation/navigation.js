import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * @param {PointerEvent} event
 */
function openCloseNavTopSectionClickHandler(event) {
  event.preventDefault();
  function reset() {
    // reset to a "default" state
    document.querySelectorAll('div.nav-top-section-wrapper').forEach((item) => item.classList.remove('nav-top-section-wrapper-visible'));
    document.querySelectorAll('i.nav-top-section-drop-arrow').forEach((item) => {
      item.classList.remove('nav-top-section-drop-arrow-up');
      item.classList.add('nav-top-section-drop-arrow-down');
    });
  }

  let arrowElement = event.target;
  if (event.target instanceof HTMLSpanElement || event.target instanceof HTMLAnchorElement) {
    arrowElement = event.target.querySelector('i');
  }
  if (arrowElement.classList.contains('nav-top-section-drop-arrow-down')) {
    reset();

    arrowElement.classList.remove('nav-top-section-drop-arrow-down');
    arrowElement.classList.add('nav-top-section-drop-arrow-up');

    if (arrowElement.closest('li').querySelector('ul').querySelectorAll(':scope > li').length > 3) {
      arrowElement.closest('li').querySelector('ul').classList.add('nav-top-section-block');
    } else {
      arrowElement.closest('li').querySelector('ul').classList.add('nav-top-section-flex');
    }
    arrowElement.closest('li').querySelector('div').classList.add('nav-top-section-wrapper-visible');
  } else {
    reset();
  }
}

function wrap(toWrap, wrapper) {
  toWrap.parentNode.appendChild(wrapper);
  return wrapper.appendChild(toWrap);
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  function decorateA(navSection) {
    const span = document.createElement('span');
    const i = document.createElement('i');
    const text = document.createTextNode(navSection.querySelector('a').textContent);
    span.appendChild(text);
    i.setAttribute('class', 'nav-top-section-drop-arrow nav-top-section-drop-arrow-down');
    span.appendChild(i);
    navSection.querySelector('a').addEventListener('click', openCloseNavTopSectionClickHandler);
    navSection.querySelector('a').replaceChildren(span);
  }

  const config = readBlockConfig(block);
  block.textContent = '';

  // fetch nav content
  const navPath = config.nav || '/navigation';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.id = 'nav';
    nav.innerHTML = html;

    const classes = ['sections'];
    classes.forEach((c, i) => {
      const section = nav.children[i];
      if (section) section.classList.add(`nav-${c}`);
    });

    const navSections = nav.querySelector('.nav-sections');
    if (navSections) {
      navSections.querySelector('ul').setAttribute('id', 'nav-top');
      navSections.querySelectorAll(':scope > ul > li').forEach((navSection) => {
        decorateA(navSection);
        navSection.classList.add('nav-top-section-drop');
        wrap(navSection.querySelector('ul'), document.createElement('div'));
        navSection.querySelector('div').setAttribute('class', 'nav-top-section-wrapper');
        navSection.querySelector('ul').setAttribute('class', 'nav-top-section');

        // transform links
        const regex = /.*(\[.*\])$/;
        navSection.querySelectorAll('ul>li>ul>li>a').forEach((aEl) => {
          if (aEl.getAttribute('href').startsWith('file:///')) {
            aEl.setAttribute('href', aEl.getAttribute('href').replace('file:///', 'https://adobe.com'));
          }
          const found = aEl.textContent.match(regex);
          if (found !== null && found.length > 1) {
            let description = found[found.length - 1];
            const mainText = aEl.textContent
              .substring(0, aEl.textContent.length - description.length).trim();
            description = description.substring(1, description.length - 1);
            const mainTextSpan = document.createElement('span');
            const mainTextNode = document.createTextNode(mainText);
            mainTextSpan.appendChild(mainTextNode);
            const descriptionSpan = document.createElement('span');
            descriptionSpan.classList.add('description');
            const descriptionNode = document.createTextNode(description);
            descriptionSpan.appendChild(descriptionNode);
            const wrapperSpan = document.createElement('span');
            wrapperSpan.append(mainTextSpan);
            wrapperSpan.append(descriptionSpan);
            aEl.replaceChildren(wrapperSpan);
          }
        });
      });
    }

    decorateIcons(nav);
    block.append(nav);
  }
}
