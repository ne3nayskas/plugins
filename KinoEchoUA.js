/*!
 * КіноВідлуння (KinoEcho) for Lampa
 * Кінематографічний лабіринт: три ланцюжки відлунь, карта зв’язків, режим настрою.
 * Без ШІ, без API-ключів — лише TMDB.
 */
(function () {
  'use strict';

  // ─── НАСТРОЇ ───────────────────────────────────────────────────────────
  var MOODS = [
    { id: 'noir',     label: '🕵️ Темний нуар',   color: '#aaa',    genres: [80, 53],             minVotes: 300, minRating: 6.5 },
    { id: 'cyber',    label: '🤖 Кіберпанк',      color: '#00e5ff', genres: [878, 28],            minVotes: 200, minRating: 6.0 },
    { id: 'horror',   label: '👁️ Тривога',        color: '#bf00ff', genres: [27, 9648],           minVotes: 200, minRating: 6.0 },
    { id: 'dream',    label: '🌙 Сновидіння',     color: '#9b7fea', genres: [14, 18],             minVotes: 300, minRating: 7.0 },
    { id: 'epic',     label: '⚔️ Епос',           color: '#ffa726', genres: [12, 28, 36],        minVotes: 300, minRating: 6.5 },
    { id: 'retro',    label: '📼 Ретро',           color: '#ff006e', genres: [35, 10749],         minVotes: 200, minRating: 6.5 },
    { id: 'space',    label: '🚀 Космос',         color: '#00bcd4', genres: [878],               minVotes: 300, minRating: 6.5 },
    { id: 'crime',    label: '🔫 Кримінал',       color: '#f44336', genres: [80, 53],            minVotes: 500, minRating: 7.0 },
    { id: 'comedy',   label: '😂 Комедія',        color: '#ffeb3b', genres: [35],                minVotes: 300, minRating: 7.0 },
    { id: 'romance',  label: '💕 Романтика',      color: '#f48fb1', genres: [10749, 18],         minVotes: 200, minRating: 6.5 },
    { id: 'action',   label: '🥊 Чистий екшн',   color: '#ff6f00', genres: [28],               minVotes: 400, minRating: 6.5 },
    { id: 'drama',    label: '💔 Драма',          color: '#80cbc4', genres: [18],               minVotes: 500, minRating: 7.5 },
    { id: 'anim',     label: '🎨 Анімація',       color: '#ce93d8', genres: [16],               minVotes: 200, minRating: 7.0 },
    { id: 'family',   label: '👨‍👩‍👧 Сімейне кіно',     color: '#a5d6a7', genres: [10751, 16, 12],    minVotes: 200, minRating: 6.5 },
    { id: 'docu',     label: '📚 Документальне кіно',   color: '#b0bec5', genres: [99],               minVotes: 100, minRating: 7.0 },
    { id: 'music',    label: '🎸 Музичне кіно',    color: '#ffe082', genres: [10402, 18],        minVotes: 100, minRating: 7.0 }
  ];

  // ─── СТИЛІ ────────────────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('ke-styles')) return;
    var css = [
      /* Root */
      '.ke-root{width:100%;height:100%;background:#08001a;color:#fff;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch}',
      '.ke-page{padding:0 0 6em}',

      /* Hero */
      '.ke-hero{position:relative;height:20em;background:#111 center/cover no-repeat;overflow:hidden}',
      '.ke-hero__glow{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 130%,rgba(191,0,255,0.3) 0%,transparent 65%)}',
      '.ke-hero__overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,0,26,0) 25%,#08001a 100%)}',
      '.ke-hero__content{position:absolute;bottom:1.6em;left:2em;right:2em}',
      '.ke-hero__label{font-size:0.9em;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#00e5ff;margin-bottom:0.4em;opacity:0.8}',
      '.ke-hero__title{font-size:2.6em;font-weight:900;line-height:1.05;text-shadow:0 0 1.2em rgba(191,0,255,0.7)}',
      '.ke-hero__meta{margin-top:0.5em;display:flex;gap:0.7em;flex-wrap:wrap}',
      '.ke-badge{background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.15);backdrop-filter:blur(4px);padding:0.2em 0.75em;border-radius:2em;font-size:0.9em;font-weight:600}',
      '.ke-badge--purple{border-color:rgba(191,0,255,0.6);color:#e0aaff;background:rgba(191,0,255,0.15)}',
      '.ke-badge--cyan{border-color:rgba(0,229,255,0.5);color:#80deea;background:rgba(0,229,255,0.1)}',

      /* Tabs */
      '.ke-tabs{display:flex;gap:0.3em;padding:1em 2em 0;border-bottom:1px solid rgba(255,255,255,0.07);background:#08001a;position:sticky;top:0;z-index:10}',
      '.ke-tab{padding:0.6em 1.4em;border-radius:0.5em 0.5em 0 0;font-size:1.1em;font-weight:600;cursor:pointer;outline:none;color:rgba(255,255,255,0.4);border-bottom:0.18em solid transparent;transition:all 0.15s}',
      '.ke-tab.focus{color:rgba(255,255,255,0.85);background:rgba(255,255,255,0.06)}',
      '.ke-tab.ke-tab--active{color:#00e5ff;border-bottom-color:#00e5ff}',
      '.ke-tab.ke-tab--active.focus{background:rgba(0,229,255,0.08)}',

      /* Section heads */
      '.ke-section{padding:1.6em 2em 0}',
      '.ke-section-head{display:flex;align-items:center;gap:0.55em;margin-bottom:0.9em}',
      '.ke-section-bar{width:0.22em;border-radius:0.1em;height:1.1em;flex-shrink:0}',
      '.ke-section-icon{font-size:1.4em;line-height:1}',
      '.ke-section-title{font-size:1.4em;font-weight:700}',
      '.ke-section-count{margin-left:auto;font-size:0.9em;opacity:0.4;font-weight:400}',

      /* Chain colour themes */
      '.ke-chain--direct .ke-section-bar{background:#00e5ff}',
      '.ke-chain--direct .ke-section-title{color:#00e5ff}',
      '.ke-chain--hidden .ke-section-bar{background:#bf00ff}',
      '.ke-chain--hidden .ke-section-title{color:#d580ff}',
      '.ke-chain--alt .ke-section-bar{background:#ff006e}',
      '.ke-chain--alt .ke-section-title{color:#ff6ea0}',
      '.ke-chain--author .ke-section-bar{background:#ffab40}',
      '.ke-chain--author .ke-section-title{color:#ffab40}',

      /* Horizontal film strip */
      '.ke-strip{display:flex;gap:0.9em;overflow-x:auto;padding-bottom:0.8em;scrollbar-width:none}',
      '.ke-strip::-webkit-scrollbar{display:none}',

      /* Film cards */
      '.ke-card{flex-shrink:0;width:10.5em;border-radius:0.5em;overflow:hidden;background:rgba(255,255,255,0.05);cursor:pointer;outline:none;transition:transform 0.15s,box-shadow 0.15s;position:relative}',
      '.ke-card.focus{transform:scale(1.07);box-shadow:0 0 0 0.18em #00e5ff,0 0 1.8em rgba(0,229,255,0.35)}',
      '.ke-card__poster{position:relative;padding-top:150%;background:#1a0033 center/cover no-repeat}',
      '.ke-card__no-poster{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:2.4em;opacity:0.2}',
      '.ke-card__rating{position:absolute;top:0.35em;right:0.35em;background:rgba(0,0,0,0.75);border:1px solid rgba(255,215,0,0.35);padding:0.12em 0.45em;border-radius:0.25em;font-size:0.88em;color:#ffd700}',
      '.ke-card__tag{position:absolute;bottom:0.35em;left:0.35em;padding:0.12em 0.45em;border-radius:0.2em;font-size:0.75em;font-weight:700;line-height:1.2}',
      '.ke-card__info{padding:0.55em 0.65em 0.7em}',
      '.ke-card__title{font-weight:600;font-size:0.92em;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.4em}',
      '.ke-card__year{opacity:0.45;font-size:0.82em;margin-top:0.2em}',

      /* Card tags */
      '.ke-tag--direct{background:rgba(0,229,255,0.22);color:#80deea;border:1px solid rgba(0,229,255,0.35)}',
      '.ke-tag--hidden{background:rgba(191,0,255,0.22);color:#e0aaff;border:1px solid rgba(191,0,255,0.35)}',
      '.ke-tag--alt{background:rgba(255,0,110,0.22);color:#ffb3ca;border:1px solid rgba(255,0,110,0.35)}',
      '.ke-tag--mood{background:rgba(0,188,212,0.2);color:#80deea;border:1px solid rgba(0,188,212,0.3)}',
      '.ke-tag--author-strong{background:rgba(255,171,64,0.25);color:#ffe0b2;border:1px solid rgba(255,171,64,0.55)}',
      '.ke-tag--author-weak{background:rgba(255,171,64,0.1);color:#ffe0b2;border:1px solid rgba(255,171,64,0.25)}',

      /* Crew / easter-egg facts */
      '.ke-facts{display:flex;flex-direction:column;gap:0.55em}',
      '.ke-fact{display:flex;gap:0.75em;padding:0.75em 1em;background:rgba(255,255,255,0.04);border-radius:0.4em;border-left:0.2em solid #bf00ff;align-items:flex-start;outline:none;cursor:default}',
      '.ke-fact.focus{background:rgba(191,0,255,0.12);box-shadow:0 0 0 0.15em #bf00ff}',
      '.ke-fact__icon{font-size:1.3em;flex-shrink:0;padding-top:0.05em}',
      '.ke-fact__text{font-size:1.05em;line-height:1.5;opacity:0.88}',

      /* Map tab */
      '.ke-map{padding:2em 2em 1em;display:flex;flex-direction:column;align-items:center}',
      '.ke-map-hub{width:12em;border-radius:0.6em;overflow:hidden;border:0.15em solid rgba(191,0,255,0.7);box-shadow:0 0 2.5em rgba(191,0,255,0.45);margin-bottom:0}',
      '.ke-map-hub__poster{padding-top:150%;background:#1a0033 center/cover no-repeat}',
      '.ke-map-hub__title{padding:0.5em 0.7em;font-weight:700;text-align:center;font-size:0.95em;line-height:1.3;background:rgba(191,0,255,0.15);border-top:1px solid rgba(191,0,255,0.3)}',
      '.ke-map-line{width:0.12em;height:2.5em;margin:0 auto;background:linear-gradient(180deg,rgba(191,0,255,0.7),rgba(0,229,255,0.5))}',
      '.ke-map-label{text-align:center;font-size:0.85em;font-weight:600;opacity:0.5;letter-spacing:0.05em;margin:0.4em 0}',
      '.ke-map-nodes{display:flex;flex-wrap:wrap;gap:0.9em;justify-content:center;width:100%}',
      '.ke-map-divider{width:100%;text-align:center;margin:1.8em 0 0;padding-top:1.5em;border-top:1px solid rgba(255,255,255,0.06);font-size:0.9em;font-weight:700;color:#d580ff;letter-spacing:0.05em}',

      /* Mood tab */
      '.ke-mood-intro{padding:1.3em 2em 0.2em;font-size:1.05em;opacity:0.5;line-height:1.5}',
      '.ke-moods{display:flex;flex-wrap:wrap;gap:0.7em;padding:0.8em 2em 0.5em}',
      '.ke-mood{padding:0.65em 1.3em;border-radius:2em;font-size:1.1em;font-weight:600;cursor:pointer;outline:none;border:0.12em solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);transition:all 0.15s;white-space:nowrap}',
      '.ke-mood.focus{transform:scale(1.06);border-color:currentColor}',
      '.ke-mood.ke-mood--active{border-width:0.18em}',
      '.ke-mood-results{padding:0 2em}',

      /* Loading / empty states */
      '.ke-loading{padding:2.5em;text-align:center;font-size:1.2em;opacity:0.5}',
      '.ke-empty{padding:2em;text-align:center;opacity:0.35;font-size:1.1em}',

      /* Button */
      '.full-start__button.view--ke{color:#00e5ff}',
      '.full-start__button.view--ke svg{vertical-align:middle;margin-right:0.35em}'
    ].join('\n');

    var el = document.createElement('style');
    el.id = 'ke-styles';
    el.textContent = css;
    document.head.appendChild(el);
  }

  // ─── УТІЛІТИ ──────────────────────────────────────────────────────────────
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function tmdbImg(path, size) {
    return path ? Lampa.TMDB.image('t/p/' + (size || 'w200') + path) : '';
  }

  function guessMethod(item) {
    if (item.media_type === 'tv' || item.media_type === 'movie') return item.media_type;
    return (item.first_air_date || item.name) ? 'tv' : 'movie';
  }

  // ─── TMDB API ─────────────────────────────────────────────────────────────
  function tmdbGet(path, callback) {
    var net = new Lampa.Reguest();
    var sep = path.indexOf('?') >= 0 ? '&' : '?';
    var url = Lampa.TMDB.api(path + sep + 'api_key=' + Lampa.TMDB.key() + '&language=uk');
    net.silent(url,
      function (d) { callback(null, d); },
      function (e) { callback(e); }
    );
  }

  // ─── ТРИ ЛАНЦЮЖКИ ЕХО ─────────────────────────────────────────────────────

  function chainDirect(data) {
    var recs = (data.recommendations && data.recommendations.results) || [];
    if (!recs.length) recs = (data.similar && data.similar.results) || [];
    return recs.slice(0, 8).map(function (r) { return { item: r, method: guessMethod(r) }; });
  }

  function chainHidden(data, excludeIds, callback) {
    var kws = (data.keywords && (data.keywords.keywords || data.keywords.results)) || [];
    if (!kws.length) { callback([]); return; }

    var kwId = kws[Math.floor(Math.random() * Math.min(kws.length, 3))].id;
    var method = data.first_air_date ? 'tv' : 'movie';
    var path = 'discover/' + method +
      '?with_keywords=' + kwId +
      '&sort_by=vote_average.desc' +
      '&vote_count.gte=200';

    tmdbGet(path, function (err, d) {
      if (err || !d || !d.results) { callback([]); return; }
      var excluded = excludeIds.concat([data.id]);
      callback(
        d.results
          .filter(function (r) { return excluded.indexOf(r.id) === -1; })
          .slice(0, 8)
          .map(function (r) { return { item: r, method: method }; })
      );
    });
  }

  function chainAlternative(data, callback) {
    var raw = data.original_title || data.original_name || data.title || data.name || '';
    var title = raw.split(/\s*[:—]\s*/)[0].trim();
    if (!title) { callback([]); return; }

    var method = data.first_air_date ? 'tv' : 'movie';
    var path = 'search/' + method + '?query=' + encodeURIComponent(title) + '&include_adult=false';

    tmdbGet(path, function (err, d) {
      if (err || !d || !d.results) { callback([]); return; }
      callback(
        d.results
          .filter(function (r) { return r.id !== data.id && r.vote_count > 30; })
          .slice(0, 8)
          .map(function (r) { return { item: r, method: method }; })
      );
    });
  }

  // ─── АВТОРСКОЕ ЕХО ────────────────────────────────────────────────────────
  function chainAuthor(data, excludeIds, callback) {
    var crew   = (data.credits && data.credits.crew) || [];
    var method = data.first_air_date ? 'tv' : 'movie';
    var excl   = excludeIds.concat([data.id]);

    var director = null, writer = null;
    crew.forEach(function (p) {
      if (!director && p.job === 'Director') director = p;
      if (!writer && (p.job === 'Screenplay' || p.job === 'Writer' || p.job === 'Story')) writer = p;
    });

    if (!writer && !director) { callback([]); return; }

    var strongItems = [], weakItems = [];
    var pending = 0;

    function finish() {
      if (--pending > 0) return;
      var seen = excl.slice(), out = [];
      strongItems.forEach(function (e) {
        if (seen.indexOf(e.item.id) < 0) { seen.push(e.item.id); out.push(e); }
      });
      weakItems.forEach(function (e) {
        if (seen.indexOf(e.item.id) < 0) { seen.push(e.item.id); out.push(e); }
      });
      callback(out.slice(0, 8));
    }

    // Міцний зв’язок: режисер і сценарист разом
    if (director && writer && director.id !== writer.id) {
      pending++;
      tmdbGet(
        'discover/' + method + '?with_people=' + director.id + ',' + writer.id +
        '&sort_by=vote_average.desc&vote_count.gte=100',
        function (err, d) {
          if (!err && d && d.results)
            strongItems = d.results
              .filter(function (r) { return excl.indexOf(r.id) < 0; })
              .slice(0, 4)
              .map(function (r) { return { item: r, method: method, tagClass: 'ke-tag--author-strong', tagLabel: 'дует' }; });
          finish();
        }
      );
    }

    
    // Незначна роль: сценарист (або режисер, якщо сценариста немає)
    var anchor = writer || director;
    pending++;
    tmdbGet(
      'discover/' + method + '?with_people=' + anchor.id +
      '&sort_by=vote_average.desc&vote_count.gte=100',
      function (err, d) {
        if (!err && d && d.results)
          weakItems = d.results
            .filter(function (r) { return excl.indexOf(r.id) < 0; })
            .slice(0, 4)
            .map(function (r) { return { item: r, method: method, tagClass: 'ke-tag--author-weak', tagLabel: writer ? 'сценарист' : 'режисер' }; });
        finish();
      }
    );
  }

  // ─── ПАСХАЛКИ / ЗВ’ЯЗКИ КОМАНДИ ─────────────────────────────────────────────
  function buildCrewFacts(data) {
    var facts = [];
    var crew  = (data.credits && data.credits.crew)  || [];
    var cast  = (data.credits && data.credits.cast)  || [];
    var kws   = (data.keywords && (data.keywords.keywords || data.keywords.results)) || [];

    var directors = crew.filter(function (p) { return p.job === 'Director'; });
    if (directors.length)
      facts.push({ icon: '🎬', text: 'Режисер ' + directors.map(function (d) { return d.name; }).join(', ') + '. Прихований ланцюжок побудовано на його/її тематичних уподобаннях.' });

    var writers = crew.filter(function (p) { return p.job === 'Screenplay' || p.job === 'Writer' || p.job === 'Story'; });
    if (writers.length)
      facts.push({ icon: '✍️', text: 'Сценарій — ' + writers.slice(0, 2).map(function (w) { return w.name; }).join(', ') + '. Сценарист визначає структуру й темп — саме на його роботах будується прихований ланцюжок тематичних зв’язків.' });

    var composers = crew.filter(function (p) { return p.job === 'Original Music Composer'; });
    if (composers.length)
      facts.push({ icon: '🎵', text: 'Саундтрек — ' + composers[0].name + '. Той самий композитор створює невидимий зв’язок між різними фільмами завдяки власному музичному почерку.' });

    if (cast.length >= 3)
      facts.push({ icon: '🎭', text: 'У головних ролях: ' + cast.slice(0, 4).map(function (a) { return a.name; }).join(', ') + '. Відкрий профіль актора — там цілий лабіринт його робіт.' });

    var studios = (data.production_companies || []).slice(0, 2);
    if (studios.length)
      facts.push({ icon: '🏛️', text: 'Виробництво: ' + studios.map(function (c) { return c.name; }).join(' × ') + '. Студія суттєво впливає на візуальний стиль усіх своїх проєктів.' });

    if (kws.length >= 3)
      facts.push({ icon: '🔑', text: 'Ключові теми: ' + kws.slice(0, 5).map(function (k) { return k.name; }).join(', ') + '. Прихований ланцюжок добирає фільми саме за цими тегами.' });

    if (data.budget && data.revenue && data.budget > 1e6) {
      var ratio = (data.revenue / data.budget).toFixed(1);
      var verdict = ratio >= 3 ? 'хіт' : ratio >= 1 ? 'окупився ×' + ratio : 'не окупився';
      facts.push({ icon: '💰', text: 'Бюджет і касові збори: ' + verdict + ' (×' + ratio + '). Це допомагає зрозуміти, чому фільм отримав або не отримав продовження.' });
    }

    return facts;
  }

  // ─── РЕНДЕР КАРТКИ ──────────────────────────────────────────────────────
  function renderCard(entry, tagClass, tagLabel) {
    var tClass = entry.tagClass !== undefined ? entry.tagClass : (tagClass || '');
    var tLabel = entry.tagLabel !== undefined ? entry.tagLabel : tagLabel;
    var item   = entry.item;
    var method = entry.method;
    var poster = tmdbImg(item.poster_path, 'w200');
    var title  = item.title || item.name || 'Без назви';
    var year   = (item.release_date || item.first_air_date || '').substring(0, 4);
    var rating = item.vote_average ? Number(item.vote_average).toFixed(1) : '';

    var $card = $(
      '<div class="ke-card selector" tabindex="0">' +
        '<div class="ke-card__poster"' +
          (poster ? ' style="background-image:url(\'' + poster + '\')"' : '') + '>' +
          (!poster ? '<div class="ke-card__no-poster">🎬</div>' : '') +
          (rating  ? '<div class="ke-card__rating">★ ' + rating + '</div>' : '') +
          (tLabel ? '<div class="ke-card__tag ' + tClass + '">' + tLabel + '</div>' : '') +
        '</div>' +
        '<div class="ke-card__info">' +
          '<div class="ke-card__title">' + esc(title) + '</div>' +
          (year ? '<div class="ke-card__year">' + year + '</div>' : '') +
        '</div>' +
      '</div>'
    );

    $card.on('hover:enter', function () {
      Lampa.Activity.push({
        url: '', component: 'full',
        id: item.id, method: method, card: item, source: 'tmdb'
      });
    });

    return $card;
  }

  // ─── РЕНДЕР СЕКЦІЇ ЛАНЦЮЖКА ────────────────────────────────────────────────
  function renderChainSection(icon, title, chainClass, entries, tagClass, tagLabel) {
    if (!entries || !entries.length) return null;
    var $sec = $('<div class="ke-section ke-chain ke-chain--' + chainClass + '"></div>');
    $sec.append(
      '<div class="ke-section-head">' +
        '<span class="ke-section-bar"></span>' +
        '<span class="ke-section-icon">' + icon + '</span>' +
        '<span class="ke-section-title">' + esc(title) + '</span>' +
        '<span class="ke-section-count">' + entries.length + ' фільмів</span>' +
      '</div>'
    );
    var $strip = $('<div class="ke-strip"></div>');
    entries.forEach(function (e) { $strip.append(renderCard(e, tagClass, tagLabel)); });
    $sec.append($strip);
    return $sec;
  }

  // ─── РЕНДЕР ПАСХАЛОК ──────────────────────────────────────────────────────
  function renderFactsSection(facts) {
    if (!facts || !facts.length) return null;
    var $sec = $('<div class="ke-section"></div>');
    $sec.append(
      '<div class="ke-section-head">' +
        '<span class="ke-section-bar" style="background:#bf00ff"></span>' +
        '<span class="ke-section-icon">🔮</span>' +
        '<span class="ke-section-title" style="color:#d580ff">Зв’язки та приховані деталі</span>' +
      '</div>'
    );
    var $list = $('<div class="ke-facts"></div>');
    facts.forEach(function (f) {
      $list.append(
        '<div class="ke-fact selector" tabindex="0">' +
          '<span class="ke-fact__icon">' + f.icon + '</span>' +
          '<span class="ke-fact__text">' + esc(f.text) + '</span>' +
        '</div>'
      );
    });
    $sec.append($list);
    return $sec;
  }

  // ─── МАПА ────────────────────────────────────────────────────────────────
  function renderMapTab(data, directEntries, hiddenEntries) {
    var $wrap  = $('<div class="ke-map"></div>');
    var poster = data.poster_path ? tmdbImg(data.poster_path, 'w300') : '';
    var title  = data.title || data.name || '';

    var $hub = $(
      '<div class="ke-map-hub">' +
        '<div class="ke-map-hub__poster"' +
          (poster ? ' style="background-image:url(\'' + poster + '\')"' : '') + '></div>' +
        '<div class="ke-map-hub__title">' + esc(title) + '</div>' +
      '</div>'
    );
    $wrap.append($hub);

    if (directEntries && directEntries.length) {
      $wrap.append('<div class="ke-map-line"></div>');
      $wrap.append('<div class="ke-map-label">🔗 ПРЯМЕ ВІДЛУННЯ</div>');
      $wrap.append('<div class="ke-map-line"></div>');
      var $n1 = $('<div class="ke-map-nodes"></div>');
      directEntries.slice(0, 6).forEach(function (e) {
        $n1.append(renderCard(e, 'ke-tag--direct', 'відлуння'));
      });
      $wrap.append($n1);
    }

    if (hiddenEntries && hiddenEntries.length) {
      $wrap.append('<div class="ke-map-divider">✨ ПРИХОВАНІ ЗВ’ЯЗКИ</div>');
      $wrap.append('<div class="ke-map-line" style="background:linear-gradient(180deg,rgba(191,0,255,0.7),rgba(191,0,255,0.3))"></div>');
      var $n2 = $('<div class="ke-map-nodes"></div>');
      hiddenEntries.slice(0, 6).forEach(function (e) {
        $n2.append(renderCard(e, 'ke-tag--hidden', 'приховане'));
      });
      $wrap.append($n2);
    }

    if (!directEntries.length && !hiddenEntries.length)
      $wrap.append('<div class="ke-empty">Не вдалося побудувати мапу зв’язків</div>');

    return $wrap;
  }

  // ─── ТАБ «НАСТРІЙ» ───────────────────────────────────────────────────────
  function renderMoodTab(data) {
    var method     = data.first_air_date ? 'tv' : 'movie';
    var activeMood = null;
    var $wrap      = $('<div></div>');

    $wrap.append('<div class="ke-mood-intro">Обери настрій — і отримай кінематографічну добірку найкращих фільмів у цій атмосфері.</div>');

    var $grid    = $('<div class="ke-moods"></div>');
    var $results = $('<div class="ke-mood-results"></div>');

    MOODS.forEach(function (mood) {
      var $btn = $(
        '<div class="ke-mood selector" tabindex="0" style="color:' + mood.color + '">' +
          mood.label +
        '</div>'
      );

      $btn.on('hover:enter', function () {
        if (activeMood === mood.id) return;
        activeMood = mood.id;

        $grid.find('.ke-mood').each(function () {
          $(this).removeClass('ke-mood--active').css({ background: 'rgba(255,255,255,0.05)', 'border-color': 'rgba(255,255,255,0.15)' });
        });
        $btn.addClass('ke-mood--active').css({ background: mood.color + '18', 'border-color': mood.color });

        $results.html('<div class="ke-loading">🌀 Складаю добірку...</div>');

        var path = 'discover/' + method +
          '?with_genres=' + mood.genres.join(',') +
          '&sort_by=vote_average.desc' +
          '&vote_count.gte=' + mood.minVotes +
          '&vote_average.gte=' + mood.minRating;

        tmdbGet(path, function (err, d) {
          $results.empty();
          if (err || !d || !d.results || !d.results.length) {
            $results.html('<div class="ke-empty">Не вдалося знайти фільми для цього настрою</div>');
            return;
          }
          var entries = d.results.slice(0, 12).map(function (r) { return { item: r, method: method }; });
          $results.append(
            '<div class="ke-section-head" style="margin-bottom:0.8em">' +
              '<span class="ke-section-bar" style="background:' + mood.color + '"></span>' +
              '<span class="ke-section-icon">' + mood.label.split(' ')[0] + '</span>' +
              '<span class="ke-section-title" style="color:' + mood.color + '">' + esc(mood.label.replace(/^\S+\s+/, '')) + '</span>' +
              '<span class="ke-section-count">' + entries.length + ' фільмів</span>' +
            '</div>'
          );
          var $strip = $('<div class="ke-strip"></div>');
          entries.forEach(function (e) { $strip.append(renderCard(e, 'ke-tag--mood', 'добірка')); });
          $results.append($strip);
          try { Lampa.Controller.collectionSet($wrap.closest('.ke-root')); } catch (e) {}
        });
      });

      $grid.append($btn);
    });

    $wrap.append($grid).append($results);
    return $wrap;
  }

  // ─── ГОЛОВНИЙ КОМПОНЕНТ ────────────────────────────────────────────────────
  function KinoEchoActivity(object) {
    var $root = $('<div class="ke-root"><div class="ke-page"><div class="ke-loading">🔮 Будуємо кінолабіринт...</div></div></div>');
    var $page = $root.find('.ke-page');
    var loaded      = false;
    var activeTab   = 0;
    var lastFocused = null;
    var self        = this;
    var $tabEls     = [];
    var $tabContents = [];
    var switchTab    = null;

    this.create  = function () { this.load(); return this.render(); };
    this.render  = function () { return $root; };

    this.load = function () {
      var method = object.method || 'movie';
      var path   = method + '/' + object.id +
        '?append_to_response=recommendations,similar,credits,keywords';
      tmdbGet(path, function (err, data) {
        if (loaded) return;
        loaded = true;
        if (err || !data) {
          $page.html('<div class="ke-loading">Помилка завантаження TMDB</div>');
          return;
        }
        self.build(data);
      });
    };

    this.build = function (data) {
      $page.empty();

      var title  = data.title || data.name || '';
      var year   = (data.release_date || data.first_air_date || '').substring(0, 4);
      var rating = data.vote_average ? Number(data.vote_average).toFixed(1) : '';
      var bg     = data.backdrop_path ? tmdbImg(data.backdrop_path, 'w1280') : '';

      // Hero
      $page.append(
        '<div class="ke-hero"' + (bg ? ' style="background-image:url(\'' + bg + '\')"' : '') + '>' +
          '<div class="ke-hero__glow"></div>' +
          '<div class="ke-hero__overlay"></div>' +
          '<div class="ke-hero__content">' +
            '<div class="ke-hero__label">КіноВідлуння</div>' +
            '<div class="ke-hero__title">' + esc(title) + '</div>' +
            '<div class="ke-hero__meta">' +
              (rating ? '<span class="ke-badge ke-badge--cyan">★ ' + rating + '</span>' : '') +
              (year   ? '<span class="ke-badge">' + year + '</span>' : '') +
              '<span class="ke-badge ke-badge--purple">🔮 Кінолабіринт</span>' +
            '</div>' +
          '</div>' +
        '</div>'
      );

      // Tabs
      var tabNames = ['🔗 Ланцюжки', '🗺️ Мапа', '🎭 Настрій'];
      var $tabsRow = $('<div class="ke-tabs"></div>');
      $tabEls = [];
      tabNames.forEach(function (name, i) {
        var $t = $('<div class="ke-tab selector' + (i === 0 ? ' ke-tab--active' : '') + '" tabindex="0">' + name + '</div>');
        $t.on('hover:enter', function () { switchTab(i); });
        $tabsRow.append($t);
        $tabEls.push($t);
      });
      $page.append($tabsRow);

      // Tab content wrappers
      $tabContents = [];
      for (var i = 0; i < 3; i++) {
        var $tc = $('<div class="ke-tab-content"></div>');
        if (i > 0) $tc.hide();
        $page.append($tc);
        $tabContents.push($tc);
      }

      switchTab = function (idx) {
        activeTab = idx;
        $tabEls.forEach(function ($t, i) {
          if (i === idx) $t.addClass('ke-tab--active'); else $t.removeClass('ke-tab--active');
        });
        $tabContents.forEach(function ($tc, i) { if (i === idx) $tc.show(); else $tc.hide(); });
        try { Lampa.Controller.collectionSet($root); } catch (e) {}
      };

      // ── Tab 1: Chains ──
      var $t1 = $tabContents[0];
      var directEntries = chainDirect(data);
      var directIds     = directEntries.map(function (e) { return e.item.id; });
      var crewFacts     = buildCrewFacts(data);

      var $secDirect = renderChainSection('🔗', 'Прямий ланцюжок відлуння', 'direct', directEntries, 'ke-tag--direct', 'відлуння');
      if ($secDirect) $t1.append($secDirect);

      var $factsSec = renderFactsSection(crewFacts);
      if ($factsSec) $t1.append($factsSec);

      var $hiddenPH = $('<div></div>');
      var $altPH    = $('<div></div>');
      var $authorPH = $('<div></div>');
      $t1.append($hiddenPH).append($altPH).append($authorPH);

      // ── Tab 2: Map placeholder ──
      var $t2 = $tabContents[1];
      $t2.html('<div class="ke-loading">🗺️ Будуємо мапу...</div>');

      // ── Tab 3: Mood ──
      $tabContents[2].append(renderMoodTab(data));

      // ── Async: hidden chain (shared between tab 1 and tab 2) ──
      var hiddenLoaded  = false;
      var hiddenEntries = [];

      function tryBuildMap() {
        if (!hiddenLoaded) return;
        $t2.empty();
        $t2.append(renderMapTab(data, directEntries, hiddenEntries));
        try { Lampa.Controller.collectionSet($root); } catch (e) {}
      }

      chainHidden(data, directIds, function (entries) {
        hiddenEntries = entries;
        hiddenLoaded  = true;

        var $secH = renderChainSection('✨', 'Прихований ланцюжок відлуння', 'hidden', entries, 'ke-tag--hidden', 'приховане');
        if ($secH) $hiddenPH.replaceWith($secH); else $hiddenPH.remove();
        try { Lampa.Controller.collectionSet($root); } catch (e) {}
        tryBuildMap();
      });

      // ── Async: alternative chain ──
      chainAlternative(data, function (entries) {
        var $secA = renderChainSection('🌀', 'Альтернативна реальність', 'alt', entries, 'ke-tag--alt', 'альт');
        if ($secA) $altPH.replaceWith($secA); else $altPH.remove();
        try { Lampa.Controller.collectionSet($root); } catch (e) {}
      });

      // ── Async: author chain ──
      chainAuthor(data, directIds, function (entries) {
        var $secAu = renderChainSection('✍️', 'Авторське відлуння', 'author', entries);
        if ($secAu) $authorPH.replaceWith($secAu); else $authorPH.remove();
        try { Lampa.Controller.collectionSet($root); } catch (e) {}
      });

      setTimeout(function () {
        try { Lampa.Controller.toggle('content'); } catch (e) {}
      }, 120);
    };

    // ── Scrolling ──
    function scrollTo(el) {
      if (!el || !$root || !$root[0]) return;
      var raf = window.requestAnimationFrame || function (cb) { setTimeout(cb, 16); };
      raf(function () {
        if (!$root || !$root[0]) return;

        // Horizontal scroll for cards inside .ke-strip
        var strip = null, sp = el.parentNode;
        while (sp && sp !== $root[0]) {
          if (sp.className && sp.className.indexOf('ke-strip') >= 0) { strip = sp; break; }
          sp = sp.parentNode;
        }
        if (strip) {
          var elRect  = el.getBoundingClientRect();
          var stRect  = strip.getBoundingClientRect();
          var hm      = 20;
          if (elRect.left - hm < stRect.left) {
            strip.scrollLeft -= stRect.left - elRect.left + hm;
          } else if (elRect.right + hm > stRect.right) {
            strip.scrollLeft += elRect.right + hm - stRect.right;
          }
        }

        // Vertical scroll
        var root  = $root[0];
        var viewH = root.clientHeight;
        if (viewH > 0) {
          var top = 0, node = el;
          while (node && node !== root) { top += node.offsetTop; node = node.offsetParent; }
          var bottom = top + el.offsetHeight;
          var margin = 80;
          if (top - margin < root.scrollTop)                  root.scrollTop = Math.max(0, top - margin);
          else if (bottom + margin > root.scrollTop + viewH)  root.scrollTop = bottom + margin - viewH;
        } else {
          try { el.scrollIntoView({ behavior: 'auto', block: 'nearest' }); }
          catch (e) { try { el.scrollIntoView(false); } catch (er) {} }
        }
      });
    }

    function scrollToFocus() {
      if (!$root) return;
      var focused = $root.find('.selector.focus')[0] || lastFocused;
      if (focused) scrollTo(focused);
    }

    function getFocusedTab() {
      if (!lastFocused) return -1;
      for (var i = 0; i < $tabEls.length; i++) {
        if ($tabEls[i] && $tabEls[i][0] === lastFocused) return i;
      }
      return -1;
    }

    function focusTab(idx) {
      if (!$tabEls[idx] || !$tabEls[idx][0]) return;
      if (switchTab) switchTab(idx);
      Lampa.Controller.collectionFocus($tabEls[idx][0], $root);
      scrollTo($tabEls[idx][0]);
    }

    function focusFirstContent() {
      if (!$tabContents[activeTab]) return false;
      var $first = $tabContents[activeTab].find('.selector').first();
      if (!$first.length) return false;
      Lampa.Controller.collectionFocus($first[0], $root);
      scrollTo($first[0]);
      return true;
    }

    $root.on('hover:focus', '.selector', function () { lastFocused = this; scrollTo(this); });

    // ── Controller ──
    this.start = function () {
      var back = this.back;
      function applyH() {
        if (!$root || !$root[0]) return;
        var h = window.innerHeight || document.documentElement.clientHeight
              || screen.availHeight || screen.height || 0;
        if (h > 100) $root[0].style.height = h + 'px';
      }
      applyH(); setTimeout(applyH, 300);

      Lampa.Controller.add('content', {
        toggle: function () {
          Lampa.Controller.collectionSet($root);
          var target;
          if (lastFocused && $root[0] && $.contains($root[0], lastFocused)) {
            target = lastFocused;
          } else if ($tabEls.length && $tabEls[0] && $tabEls[0][0]) {
            target = $tabEls[0][0];
          } else {
            target = $root.find('.selector').first()[0];
          }
          if (target) { Lampa.Controller.collectionFocus(target, $root); scrollTo(target); }
        },
        update: function () { Lampa.Controller.collectionSet($root); },
        left: function () {
          var ti = getFocusedTab();
          if (ti >= 0) {
            if (ti > 0) focusTab(ti - 1);
            return;
          }
          if (typeof Navigator !== 'undefined' && Navigator.canmove && Navigator.canmove('left')) {
            Navigator.move('left');
            setTimeout(scrollToFocus, 50);
          } else if (lastFocused && $(lastFocused).closest('.ke-strip, .ke-moods, .ke-map-nodes, .ke-facts').length) {
            // at left edge of content grid — do nothing
          } else {
            Lampa.Controller.toggle('menu');
          }
        },
        right: function () {
          var ti = getFocusedTab();
          if (ti >= 0) {
            if (ti < $tabEls.length - 1) focusTab(ti + 1);
            return;
          }
          if (typeof Navigator !== 'undefined' && Navigator.move) {
            Navigator.move('right');
            setTimeout(scrollToFocus, 50);
          }
        },
        up: function () {
          if (getFocusedTab() >= 0) {
            Lampa.Controller.toggle('head');
            return;
          }
          if (typeof Navigator !== 'undefined' && Navigator.canmove && Navigator.canmove('up')) {
            Navigator.move('up');
            setTimeout(scrollToFocus, 50);
          } else {
            focusTab(activeTab);
          }
        },
        down: function () {
          if (getFocusedTab() >= 0) {
            focusFirstContent();
            return;
          }
          if (typeof Navigator !== 'undefined' && Navigator.move) {
            Navigator.move('down');
            setTimeout(scrollToFocus, 50);
          }
        },
        back: back
      });
      Lampa.Controller.toggle('content');
      setTimeout(function () {
        if (!$root || !$root[0]) return;
        try { Lampa.Controller.collectionSet($root); } catch (e) {}
        var tgt = (lastFocused && $.contains($root[0], lastFocused))
          ? lastFocused
          : ($tabEls[0] && $tabEls[0][0] ? $tabEls[0][0] : null);
        if (tgt) { try { Lampa.Controller.collectionFocus(tgt, $root); scrollTo(tgt); } catch (e) {} }
      }, 100);
    };

    this.pause   = function () {};
    this.stop    = function () {};
    this.back    = function () { Lampa.Activity.backward(); };
    this.destroy = function () {
      if ($root) $root.remove();
      $root = null; $page = null;
    };
  }

  // ─── КНОПКА НА КАРТЦІ ───────────────────────────────────────────────────
  function appendButton($buttons, movie, method) {
    if (!$buttons || !$buttons.length || $buttons.find('.view--ke').length) return;

    var svgIcon =
      '<svg width="30" height="30" viewBox="0 0 24 24" fill="none">' +
        '<circle cx="12" cy="12" r="9" stroke="#00e5ff" stroke-width="1.8"/>' +
        '<circle cx="12" cy="12" r="3.5" fill="#00e5ff" opacity="0.8"/>' +
        '<line x1="12" y1="3" x2="12" y2="7.5" stroke="#00e5ff" stroke-width="1.5" stroke-linecap="round"/>' +
        '<line x1="12" y1="16.5" x2="12" y2="21" stroke="#00e5ff" stroke-width="1.5" stroke-linecap="round"/>' +
        '<line x1="3" y1="12" x2="7.5" y2="12" stroke="#00e5ff" stroke-width="1.5" stroke-linecap="round"/>' +
        '<line x1="16.5" y1="12" x2="21" y2="12" stroke="#00e5ff" stroke-width="1.5" stroke-linecap="round"/>' +
      '</svg>';

    var $btn = $(
      '<div class="full-start__button selector view--ke">' +
        svgIcon + '<span>КіноВідлуння</span>' +
      '</div>'
    );
    $btn.on('hover:enter', function () {
      Lampa.Activity.push({
        url:       '',
        title:     'КіноВідлуння: ' + (movie.title || movie.name || ''),
        component: 'kinoecho_activity',
        id:        movie.id,
        method:    method,
        source:    'tmdb'
      });
    });
    $buttons.append($btn);
  }

  function injectButton() {
    Lampa.Listener.follow('full', function (e) {
      if (e.type !== 'complite') return;
      var data = e.data;
      if (!data) return;
      var movie = data.movie || data;
      if (!movie || !movie.id) return;

      var method = (e.object && e.object.method) || data.method || movie.method ||
                   (movie.first_air_date || movie.name ? 'tv' : 'movie');

      var $render = e.object.activity.render();
      var tries   = 0;
      function tryAppend() {
        var $btns = $render.find('.full-start-new__buttons, .full-start__buttons').first();
        if ($btns.length) appendButton($btns, movie, method);
        else if (tries++ < 5) setTimeout(tryAppend, 200);
      }
      tryAppend();
    });
  }

  // ─── ІНІЦІАЛІЗАЦІЯ ────────────────────────────────────────────────────────
  function init() {
    if (!window.Lampa || !Lampa.Listener || !Lampa.Component) return setTimeout(init, 500);
    injectStyles();
    Lampa.Component.add('kinoecho_activity', KinoEchoActivity);
    injectButton();
  }

  if (window.appready) init();
  else Lampa.Listener.follow('app', function (e) { if (e.type === 'ready') init(); });
})();
