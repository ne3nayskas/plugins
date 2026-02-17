// focus-online.js  
function startFocusOnlinePlugin() {  
    if (window.plugin_focus_online_ready) return;  
    window.plugin_focus_online_ready = true;  
  
    // Реєстрація плагіна в системі  
    const manifest = {  
        type: 'component',  
        version: '1.0.0',  
        name: 'Focus Online',  
        description: 'Гарантує фокус на кнопці онлайн на сторінці деталей',  
        author: 'Oleksandr'  
    };  
      
    Lampa.Manifest.plugins = manifest;  
  
    function ensureButtonOrder() {  
        const container = $('.buttons--container');  
        if (!container.length) return;  
  
        // Очищуємо пріоритет для забезпечення правильного порядку  
        Lampa.Storage.set('full_btn_priority', '');  
  
        // Знаходимо всі кнопки  
        const onlineBtns = container.find('.view--online');  
        const torrentBtns = container.find('.view--torrent').not('.hide');  
        const trailerBtns = container.find('.view--trailer');  
  
        // Видаляємо дублікати онлайн-кнопок  
        if (onlineBtns.length > 1) {  
            onlineBtns.slice(1).remove();  
        }  
  
        // Переміщуємо кнопки в правильному порядку  
        const firstOnline = onlineBtns.first();  
        const firstTorrent = torrentBtns.first();  
        const firstTrailer = trailerBtns.first();  
  
        if (firstOnline.length) container.prepend(firstOnline);  
        if (firstTorrent.length) container.append(firstTorrent);  
        if (firstTrailer.length) container.append(firstTrailer);  
  
        // ГАРАНТОВАНЕ встановлення фокусу на кнопку онлайн  
        if (firstOnline.length) {  
            const hasStoredFocus = Lampa.Storage.get('full_btn_priority', '') !== '';  
            if (!hasStoredFocus) {  
                setTimeout(() => {  
                    if (typeof Lampa.Activity !== 'undefined' && Lampa.Activity.active()) {  
                        const activeComponent = Lampa.Activity.active().component;  
                        if (activeComponent && typeof activeComponent.last !== 'undefined') {  
                            activeComponent.last = firstOnline[0];  
                        }  
                    }  
                }, 50);  
            }  
        }  
    }  
  
    function init() {  
        setTimeout(ensureButtonOrder, 800);  
        if (Lampa && Lampa.Listener) {  
            Lampa.Listener.follow('full', ensureButtonOrder);  
        }  
    }  
  
    if (window.appready) {  
        init();  
    } else {  
        Lampa.Listener.follow('app', (e) => {  
            if (e.type === 'ready') init();  
        });  
    }  
}  
  
if (!window.plugin_focus_online_ready) startFocusOnlinePlugin();
