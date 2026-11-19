(function () {  
    'use strict';  
  
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
  
    // 1. Додаємо пункти у селектор interface_size  
    var _show = Lampa.Select.show;  
  
    Lampa.Select.show = function (params) {  
        if (params && params.items && params.items.length === 3 &&  
            params.items[0].value === 'small' &&  
            params.items[1].value === 'normal' &&  
            params.items[2].value === 'bigger') {  
  
            var current = Lampa.Storage.get('interface_size', 'normal') + '';  
            var extra = [];  
  
            Object.keys(EXTRA_SIZES).forEach(function (key) {  
                extra.push({ title: label(key), value: key, selected: key === current });  
            });  
  
            params.items = extra.concat(params.items);  
        }  
  
        return _show.call(this, params);  
    };  
  
    // 2. Масштаб через zoom — працює і на мобільних,  
    //    де fontSize вперто сидить на мінімумі 10.6px  
    function apply() {  
        var sl = Lampa.Storage.field('interface_size');  
        var fs = EXTRA_SIZES[sl];  
  
        document.body.style.zoom = fs || '';  
  
        if (fs) {  
            $('body').removeClass('size--small size--normal size--bigger')  
                     .addClass('size--' + sl);  
        }  
    }  
  
    // Layer при зміні interface_size викличе свою size() —  
    // вона поставить fontSize з NaN, тому відновлюємо його теж  
    function fixFontSize() {  
        var sl = Lampa.Storage.field('interface_size');  
        if (EXTRA_SIZES[sl]) {  
            // повертаємо fontSize як для 'normal', zoom зробить решту  
            $('body').css('fontSize',  
                Math.max(window.innerWidth / 84.17, 10.6) + 'px');  
        }  
        apply();  
    }  
  
    Lampa.Storage.listener.follow('change', function (e) {  
        if (e.name === 'interface_size') setTimeout(fixFontSize, 0);  
    });  
  
    $(window).on('resize', function () {  
        setTimeout(fixFontSize, 150); // після debounce 100ms у Layer.init  
    });  
  
    fixFontSize();  
})();
