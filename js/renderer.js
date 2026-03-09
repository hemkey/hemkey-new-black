/**
 * HEMKEY — Data Renderer
 * Reads from data-projects.js + data-insights.js
 * Populates index.html + projects.html + insights.html
 */
(function () {

  /* ── helpers ── */
  function catLabel(cat) {
    return { residential:'Residential', commercial:'Commercial', senior:'Senior Living', township:'Township' }[cat] || cat;
  }
  function statusClass(s) {
    return { completed:'project-full-card__status--completed', ongoing:'project-full-card__status--ongoing', upcoming:'project-full-card__status--upcoming' }[s] || '';
  }
  function statusLabel(s) {
    return { completed:'Completed', ongoing:'Ongoing', upcoming:'Upcoming' }[s] || '';
  }
  function imgPlaceholder() {
    return '<div style="position:absolute;inset:0;background:linear-gradient(160deg,#1a1510 0%,#0f0c08 50%,#181313 100%);display:flex;align-items:center;justify-content:center;"><span style="font-family:var(--font-body);font-size:.55rem;letter-spacing:.25em;color:rgba(239,214,127,.15);text-transform:uppercase;border:1px dashed rgba(239,214,127,.08);padding:.6rem 1.2rem;">Project Image</span></div>';
  }
  function insightImgPlaceholder() {
    return '<div class="insight-card__img-placeholder"><span>Article Image</span></div>';
  }

  /* ── index preview card (small) ── */
  function indexProjectCard(p) {
    var img = p.image ? '<img src="'+p.image+'" alt="'+p.name+'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />' : imgPlaceholder();
    return '<div class="project-card reveal" data-category="'+p.category+'">'
      +'<div class="project-card__image" style="position:relative;padding-bottom:65%;overflow:hidden;">'+img+'</div>'
      +'<div class="project-card__overlay"></div>'
      +'<div class="project-card__info">'
      +'<span class="project-card__category">'+catLabel(p.category)+'</span>'
      +'<h3 class="project-card__name">'+p.name+'</h3>'
      +'<span class="project-card__location">📍 '+p.location+'</span>'
      +'</div></div>';
  }

  /* ── full project card (projects.html) ── */
  function fullProjectCard(p, delay) {
    var dc = delay ? ' reveal-delay-'+delay : '';
    var img = p.image ? '<img src="'+p.image+'" alt="'+p.name+'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .6s ease;" />' : imgPlaceholder();
    return '<div class="project-full-card reveal'+dc+'">'
      +'<div class="project-full-card__image">'+img
      +'<span class="project-full-card__status '+statusClass(p.status)+'">'+statusLabel(p.status)+'</span>'
      +'</div>'
      +'<div class="project-full-card__body">'
      +'<div class="project-full-card__meta">'
      +'<span class="project-full-card__category">'+catLabel(p.category)+'</span>'
      +'<span class="project-full-card__country">'+p.country+'</span>'
      +'</div>'
      +'<h3 class="project-full-card__name">'+p.name+'</h3>'
      +'<span class="project-full-card__location">📍 '+p.location+'</span>'
      +'<div class="project-full-card__details">'
      +'<div class="project-full-card__detail"><span class="project-full-card__detail-val">'+p.units.value+'</span><span class="project-full-card__detail-key">'+p.units.label+'</span></div>'
      +'<div class="project-full-card__detail"><span class="project-full-card__detail-val">'+p.area.value+'</span><span class="project-full-card__detail-key">'+p.area.label+'</span></div>'
      +'<div class="project-full-card__detail"><span class="project-full-card__detail-val">'+p.year.value+'</span><span class="project-full-card__detail-key">'+p.year.label+'</span></div>'
      +'</div></div></div>';
  }

  /* ── index insights teaser list ── */
  function teaserItem(item, idx) {
    return '<a href="'+item.url+'" class="insights-teaser__item">'
      +'<span class="insights-teaser__item-num">0'+(idx+1)+'</span>'
      +'<div class="insights-teaser__item-body">'
      +'<div class="insights-teaser__item-meta">'
      +'<span class="insights-teaser__item-tag">'+item.tag+'</span>'
      +'<span class="insights-teaser__item-date">'+item.date+'</span>'
      +'</div>'
      +'<div class="insights-teaser__item-title">'+item.title+'</div>'
      +'</div>'
      +'<span class="insights-teaser__item-arrow">→</span>'
      +'</a>';
  }

  /* ── insights.html full card ── */
  function insightFullCard(item, isFeatured, delay) {
    var dc = delay ? ' reveal-delay-'+delay : '';
    var fc = isFeatured ? ' insight-card--featured' : '';
    var isc = isFeatured ? '' : ' insight-card__image--sm';
    var img = item.image ? '<img src="'+item.image+'" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />' : insightImgPlaceholder();
    var cta = isFeatured ? 'Read Full Report →' : 'Read Article →';
    return '<div class="insight-card'+fc+' reveal'+dc+'" data-tag="'+item.tag+'">'
      +'<div class="insight-card__image'+isc+'">'+img
      +'<span class="insight-card__tag">'+item.tag+'</span>'
      +'</div>'
      +'<div class="insight-card__body">'
      +'<span class="insight-card__date">'+item.date+'</span>'
      +'<h3 class="insight-card__title">'+item.title+'</h3>'
      +'<p class="insight-card__excerpt">'+item.excerpt+'</p>'
      +'<a href="'+item.url+'" class="insight-card__link">'+cta+'</a>'
      +'</div></div>';
  }

  /* ── RENDERS ── */

  function renderIndexProjects() {
    var grid = document.getElementById('index-projects-grid');
    if (!grid) return;
    var data = (window.HEMKEY && window.HEMKEY.projects) || [];
    var featured = data.filter(function(p){ return p.featured; });
    grid.innerHTML = featured.map(indexProjectCard).join('');
  }

  function renderFullProjects() {
    var cats = ['residential','commercial','senior','township'];
    var data = (window.HEMKEY && window.HEMKEY.projects) || [];
    cats.forEach(function(cat) {
      var grid  = document.getElementById('projects-grid-'+cat);
      var count = document.getElementById('projects-count-'+cat);
      if (!grid) return;
      var items = data.filter(function(p){ return p.category === cat; });
      if (count) count.textContent = items.length + ' Project' + (items.length !== 1 ? 's' : '');
      grid.innerHTML = items.map(function(p,i){ return fullProjectCard(p, i > 0 ? Math.min(i,5) : 0); }).join('');
    });
  }

  function renderInsightsTeaserList() {
    var list = document.getElementById('index-insights-list');
    if (!list) return;
    var data = (window.HEMKEY && window.HEMKEY.insights) || [];
    list.innerHTML = data.slice(0,4).map(teaserItem).join('');
  }

  function renderInsightsPage() {
    var grid = document.getElementById('insights-page-grid');
    if (!grid) return;
    var data = (window.HEMKEY && window.HEMKEY.insights) || [];
    var featured = data.find(function(i){ return i.featured; });
    var rest = data.filter(function(i){ return !i.featured; });
    var html = '';
    if (featured) html += insightFullCard(featured, true, 0);
    rest.forEach(function(item,idx){ html += insightFullCard(item, false, Math.min(idx+1,5)); });
    grid.innerHTML = html;
  }

  /* ── INIT ── */
  document.addEventListener('DOMContentLoaded', function() {
    renderIndexProjects();
    renderFullProjects();
    renderInsightsTeaserList();
    renderInsightsPage();
    // re-trigger reveal for dynamically injected cards
    if (window.HEMKEY && window.HEMKEY.triggerReveal) window.HEMKEY.triggerReveal();
  });

})();