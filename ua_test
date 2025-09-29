(function () {
  'use strict';

  function Collection(data) {
    this.data = data;

    function remove(elem) {
      if (elem) elem.remove();
    }

    this.build = function () {
      this.item = Lampa.Template.js('prisma_collection');
      this.img = this.item.find('.card__img');
      this.item.find('.card__title').text(data.title || '');

      this.item.addEventListener('visible', this.visible.bind(this));
    };

    this.image = function () {
      var _this = this;

      this.img.onload = function () {
        _this.item.classList.add('card--loaded');
      };

      this.img.onerror = function () {
        _this.img.src = './img/img_broken.svg';
      };
    };

    this.create = function () {
      var _this2 = this;

      this.build();
      this.item.addEventListener('hover:focus', function () {
        if (_this2.onFocus) _this2.onFocus(_this2.item, data);
      });
      this.item.addEventListener('hover:touch', function () {
        if (_this2.onTouch) _this2.onTouch(_this2.item, data);
      });
      this.item.addEventListener('hover:hover', function () {
        if (_this2.onHover) _this2.onHover(_this2.item, data);
      });
      this.item.addEventListener('hover:enter', function () {
        Lampa.Activity.push({
          url: data.id,
          collection: data,
          title: data.title,
          component: 'prisma_collections_view',
          page: 1
        });
      });
      this.image();
    };

    this.visible = function () {
      if (data.poster_path) {
        this.img.src = 'https://image.tmdb.org/t/p/w780' + data.poster_path;
      } else {
        this.img.src = './img/img_broken.svg';
      }
      if (this.onVisible) this.onVisible(this.item, data);
    };

    this.destroy = function () {
      this.img.onerror = function () { };
      this.img.onload = function () { };
      this.img.src = '';
      remove(this.item);
      this.item = null;
      this.img = null;
    };
    
    this.render = function (js) {
      return js ? this.item : $(this.item);
    };
  }

  var network = new Lampa.Reguest();
  var api_key = '3baac7c58b4daea1999d615c5d12b226'; // TMDB API key
  var api_url = 'https://api.themoviedb.org/3/';

  // Функція для отримання популярних колекцій
  function main(params, oncomplite, onerror) {
    var url = api_url + 'collection/popular?api_key=' + api_key + '&language=uk&page=' + (params.page || 1);
    
    network.silent(url, function (data) {
      var collections = data.results || [];
      var fulldata = collections.map(function (collection) {
        return {
          id: collection.id,
          title: collection.name,
          img: collection.poster_path,
          overview: collection.overview,
          backdrop_path: collection.backdrop_path,
          hpu: collection.id.toString(),
          cardClass: function (elem, param) {
            return new Collection(elem, param);
          }
        };
      });
      
      var result = {
        results: fulldata,
        page: data.page,
        total_pages: data.total_pages,
        collection: true
      };
      
      oncomplite(result);
    }, onerror, false);
  }

  // Функція для отримання списку колекцій
  function collection(params, oncomplite, onerror) {
    params.page = params.page || 1;
    
    // Отримуємо популярні колекції
    var url = api_url + 'collection/popular?api_key=' + api_key + '&language=uk&page=' + params.page;

    network.silent(url, function (data) {
      var formattedData = {
        results: (data.results || []).map(function (item) {
          return {
            id: item.id,
            title: item.name,
            img: item.poster_path,
            overview: item.overview,
            hpu: item.id.toString(),
            backdrop_path: item.backdrop_path,
            parts: item.parts || []
          };
        }),
        page: data.page,
        total_pages: data.total_pages || 10,
        collection: true,
        cardClass: function (elem, param) {
          return new Collection(elem, param);
        }
      };
      
      oncomplite(formattedData);
    }, onerror, false);
  }

  // Функція для отримання повної інформації про колекцію
  function full(params, oncomplite, onerror) {
    var collectionId = params.url || params.id;
    var url = api_url + 'collection/' + collectionId + '?api_key=' + api_key + '&language=uk';

    network.silent(url, function (data) {
      // Форматуємо фільми в колекції
      var movies = (data.parts || []).map(function (movie) {
        return {
          id: movie.id,
          title: movie.title,
          name: movie.title,
          original_title: movie.original_title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          genre_ids: movie.genre_ids,
          media_type: 'movie'
        };
      });

      var result = {
        id: data.id,
        title: data.name,
        overview: data.overview,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
        results: movies,
        page: params.page || 1,
        total_pages: 1,
        total_results: movies.length
      };
      
      oncomplite(result);
    }, onerror, false);
  }

  function clear() {
    network.clear();
  }

  var Api = {
    main: main,
    collection: collection,
    full: full,
    clear: clear,
  };

  // Компонент для перегляду окремої колекції
  function component$1(object) {
    var comp = new Lampa.InteractionCategory(object);

    comp.create = function () {
      this.activity.loader(true);
      Api.full(object, this.build.bind(this), this.empty.bind(this));
    };

    comp.nextPageReuest = function (object, resolve, reject) {
      Api.full(object, resolve.bind(comp), reject.bind(comp));
    };

    return comp;
  }

  // Основний компонент колекцій
  function component(object) {
    var comp = new Lampa.InteractionCategory(object);

    comp.create = function () {
      this.activity.loader(true);
      Api.collection(object, this.build.bind(this), this.empty.bind(this));
    };

    comp.next = function () {
      var _this2 = this;
      object.page++;
      Api.collection(object, function (result) {
        _this2.append(result, true);
      }, function () {
      });
    }

    comp.nextPageReuest = function (object, resolve, reject) {
      Api.collection(object, resolve.bind(comp), reject.bind(comp));
    };

    comp.cardRender = function (object, element, card) {
      card.onMenu = false;

      card.onEnter = function () {
        Lampa.Activity.push({
          url: element.id,
          title: element.title,
          component: 'prisma_collection',
          page: 1
        });
      };
    };

    return comp;
  }

  function startPlugin() {
    if (window.prisma_collections) return;
    window.prisma_collections = true;

    var manifest = {
      type: 'video',
      version: '1.0.0',
      name: 'Підбірки',
      description: 'Колекції фільмів українською',
      component: 'prisma_collections'
    };

    Lampa.Manifest.plugins = manifest;

    Lampa.Component.add('prisma_collections_collection', component);
    Lampa.Component.add('prisma_collections_view', component$1);
    
    Lampa.Template.add('prisma_collection', `
      <div class="card prisma-collection-card selector layer--visible layer--render card--collection">
        <div class="card__view">
          <img src="./img/img_load.svg" class="card__img">
        </div>
        <div class="card__title"></div>
      </div>
    `);
    
    var style = `
      <style>
        .prisma-collection-card { position: relative; }
        .prisma-collection-card .card__title { 
          text-align: center; 
          padding: 10px 5px; 
          font-size: 14px; 
          line-height: 1.2; 
        }
        .category-full .prisma-collection-card { padding-bottom: 2em; }
        
        @media screen and (max-width: 767px) {
          .category-full .prisma-collection-card { width: 33.3%; }
        }
        @media screen and (max-width: 580px) {
          .category-full .prisma-collection-card { width: 50%; }
        }
      </style>
    `;
    
    Lampa.Template.add('prisma_collections_css', style);
    $('body').append(Lampa.Template.get('prisma_collections_css', {}, true));

    var icon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.01 2.92007L18.91 5.54007C20.61 6.29007 20.61 7.53007 18.91 8.28007L13.01 10.9001C12.34 11.2001 11.24 11.2001 10.57 10.9001L4.67 8.28007C2.97 7.53007 2.97 6.29007 4.67 5.54007L10.57 2.92007C11.24 2.62007 12.34 2.62007 13.01 2.92007Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 11C3 11.84 3.63 12.81 4.4 13.15L11.19 16.17C11.71 16.4 12.3 16.4 12.81 16.17L19.6 13.15C20.37 12.81 21 11.84 21 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16C3 16.93 3.55 17.77 4.4 18.15L11.19 21.17C11.71 21.4 12.3 21.4 12.81 21.17L19.6 18.15C20.45 17.77 21 16.93 21 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

    function add() {
      var button = $(`
        <li class="menu__item selector">
          <div class="menu__ico">${icon}</div>
          <div class="menu__text">${manifest.name}</div>
        </li>
      `);
      
      button.on('hover:enter', function () {
        Lampa.Activity.push({
          url: '',
          title: manifest.name,
          component: 'prisma_collections_collection',
          page: 1
        });
      });
      
      $('.menu .menu__list').eq(0).append(button);
    }

    if (window.appready) add(); 
    else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') add();
      });
    }
  }

  if (window.appready) {
    startPlugin();
  } else {
    Lampa.Listener.follow('app', function (event) {
      if (event.type === 'ready') {
        startPlugin();
      }
    });
  }
})();
