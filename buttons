(function () {
    'use strict';

    // =====================================================================
    //  version 3.0.0 release by ne3nayskas - https://t.me/mmssixxx
    //  Button Manager + Кеш/Вихід (єдиний плагін)
    //  - порядок кнопок у картці: Lampac Online → інші Online → Торренти →
    //    Трейлери → УКР-трейлер → Обране → решта
    //  - Hide text: «Так» = текст кнопок прихований, «Ні» = текст видно
    //  - кнопки в шапці: очистити кеш (зі збереженням важливих ключів) і вихід
    // =====================================================================

    var STYLE_ID   = 'lme-button-style';
    var HIDE_CLASS = 'lme-hide-text';
    var READY_CLASS = 'lme-ready';
    var SETTING_KEY = 'lme_showbuttonwn';
    var lastFullContainer = null;
    var lastStartInstance = null;

    var FIXED_ORDER = ['view--torrent', 'view--trailer', 'view--ukr-trailer', 'button--book'];

    // ---------- SVG іконки ----------
    var SVG_ICONS = {
        cache: '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M8 3.1l1.4 2.2-1.6 1.1 1.3 0.3 2.8 0.6 0.6-2.7 0.4-1.4-1.8 1.1-2-3.3h-2.2l-2.6 4.3 1.7 1z"/>' +
            '<path d="M16 12l-2.7-4.3-1.7 1 2 3.3h-2.6v-2l-3 3 3 3v-2h3.7z"/>' +
            '<path d="M2.4 12v0l1.4-2.3 1.7 1.1-0.9-4.2-2.8 0.7-1.3 0.3 1.6 1-2.1 3.4 1.3 2h5.7v-2z"/></svg>',
        exit: '<svg width="24" height="24" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm.06,17.68a1.28,1.28,0,0,1-1.29-1.28V8.65a1.29,1.29,0,0,1,2.58,0V18.4A1.28,1.28,0,0,1,18.06,19.68ZM18,27.79A9.88,9.88,0,0,1,12.17,9.85a1.4,1.4,0,0,1,1.94.31,1.37,1.37,0,0,1-.31,1.92,7.18,7.18,0,1,0,11.43,5.8,7.07,7.07,0,0,0-3-5.76A1.37,1.37,0,0,1,22,10.2a1.4,1.4,0,0,1,1.94-.29A9.88,9.88,0,0,1,18,27.79Z"/></svg>',
        torrent: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">' +
            '<path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2zM40.5,30.963c-3.1,0-4.9-2.4-4.9-2.4S34.1,35,27,35c-1.4,0-3.6-0.837-3.6-0.837l4.17,9.643C26.727,43.92,25.874,44,25,44c-2.157,0-4.222-0.377-6.155-1.039L9.237,16.851c0,0-0.7-1.2,0.4-1.5c1.1-0.3,5.4-1.2,5.4-1.2s1.475-0.494,1.8,0.5c0.5,1.3,4.063,11.112,4.063,11.112S22.6,29,27.4,29c4.7,0,5.9-3.437,5.7-3.937c-1.2-3-4.993-11.862-4.993-11.862s-0.6-1.1,0.8-1.4c1.4-0.3,3.8-0.7,3.8-0.7s1.105-0.163,1.6,0.8c0.738,1.437,5.193,11.262,5.193,11.262s1.1,2.9,3.3,2.9c0.464,0,0.834-0.046,1.152-0.104c-0.082,1.635-0.348,3.221-0.817,4.722C42.541,30.867,41.756,30.963,40.5,30.963z"/></svg>',
        // Другий path — великий центральний трикутник (жовтий у кнопці Lampac)
        online: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
            '<path d="M20.331 14.644l-13.794-13.831 17.55 10.075z"/>' +
            '<path d="M2.938 0c-0.813 0.425-1.356 1.2-1.356 2.206v27.581c0 1.006 0.544 1.781 1.356 2.206l16.038-16z"/>' +
            '<path d="M29.512 14.1l-3.681-2.131-4.106 4.031 4.106 4.031 3.756-2.131c1.125-0.893 1.125-2.906-0.075-3.8z"/>' +
            '<path d="M6.538 31.188l17.55-10.075-3.756-3.756z"/></svg>',
        trailer: '<svg height="70" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M71.2555 2.08955C74.6975 3.2397,77.4083 6.62804,78.3283 10.9306C80 18.7291,80 35,80 35C80 35,80 51.2709,78.3283 59.0694C77.4083 63.372,74.6975 66.7603,71.2555 67.9104C65.0167 70,40,70,40,70C40 70,14.9833 70,8.74453 67.9104C5.3025 66.7603,2.59172 63.372,1.67172 59.0694C0 51.2709,0 35,0 35C0 35,0 18.7291,1.67172 10.9306C2.59172 6.62804,5.3025 3.2395,8.74453 2.08955C14.9833 0,40,0,40,0C40 0,65.0167 0,71.2555 2.08955ZM55.5909 35.0004L29.9773 49.5714V20.4286L55.5909 35.0004Z"/></svg>'
    };

    var clearBtnId = 'CLEARCACHE';
    var exitBtnId  = 'EXITBUTTON';

    // Ключі, які не можна втрачати при очищенні кешу
    var KEEP_KEYS = [
        'search_history', 'online_view', 'torrents_view', 'online_last_balanser',
        'user_clarifys', 'torrents_filter_data', 'online_watched_last', SETTING_KEY
    ];
    var KEEP_PREFIX = ['online_choice_'];
    var NONE = '__none__';

    var profileObserver = null;

    function safeExecute(fn, errorMsg) {
        try { return fn(); } catch (e) { console.error(errorMsg, e); return null; }
    }

    // ---------- Мова ----------
    function addLang() {
        Lampa.Lang.add({
            lme_showbuttonwn_desc: {
                ru: "Так — только иконки, Нет — иконки с текстом",
                en: "Yes — icons only, No — icons with text",
                uk: "Так — лише іконки, Ні — іконки з текстом"
            }
        });
    }

    // ---------- Стилі (вставляються одразу при старті) ----------
    function ensureStyles() {
        if (document.getElementById(STYLE_ID)) return;

        var css = [
            ':root {',
            '  --online-color: #2196f3;',
            '  --online-accent: #ffeb3b;',
            '  --torrent-color: #4caf50;',
            '  --trailer-color: #f44336;',
            '  --cache-color: #2196f3;',
            '  --exit-color:  #f44336;',
            '}',

            '.lme-buttons { display: flex; flex-wrap: wrap; gap: 10px; }',

            // Текст кнопок ховається глобально через клас на <html>,
            // тому працює ще до того, як кнопки переставлено (без «миготіння»)
            'html.' + HIDE_CLASS + ' .full-start__button span { display: none; }',

            // Поки плагін не розставив кнопки — контейнери невидимі (без стрибків)
            '.full-start-new__buttons:not(.' + READY_CLASS + '),',
            '.buttons--container { opacity: 0; }',

            '.head__action.open--feed svg path,',
            '.full-start__button.view--online svg path { fill: var(--online-color) !important; }',
            '.full-start__button.lampac--button svg path:nth-of-type(2) { fill: var(--online-accent) !important; }',
            '.full-start__button.view--torrent svg path { fill: var(--torrent-color) !important; }',
            '.full-start__button.view--trailer svg path { fill: var(--trailer-color) !important; }',
            '#' + clearBtnId + ' svg path { fill: var(--cache-color) !important; }',
            '#' + exitBtnId  + ' svg path { fill: var(--exit-color)  !important; }',

            '@media (max-width: 767px) {',
            '  .full-start__button { min-height: 44px !important; padding: 10px !important; }',
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = css;
        document.head.appendChild(style);
    }

    // ---------- Hide text ----------
    // «Так» (true) = текст прихований. Якщо налаштування ще не чіпали — за замовчуванням «Так».
    function isTextHidden() {
        var v = Lampa.Storage.get(SETTING_KEY, NONE);
        if (v === false || v === 'false') return false;
        return true;
    }

    function syncHideClass() {
        document.documentElement.classList.toggle(HIDE_CLASS, isTextHidden());
    }

    // ---------- Розкладка кнопок у картці ----------
    function getFullContainer(e) {
        if (e && e.body) return e.body;
        if (e && e.link && e.link.html) return e.link.html;
        if (e && e.object && e.object.activity && typeof e.object.activity.render === 'function') return e.object.activity.render();
        return null;
    }

    function replaceIcons(root) {
        root.find('.full-start__button.view--torrent svg').replaceWith(SVG_ICONS.torrent);
        root.find('.full-start__button.view--online svg').replaceWith(SVG_ICONS.online);
        root.find('.full-start__button.view--trailer svg').replaceWith(SVG_ICONS.trailer);
    }

    function applyLayout(fullContainer) {
        if (!fullContainer || !fullContainer.length) return;

        var targetContainer = fullContainer.find('.full-start-new__buttons');
        var extraContainer  = fullContainer.find('.buttons--container');

        // Кнопка Play та кнопка "..." не потрібні
        targetContainer.find('.button--play').remove();
        fullContainer.find('.button--options, .open--menu').remove();

        var allButtons = targetContainer.find('.full-start__button')
            .add(extraContainer.find('.full-start__button'));

        var ordered = [];
        function pushEl(el) {
            if (el && ordered.indexOf(el) === -1) ordered.push(el);
        }

        targetContainer.find('.button--priority').each(function () { pushEl(this); });

        // Lampac online.js — завжди першим
        allButtons.filter('.lampac--button').each(function () { pushEl(this); });
        // Решта онлайн-кнопок (BanderaOnline) — одразу за ним
        allButtons.filter('.view--online').each(function () { pushEl(this); });

        FIXED_ORDER.forEach(function (cls) {
            var el = allButtons.filter('.' + cls);
            if (cls === 'view--torrent') el = el.not('.hide');
            pushEl(el.first()[0]);
        });

        allButtons.each(function () { pushEl(this); });

        // Прибираємо дублікати: однакові класи + однаковий вміст
        var seen = {};
        var unique = [];
        ordered.forEach(function (el) {
            var cls = (el.className || '').split(/\s+/).filter(function (c) {
                return c && ['selector', 'focus', 'hide', 'full-start__button'].indexOf(c) === -1;
            }).sort().join('.');
            var key = cls + '|' + $(el).html();
            if (seen[key]) { $(el).remove(); return; }
            seen[key] = true;
            unique.push(el);
        });
        ordered = unique;

        // detach (не empty), щоб зберегти обробники подій
        $(ordered).detach();
        $(ordered).each(function () { targetContainer.append(this); });

        // Іконки міняємо в тому ж проході, до показу кнопок
        safeExecute(function () { replaceIcons(targetContainer); }, 'Помилка оновлення іконок кнопок');

        targetContainer.addClass('lme-buttons');
        syncHideClass();

        Lampa.Controller.toggle("full_start");

        // Фокус на першу доступну кнопку
        if (lastStartInstance && lastStartInstance.html &&
            fullContainer[0] === lastStartInstance.html[0]) {
            var firstButton = targetContainer
                .find('.full-start__button.selector')
                .not('.hide')
                .first();
            if (firstButton.length) lastStartInstance.last = firstButton[0];
        }
    }

    function revealButtons(fullContainer) {
        fullContainer.find('.full-start-new__buttons').addClass(READY_CLASS);
    }

    function initCardListener() {
        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'build' && e.name === 'start' && e.item && e.item.html) {
                lastStartInstance = e.item;
            }
            if (e.type === 'complite') {
                var fullContainer = getFullContainer(e);
                if (!fullContainer) return;
                lastFullContainer = fullContainer;

                // Таймаут, щоб інші плагіни встигли вставити свої кнопки
                setTimeout(function () {
                    try {
                        Lampa.Storage.set('full_btn_priority', '');
                        applyLayout(fullContainer);
                    } catch (err) {
                        console.error('Button Manager:', err);
                    }
                    revealButtons(fullContainer);
                }, 50);

                // Запобіжник: кнопки в жодному разі не лишаються невидимими
                setTimeout(function () { revealButtons(fullContainer); }, 800);
            }
        });
    }

    // ---------- Налаштування ----------
    function initSettings() {
        Lampa.SettingsApi.addComponent({
            component: "lme",
            name: 'Button Manager',
            icon: '<svg height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 431.661 431.661" xml:space="preserve" fill="#000000"><g><path style="fill:#ffffff;" d="M180.355,213.668l40.079,40.085L42.526,431.661L2.446,391.576L180.355,213.668z M228.877,245.316l-40.079-40.085l68.905-68.911l40.091,40.079L228.877,245.316z"></path><polygon style="fill:#ffffff;" points="380.066,218.525 391.999,218.519 391.999,181.309 429.215,181.309 429.215,169.376 391.999,169.376 391.999,132.166 380.066,132.166 380.066,169.376 342.862,169.376 342.862,181.309 380.066,181.309"></polygon><polygon style="fill:#ffffff;" points="393.282,260.424 393.282,248.49 356.073,248.49 356.073,211.281 344.145,211.281 344.145,248.49 306.93,248.49 306.93,260.424 344.145,260.424 344.145,297.633 356.073,297.633 356.073,260.424"></polygon><polygon style="fill:#ffffff;" points="302.956,37.209 265.741,37.209 265.741,0 253.807,0 253.807,37.209 216.603,37.209 216.603,49.143 253.807,49.143 253.807,86.353 265.741,86.353 265.741,49.143 302.956,49.143"></polygon><polygon style="fill:#ffffff;" points="223.853,73.148 186.638,73.148 186.638,35.932 174.71,35.932 174.71,73.148 137.495,73.148 137.495,85.076 174.71,85.076 174.71,122.291 186.638,122.291 186.638,85.076 223.853,85.076"></polygon></g></svg>'
        });

        Lampa.SettingsApi.addParam({
            component: "lme",
            param: {
                name: SETTING_KEY,
                type: "trigger",
                "default": true
            },
            field: {
                name: 'Hide text',
                description: Lampa.Lang.translate('lme_showbuttonwn_desc')
            },
            onChange: function () {
                Lampa.Settings.update();
                // Дати Lampa записати нове значення, потім застосувати
                setTimeout(function () {
                    syncHideClass();
                    if (lastFullContainer && lastFullContainer.length) {
                        applyLayout(lastFullContainer);
                    }
                }, 30);
            }
        });
    }

    // ---------- Кеш / Вихід у шапці ----------
    function snapshotKeep() {
        var keys = KEEP_KEYS.slice();
        try {
            for (var i = 0; i < localStorage.length; i++) {
                var k = localStorage.key(i);
                var match = KEEP_PREFIX.some(function (p) { return k.indexOf(p) === 0; });
                if (match && keys.indexOf(k) < 0) keys.push(k);
            }
        } catch (e) {}

        var saved = {};
        keys.forEach(function (k) {
            var v = Lampa.Storage.get(k, NONE);
            if (v !== NONE) saved[k] = v;
        });
        return saved;
    }

    function restoreKeep(saved) {
        Object.keys(saved).forEach(function (k) { Lampa.Storage.set(k, saved[k]); });
    }

    function removeDuplicateProfileIcons() {
        var profileIcons = $('.head__action.open--profile.levende');
        if (profileIcons.length > 1) profileIcons.first().remove();
    }

    function setupProfileObserver() {
        if (profileObserver) { profileObserver.disconnect(); profileObserver = null; }

        var headActions = $('.head__actions');
        if (!headActions.length) return;

        profileObserver = new MutationObserver(removeDuplicateProfileIcons);
        profileObserver.observe(headActions[0], { childList: true, subtree: true });
    }

    function initHeaderButtons() {
        $('#' + clearBtnId).remove();
        $('#' + exitBtnId).remove();

        removeDuplicateProfileIcons();
        setupProfileObserver();

        $('.head__actions').append(
            '<div id="' + clearBtnId + '" class="head__action selector m-clear-cache" title="Очистити кеш">' +
            SVG_ICONS.cache + '</div>'
        );
        $('.head__actions').append(
            '<div id="' + exitBtnId + '" class="head__action selector m-exit-app" title="Вихід">' +
            SVG_ICONS.exit + '</div>'
        );

        $('#' + clearBtnId).on('hover:enter hover:click hover:touch', function () {
            safeExecute(function () {
                if (Lampa.Storage && typeof Lampa.Storage.clear === 'function') {
                    var saved = snapshotKeep();
                    Lampa.Storage.clear(false);
                    restoreKeep(saved);
                    setTimeout(function () { location.reload(); }, 800);
                }
            }, 'Помилка очищення кешу');
        });

        $('#' + exitBtnId).on('hover:enter hover:click hover:touch', function () {
            safeExecute(function () {
                if (Lampa.Platform.is('apple_tv')) window.location.assign('exit://exit');
                if (Lampa.Platform.is('tizen'))    tizen.application.getCurrentApplication().exit();
                if (Lampa.Platform.is('webos') && typeof window.close === 'function') window.close();
                if (Lampa.Platform.is('android'))  Lampa.Android.exit();
                if (Lampa.Platform.is('orsay'))    Lampa.Orsay.exit();
                if (Lampa.Platform.is('netcast'))  window.NetCastBack();
                if (Lampa.Platform.is('noname'))   window.history.back();
            }, 'Помилка виходу');
        });
    }

    // ---------- Запуск ----------
    var manifest = {
        type: "other",
        version: "3.0.0",
        author: '@lme_chat',
        name: "Button Manager + Кеш/Вихід",
        description: "Порядок кнопок картки (Lampac Online першим), Hide text, кнопки очищення кешу та виходу в шапці",
        component: "lme"
    };

    function add() {
        Lampa.Manifest.plugins = manifest;
        ensureStyles();
        syncHideClass();
        addLang();
        initSettings();
        initCardListener();
        initHeaderButtons();
    }

    function startPlugin() {
        window.plugin_lme_ready = true;
        if (window.appready) add();
        else {
            Lampa.Listener.follow("app", function (e) {
                if (e.type === "ready") add();
            });
        }
    }

    if (!window.plugin_lme_ready) startPlugin();

})();
