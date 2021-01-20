async function fetchAndRenderizeProducts() {
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    const { results } = await response.json();
    results.forEach((product) => {
      const { thumbnail, id, title } = product;

      const productItem = createProductItemElement({ sku: id, name: title, image: thumbnail });
      document.querySelector('.items').appendChild(productItem);
    });
  } catch (error) {
    console.log('erro aqui', error);
  }
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

async function addItemToCart(event) {
  const sku = event.target.parentNode.querySelector('.item__sku').innerText;
  const response = await fetch(`https://api.mercadolibre.com/items/${sku}`);
  const result = await response.json();

  // Adicionando no carrinho
  const cart_list = document.querySelector('.cart__items');
  cart_list.appendChild(createCartItemElement(result));
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  button = section.querySelector('.item__add');
  button.addEventListener('click', addItemToCart);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // Remover item da lista do carrinho
  console.log('Yey on cart item');

}

function createCartItemElement(product) {
  console.log(product);
  const { id, title, price } = product;
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

window.onload = function onload() {
  fetchAndRenderizeProducts();
};
