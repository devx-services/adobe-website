export default function init(el) {
    const children = el.querySelectorAll(':scope > div');
    const foreground = children[children.length - 1];
    if (children.length > 1) {
        children[0].classList.add('background');
    }
    foreground.classList.add('foreground', 'container');
    const headline = foreground.querySelector('h1, h2, h3, h4, h5, h6');
    const text = headline.closest('div');
    text.classList.add('text');
}
