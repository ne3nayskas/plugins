// plugins/tmdb-top/tmdb-top.js  
import Lang from './lang.js'  
  
function startPlugin() {  
    window.plugin_tmdb_top_ready = true  
  
    let manifest = {  
        type: 'video',  
        version: '1.0.0',  
        name: 'TMDB Top 100',  
        description: 'Топ-100 фільмів з TMDB',  
        component: 'tmdb_top',  
    }  
      
    Lampa.Manifest.plugins = manifest  
  
    // Додаємо переклади  
    Lampa.Lang.add({  
        tmdb_top_title: {  
            ru: 'Топ-100 фильмов',  
            uk: 'Топ-100 фільмів',  
            en: 'Top 100 Movies',  
            be: 'Топ-100 фільмаў'  
        },  
        tmdb_top_loading: {  
            ru: 'Загрузка...',  
            uk: 'Завантаження...',  
            en: 'Loading...',  
            be: 'Загрузка...'  
        },  
        tmdb_top_error: {  
            ru: 'Ошибка загрузки',  
            uk: 'Помилка завантаження',  
            en: 'Loading error',  
            be: 'Памылка загрузкі'  
        }  
    })  
  
    // Додаємо ряд на головну сторінку  
    Lampa.ContentRows.add({  
        index: 2,  
        screen: ['main'],  
        call: (params, screen) => {  
            return function(call) {  
                Lampa.TMDB.get('movie/top_rated', {  
                    page: 1,  
                    language: Lampa.Storage.get('language', 'ru')  
                }, (data) => {  
                    if (data.results && data.results.length > 0) {  
                        // Обмежуємо до 100 фільмів  
                        let movies = data.results.slice(0, 100)  
                          
                        // Розширюємо параметри для створення карток  
                        Lampa.Utils.extendItemsParams(movies, {  
                            createInstance: (item_data) => {  
                                return Lampa.Card(item_data, {  
                                    cardClass: 'movie',  
                                    object: {  
                                        title: item_data.title,  
                                        original_title: item_data.original_title,  
                                        release_date: item_data.release_date,  
                                        vote_average: item_data.vote_average,  
                                        poster: item_data.poster_path,  
                                        backdrop: item_data.backdrop_path  
                                    }  
                                })  
                            },  
                            onMore: () => {  
                                Lampa.Activity.push({  
                                    url: '',  
                                    title: Lampa.Lang.translate('tmdb_top_title'),  
                                    component: 'category',  
                                    genre: 'top_rated',  
                                    page: 1  
                                })  
                            }  
                        })  
  
                        call({  
                            results: movies,  
                            title: Lampa.Lang.translate('tmdb_top_title'),  
                            type: 'movie',  
                            total_pages: Math.ceil(Math.min(data.total_results, 100) / 20),  
                            params: {  
                                module: Lampa.Maker.module('Line').toggle(Lampa.Maker.module('Line').MASK.base, 'Icon')  
                            }  
                        })  
                    } else {  
                        call({  
                            results: [],  
                            title: Lampa.Lang.translate('tmdb_top_title'),  
                            type: 'movie'  
                        })  
                    }  
                }, (error) => {  
                    console.error('TMDB Top 100 error:', error)  
                    call({  
                        results: [],  
                        title: Lampa.Lang.translate('tmdb_top_title'),  
                        type: 'movie'  
                    })  
                })  
            }  
        }  
    })  
  
    // Додаємо кнопку в меню  
    function addMenuButton() {  
        let button = $(`<li class="menu__item selector">  
            <div class="menu__ico">  
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">  
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>  
                </svg>  
            </div>  
            <div class="menu__text">${Lampa.Lang.translate('tmdb_top_title')}</div>  
        </li>`)  
  
        button.on('hover:enter', function () {  
            Lampa.Activity.push({  
                url: '',  
                title: Lampa.Lang.translate('tmdb_top_title'),  
                component: 'category',  
                genre: 'top_rated',  
                page: 1  
            })  
        })  
  
        $('.menu .menu__list').eq(0).append(button)  
    }  
  
    // Ініціалізація після готовності додатку  
    if (window.appready) {  
        addMenuButton()  
    } else {  
        Lampa.Listener.follow('app', function (e) {  
            if (e.type == 'ready') {  
                addMenuButton()  
            }  
        })  
    }  
}  
  
// Запуск плагіна  
if (!window.plugin_tmdb_top_ready) {  
    startPlugin()  
}
