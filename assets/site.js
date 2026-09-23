const defaultArticles = [
  {id:'faith-ordinary-days', title:'Finding God in the Ordinary Days', category:'Faith & Life', date:'September 20, 2026', excerpt:'A reflection on learning to notice grace in routines, interruptions, and the unnoticed places of everyday life.', featured:true},
  {id:'reading-scripture', title:'Reading Scripture with Patience', category:'Bible & Theology', date:'September 12, 2026', excerpt:'Why slow reading can open space for deeper attention, faithful questions, and lasting formation.'},
  {id:'when-prayer-feels-quiet', title:'When Prayer Feels Quiet', category:'Prayer', date:'September 3, 2026', excerpt:'What do we do when prayer feels uneventful? A gentle reflection on presence, trust, and perseverance.'},
  {id:'grace-in-community', title:'Grace in Christian Community', category:'Church & Community', date:'August 24, 2026', excerpt:'Christian community is rarely tidy. That may be precisely where grace becomes visible.'},
  {id:'hope-in-waiting', title:'Hope in the Waiting', category:'Faith & Life', date:'August 11, 2026', excerpt:'Waiting can feel empty, but Scripture often treats it as a place where hope is formed.'},
  {id:'questions-faith', title:'Making Room for Questions', category:'Bible & Theology', date:'July 29, 2026', excerpt:'Faithful questions do not always weaken belief; sometimes they become the doorway to deeper understanding.'}
];

const defaultCategories = [
  {name:'Faith & Life', description:'Reflections on following Christ through ordinary life, relationships, change and everyday decisions.'},
  {name:'Bible & Theology', description:'Thoughtful engagement with Scripture, Christian belief and questions of faith.'},
  {name:'Prayer', description:'Reflections on prayer, spiritual formation, silence, trust and life with God.'},
  {name:'Church & Community', description:'Writing about belonging, service, Christian community and life together.'}
];

function getArticles(){
  try { return JSON.parse(localStorage.getItem('cmsArticles')) || defaultArticles; }
  catch(e){ return defaultArticles; }
}
function saveArticles(list){ localStorage.setItem('cmsArticles',JSON.stringify(list)); }
function getCategories(){
  try {
    const saved=JSON.parse(localStorage.getItem('cmsCategories'));
    if(Array.isArray(saved) && saved.length) return saved;
  } catch(e){}
  const articleCats=[...new Set(getArticles().map(a=>a.category).filter(Boolean))];
  const known=new Set(defaultCategories.map(c=>c.name));
  return [...defaultCategories, ...articleCats.filter(n=>!known.has(n)).map(name=>({name,description:'Articles and reflections gathered under this topic.'}))];
}
function saveCategories(list){ localStorage.setItem('cmsCategories',JSON.stringify(list)); }
function esc(s=''){return String(s).replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));}
function card(a){
  return `<a class="article-card reveal-card" href="article.html?id=${encodeURIComponent(a.id)}"><div class="thumb"><span>Read reflection</span></div><div class="article-body"><span class="tag">${esc(a.category)}</span><h3>${esc(a.title)}</h3><p>${esc(a.excerpt)}</p><div class="meta"><span>${esc(a.date)}</span><span class="read-link">Read article <span aria-hidden="true">→</span></span></div></div></a>`
}
function renderArticleGrid(el,list){if(el) el.innerHTML=list.map(card).join('');}

function buildArticleDropdown(){
  const nav=document.querySelector('.nav-links');
  if(!nav || nav.querySelector('.articles-menu')) return;
  const articleLink=[...nav.querySelectorAll(':scope > a')].find(a=>/articles\.html/.test(a.getAttribute('href')||''));
  if(!articleLink) return;
  const wrap=document.createElement('div');
  wrap.className='articles-menu';
  const trigger=document.createElement('button');
  trigger.className='articles-trigger';
  trigger.type='button';
  trigger.innerHTML='Articles <span class="chevron" aria-hidden="true"></span>';
  trigger.setAttribute('aria-expanded','false');
  const panel=document.createElement('div');
  panel.className='articles-dropdown';
  const cats=getCategories();
  panel.innerHTML=`<a class="dropdown-all" href="articles.html"><span><strong>All Articles</strong><small>Browse every reflection</small></span><span>→</span></a><div class="dropdown-label">Browse by topic</div>${cats.map(c=>`<a class="dropdown-cat" href="category.html?name=${encodeURIComponent(c.name)}"><span>${esc(c.name)}</span><small>${esc(c.description||'View articles in this topic')}</small></a>`).join('')}<a class="dropdown-footer" href="categories.html">Explore all topics <span>→</span></a>`;
  articleLink.replaceWith(wrap);
  wrap.append(trigger,panel);
  trigger.addEventListener('click',e=>{
    e.stopPropagation();
    const open=wrap.classList.toggle('open');
    trigger.setAttribute('aria-expanded',String(open));
  });
  document.addEventListener('click',e=>{
    if(!wrap.contains(e.target)){wrap.classList.remove('open');trigger.setAttribute('aria-expanded','false');}
  });
}

function menuInit(){
  const b=document.querySelector('.menu-btn'), n=document.querySelector('.nav-links');
  if(b&&n)b.addEventListener('click',()=>{
    const open=n.classList.toggle('open');
    b.classList.toggle('active',open);
    b.setAttribute('aria-expanded',String(open));
  });
}

function addSubtleReveal(){
  const items=document.querySelectorAll('.article-card,.category-card,.feature-card,.mini-card,.author-card');
  if(!('IntersectionObserver' in window)){items.forEach(x=>x.classList.add('visible'));return;}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.08});
  items.forEach(x=>{x.classList.add('reveal');io.observe(x);});
}

document.addEventListener('DOMContentLoaded',()=>{buildArticleDropdown();menuInit();addSubtleReveal();});
