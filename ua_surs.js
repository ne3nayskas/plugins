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
          page: 1,
          genre: data.genre_id,
          type: data.type
        });
      });
      this.image();
    };

    this.visible = function () {
      if (data.poster_path) {
        this.img.src = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
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
  var api_key = '3baac7c58b4daea1999d615c5d12b226';
  var api_url = 'https://api.themoviedb.org/3/';

  // Розширені підбірки
  var customCollections = [
    // Популярні категорії
    {
      id: 'popular_movies',
      title: '🍿 Популярні фільми',
      poster_path: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      genre_id: 'popular',
      type: 'movie'
    },
    {
      id: 'top_rated_movies',
      title: '⭐ Найкращі фільми',
      poster_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
      genre_id: 'top_rated',
      type: 'movie'
    },
    {
      id: 'upcoming_movies',
      title: '🎬 Очікувані фільми',
      poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
      genre_id: 'upcoming',
      type: 'movie'
    },
    {
      id: 'now_playing_movies',
      title: '🎭 Зараз у кіно',
      poster_path: '/gavyCu1UaTaTNPsVaGXT6pe5u24.jpg',
      genre_id: 'now_playing',
      type: 'movie'
    },

    // Відомі франшизи
    {
      id: 'marvel_movies',
      title: '🦸 Marvel',
      poster_path: '/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
      genre_id: 'marvel',
      type: 'collection'
    },
    {
      id: 'star_wars_movies',
      title: '🌌 Зоряні Війни',
      poster_path: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
      genre_id: 'star_wars',
      type: 'collection'
    },
    {
      id: 'dc_movies',
      title: '🦇 DC Comics',
      poster_path: '/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg',
      genre_id: 'dc',
      type: 'collection'
    },
    {
      id: 'harry_potter_movies',
      title: '⚡ Гаррі Поттер',
      poster_path: '/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg',
      genre_id: 'harry_potter',
      type: 'collection'
    },

    // Жанри
    {
      id: 'action_movies',
      title: '💥 Бойовики',
      poster_path: '/gavyCu1UaTaTNPsVaGXT6pe5u24.jpg',
      genre_id: 28,
      type: 'movie'
    },
    {
      id: 'comedy_movies',
      title: '😂 Комедії',
      poster_path: '/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg',
      genre_id: 35,
      type: 'movie'
    },
    {
      id: 'drama_movies',
      title: '🎭 Драми',
      poster_path: '/k0ThmZQl5nHe4JefC2bXjqtgYp0.jpg',
      genre_id: 18,
      type: 'movie'
    },
    {
      id: 'animation_movies',
      title: '🐭 Мультфільми',
      poster_path: '/y5Z0WesTjvn59jP6yo459eUsbli.jpg',
      genre_id: 16,
      type: 'movie'
    },
    {
      id: 'thriller_movies',
      title: '🔪 Трилери',
      poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
      genre_id: 53,
      type: 'movie'
    },
    {
      id: 'fantasy_movies',
      title: '🧙 Фентезі',
      poster_path: '/8UlWHLMpgI9Kay6KArRZbCYtVVb.jpg',
      genre_id: 14,
      type: 'movie'
    },
    {
      id: 'sci_fi_movies',
      title: '🚀 Наукова фантастика',
      poster_path: '/gavyCu1UaTaTNPsVaGXT6pe5u24.jpg',
      genre_id: 878,
      type: 'movie'
    },
    {
      id: 'horror_movies',
      title: '👻 Хоррори',
      poster_path: '/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg',
      genre_id: 27,
      type: 'movie'
    },
    {
      id: 'adventure_movies',
      title: '🗺️ Пригоди',
      poster_path: '/k0ThmZQl5nHe4JefC2bXjqtgYp0.jpg',
      genre_id: 12,
      type: 'movie'
    },
    {
      id: 'family_movies',
      title: '👨‍👩‍👧‍👦 Сімейні',
      poster_path: '/y5Z0WesTjvn59jP6yo459eUsbli.jpg',
      genre_id: 10751,
      type: 'movie'
    }
  ];

  // Функція для фільтрації азійського контенту
  function filterAsianContent(movies) {
    return movies.filter(function(movie) {
      // Фільтруємо фільми без рейтингу
      if (!movie.vote_average || movie.vote_average < 1) return false;
      
      // Фільтруємо азійські мови (китайська, японська, корейська)
      var originalTitle = movie.original_title || '';
      var title = movie.title || '';
      
      // Регулярний вираз для виявлення ієрогліфів та корейських символів
      var asianChars = /[\u3040-\u30ff\u3100-\u312f\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af]/;
      
      // Виключаємо якщо оригінальна назва містить азійські символи
      if (asianChars.test(originalTitle) || asianChars.test(title)) {
        return false;
      }
      
      // Виключаємо фільми з дуже низьким рейтингом
      if (movie.vote_average < 5.0) return false;
      
      return true;
    });
  }

  function collection(params, oncomplite, onerror) {
    params.page = params.page || 1;
    
    var result = {
      results: customCollections.map(function(item, index) {
        return {
          id: item.id,
          title: item.title,
          img: item.poster_path,
          poster_path: item.poster_path,
          overview: item.title + ' українською мовою',
          hpu: item.id,
          genre_id: item.genre_id,
          type: item.type,
          backdrop_path: item.poster_path
        };
      }),
      page: 1,
      total_pages: 1,
      collection: true,
      cardClass: function (elem, param) {
        return new Collection(elem, param);
      }
    };
    
    oncomplite(result);
  }

  // Функція для отримання фільмів
  function full(params, oncomplite, onerror) {
    var genreId = params.genre || params.url;
    var type = params.type || 'movie';
    var page = params.page || 1;
    var url = '';

    if (type === 'collection') {
      // Для відомих франшиз
      switch(genreId) {
        case 'marvel':
          url = api_url + 'collection/86311?api_key=' + api_key + '&language=uk';
          break;
        case 'star_wars':
          url = api_url + 'collection/10?api_key=' + api_key + '&language=uk';
          break;
        case 'dc':
          url = api_url + 'collection/263?api_key=' + api_key + '&language=uk';
          break;
        case 'harry_potter':
          url = api_url + 'collection/1241?api_key=' + api_key + '&language=uk';
          break;
        default:
          url = api_url + 'discover/movie?api_key=' + api_key + '&language=uk&sort_by=popularity.desc&page=' + page;
      }
    } else {
      // Для звичайних категорій
      switch(genreId) {
        case 'popular':
          url = api_url + 'movie/popular?api_key=' + api_key + '&language=uk&page=' + page;
          break;
        case 'top_rated':
          url = api_url + 'movie/top_rated?api_key=' + api_key + '&language=uk&page=' + page;
          break;
        case 'upcoming':
          url = api_url + 'movie/upcoming?api_key=' + api_key + '&language=uk&page=' + page;
          break;
        case 'now_playing':
          url = api_url + 'movie/now_playing?api_key=' + api_key + '&language=uk&page=' + page;
          break;
        default:
          url = api_url + 'discover/movie?api_key=' + api_key + '&language=uk&with_genres=' + genreId + '&sort_by=popularity.desc&page=' + page;
      }
    }

    console.log('Loading from:', url);

    network.silent(url, function (data) {
      var movies = [];
      
      if (type === 'collection' && data.parts) {
        // Для колекцій
        movies = data.parts || [];
      } else {
        // Для звичайних запитів
        movies = data.results || [];
      }
      
      // Фільтруємо контент
      var filteredMovies = filterAsianContent(movies);
      
      var formattedMovies = filteredMovies.map(function (movie) {
        return {
          id: movie.id,
          title: movie.title || movie.name,
          name: movie.title || movie.name,
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
        id: genreId,
        title: getCollectionTitle(genreId),
        overview: 'Фільми українською мовою',
        poster_path: formattedMovies[0] ? formattedMovies[0].poster_path : '',
        backdrop_path: formattedMovies[0] ? formattedMovies[0].backdrop_path : '',
        results: formattedMovies,
        page: data.page || 1,
        total_pages: data.total_pages || 1,
        total_results: formattedMovies.length
      };
      
      console.log('Loaded movies:', formattedMovies.length, 'Filtered from:', movies.length);
      oncomplite(result);
    }, function (error) {
      console.error('API Error:', error);
      onerror(error);
    }, false);
  }

  function getCollectionTitle(genreId) {
    var titles = {
      'popular': 'Популярні фільми',
      'top_rated': 'Найкращі фільми',
      'upcoming': 'Очікувані фільми',
      'now_playing': 'Зараз у кіно',
      'marvel': 'Marvel',
      'star_wars': 'Зоряні Війни',
      'dc': 'DC Comics',
      'harry_potter': 'Гаррі Поттер',
      '28': 'Бойовики',
      '35': 'Комедії',
      '18': 'Драми',
      '16': 'Мультфільми',
      '53': 'Трилери',
      '14': 'Фентезі',
      '878': 'Наукова фантастика',
      '27': 'Хоррори',
      '12': 'Пригоди',
      '10751': 'Сімейні фільми'
    };
    return titles[genreId] || 'Підбірка фільмів';
  }

  function clear() {
    network.clear();
  }

  var Api = {
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

    comp.nextPageReuest = function (object, resolve, reject) {
      Api.collection(object, resolve.bind(comp), reject.bind(comp));
    };

    comp.cardRender = function (object, element, card) {
      card.onMenu = false;

      card.onEnter = function () {
        Lampa.Activity.push({
          url: element.id,
          title: element.title,
          component: 'prisma_collections_view',
          page: 1,
          genre: element.genre_id,
          type: element.type
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
      description: 'Фільми українською мовою',
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
        .prisma-collection-card { 
          position: relative; 
          margin: 8px;
          width: calc(25% - 16px) !important;
          min-width: calc(25% - 16px) !important;
          max-width: calc(25% - 16px) !important;
        }
        .prisma-collection-card .card__title { 
          text-align: center; 
          padding: 8px 4px; 
          font-size: 12px; 
          line-height: 1.2;
          color: white;
          font-weight: 500;
          height: 36px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .prisma-collection-card .card__view {
          height: 180px !important;
        }
        .prisma-collection-card .card__img {
          height: 180px !important;
          object-fit: cover;
        }
        .category-full .prisma-collection-card { 
          padding-bottom: 1em; 
        }
        
        @media screen and (max-width: 1200px) {
          .prisma-collection-card { 
            width: calc(33.333% - 16px) !important;
            min-width: calc(33.333% - 16px) !important;
            max-width: calc(33.333% - 16px) !important;
          }
        }
        
        @media screen and (max-width: 767px) {
          .prisma-collection-card { 
            width: calc(50% - 16px) !important;
            min-width: calc(50% - 16px) !important;
            max-width: calc(50% - 16px) !important;
          }
        }
        
        @media screen and (max-width: 480px) {
          .prisma-collection-card { 
            width: calc(50% - 12px) !important;
            min-width: calc(50% - 12px) !important;
            max-width: calc(50% - 12px) !important;
            margin: 6px;
          }
          .prisma-collection-card .card__view {
            height: 160px !important;
          }
          .prisma-collection-card .card__img {
            height: 160px !important;
          }
          .prisma-collection-card .card__title {
            font-size: 11px;
            padding: 6px 3px;
          }
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
