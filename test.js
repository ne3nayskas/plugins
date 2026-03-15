function startPlugin() {  
    window.plugin_watched_ready = true  
  
    // Додаємо переклади  
    Lampa.Lang.add({  
        title_watched: {  
            uk: 'Ви дивилися',  
            ru: 'Вы смотрели',  
            en: 'Watched'  
        },  
        menu_movies: {  
            uk: 'Фільми',  
            ru: 'Фильмы',   
            en: 'Movies'  
        },  
        menu_tv: {  
            uk: 'Серіали',  
            ru: 'Сериалы',  
            en: 'TV Series'  
        }  
    })  
  
    let manifest = {  
        type: 'video',  
        version: '1.0.0',  
        name: Lampa.Lang.translate('title_watched'),  
        description: 'Shows watched movies and TV series',  
        component: 'watched'  
    }  
      
    Lampa.Manifest.plugins = manifest  
  
    // Компонент для відображення  
    function component(object){  
        let comp = new Lampa.InteractionMain(object)  
  
        comp.create = function(){  
            this.activity.loader(true)  
  
            let history = Lampa.Storage.get('history', '[]')  
            let movies = history.filter(item => !item.original_name).slice(0, 50).reverse()  
            let tv = history.filter(item => item.original_name).slice(0, 50).reverse()  
  
            let data = {  
                results: []  
            }  
  
            if(movies.length) {  
                data.results.push({  
                    title: Lampa.Lang.translate('title_watched') + ' - ' + Lampa.Lang.translate('menu_movies'),  
                    results: movies,  
                    nomore: true,  
                    type: 'watched_movies'  
                })  
            }  
  
            if(tv.length) {  
                data.results.push({  
                    title: Lampa.Lang.translate('title_watched') + ' - ' + Lampa.Lang.translate('menu_tv'),  
                    results: tv,  
                    nomore: true,  
                    type: 'watched_tv'  
                })  
            }  
  
            this.build(data)  
            return this.render()  
        }  
  
        comp.onMore = function(data){  
            // Можна додати перехід на повний список  
        }  
  
        return comp  
    }  
  
    // Додаємо контент на головний екран  
    if(Lampa.Manifest.app_digital >= 300){  
        Lampa.ContentRows.add({  
            name: 'watched_main',  
            title: Lampa.Lang.translate('title_watched'),  
            index: 2,  
            screen: ['main'],  
            call: (params, screen)=>{  
                return function(call){  
                    let watched_data = getWatchedData()  
                    call(watched_data)  
                }  
            }  
        })  
    }  
  
    function getWatchedData() {  
        let history = Lampa.Storage.get('history', '[]')  
        let movies = history.filter(item => !item.original_name).slice(0, 20).reverse()  
        let tv = history.filter(item => item.original_name).slice(0, 20).reverse()  
  
        let results = []  
  
        if(movies.length) {  
            results.push({  
                title: Lampa.Lang.translate('title_watched') + ' - ' + Lampa.Lang.translate('menu_movies'),  
                results: movies,  
                nomore: true,  
                type: 'watched_movies'  
            })  
        }  
  
        if(tv.length) {  
            results.push({  
                title: Lampa.Lang.translate('title_watched') + ' - ' + Lampa.Lang.translate('menu_tv'),  
                results: tv,  
                nomore: true,  
                type: 'watched_tv'  
            })  
        }  
  
        return {  
            results: results,  
            title: Lampa.Lang.translate('title_watched'),  
            icon_svg: '<svg height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 2C9.6 2 2 9.6 2 19s7.6 17 17 17 17-7.6 17-17S28.4 2 19 2zm0 30c-7.2 0-13-5.8-13-13s5.8-13 13-13 13 5.8 13 13-5.8 13-13 13z"/><path d="M15 14v10l8-5-8-5z"/></svg>',  
            icon_bgcolor: '#fff',  
            icon_color: '#fd4518'  
        }  
    }  
  
    function add(){  
        let button = $(`<li class="menu__item selector">  
            <div class="menu__ico">  
                <svg height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">  
                    <path d="M19 2C9.6 2 2 9.6 2 19s7.6 17 17 17 17-7.6 17-17S28.4 2 19 2zm0 30c-7.2 0-13-5.8-13-13s5.8-13 13-13 13 5.8 13 13-5.8 13-13 13z"/>  
                    <path d="M15 14v10l8-5-8-5z"/>  
                </svg>  
            </div>  
            <div class="menu__text">${manifest.name}</div>  
        </li>`)  
  
        button.on('hover:enter', function () {  
            Lampa.Activity.push({  
                url: '',  
                title: manifest.name,  
                component: 'watched',  
                page: 1  
            })  
        })  
  
        $('.menu .menu__list').eq(0).append(button)  
    }  
  
    // Додаємо компонент  
    Lampa.Component.add('watched', component)  
  
    // Додаємо стилі  
    $('body').append(`  
        <style>  
        .watched-card {  
            position: relative;  
        }  
        .watched-card::after {  
            content: '';  
            position: absolute;  
            top: 5px;  
            right: 5px;  
            width: 20px;  
            height: 20px;  
            background: rgba(253, 69, 24, 0.9);  
            border-radius: 50%;  
            display: flex;  
            align-items: center;  
            justify-content: center;  
        }  
        .watched-card::before {  
            content: '✓';  
            position: absolute;  
            top: 8px;  
            right: 8px;  
            color: white;  
            font-size: 12px;  
            font-weight: bold;  
            z-index: 1;  
        }  
        .watched-section {  
            margin-bottom: 20px;  
        }  
        .watched-section__title {  
            font-size: 18px;  
            font-weight: bold;  
            margin-bottom: 10px;  
            color: #fff;  
        }  
        </style>  
    `)  
  
    if(window.appready) add()  
    else{  
        Lampa.Listener.follow('app', function (e) {  
            if (e.type == 'ready') add()  
        })  
    }  
}  
  
if(!window.plugin_watched_ready && Lampa.Manifest.app_digital >= 242) startPlugin()
