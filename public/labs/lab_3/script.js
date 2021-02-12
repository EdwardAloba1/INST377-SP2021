/* Put your javascript in here */
const images = carousel.querySelectorAll('li');

Array.from(carousel.querySelectorAll('li'));
const array1 = Array.from(images);

let i = 1;
Array.from(carousel.querySelectorAll('li')).forEach((element) => {
  element.style.position = 'relative';
  element.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
  i++;
});

/* configuration */
const width = 130; // image width
const count = 3; // visible images count

const list = carousel.querySelector('ul');
const listElems = array1;

let position = 0; // ribbon scroll position

carousel.querySelector('.prev').onclick = function() {
  // shift left
  position += width * count;
  // can't move to the left too much, end of images
  position = Math.min(position, 0);
  list.style.marginLeft = position + 'px';
};

carousel.querySelector('.next').onclick = function() {
  // shift right
  position -= width * count;
  // can only shift the ribbbon for (total ribbon length - visible count) images
  position = Math.max(position, -width * (listElems.length - count));
  list.style.marginLeft = position + 'px';
};