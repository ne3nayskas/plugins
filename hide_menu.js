(function() {  
    'use strict';  
  
    // Налаштування плагіна  
    var plugin_name = 'hide_menu_items';  
    var settings = {  
        hide_sport: true,  
        hide_main: true,   
        hide_settings: false, // Залишаємо налаштування доступними  
        hide_console: true,  
        hide_filter: true,  
        hide_other: true  
    };  
  
    // Завантаження збережених налаштувань  
    function loadSettings() {  
        var saved = Lampa.Storage.get(plugin_name, '{}');  
        try {  
            var parsed = JSON.parse(saved);  
            Object.assign(settings, parsed);  
        } catch(e) {}  
    }  
  
    // Збереження налаштувань  
    function saveSettings() {  
        Lampa.Storage.set(plugin_name, JSON.stringify(settings));  
    }  
  
    // Приховування елементів меню  
    function hideMenuItems() {  
        var menuItems = {  
            'sport': settings.hide_sport,  
            'main': settings.hide_main,  
            'settings': settings.hide_settings,  
            'console': settings.hide_console,  
            'filter': settings.hide_filter  
        };  
  
        Object.keys(menuItems).forEach(function(key) {  
            if (menuItems[key]) {  
                var selector = '[data-action="' + key + '"]';  
                var element = document.querySelector(selector);  
                if (element) {  
                    element.style.display = 'none';  
                }  
            }  
        });  
  
        // Приховування інших елементів  
        if (settings.hide_other) {  
            var otherSelectors = [  
                '[data-action="bookmarks"]',  
                '[data-action="history"]',  
                '[data-action="timeline"]',  
                '[data-action="relise"]'  
            ];  
              
            otherSelectors.forEach(function(selector) {  
                var element = document.querySelector(selector);  
                if (element) {  
                    element.style.display = 'none';  
                }  
            });  
        }  
    }  
  
    // Створення інтерфейсу налаштувань  
    function createSettingsInterface() {  
        var settingsItems = [  
            { key: 'hide_sport', title: 'Приховати Спорт' },  
            { key: 'hide_main', title: 'Приховати Головна' },  
            { key: 'hide_settings', title: 'Приховати Налаштування' },  
            { key: 'hide_console', title: 'Приховати Консоль' },  
            { key: 'hide_filter', title: 'Приховати Фільтр' },  
            { key: 'hide_other', title: 'Приховати інші пункти' }  
        ];  
  
        settingsItems.forEach(function(item) {  
            Lampa.SettingsApi.addParam({  
                component: 'interface',  
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
                    hideMenuItems();  
                }  
            });  
        });  
    }  
  
    // Ініціалізація плагіна  
    function startPlugin() {  
        loadSettings();  
        createSettingsInterface();  
          
        // Застосування приховування після завантаження інтерфейсу  
        Lampa.Listener.follow('app', function(e) {  
            if (e.type == 'ready') {  
                setTimeout(hideMenuItems, 1000);  
            }  
        });  
  
        // Повторне застосування при зміні сторінок  
        Lampa.Activity.listener.follow('activity', function(e) {  
            if (e.type == 'start') {  
                setTimeout(hideMenuItems, 500);  
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
