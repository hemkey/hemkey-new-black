/**
 * HEMKEY — Data Renderer (FIXED)
 * Reads from projects-data.js + insights-data.js
 * Populates index.html + projects.html + insights.html
 */
(function () {

  function catLabel(cat) {
    return { residential: 'Residential', commercial: 'Commercial', senior: 'Senior Living', township: 'Township' }[cat] || cat;
  }
  function statusClass(s) {
    return { completed: 'project-full-card__status--completed', ongoing: 'project-full-card__status--ongoing', upcoming: 'project-full-card__status--upcoming' }[s] || '';
  }
  function statusLabel(s) {
    return { completed: 'Completed', ongoing: 'Ongoing', upcoming: 'Upcoming' }[s] || '';
  }
  function imgPlaceholder() {
    return '<div class="project-full-card__image-placeholder"><span>Project Image</span></div>';
  }
  function insightImgPlaceholder() {
    return '<div class="insight-card__img-placeholder"><span>Article Image</span></div>';
  }

  function indexProjectCard(p) {
    var img = p.image
      ? '<img src="' + p.image + '" alt="' + p.name + '" class="project-card__img" />'
      : '<div class="project-card__img-placeholder"><span>Project Image</span></div>';
    return '<div class="project-card reveal" data-category="' + p.category + '">'
      + '<div class="project-card__image">' + img + '</div>'
      + '<div class="project-card__overlay"></div>'
      + '<div class="project-card__info">'
      + '<span class="project-card__category">' + catLabel(p.category) + '</span>'
      + '<h3 class="project-card__name">' + p.name + '</h3>'
      + '<span class="project-card__location">📍 ' + p.location + '</span>'
      + '</div></div>';
  }

  function fullProjectCard(p, delay) {
    var dc = delay ? ' reveal-delay-' + delay : '';
    var img = p.image
      ? '<img src="' + p.image + '" alt="' + p.name + '" />'
      : imgPlaceholder();
    return '<div class="project-full-card reveal' + dc + '" data-category="' + p.category + '" data-status="' + p.status + '">'
      + '<div class="project-full-card__image">' + img
      + '<span class="project-full-card__status ' + statusClass(p.status) + '">' + statusLabel(p.status) + '</span>'
      + '</div>'
      + '<div class="project-full-card__body">'
      + '<div class="project-full-card__meta">'
      + '<span class="project-full-card__category">' + catLabel(p.category) + '</span>'
      + '<span class="project-full-card__country">' + p.country + '</span>'
      + '</div>'
      + '<h3 class="project-full-card__name">' + p.name + '</h3>'
      + '<span class="project-full-card__location">📍 ' + p.location + '</span>'
      + '<div class="project-full-card__details">'
      + '<div class="project-full-card__detail"><span class="project-full-card__detail-val">' + p.units.value + '</span><span class="project-full-card__detail-key">' + p.units.label + '</span></div>'
      + '<div class="project-full-card__detail"><span class="project-full-card__detail-val">' + p.area.value + '</span><span class="project-full-card__detail-key">' + p.area.label + '</span></div>'
      + '<div class="project-full-card__detail"><span class="project-full-card__detail-val">' + p.year.value + '</span><span class="project-full-card__detail-key">' + p.year.label + '</span></div>'
      + '</div></div></div>';
  }

  function teaserItem(item, idx) {
    return '<a href="' + item.url + '" class="insights-teaser__item">'
      + '<span class="insights-teaser__item-num">0' + (idx + 1) + '</span>'
      + '<div class="insights-teaser__item-body">'
      + '<div class="insights-teaser__item-meta">'
      + '<span class="insights-teaser__item-tag">' + item.tag + '</span>'
      + '<span class="insights-teaser__item-date">' + item.date + '</span>'
      + '</div>'
      + '<div class="insights-teaser__item-title">' + item.title + '</div>'
      + '</div>'
      + '<span class="insights-teaser__item-arrow">→</span>'
      + '</a>';
  }

  function insightFullCard(item, isFeatured, delay) {
    var dc = delay ? ' reveal-delay-' + delay : '';
    var fc = isFeatured ? ' insight-card--featured' : '';
    var isc = isFeatured ? '' : ' insight-card__image--sm';
    var img = item.image
      ? '<img src="' + item.image + '" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />'
      : insightImgPlaceholder();
    var cta = isFeatured ? 'Read Full Report →' : 'Read Article →';
    return '<div class="insight-card' + fc + ' reveal' + dc + '" data-tag="' + item.tag + '">'
      + '<div class="insight-card__image' + isc + '">' + img
      + '<span class="insight-card__tag">' + item.tag + '</span>'
      + '</div>'
      + '<div class="insight-card__body">'
      + '<span class="insight-card__date">' + item.date + '</span>'
      + '<h3 class="insight-card__title">' + item.title + '</h3>'
      + '<p class="insight-card__excerpt">' + item.excerpt + '</p>'
      + '<a href="' + item.url + '" class="insight-card__link">' + cta + '</a>'
      + '</div></div>';
  }

  function renderIndexProjects() {
    var grid = document.getElementById('index-projects-grid');
    if (!grid) return;
    var data = (window.HEMKEY && window.HEMKEY.projects) || [];
    var featured = data.filter(function (p) { return p.featured; });
    grid.innerHTML = featured.map(indexProjectCard).join('');
  }

  function renderFullProjects() {
    var cats = ['residential', 'commercial', 'senior', 'township'];
    var data = (window.HEMKEY && window.HEMKEY.projects) || [];
    cats.forEach(function (cat) {
      var grid  = document.getElementById('projects-grid-' + cat);
      var count = document.getElementById('projects-count-' + cat);
      if (!grid) return;
      var items = data.filter(function (p) { return p.category === cat; });
      var label = cat === 'senior' ? 'Communit' : 'Project';
      var plural = cat === 'senior' ? (items.length !== 1 ? 'ies' : 'y') : (items.length !== 1 ? 's' : '');
      if (count) count.textContent = items.length + ' ' + label + plural;
      grid.innerHTML = items.map(function (p, i) { return fullProjectCard(p, i > 0 ? Math.min(i, 5) : 0); }).join('');
      if (items.length === 0) {
        grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:3rem;font-family:var(--font-body);font-size:.8rem;color:var(--text-dim);">No projects in this category yet.</p>';
      }
    });
  }

  function renderInsightsTeaserList() {
    var list = document.getElementById('index-insights-list');
    if (!list) return;
    var data = (window.HEMKEY && window.HEMKEY.insights) || [];
    list.innerHTML = data.slice(0, 4).map(teaserItem).join('');
  }

  /* KEY FIX: featured → mainGrid, rest → secondaryGrid */
  function renderInsightsPage() {
    var mainGrid      = document.getElementById('insights-page-grid');
    var secondaryGrid = document.getElementById('insights-page-grid-secondary');
    if (!mainGrid) return;

    var data     = (window.HEMKEY && window.HEMKEY.insights) || [];
    var featured = data.find(function (i) { return i.featured; });
    var rest     = data.filter(function (i) { return !i.featured; });

    var mainHtml = '';
    if (featured) mainHtml += insightFullCard(featured, true, 0);
    if (rest[0])  mainHtml += insightFullCard(rest[0], false, 1);
    mainGrid.innerHTML = mainHtml || '<p style="padding:3rem;color:var(--text-dim);font-size:.8rem;">No insights yet.</p>';

    if (secondaryGrid) {
      secondaryGrid.innerHTML = rest.slice(1).map(function (item, idx) {
        return insightFullCard(item, false, Math.min(idx + 1, 5));
      }).join('');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderIndexProjects();
    renderFullProjects();
    renderInsightsTeaserList();
    renderInsightsPage();

    /* Re-observe dynamically injected .reveal elements */
    setTimeout(function () {
      var newRevealEls = document.querySelectorAll('.reveal:not(.visible)');
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -3% 0px' });
      newRevealEls.forEach(function (el) { obs.observe(el); });
    }, 50);
  });

})();