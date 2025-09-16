(function() {
    'use strict';
    
    // Оголошення плагіна для Lampa
    if (!window.plugin_vote_colors) {
        window.plugin_vote_colors = {
            name: 'Vote Colors',
            version: '1.0',
            description: 'Змінює кольори рейтингів залежно від значення',
            author: 'Ваше ім\'я',
            update: true
        };
    }

    // Основна функція зміни кольорів
    function updateVoteColors() {
        try {
            document.querySelectorAll(".card__vote").forEach(voteElement => {
                if (!voteElement.textContent) return;
                
                const vote = parseFloat(voteElement.textContent.trim());
                if (isNaN(vote)) return;
                
                if (vote >= 0 && vote <= 3) {
                    voteElement.style.color = "#ff3333"; // яскраво-червоний
                } else if (vote > 3 && vote <= 5.9) {
                    voteElement.style.color = "#ff9933"; // помаранчевий
                } else if (vote >= 6 && vote <= 7.9) {
                    voteElement.style.color = "#3399ff"; // блакитний
                } else if (vote >= 8 && vote <= 10) {
                    voteElement.style.color = "#33cc33"; // зелений
                }
            });
        } catch (e) {
            console.warn('Vote Colors Plugin Error:', e);
        }
    }

    // Ініціалізація плагіна
    function initPlugin() {
        // Первинне оновлення кольорів
        setTimeout(updateVoteColors, 1000);
        
        // Спостерігач за змінами DOM
        const observer = new MutationObserver(function(mutations) {
            updateVoteColors();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Додатковий обробник для Lampa
        if (typeof Lampa !== 'undefined' && Lampa.Listener) {
            Lampa.Listener.follow('app', function(e) {
                if (e.type === 'ready') {
                    updateVoteColors();
                }
            });
        }
    }

    // Запуск після повного завантаження сторінки
    if (document.readyState === 'complete') {
        initPlugin();
    } else {
        document.addEventListener('DOMContentLoaded', initPlugin);
    }
})();