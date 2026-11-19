(function () {  
    'use strict';  
  
    // Додаткові масштаби нижче small (0.9)  
    var EXTRA_SIZES = {  
        smaller: 0.8,  
        tiny:    0.7  
    };  
  
    var LABELS = {  
        smaller: { uk: 'Ще менше', ru: 'Ещё меньше', en: 'Even smaller' },  
        tiny:    { uk: 'Крихітний', ru: 'Крошечный', en: 'Tiny' }  
    };  
  
    function label(key) {  
        var lang = (Lampa.Storage.get('language') || 'uk');  
        return LABELS[key][lang] || LABELS[key].en;  
    }  
  
    // 1. Підміна Select.show: додаємо пункти у вибір розміру інтерфейсу  
    var _show = Lampa.Select.show;  
  
    Lampa.Select.show = function (params) {  
        if (params && params.items && params.items.length === 3 &&  
            params.items[0].value === 'small' &&  
            params.items[1].value === 'normal' &&  
            params.items[2].value === 'bigger') {  
  
            var current = Lampa.Storage.get('interface_size', 'normal') + '';  
            var extra = [];  
  
            Object.keys(EXTRA_SIZES).forEach(function (key) {  
                extra.push({  
                    title: label(key),  
                    value: key,  
                    selected: key === current  
                });  
            });  
  
            params.items = extra.concat(params.items);  
        }  
  
        return _show.call(this, params);  
    };  
  
    // 2. Застосування розміру: Layer.size() не знає наших ключів,  
    //    тому перевизначаємо fontSize після неї  
    function apply() {  
        var sl = Lampa.Storage.field('interface_size');  
        var fs = EXTRA_SIZES[sl];  
  
        if (!fs) return; // стандартні значення обробляє сама Lampa  
  
        $('body').css({  
            fontSize: Math.max(window.innerWidth / 84.17 * fs, 10.6) + 'px'  
        }).removeClass('size--small size--normal size--bigger')  
          .addClass('size--' + sl);  
    }  
  
    // Layer слухає 'change' і викликає size() — перевиконуємо після неї  
    Lampa.Storage.listener.follow('change', function (e) {  
        if (e.name === 'interface_size') setTimeout(apply, 0);  
    });  
  
    $(window).on('resize', function () {  
        setTimeout(apply, 150); // після debounce у Layer.init (100ms)  
    });  
  
    apply();  
})();
