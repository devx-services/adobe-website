export default function decorate(block) {

  /* change to ul, li */

  [...block.children].forEach((row) => {
    row.className = 'cards-item';
    let rowImageCount = 0;
    [...row.children].forEach((div) => {
      //remove empty divs
      if (div.innerHTML === '') {
        div.remove();
      }
      if (div.querySelector('a') && div.childElementCount === 1) {
        div.className = 'card-link';
      } else if (div.querySelector('picture') && rowImageCount < 1) {
        //style for background images
        div.className = 'card-image'
        rowImageCount++;

      } else if (div.querySelector('picture') && rowImageCount >= 1) {
        //style for images to overlap
        div.className = 'card-image-positioned'
      } else {
        div.className = 'card-text'
        // add horizontal line
        if (div.querySelectorAll('h2') && div.querySelectorAll('.button-container').length > 1) {
          //add vertical line after heading
          div.querySelectorAll('h2').forEach(((heading) => {
            let hrContainer = document.createElement('hr');
            heading.after(hrContainer)
          }));
        }
      }
      block.querySelectorAll('.primary').forEach(((link) => link.classList.remove("button", "primary")))
    });
  })
}
