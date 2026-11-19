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
  
    // 1. Обгортка Select.show: додаємо пункти у селектор interface_size  
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
  
    // 2. Масштаб через zoom + компенсація розмірів body,  
    //    щоб заповнити весь в'юпорт (body: position fixed, 100%x100%)  
    function apply() {  
        var sl = Lampa.Storage.field('interface_size');  
        var fs = EXTRA_SIZES[sl];  
  
        if (fs) {  
            document.body.style.zoom   = fs;  
            document.body.style.width  = (100 / fs) + '%';  
            document.body.style.height = (100 / fs) + '%';  
  
            $('body').removeClass('size--small size--normal size--bigger')  
                     .addClass('size--' + sl);  
        } else {  
            document.body.style.zoom   = '';  
            document.body.style.width  = '';  
            document.body.style.height = '';  
        }  
    }  
  
    // 3. Рідна Layer.size() для невідомого ключа ставить fontSize: NaN —  
    //    відновлюємо fontSize як для 'normal', zoom робить решту  
    function fixFontSize() {  
        var sl = Lampa.Storage.field('interface_size');  
  
        if (EXTRA_SIZES[sl]) {  
            $('body').css('fontSize',  
                Math.max(window.innerWidth / 84.17, 10.6) + 'px');  
        }  
  
        apply();  
    }  
  
    // Layer слухає 'change' і викликає size() — перевиконуємо після неї  
    Lampa.Storage.listener.follow('change', function (e) {  
        if (e.name === 'interface_size') setTimeout(fixFontSize, 0);  
    });  
  
    // Після debounce 100ms у Layer.init на resize  
    $(window).on('resize', function () {  
        setTimeout(fixFontSize, 150);  
    });  
  
    fixFontSize();  
})();
