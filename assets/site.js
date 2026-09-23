const defaultArticles = [
  {id:'faith-ordinary-days', title:'Finding God in the Ordinary Days', category:'Faith & Life', date:'September 20, 2026', read:'6 min read', excerpt:'A reflection on learning to notice grace in routines, interruptions, and the unnoticed places of everyday life.', featured:true},
  {id:'reading-scripture', title:'Reading Scripture with Patience', category:'Bible & Theology', date:'September 12, 2026', read:'7 min read', excerpt:'Why slow reading can open space for deeper attention, faithful questions, and lasting formation.'},
  {id:'when-prayer-feels-quiet', title:'When Prayer Feels Quiet', category:'Prayer', date:'September 3, 2026', read:'5 min read', excerpt:'What do we do when prayer feels uneventful? A gentle reflection on presence, trust, and perseverance.'},
  {id:'grace-in-community', title:'Grace in Christian Community', category:'Church & Community', date:'August 24, 2026', read:'6 min read', excerpt:'Christian community is rarely tidy. That may be precisely where grace becomes visible.'},
  {id:'hope-in-waiting', title:'Hope in the Waiting', category:'Faith & Life', date:'August 11, 2026', read:'4 min read', excerpt:'Waiting can feel empty, but Scripture often treats it as a place where hope is formed.'},
  {id:'questions-faith', title:'Making Room for Questions', category:'Bible & Theology', date:'July 29, 2026', read:'8 min read', excerpt:'Faithful questions do not always weaken belief; sometimes they become the doorway to deeper understanding.'}
];

function getArticles(){
  try { return JSON.parse(localStorage.getItem('cmsArticles')) || defaultArticles; }
  catch(e){ return defaultArticles; }
}
function saveArticles(list){localStorage.setItem('cmsArticles',JSON.stringify(list));}
function esc(s=''){return String(s).replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));}
function card(a){return `<a class="article-card" href="article.html?id=${encodeURIComponent(a.id)}"><div class="thumb">Article image</div><div class="article-body"><span class="tag">${esc(a.category)}</span><h3>${esc(a.title)}</h3><p>${esc(a.excerpt)}</p><div class="meta"><span>${esc(a.date)}</span><span>•</span><span>${esc(a.read)}</span></div></div></a>`}
function renderArticleGrid(el, list){if(el) el.innerHTML=list.map(card).join('');}
function menuInit(){const b=document.querySelector('.menu-btn'),n=document.querySelector('.nav-links');if(b&&n)b.addEventListener('click',()=>n.classList.toggle('open'));}
document.addEventListener('DOMContentLoaded',menuInit);
