/* =========================================================
   PARA EDITAR EL CATÁLOGO: modificá el array PRODUCTS.
   Cada producto puede tener varias fotos en "images",
   apuntando a archivos dentro de la carpeta /images.
   Para agregar una foto nueva: subí el archivo a /images
   y agregá su nombre a la lista del producto.
========================================================= */
const WHATSAPP_NUMBER = "5493412633974";

const PRODUCTS = [
  {
    id: "karambit",
    name: "Karambit CS2",
    tag: "CS2",
    category: ["gamer"],
    price: "Consultar precio",
    desc: "Réplica decorativa a escala del karambit de Counter-Strike 2. Pieza sólida, ideal para exhibir.",
    images: ["images/karambit-1.jpg", "images/karambit-2.jpg"]
  },
  {
    id: "mate-river",
    name: "Mate River Plate",
    tag: "Mates",
    category: ["futbol"],
    price: "Consultar precio",
    desc: "Mate impreso con el escudo de tu club en relieve y detalles a dos colores. Consultá otros clubes.",
    images: ["images/mate-river-1.jpg", "images/mate-river-2.jpg", "images/mate-river-3.jpg", "images/mate-river-4.jpg"]
  },
  {
    id: "messi",
    name: "Figura Messi",
    tag: "Figura",
    category: ["decor", "futbol"],
    price: "Consultar precio",
    desc: "Estatuilla de colección con base numerada, ideal para escritorio o vitrina.",
    images: ["images/messi-1.jpg"]
  },
  {
    id: "spiderman",
    name: "Spider-Man String Art",
    tag: "String Art",
    category: ["gamer", "decor"],
    price: "Consultar precio",
    desc: "Cuadro circular con hilado tipo tela de araña sobre base impresa y soporte con logo.",
    images: ["images/spiderman-1.jpg", "images/spiderman-2.jpg"]
  },
  {
    id: "silueta",
    name: "Cuadro Silueta Circular",
    tag: "Escena",
    category: ["decor"],
    price: "Consultar precio",
    desc: "Escena recortada en aro circular con base propia. Diseño a pedido con la escena que elijas.",
    images: ["images/silueta-1.jpg", "images/silueta-2.jpg", "images/silueta-3.jpg"]
  },
  {
    id: "jesus",
    name: "Nicho con Figura Religiosa",
    tag: "Religioso",
    category: ["decor"],
    price: "Consultar precio",
    desc: "Arco impreso en blanco con figura de detalle fino en su interior. Para repisa o mesa de luz.",
    images: ["images/jesus-1.jpg", "images/jesus-2.jpg"]
  },
  {
    id: "cosmetiquero",
    name: "Organizador de Cosméticos",
    tag: "Organizador",
    category: ["organizadores"],
    price: "Consultar precio",
    desc: "Compartimentos para pinceles, labiales, polvos y accesorios. Base antideslizante.",
    images: ["images/cosmetiquero-1.jpg"]
  }
];

function waLink(productName){
  const text = encodeURIComponent("Hola! Quiero pedir: " + productName);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

const grid = document.getElementById('grid');

function cameraIcon(){
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>';
}

PRODUCTS.forEach((p, idx) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.cat = p.category.join(' ');
  card.innerHTML = `
    <div class="card-img" data-idx="${idx}">
      <span class="card-tag">${p.tag}</span>
      ${p.images.length > 1 ? `<span class="card-count">${cameraIcon()} ${p.images.length}</span>` : ''}
      <img src="${p.images[0]}" alt="${p.name}">
    </div>
    <div class="card-body">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="card-foot">
        <span class="price">${p.price}</span>
        <a class="order-btn" href="${waLink(p.name)}" target="_blank" rel="noopener">Pedir ↗</a>
      </div>
    </div>
  `;
  grid.appendChild(card);
});

/* filtros */
const filters = document.querySelectorAll('.filter');
filters.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.card').forEach(c=>{
      const cats = c.dataset.cat.split(' ');
      c.style.display = (f==='all' || cats.includes(f)) ? '' : 'none';
    });
  });
});

/* lightbox */
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbTitle = document.getElementById('lbTitle');
const lbThumbs = document.getElementById('lbThumbs');
const lbPrice = document.getElementById('lbPrice');
const lbOrder = document.getElementById('lbOrder');
let currentProduct = null;
let currentIndex = 0;

function openLightbox(productIdx){
  currentProduct = PRODUCTS[productIdx];
  currentIndex = 0;
  renderLightbox();
  lightbox.classList.add('open');
}
function renderLightbox(){
  const imgSrc = currentProduct.images[currentIndex];
  lbImage.src = imgSrc;
  lbImage.alt = currentProduct.name;
  lbTitle.textContent = currentProduct.name;
  lbPrice.textContent = currentProduct.price;
  lbOrder.href = waLink(currentProduct.name);
  lbThumbs.innerHTML = currentProduct.images.map((src,i)=>`
    <div class="lb-thumb ${i===currentIndex?'active':''}" data-i="${i}">
      <img src="${src}" alt="">
    </div>
  `).join('');
  lbThumbs.querySelectorAll('.lb-thumb').forEach(t=>{
    t.addEventListener('click', ()=>{
      currentIndex = parseInt(t.dataset.i);
      renderLightbox();
    });
  });
}
document.getElementById('lbClose').addEventListener('click', ()=> lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) lightbox.classList.remove('open'); });
document.getElementById('lbPrev').addEventListener('click', ()=>{
  currentIndex = (currentIndex - 1 + currentProduct.images.length) % currentProduct.images.length;
  renderLightbox();
});
document.getElementById('lbNext').addEventListener('click', ()=>{
  currentIndex = (currentIndex + 1) % currentProduct.images.length;
  renderLightbox();
});
document.addEventListener('keydown', (e)=>{
  if(!lightbox.classList.contains('open')) return;
  if(e.key === 'Escape') lightbox.classList.remove('open');
  if(e.key === 'ArrowLeft') document.getElementById('lbPrev').click();
  if(e.key === 'ArrowRight') document.getElementById('lbNext').click();
});

grid.addEventListener('click', (e)=>{
  const imgBox = e.target.closest('.card-img');
  if(imgBox) openLightbox(parseInt(imgBox.dataset.idx));
});
