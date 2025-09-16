!function() {
    "use strict";

    const menuItems = [
        {
            id: 'netflix',
            title: 'Netflix',
            icon: `<svg height="30" viewBox="124.528 16 262.944 480" xmlns="http://www.w3.org/2000/svg">
                    <path d="m216.398 16h-91.87v480c30.128-7.135 61.601-10.708 91.87-12.052z" fill="#E50914"/>
                    <path d="m387.472 496v-480h-91.87v468.904c53.636 3.416 91.87 11.096 91.87 11.096z" fill="#E50914"/>
                    <path d="m387.472 496-171.074-480h-91.87l167.03 468.655c55.75 3.276 95.914 11.345 95.914 11.345z" fill="#E50914"/>
                   </svg>`,
            url: "discover/tv?language=uk&with_networks=213",
            source: "tmdb"
        },
        {
            id: 'disney',
            title: 'Disney+',
            icon: `<svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <path d="M19,3V7m2-2H17" fill="none" stroke="rgb(44,169,188)" stroke-width="2"/>
                     <line x1="6.69" y1="9" x2="8.69" y2="21" stroke="currentColor" stroke-width="2"/>
                     <path d="M3,6s12.29-2,13.91,6.77c1.09,5.93-6.58,6.7-9.48,5.89S3,16.06,3,14.06C3,11,8.54,9.45,12,12" stroke="currentColor" stroke-width="2"/>
                   </svg>`,
            url: "discover/tv?language=uk&with_networks=2739",
            source: "tmdb"
        },
        {
            id: 'prime',
            title: 'Prime Video',
            icon: `<svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <path d="M19.54,15A9.23,9.23,0,0,0,21,10.28,8.05,8.05,0,0,0,17,9" fill="none" stroke="rgb(44,169,188)" stroke-width="2"/>
                     <path d="M17,12.51a15.19,15.19,0,0,1-7.37,1.43A14.62,14.62,0,0,1,3,11" stroke="currentColor" stroke-width="2"/>
                   </svg>`,
            url: "discover/tv?language=uk&with_networks=1024",
            source: "tmdb"
        },
        {
            id: 'apple',
            title: 'Apple TV+',
            icon: `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" role="img" xmlns="http://www.w3.org/2000/svg">
                     <title>Apple TV icon</title><path d="M20.57 17.735h-1.815l-3.34-9.203h1.633l2.02 5.987c.075.231.273.9.586 2.012l.297-.997.33-1.006 2.094-6.004H24zm-5.344-.066a5.76 5.76 0 0 1-1.55.207c-1.23 0-1.84-.693-1.84-2.087V9.646h-1.063V8.532h1.121V7.081l1.476-.602v2.062h1.707v1.113H13.38v5.805c0 .446.074.75.214.932.14.182.396.264.75.264.207 0 .495-.041.883-.115zm-7.29-5.343c.017 1.764 1.55 2.358 1.567 2.366-.017.042-.248.842-.808 1.658-.487.71-.99 1.418-1.79 1.435-.783.016-1.03-.462-1.93-.462-.89 0-1.17.445-1.913.478-.758.025-1.344-.775-1.838-1.484-.998-1.451-1.765-4.098-.734-5.88.51-.89 1.426-1.451 2.416-1.46.75-.016 1.468.512 1.93.512.461 0 1.327-.627 2.234-.536.38.016 1.452.157 2.136 1.154-.058.033-1.278.743-1.27 2.219M6.468 7.988c.404-.495.685-1.18.61-1.864-.585.025-1.294.388-1.723.883-.38.437-.71 1.138-.619 1.806.652.05 1.328-.338 1.732-.825Z"/>
                   </svg>`,
            url: "discover/tv?language=uk&with_networks=2552",
            source: "tmdb"
        },
        {
            id: 'hbo',
            title: 'HBO Max',
            icon: `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" role="img" xmlns="http://www.w3.org/2000/svg">
                     <path d="M7.042 16.896H4.414v-3.754H2.708v3.754H.01L0 7.22h2.708v3.6h1.706v-3.6h2.628zm12.043.046C21.795 16.94 24 14.689 24 11.978a4.89 4.89 0 0 0-4.915-4.92c-2.707-.002-4.09 1.991-4.432 2.795.003-1.207-1.187-2.632-2.58-2.634H7.59v9.674l4.181.001c1.686 0 2.886-1.46 2.888-2.713.385.788 1.72 2.762 4.427 2.76zm-7.665-3.936c.387 0 .692.382.692.817 0 .435-.305.817-.692.817h-1.33v-1.634zm.005-3.633c.387 0 .692.382.692.817 0 .436-.305.818-.692.818h-1.33V9.373zm1.77 2.607c.305-.039.813-.387.992-.61-.063.276-.068 1.074.006 1.35-.204-.314-.688-.701-.998-.74zm3.43 0a2.462 2.462 0 1 1 4.924 0 2.462 2.462 0 0 1-4.925 0zm2.462 1.936a1.936 1.936 0 1 0 0-3.872 1.936 1.936 0 0 0 0 3.872z"/>
                   </svg>`,
            url: "discover/tv?language=uk&with_networks=49",
            source: "tmdb"
        },
        {
            id: 'hulu',
            title: 'Hulu',
            icon: `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" role="img" xmlns="http://www.w3.org/2000/svg">
                     <path d="M14.707 15.957h1.912V8.043h-1.912zm-3.357-2.256a.517.517 0 0 1-.512.511H9.727a.517.517 0 0 1-.512-.511v-3.19H7.303v3.345c0 1.368.879 2.09 2.168 2.09h1.868c1.189 0 1.912-.856 1.912-2.09V10.51h-1.912c.01 0 .01 3.09.01 3.19zm10.75-3.19v3.19a.517.517 0 0 1-.512.511h-1.112a.517.517 0 0 1-.511-.511v-3.19h-1.912v3.345c0 1.368.878 2.09 2.167 2.09h1.868c1.19 0 1.912-.856 1.912-2.09V10.51zm-18.32 0H2.557c-.434 0-.645.11-.645.11V8.044H0v7.903h1.9v-3.179c0-.278.234-.511.512-.511h1.112c.278 0 .511.233.511.511v3.19h1.912v-3.446c0-1.445-.967-2-2.167-2z"/>
                   </svg>`,
            url: "discover/tv?language=uk&with_networks=453",
            source: "tmdb"
        }
    ];

    const menuElements = {};

    function initPlugin() {
        if (window.plugin_podbor_ready) return;

        // Р”РѕРґР°С”РјРѕ РєРѕРјРїРѕРЅРµРЅС‚ РІ РЅР°Р»Р°С€С‚СѓРІР°РЅРЅСЏ
        Lampa.SettingsApi.addComponent({
            component: "porborki",
            icon: `<svg height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="8" width="34" height="21" rx="3" stroke="white" stroke-width="3"/>
                    <line x1="13.0925" y1="2.34874" x2="16.3487" y2="6.90754" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    <line x1="1.5" y1="-1.5" x2="9.31665" y2="-1.5" transform="matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    <line x1="9.5" y1="34.5" x2="29.5" y2="34.5" stroke="white" stroke-width="3" stroke-linecap="round"/>
                   </svg>`,
            name: "РџС–РґР±С–СЂРєРё"
        });

        // Р”РѕРґР°С”РјРѕ РїР°СЂР°РјРµС‚СЂРё РґР»СЏ РєРѕР¶РЅРѕРіРѕ РїСѓРЅРєС‚Сѓ РјРµРЅСЋ
        menuItems.forEach(item => {
            Lampa.SettingsApi.addParam({
                component: "porborki",
                param: {
                    name: `porborki_${item.id}`,
                    type: "select",
                    values: { 1: "РџРѕРєР°Р·Р°С‚Рё", 0: "РџСЂРёС…РѕРІР°С‚Рё" },
                    default: 0
                },
                field: { name: item.title }
            });
        });

        // РЎР»С–РґРєСѓС”РјРѕ Р·Р° Р·РјС–РЅР°РјРё РЅР°Р»Р°С€С‚СѓРІР°РЅСЊ "porborki"
        Lampa.Listener.follow('settings', e => {
            if (e.type === 'change' && e.component === 'porborki') {
                updateMenuItems();
            }
        });

        // РЎС‚РІРѕСЂСЋС”РјРѕ РїСѓРЅРєС‚Рё РјРµРЅСЋ РІ DOM
        createMenuItems();

        window.plugin_podbor_ready = true;
    }

    function createMenuItems() {
        // РњРµРЅСЋ РІ DOM (РїРµСЂС€РёР№ .menu__list)
        const menuList = $(".menu .menu__list").eq(0);

        menuItems.forEach(item => {
            const menuItem = $(`
                <li class="menu__item selector" data-action="${item.id}" style="display: none;">
                    <div class="menu__ico">${item.icon}</div>
                    <div class="menu__text">${item.title}</div>
                </li>
            `);

            menuItem.on("hover:enter", () => {
                Lampa.Activity.push({
                    url: item.url,
                    title: item.title,
                    component: "category_full",
                    source: item.source,
                    sort: "now",
                    card_type: "true",
                    page: 1
                });
            });

            menuList.append(menuItem);
            menuElements[item.id] = menuItem;
        });

        updateMenuItems();
    }

    function updateMenuItems() {
        menuItems.forEach(item => {
            const isVisible = parseInt(Lampa.Storage.get(`porborki_${item.id}`, 'porborki')) === 1;
            const menuItem = menuElements[item.id];

            if (menuItem) {
                if (isVisible) {
                    menuItem.show();
                } else {
                    menuItem.hide();
                }
            }
        });
    }

    // Р†РЅС–С†С–Р°Р»С–Р·Р°С†С–СЏ РїР»Р°РіС–РЅР° РїСЂРё РіРѕС‚РѕРІРЅРѕСЃС‚С– РґРѕРґР°С‚РєСѓ
    if (window.appready) {
        initPlugin();
    } else {
        Lampa.Listener.follow("app", e => {
            if (e.type === "ready") initPlugin();
        });
    }
}();