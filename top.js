// plugins/tmdb-top/tmdb-top.js  
(function() {  
    'use strict';  
  
    function startPlugin() {  
        window.plugin_tmdb_top_ready = true;  
  
        let manifest = {  
            type: 'video',  
            version: '1.0.0',  
            name: 'TMDB Top 100',  
            description: 'Топ-100 фільмів з TMDB',  
            component: 'tmdb_top',  
        };  
          
        Lampa.Manifest.plugins = manifest;  
  
        // Додаємо переклади  
        Lampa.Lang.add({  
            tmdb_top_title: {  
                ru: 'Топ-100 фильмов',  
                uk: 'Топ-100 фільмів',  
                en: 'Top 100 Movies',  
                be: 'Топ-100 фільмаў'  
            }  
        });  
  
        // Логіка додавання контент-ряду (як у shots)  
        function addContentRow() {  
            Lampa.ContentRows.add({  
                name: 'tmdb_top_100',  
                title: 'TMDB Top 100',  
                index: 0, // Перший ряд на головній  
                screen: ['main'],  
                call: (params, screen) => {  
                    if(Lampa.Account.Permit.child) return;  
  
                    return function(call) {  
                        Lampa.TMDB.get('movie/top_rated', {  
                            page: 1,  
                            language: Lampa.Storage.field('tmdb_lang') || 'uk'  
                        }, (data) => {  
                            if (data && data.results && data.results.length > 0) {  
                                let movies = data.results.slice(0, 20);  
                                  
                                // Додаємо source до кожного елемента  
                                movies.forEach(movie => {  
                                    movie.source = 'tmdb';  
                                });  
                                  
                                Lampa.Utils.extendItemsParams(movies, {  
                                    createInstance: (item_data) => {  
                                        return Lampa.Maker.make('Card', item_data, (module) => module.only('Card', 'Callback'));  
                                    },  
                                    onMore: () => {  
                                        Lampa.Activity.push({  
                                            url: 'movie/top_rated',  
                                            title: Lampa.Lang.translate('tmdb_top_title'),  
                                            component: 'category',  
                                            page: 1  
                                        });  
                                    }  
                                });  
  
                                call({  
                                    title: Lampa.Lang.translate('tmdb_top_title'),  
                                    results: movies,  
                                    type: 'movie',  
                                    total_pages: Math.ceil(Math.min(data.total_results, 100) / 20),  
                                    icon_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/></svg>',  
                                    icon_bgcolor: '#e02129',  
                                    icon_color: '#fff',  
                                    params: {  
                                        module: Lampa.Maker.module('Line').toggle(Lampa.Maker.module('Line').MASK.base, 'Icon')  
                                    }  
                                });  
                            } else {  
                                call({  
                                    results: [],  
                                    title: Lampa.Lang.translate('tmdb_top_title'),  
                                    type: 'movie'  
                                });  
                            }  
                        }, (error) => {  
                            console.error('TMDB Top 100 error:', error);  
                            call({  
                                results: [],  
                                title: Lampa.Lang.translate('tmdb_top_title'),  
                                type: 'movie'  
                            });  
                        });  
                    };  
                }  
            });  
        }  
  
        // Логіка додавання кнопки меню (як у IPTV та collections)  
        function addMenuButton() {  
            let button = $(`<li class="menu__item selector">  
                <div class="menu__ico">  
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">  
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>  
                    </svg>  
                </div>  
                <div class="menu__text">${Lampa.Lang.translate('tmdb_top_title')}</div>  
            </li>`);  
  
            button.on('hover:enter', function () {  
                Lampa.Activity.push({  
                    url: 'movie/top_rated',  
                    title: Lampa.Lang.translate('tmdb_top_title'),  
                    component: 'category',  
                    page: 1  
                });  
            });  
  
            $('.menu .menu__list').eq(0).append(button);  
        }  
  
        // Ініціалізація (як у IPTV плагіні)  
        function init() {  
            addContentRow();  
            addMenuButton();  
        }  
  
        // Перевірка готовності додатку (як у всіх плагінах)  
        if(Lampa.Manifest.app_digital >= 300) {  
            if(window.appready) {  
                init();  
            } else {  
                Lampa.Listener.follow('app', function (e) {  
                    if (e.type == 'ready') {  
                        init();  
                    }  
                });  
            }  
        }  
    }  
  
    // Запуск плагіна  
    if(!window.plugin_tmdb_top_ready) {  
        startPlugin();  
    }  
})();
