// plugins/tmdb-top/tmdb-top.js  
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
        }  
    })  
  
    // Додаємо ряд на головну сторінку  
    Lampa.ContentRows.add({  
        name: 'tmdb_top_main',  
        title: 'TMDB Top 100',  
        index: 3, // Змінено індекс для кращої позиції  
        screen: ['main'], // Тільки на головній  
        call: (params, screen) => {  
            // Перевіряємо чи не дитячий режим  
            if(Lampa.Account.Permit.child) {  
                console.log('TMDB Top: Child mode enabled, skipping')  
                return  
            }  
  
            return function(call) {  
                console.log('TMDB Top: Loading data...')  
                  
                Lampa.TMDB.get('movie/top_rated', {  
                    page: 1,  
                    language: Lampa.Storage.field('tmdb_lang') || 'uk'  
                }, (data) => {  
                    console.log('TMDB Top: Data received:', data.results?.length)  
                      
                    if (data && data.results && data.results.length > 0) {  
                        let movies = data.results.slice(0, 20)  
                          
                        // Додаємо source до кожного елемента  
                        movies.forEach(movie => {  
                            movie.source = 'tmdb'  
                        })  
                          
                        Lampa.Utils.extendItemsParams(movies, {  
                            createInstance: (item_data) => {  
                                return Lampa.Maker.make('Card', item_data, (module) => module.only('Card', 'Callback'))  
                            },  
                            onMore: () => {  
                                Lampa.Activity.push({  
                                    url: 'movie/top_rated',  
                                    title: Lampa.Lang.translate('tmdb_top_title'),  
                                    component: 'category',  
                                    page: 1  
                                })  
                            }  
                        })  
  
                        call({  
                            title: Lampa.Lang.translate('tmdb_top_title'),  
                            results: movies,  
                            type: 'movie',  
                            total_pages: Math.ceil(Math.min(data.total_results, 100) / 20),  
                            icon_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/></svg>',  
                            icon_bgcolor: '#fff',  
                            icon_color: '#fd4518',  
                            params: {  
                                module: Lampa.Maker.module('Line').toggle(Lampa.Maker.module('Line').MASK.base, 'Icon')  
                            }  
                        })  
                    } else {  
                        console.log('TMDB Top: No data found')  
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
}  
  
// Запуск плагіна  
if (!window.plugin_tmdb_top_ready) {  
    startPlugin()  
}
