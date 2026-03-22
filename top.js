// plugins/tmdb-top/tmdb-top.js  
(function() {  
    'use strict';  
  
    function startPlugin() {  
        // Перевіряємо чи вже завантажений  
        if (window.plugin_tmdb_top_ready) return;  
        window.plugin_tmdb_top_ready = true;  
  
        let manifest = {  
            type: 'video',  
            version: '1.0.0',  
            name: 'TMDB Top 100',  
            description: 'Топ-100 фільмів з TMDB',  
            component: 'tmdb_top',  
        };  
          
        // Реєструємо маніфест  
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
  
        // Функція додавання контент-ряду  
        function addContentRow() {  
            Lampa.ContentRows.add({  
                name: 'tmdb_top_100',  
                title: 'TMDB Top 100',  
                index: 0, // Найвищий пріоритет  
                screen: ['main'],  
                call: (params, screen) => {  
                    // Перевірка дитячого режиму  
                    if(Lampa.Account && Lampa.Account.Permit && Lampa.Account.Permit.child) {  
                        console.log('TMDB Top: Child mode enabled, skipping');  
                        return;  
                    }  
  
                    return function(call) {  
                        console.log('TMDB Top: Loading data...');  
                          
                        // Перевірка наявності TMDB  
                        if(!Lampa.TMDB) {  
                            console.error('TMDB Top: TMDB not available');  
                            call({  
                                results: [],  
                                title: Lampa.Lang.translate('tmdb_top_title'),  
                                type: 'movie'  
                            });  
                            return;  
                        }  
  
                        Lampa.TMDB.get('movie/top_rated', {  
                            page: 1,  
                            language: Lampa.Storage.field('tmdb_lang') || 'uk'  
                        }, (data) => {  
                            console.log('TMDB Top: Data received:', data?.results?.length);  
                              
                            if (data && data.results && data.results.length > 0) {  
                                let movies = data.results.slice(0, 20);  
                                  
                                // Додаємо source до кожного елемента  
                                movies.forEach(movie => {  
                                    movie.source = 'tmdb';  
                                });  
                                  
                                // Розширюємо параметри для створення карток  
                                Lampa.Utils.extendItemsParams(movies, {  
                                    createInstance: (item_data) => {  
                                        return Lampa.Maker.make('Card', item_data, (module) => {  
                                            return module.only('Card', 'Callback');  
                                        });  
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
                                console.log('TMDB Top: No data found');  
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
  
        // Основна ініціалізація  
        function init() {  
            console.log('TMDB Top: Initializing plugin...');  
            addContentRow();  
        }  
  
        // Перевірка версії та готовності додатку  
        if(Lampa.Manifest && Lampa.Manifest.app_digital >= 300) {  
            if(window.appready) {  
                init();  
            } else {  
                Lampa.Listener.follow('app', function (e) {  
                    if (e.type === 'ready') {  
                        setTimeout(init, 100); // Невелика затримка для впевненості  
                    }  
                });  
            }  
        } else {  
            console.warn('TMDB Top: Unsupported Lampa version');  
        }  
    }  
  
    // Запуск плагіна  
    startPlugin();  
})();
