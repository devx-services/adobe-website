export default function decorate(block) {
  /**
   *
   * @param url
   * @returns {string}
   */
  function getBackgroundUrl(url) {
    return `url('${url}')`;
  }

  /**
   *
   * @param row
   * @param imageProvider
   */
  function setBackgroundOnRow(row, imageProvider) {
    if (imageProvider.querySelector('picture > img')) {
      row.style.backgroundImage = getBackgroundUrl(imageProvider.querySelector('picture > img').src);
    } else {
      row.style.backgroundColor = imageProvider.textContent;
    }
    row.removeChild(imageProvider);
  }

  [...block.children].forEach((row) => {
    row.classList.add('cards-item');
    /* set background image */
    setBackgroundOnRow(row, row.children[0]);
    [...row.children].forEach((div) => {
      /* remove empty divs */
      if (div.innerHTML === '') {
        div.remove();
      }
      if (div.querySelector('picture')) {
        /* style for images to overlap */
        div.classList.add('card-image');
      } else if (div.querySelectorAll('h2') && div.querySelectorAll('.button-container').length > 1) {
        /* add vertical line after heading */
        div.querySelectorAll('h2').forEach(((heading) => {
          const hrContainer = document.createElement('hr');
          heading.after(hrContainer);
          div.classList.add('card-list');
        }));
      } else {
        div.classList.add('card-text');
      }
      block.querySelectorAll('.primary').forEach(((link) => link.classList.remove('button', 'primary')));
    });
  });
}
