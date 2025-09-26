(function () {
    'use strict';

    function startPlugin() {
        window.plugin_surs_ready = true;

        var SourceTMDB = function (parent) {
            this.network = new Lampa.Reguest();
            this.discovery = false;

            this.main = function () {
                var owner = this;
                var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var onComplete = arguments.length > 1 ? arguments[1] : undefined;
                var onError = arguments.length > 2 ? arguments[2] : undefined;
                var partsLimit = 12;

                var partsData = [
                    function (callback) {
                        var json = {
                            title: Lampa.Lang.translate(''),
                            results: [],
                            small: true,
                            collection: true,
                            line_type: 'player-cards'
                        };
                        callback(json);
                    },
                    function (callback) {
                        var baseUrl = 'trending/all/week';
                        owner.get(baseUrl, params, function (json) {
                            json.title = Lampa.Lang.translate('surs_title_trend_week');
                            callback(json);
                        }, callback);
                    }
                ];

                var CustomData = [];

                // Жанри фільмів
                var allGenres = [
                    { id: 28, title: 'surs_genre_action' },
                    { id: 35, title: 'surs_genre_comedy' },
                    { id: 18, title: 'surs_genre_drama' },
                    { id: 10749, title: 'surs_genre_romance' },
                    { id: 16, title: 'surs_genre_animation' },
                    { id: 12, title: 'surs_genre_adventure' },
                    { id: 80, title: 'surs_genre_crime' },
                    { id: 9648, title: 'surs_genre_mystery' },
                    { id: 878, title: 'surs_genre_sci_fi' },
                    { id: 53, title: 'surs_genre_thriller' },
                    { id: 10751, title: 'surs_genre_family' },
                    { id: 14, title: 'surs_genre_fantasy' }
                ];

                // Опції сортування
                var allSortOptions = [
                    { id: 'vote_count.desc', title: 'surs_vote_count_desc' },
                    { id: 'vote_average.desc', title: 'surs_vote_average_desc' },
                    { id: 'first_air_date.desc', title: 'surs_first_air_date_desc' },
                    { id: 'popularity.desc', title: 'surs_popularity_desc' }
                ];

                function getMovies(genre) {
                    return function (callback) {
                        var sort = allSortOptions[Math.floor(Math.random() * allSortOptions.length)];
                        var apiUrl = 'discover/movie?with_genres=' + genre.id + '&sort_by=' + sort.id;

                        owner.get(apiUrl, params, function (json) {
                            json.title = Lampa.Lang.translate(sort.title) + ' (' + Lampa.Lang.translate(genre.title) + ')';
                            callback(json);
                        }, callback);
                    };
                }

                function getTVShows(genre) {
                    return function (callback) {
                        var sort = allSortOptions[Math.floor(Math.random() * allSortOptions.length)];
                        var apiUrl = 'discover/tv?with_genres=' + genre.id + '&sort_by=' + sort.id;

                        owner.get(apiUrl, params, function (json) {
                            json.title = Lampa.Lang.translate(sort.title) + ' ' + Lampa.Lang.translate('surs_tv_shows') + ' (' + Lampa.Lang.translate(genre.title) + ')';
                            callback(json);
                        }, callback);
                    };
                }

                // Додаємо підбірки для кожного жанру
                allGenres.forEach(function (genre) {
                    CustomData.push(getMovies(genre));
                    CustomData.push(getTVShows(genre));
                });

                // Перемішуємо підбірки
                function shuffleArray(array) {
                    for (var i = array.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                }

                shuffleArray(CustomData);

                var combinedData = partsData.concat(CustomData);

                function loadPart(partLoaded, partEmpty) {
                    Lampa.Api.partNext(combinedData, partsLimit, partLoaded, partEmpty);
                }

                loadPart(onComplete, onError);
                return loadPart;
            };
        };

        function add() {
            if (typeof Lampa === 'undefined' || !Lampa.Storage || !Lampa.Api || !Lampa.Params) {
                return;
            }

            if (!Lampa.Api.sources || !Lampa.Api.sources.tmdb) {
                return;
            }

            var sourceName = 'SURS';

            function assign(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    if (source) {
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                }
                return target;
            }

            var surs_mod = assign({}, Lampa.Api.sources.tmdb, new SourceTMDB(Lampa.Api.sources.tmdb));

            Lampa.Api.sources[sourceName] = surs_mod;

            var newSourceOptions = {};
            newSourceOptions[sourceName] = sourceName;

            var mergedOptions = assign({}, Lampa.Params.values['source'], newSourceOptions);

            try {
                Lampa.Params.select('source', mergedOptions, 'tmdb');
            } catch (e) {
                console.error('Error updating source params: ', e);
            }
        }

        // Додаємо переклади
        Lampa.Lang.add({
            surs_vote_count_desc: {
                ru: "Много голосов",
                en: "Most Votes",
                uk: "Багато голосів"
            },
            surs_vote_average_desc: {
                ru: "Высокий рейтинг",
                en: "High Rating",
                uk: "Високий рейтинг"
            },
            surs_first_air_date_desc: {
                ru: "Новинки",
                en: "New Releases",
                uk: "Новинки"
            },
            surs_popularity_desc: {
                ru: "Популярные",
                en: "Popular",
                uk: "Популярні"
            },
            surs_genre_action: {
                ru: "боевики",
                en: "action",
                uk: "бойовики"
            },
            surs_genre_comedy: {
                ru: "комедии",
                en: "comedies",
                uk: "комедії"
            },
            surs_genre_drama: {
                ru: "драмы",
                en: "dramas",
                uk: "драми"
            },
            surs_genre_romance: {
                ru: "мелодрамы",
                en: "romance",
                uk: "мелодрами"
            },
            surs_genre_animation: {
                ru: "анимация",
                en: "animations",
                uk: "мультфільми"
            },
            surs_genre_adventure: {
                ru: "приключения",
                en: "adventures",
                uk: "пригоди"
            },
            surs_genre_crime: {
                ru: "криминал",
                en: "crime",
                uk: "кримінал"
            },
            surs_genre_mystery: {
                ru: "детективы",
                en: "mysteries",
                uk: "детективи"
            },
            surs_genre_sci_fi: {
                ru: "фантастика",
                en: "sci-fi",
                uk: "фантастика"
            },
            surs_genre_thriller: {
                ru: "триллеры",
                en: "thrillers",
                uk: "трилери"
            },
            surs_genre_family: {
                ru: "семейные",
                en: "family",
                uk: "сімейні"
            },
            surs_genre_fantasy: {
                ru: "фэнтези",
                en: "fantasy",
                uk: "фентезі"
            },
            surs_title_trend_week: {
                ru: "Тренды недели",
                en: "Trending This Week",
                uk: "Тренди тижня"
            },
            surs_tv_shows: {
                ru: "сериалы",
                en: "TV shows",
                uk: "серіали"
            }
        });

        if (window.appready) {
            add();
        } else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') {
                    add();
                }
            });
        }
    }

    if (!window.plugin_surs_ready) startPlugin();

})();
