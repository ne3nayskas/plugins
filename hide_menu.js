(function() {  
    'use strict';  
  
    var plugin_name = 'hide_menu_items';  
    var settings = {  
        // Прибрали hide_main та hide_other  
        hide_sport: true,  
        hide_timeline: true,      // Стрічка  
        hide_torrents: true,      // Торренти  
        hide_schedule: true,      // Розклад  
        hide_subscriptions: true, // Підписки  
        hide_bookmarks: true,     // Вибране  
        hide_anime: true,         // Аніме  
        hide_catalog: true,       // Каталог  
        hide_persons: true,       // Особи  
        hide_info: true,          // Інформація  
        hide_console: true,       // Консоль  
        hide_settings: true,      // Налаштування  
        hide_filter: true         // Фільтр  
    };  
  
    function loadSettings() {  
        var saved = Lampa.Storage.get(plugin_name, '{}');  
        try {  
            var parsed = JSON.parse(saved);  
            Object.assign(settings, parsed);  
        } catch(e) {}  
    }  
  
    function saveSettings() {  
        Lampa.Storage.set(plugin_name, JSON.stringify(settings));  
    }  
  
    function hideMenuItems() {  
        var menuSelectors = {  
            'sport': settings.hide_sport,  
            'timeline': settings.hide_timeline,  
            'torrents': settings.hide_torrents,  
            'schedule': settings.hide_schedule,  
            'subscriptions': settings.hide_subscriptions,  
            'bookmarks': settings.hide_bookmarks,  
            'anime': settings.hide_anime,  
            'catalog': settings.hide_catalog,  
            'persons': settings.hide_persons,  
            'info': settings.hide_info,  
            'console': settings.hide_console,  
            'settings': settings.hide_settings,  
            'filter': settings.hide_filter  
        };  
  
        Object.keys(menuSelectors).forEach(function(key) {  
            if (menuSelectors[key]) {  
                // Пробуємо різні селектори для знаходження елементів меню  
                var selectors = [  
                    '[data-action="' + key + '"]',  
                    '[data-component="' + key + '"]',  
                    '.menu__item[data-action="' + key + '"]',  
                    '.sidebar__item[data-action="' + key + '"]'  
                ];  
                  
                selectors.forEach(function(selector) {  
                    var elements = document.querySelectorAll(selector);  
                    elements.forEach(function(element) {  
                        element.style.display = 'none';  
                    });  
                });  
            }  
        });  
    }  
  
    function createSettingsInterface() {  
        // Створюємо окрему секцію для налаштувань плагіна  
        Lampa.SettingsApi.addComponent({  
            component: 'hide_menu_plugin',  
            name: 'Приховування меню',  
            icon: '<svg viewBox="0 0 24 24"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/></svg>'  
        });  
  
        var settingsItems = [  
            { key: 'hide_sport', title: 'Приховати Спорт' },  
            { key: 'hide_timeline', title: 'Приховати Стрічка' },  
            { key: 'hide_torrents', title: 'Приховати Торренти' },  
            { key: 'hide_schedule', title: 'Приховати Розклад' },  
            { key: 'hide_subscriptions', title: 'Приховати Підписки' },  
            { key: 'hide_bookmarks', title: 'Приховати Вибране' },  
            { key: 'hide_anime', title: 'Приховати Аніме' },  
            { key: 'hide_catalog', title: 'Приховати Каталог' },  
            { key: 'hide_persons', title: 'Приховати Особи' },  
            { key: 'hide_info', title: 'Приховати Інформація' },  
            { key: 'hide_console', title: 'Приховати Консоль' },  
            { key: 'hide_settings', title: 'Приховати Налаштування' },  
            { key: 'hide_filter', title: 'Приховати Фільтр' }  
        ];  
  
        settingsItems.forEach(function(item) {  
            Lampa.SettingsApi.addParam({  
                component: 'hide_menu_plugin',  
                param: {  
                    name: plugin_name + '_' + item.key,  
                    type: 'trigger',  
                    default: settings[item.key]  
                },  
                field: {  
                    name: item.title,  
                    description: 'Увімкнути/вимкнути приховування пункту меню'  
                },  
                onChange: function(value) {  
                    settings[item.key] = value;  
                    saveSettings();  
                    setTimeout(hideMenuItems, 100);  
                }  
            });  
        });  
  
        // Додаємо кнопку для швидкого скидання налаштувань  
        Lampa.SettingsApi.addParam({  
            component: 'hide_menu_plugin',  
            param: {  
                name: plugin_name + '_reset',  
                type: 'button'  
            },  
            field: {  
                name: 'Скинути всі налаштування',  
                description: 'Показати всі пункти меню'  
            },  
            onChange: function() {  
                Object.keys(settings).forEach(function(key) {  
                    settings[key] = false;  
                });  
                saveSettings();  
                location.reload();  
            }  
        });  
    }  
  
    function startPlugin() {  
        loadSettings();  
        createSettingsInterface();  
          
        // Застосування приховування після завантаження  
        Lampa.Listener.follow('app', function(e) {  
            if (e.type == 'ready') {  
                setTimeout(hideMenuItems, 1000);  
                // Повторюємо через деякий час для надійності  
                setTimeout(hideMenuItems, 3000);  
            }  
        });  
  
        // Застосування при зміні активності  
        Lampa.Activity.listener.follow('activity', function(e) {  
            if (e.type == 'start') {  
                setTimeout(hideMenuItems, 500);  
            }  
        });  
  
        // Застосування при зміні компонентів  
        Lampa.Listener.follow('component', function(e) {  
            if (e.type == 'add') {  
                setTimeout(hideMenuItems, 200);  
            }  
        });  
    }  
  
    // Запуск плагіна  
    if (window.Lampa) {  
        startPlugin();  
    } else {  
        document.addEventListener('DOMContentLoaded', startPlugin);  
    }  
  
})();
