(function() {    
    'use strict';    
        
    if (window.plugin_torrent_customizer_ready) return;    
    window.plugin_torrent_customizer_ready = true;    
    
    const REPLACEMENTS = {    
        'Дублированный': 'Дубльований',    
        'Ukr': 'Українською',    
        'Дубляж': 'Дубльований',    
        'Оригинальный': 'Оригінальний',    
        'Субтитры': 'Субтитри',    
        'Многоголосый': 'Багатоголосий',    
        'Неофициальный': 'Неофіційний',    
        'Украинский': 'Українською',    
        'Профессиональный многоголосый': 'Професійний багатоголосий',    
        'Zetvideo': 'UaFlix',    
        'Нет истории просмотра': 'Історія перегляду відсутня'    
    };    
    
    // Додавання стилів    
    function addStyles() {    
        if (document.getElementById('torrent-customizer-style')) return;    
    
        const css = `    
            .torrent-list .torrent-item__seeds span.high-seeds {    
                color: #00ff00;    
                font-weight: bold;    
            }    
            .torrent-list .torrent-item__bitrate span.high-bitrate {    
                color: #ff0000;    
                font-weight: bold;    
            }    
            .torrent-list .torrent-item__tracker.utopia {    
                color: #9b59b6;    
                font-weight: bold;    
            }    
            .torrent-list .torrent-item__tracker.toloka {    
                color: #2ecc71;    
                font-weight: bold;    
            }    
        `;    
    
        const style = document.createElement('style');    
        style.id = 'torrent-customizer-style';    
        style.textContent = css;    
        document.head.appendChild(style);    
    }    
    
    // Заміна тексту в елементі    
    function replaceText(element) {    
        const walker = document.createTreeWalker(    
            element,    
            NodeFilter.SHOW_TEXT,    
            null,    
            false    
        );    
    
        let node;    
        while (node = walker.nextNode()) {    
            let text = node.nodeValue;    
            let changed = false;    
                
            Object.entries(REPLACEMENTS).forEach(([original, replacement]) => {    
                if (text.includes(original)) {    
                    text = text.replace(new RegExp(original, 'g'), replacement);    
                    changed = true;    
                }    
            });    
                
            if (changed) node.nodeValue = text;    
        }    
    }    
    
    // Оновлення стилів торрента    
    function updateTorrentItem(element, item) {    
        // Перевірка, чи елемент вже оброблено  
        if (element.dataset && element.dataset.customized) return;  
          
        // Seeds    
        const seedsSpan = element.querySelector('.torrent-item__seeds span');    
        if (seedsSpan) {    
            const seeds = parseInt(seedsSpan.textContent) || 0;    
            seedsSpan.classList.toggle('high-seeds', seeds > 19);    
        }    
    
        // Bitrate (якщо є в item)    
        const bitrateSpan = element.querySelector('.torrent-item__bitrate span');    
        if (bitrateSpan) {    
            const bitrate = parseFloat(bitrateSpan.textContent) || 0;    
            bitrateSpan.classList.toggle('high-bitrate', bitrate > 50);    
        }    
    
        // Tracker    
        const tracker = element.querySelector('.torrent-item__tracker');    
        if (tracker) {    
            const text = tracker.textContent.trim();    
            tracker.classList.remove('utopia', 'toloka');    
                
            if (text.includes('UTOPIA')) tracker.classList.add('utopia');    
            else if (text.includes('Toloka')) tracker.classList.add('toloka');    
        }    
    
        // Заміна тексту    
        replaceText(element);    
          
        // Позначити як оброблений  
        if (element.dataset) element.dataset.customized = 'true';  
    }    
    
    // Ініціалізація    
    function init() {    
        addStyles();    
    
        // ТІЛЬКИ підписка на події торрентів - БЕЗ MutationObserver  
        if (Lampa && Lampa.Listener) {    
            Lampa.Listener.follow('torrent', (e) => {    
                if (e.type === 'render' && e.item) {    
                    // Використовуємо setTimeout для відкладеної обробки  
                    setTimeout(() => {  
                        const element = e.item[0] || e.item;  
                        if (element && element.nodeType === 1) {  
                            updateTorrentItem(element, e.element);  
                        }  
                    }, 0);  
                }    
            });    
        }    
    }    
    
    // Запуск    
    if (window.appready) {    
        init();    
    } else if (Lampa && Lampa.Listener) {    
        Lampa.Listener.follow('app', (e) => {    
            if (e.type === 'ready') init();    
        });    
    } else {    
        document.addEventListener('DOMContentLoaded', () => {    
            setTimeout(init, 1000);    
        });    
    }    
})();
