function startPlugin() {  
    window.plugin_watched_ready = true  
  
    Lampa.Params.trigger('watched_view_in_main', true)  
  
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
  
            let all = Lampa.Favorite.all()  
            let history = all.history || []  
  
            this.build({  
                results: history.slice(0, 50),  
                title: Lampa.Lang.translate('title_watched')  
            })  
            return this.render()  
        }  
  
        comp.onMore = function(data){  
            Lampa.Activity.push({  
                url: 'history',  
                title: Lampa.Lang.translate('menu_history'),  
                component: 'favorite',  
                page: 2  
            })  
        }  
  
        return comp  
    }  
  
    // Додаємо контент на головний екран - ПЕРШИЙ канал  
    if(Lampa.Manifest.app_digital >= 300){  
        Lampa.ContentRows.add({  
            name: 'watched_main',  
            title: Lampa.Lang.translate('title_watched'),  
            index: 0,  
            screen: ['main'],  
            call: (params, screen)=>{  
                let all = Lampa.Favorite.all()  
                let history = all.history || []  
                  
                if(!history.length) return  
  
                return function(call){  
                    call({  
                        results: history.slice(0, 20),  
                        title: Lampa.Lang.translate('title_watched')  
                    })  
                }  
            }  
        })  
    }  
  
    // Використовуємо правильний метод додавання кнопки меню  
    function add(){  
        Lampa.Menu.addButton(  
            `<svg height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">  
                <path d="M19 2C9.6 2 2 9.6 2 19s7.6 17 17 17 17-7.6 17-17S28.4 2 19 2zm0 30c-7.2 0-13-5.8-13-13s5.8-13 13-13 13 5.8 13 13-5.8 13-13 13z"/>  
                <path d="M15 14v10l8-5-8-5z"/>  
            </svg>`,  
            manifest.name,  
            function () {  
                Lampa.Activity.push({  
                    url: '',  
                    title: manifest.name,  
                    component: 'watched',  
                    page: 1  
                })  
            }  
        )  
    }  
  
    // Додаємо компонент  
    Lampa.Component.add('watched', component)  
  
    if(window.appready) add()  
    else{  
        Lampa.Listener.follow('app', function (e) {  
            if (e.type == 'ready') add()  
        })  
    }  
}  
  
if(!window.plugin_watched_ready && Lampa.Manifest.app_digital >= 242) startPlugin()
