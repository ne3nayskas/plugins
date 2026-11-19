
(function () {
    'use strict';

    var EXTRA_SIZES = {
        smaller: 0.8,
        tiny: 0.7
    };

    var LABELS = {
        smaller: {
            uk: 'Ще менше',
            ru: 'Ещё меньше',
            en: 'Even smaller'
        },
        tiny: {
            uk: 'Крихітний',
            ru: 'Крошечный',
            en: 'Tiny'
        }
    };

    function label(key) {
        var lang = Lampa.Storage.get('language') || 'uk';
        return LABELS[key][lang] || LABELS[key].en;
    }

    // Додаємо два розміри до системного селектора
    var _show = Lampa.Select.show;

    Lampa.Select.show = function (params) {
        if (
            params &&
            params.items &&
            params.items.length === 3 &&
            params.items[0].value === 'small' &&
            params.items[1].value === 'normal' &&
            params.items[2].value === 'bigger'
        ) {
            var current = String(
                Lampa.Storage.get('interface_size', 'normal')
            );

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

    // Створюємо окремий стиль
    var style = document.createElement('style');

    style.textContent = [
        'body.extra-size-smaller {',
        '  transform: scale(0.8);',
        '  transform-origin: top left;',
        '  width: 125% !important;',
        '  height: 125% !important;',
        '}',
        'body.extra-size-tiny {',
        '  transform: scale(0.7);',
        '  transform-origin: top left;',
        '  width: 142.857143% !important;',
        '  height: 142.857143% !important;',
        '}'
    ].join('\n');

    document.head.appendChild(style);

    function apply() {
        var size = String(
            Lampa.Storage.field('interface_size') || 'normal'
        );

        document.body.classList.remove(
            'extra-size-smaller',
            'extra-size-tiny'
        );

        if (EXTRA_SIZES[size]) {
            document.body.classList.add('extra-size-' + size);
        }
    }

    // Відновлюємо стандартний розмір шрифту,
    // якщо Layer не розпізнає додатковий розмір
    function fixFontSize() {
        var size = String(
            Lampa.Storage.field('interface_size') || 'normal'
        );

        if (EXTRA_SIZES[size]) {
            document.body.style.fontSize =
                Math.max(window.innerWidth / 84.17, 10.6) + 'px';
        } else {
            document.body.style.fontSize = '';
        }

        apply();
    }

    Lampa.Storage.listener.follow('change', function (e) {
        if (e.name === 'interface_size') {
            setTimeout(fixFontSize, 0);
        }
    });

    $(window).on('resize', function () {
        setTimeout(fixFontSize, 150);
    });

    fixFontSize();

})();
