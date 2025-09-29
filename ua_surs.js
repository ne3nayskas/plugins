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
          query: data.query,
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
  var api_key = '6b99e7a05e71dcb06c1a284826bfc8c7';
  var api_url = 'https://api.themoviedb.org/3/';

  // Тематичні підбірки як у Prisma
  var customCollections = [
    {
      id: 'superhero_collection',
      title: '🦸 Супергерої',
      poster_path: '/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
      query: 'superhero',
      type: 'theme'
    },
    {
      id: 'fantasy_worlds',
      title: '🧙 Фентезі світи',
      poster_path: '/8UlWHLMpgI9Kay6KArRZbCYtVVb.jpg',
      query: 'fantasy',
      type: 'theme'
    },
    {
      id: 'space_adventures',
      title: '🚀 Космічні пригоди',
      poster_path: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
      query: 'space',
      type: 'theme'
    },
    {
      id: 'crime_thrillers',
      title: '🔫 Кримінальні трилери',
      poster_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
      query: 'crime thriller',
      type: 'theme'
    },
    {
      id: 'romantic_stories',
      title: '💖 Романтичні історії',
      poster_path: '/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg',
      query: 'romance',
      type: 'theme'
    },
    {
      id: 'historical_dramas',
      title: '🏰 Історичні драми',
      poster_path: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      query: 'historical drama',
      type: 'theme'
    },
    {
      id: 'family_animation',
      title: '👨‍👩‍👧‍👦 Сімейна анімація',
      poster_path: '/y5Z0WesTjvn59jP6yo459eUsbli.jpg',
      query: 'family animation',
      type: 'theme'
    },
    {
      id: 'action_adventures',
      title: '💥 Екшн пригоди',
      poster_path: '/gavyCu1UaTaTNPsVaGXT6pe5u24.jpg',
      query: 'action adventure',
      type: 'theme'
    },
    {
      id: 'sci_fi_future',
      title: '🤖 Наукова фантастика',
      poster_path: '/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg',
      query: 'science fiction',
      type: 'theme'
    },
    {
      id: 'mystery_horror',
      title: '👻 Містичні жахи',
      poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
      query: 'mystery horror',
      type: 'theme'
    },
    {
      id: 'comedy_films',
      title: '😂 Комедійні фільми',
      poster_path: '/k0ThmZQl5nHe4JefC2bXjqtgYp0.jpg',
      query: 'comedy',
      type: 'theme'
    },
    {
      id: 'drama_stories',
      title: '🎭 Драматичні історії',
      poster_path: '/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg',
      query: 'drama',
      type: 'theme'
    },
    {
      id: 'ukrainian_cinema',
      title: '🇺🇦 Українське кіно',
      poster_path: '/A1f0Wk8fQzZJCmYxH5Z4kW41L9.jpg',
      query: 'ukrainian',
      type: 'theme'
    },
    {
      id: 'european_cinema',
      title: '🇪🇺 Європейське кіно',
      poster_path: '/bQ2aUVIgOlgJSmZFWn80wVfJ3yB.jpg',
      query: 'european',
      type: 'theme'
    }
  ];

  // Функція для фільтрації азійського контенту
  function filterAsianContent(movies) {
    return movies.filter(function(movie) {
      if (!movie.vote_average || movie.vote_average < 5) return false;
      
      var originalTitle = movie.original_title || '';
      var title = movie.title || '';
      
      var asianChars = /[\u3040-\u30ff\u3100-\u312f\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af]/;
      
      if (asianChars.test(originalTitle) || asianChars.test(title)) {
        return false;
      }
      
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
          overview: item.title,
          hpu: item.id,
          query: item.query,
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

  // Функція для пошуку фільмів за темою
  function full(params, oncomplite, onerror) {
    var query = params.query;
    var page = params.page || 1;
    
    if (!query) {
      onerror('No query provided');
      return;
    }

    var url = api_url + 'search/movie?api_key=' + api_key + '&language=uk&query=' + encodeURIComponent(query) + '&page=' + page + '&include_adult=false';

    console.log('Searching movies for theme:', query, 'URL:', url);

    network.silent(url, function (data) {
      var movies = data.results || [];
      
      // Фільтруємо контент
      var filteredMovies = filterAsianContent(movies);
      
      // Сортуємо за популярністю
      filteredMovies.sort(function(a, b) {
        return b.popularity - a.popularity;
      });

      var formattedMovies = filteredMovies.map(function (movie) {
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
          popularity: movie.popularity,
          genre_ids: movie.genre_ids,
          media_type: 'movie'
        };
      });

      var result = {
        id: params.url,
        title: getCollectionTitle(query),
        overview: 'Тематична підбірка: ' + query,
        poster_path: formattedMovies[0] ? formattedMovies[0].poster_path : customCollections.find(c => c.query === query)?.poster_path || '',
        backdrop_path: formattedMovies[0] ? formattedMovies[0].backdrop_path : '',
        results: formattedMovies,
        page: data.page,
        total_pages: Math.min(data.total_pages, 5), // Обмежуємо кількість сторінок
        total_results: formattedMovies.length
      };
      
      console.log('Found movies for theme', query, ':', formattedMovies.length);
      oncomplite(result);
    }, function (error) {
      console.error('Search API Error:', error);
      // Якщо пошук не вдався, використовуємо жанровий підхід як запасний варіант
      fallbackSearch(query, page, oncomplite, onerror);
    }, false);
  }

  // Запасний варіант пошуку через жанри
  function fallbackSearch(query, page, oncomplite, onerror) {
    var genreMap = {
      'superhero': 28, // action
      'fantasy': 14,
      'space': 878, // sci-fi
      'crime thriller': 80, // crime
      'romance': 10749,
      'historical drama': 18, // drama
      'family animation': 16, // animation
      'action adventure': 12, // adventure
      'science fiction': 878,
      'mystery horror': 27, // horror
      'comedy': 35,
      'drama': 18,
      'ukrainian': 18, // drama for ukrainian
      'european': 18 // drama for european
    };

    var genreId = genreMap[query] || 28; // action by default
    
    var url = api_url + 'discover/movie?api_key=' + api_key + '&language=uk&with_genres=' + genreId + '&sort_by=popularity.desc&page=' + page;

    console.log('Fallback to genre search:', query, '->', genreId);

    network.silent(url, function (data) {
      var movies = data.results || [];
      var filteredMovies = filterAsianContent(movies);
      
      var formattedMovies = filteredMovies.map(function (movie) {
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
        id: query,
        title: getCollectionTitle(query),
        overview: 'Тематична підбірка: ' + query,
        poster_path: formattedMovies[0] ? formattedMovies[0].poster_path : '',
        backdrop_path: formattedMovies[0] ? formattedMovies[0].backdrop_path : '',
        results: formattedMovies,
        page: data.page,
        total_pages: Math.min(data.total_pages, 5),
        total_results: formattedMovies.length
      };
      
      oncomplite(result);
    }, onerror, false);
  }

  function getCollectionTitle(query) {
    var titles = {
      'superhero': 'Супергерої',
      'fantasy': 'Фентезі світи',
      'space': 'Космічні пригоди',
      'crime thriller': 'Кримінальні трилери',
      'romance': 'Романтичні історії',
      'historical drama': 'Історичні драми',
      'family animation': 'Сімейна анімація',
      'action adventure': 'Екшн пригоди',
      'science fiction': 'Наукова фантастика',
      'mystery horror': 'Містичні жахи',
      'comedy': 'Комедійні фільми',
      'drama': 'Драматичні історії',
      'ukrainian': 'Українське кіно',
      'european': 'Європейське кіно'
    };
    return titles[query] || query;
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
          query: element.query,
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
      name: 'Тематичні підбірки',
      description: 'Фільми за темами українською',
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
        
        @media screen and (max-width: 1200px) {
          .prisma-collection-card { width: calc(33.333% - 16px) !important; }
        }
        @media screen and (max-width: 767px) {
          .prisma-collection-card { width: calc(50% - 16px) !important; }
        }
        @media screen and (max-width: 480px) {
          .prisma-collection-card { 
            width: calc(50% - 12px) !important;
            margin: 6px;
          }
          .prisma-collection-card .card__view {
            height: 160px !important;
          }
          .prisma-collection-card .card__img {
            height: 160px !important;
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
