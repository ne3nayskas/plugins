(function () {
    'use strict';

    function startPlugin() {
        window.plugin_surs_ready = true;

        var SourceTMDB = function (parent) {
            this.network = new Lampa.Reguest();
            this.discovery = false;

            // Функція для побудови URL з фільтрами
            function buildApiUrl(baseUrl, options) {
                options = options || {};
                
                // Фільтр по мінімальній кількості голосів
                baseUrl += '&vote_count.gte=50';
                
                // Фільтр по мінімальному рейтингу
                baseUrl += '&vote_average.gte=6.5';
                
                // Виключення російського та азійського контенту
                var excludedKeywords = [
                    '210024', // Аніме
                    '13141',  // Манга
                    '345822', // 4-кома манга
                    '315535', // Донхуа
                    '290667', // Маньхуа
                    '323477', // Манхва
                    '290609', // Корейська манхва
                    '207317', // Хентай
                    '346488', // Російська політика
                    '158718'  // Російська пропаганда
                ];
                baseUrl += '&without_keywords=' + excludedKeywords.join(',');
                
                // Виключення країн
                baseUrl += '&without_origin_country=RU&without_origin_country=JP&without_origin_country=KR&without_origin_country=CN';
                
                // Для українського контенту - інші налаштування
                if (options.ukrainian) {
                    baseUrl += '&with_origin_country=UA';
                    // Менш строгі вимоги для українського контенту
                    baseUrl = baseUrl.replace('vote_count.gte=50', 'vote_count.gte=10');
                    baseUrl = baseUrl.replace('vote_average.gte=6.5', 'vote_average.gte=5.0');
                }
                
                // Фільтр якості
                baseUrl += '&with_images=true';
                
                return baseUrl;
            }

            // Функція для фільтрації контенту
            function filterContent(item, options) {
                options = options || {};
                
                // Для українського контенту - менш строгі вимоги
                var minRating = options.ukrainian ? 5.0 : 6.5;
                var minVotes = options.ukrainian ? 10 : 50;
                
                // Фільтр по рейтингу
                if ((item.vote_average || 0) < minRating) return false;
                
                // Фільтр по кількості голосів
                if ((item.vote_count || 0) < minVotes) return false;
                
                // Виключення російської та азійської мови
                var excludedLanguages = ['ru', 'ja', 'ko', 'zh', 'th', 'vi', 'hi'];
                if (excludedLanguages.includes(item.original_language)) return false;
                
                // Виключення країн походження
                if (item.origin_country) {
                    var excludedCountries = ['RU', 'JP', 'KR', 'CN', 'TW', 'HK', 'TH', 'VN', 'IN'];
                    if (item.origin_country.some(function(country) { return excludedCountries.includes(country); })) {
                        return false;
                    }
                }
                
                // Фільтр по якості - має бути постер
                if (!item.poster_path) return false;
                
                // Фільтр по року - не старіші 1970 року
                var releaseYear = item.release_date ? parseInt(item.release_date.substring(0, 4)) : 
                                 item.first_air_date ? parseInt(item.first_air_date.substring(0, 4)) : 0;
                if (releaseYear < 1970) return false;
                
                return true;
            }

            this.main = function () {
                var owner = this;
                var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var onComplete = arguments.length > 1 ? arguments[1] : undefined;
                var onError = arguments.length > 2 ? arguments[2] : undefined;
                var partsLimit = 12;

                var partsData = [
                    function (callback) {
                        var json = {
                            title: '',
                            results: [],
                            small: true,
                            collection: true,
                            line_type: 'player-cards'
                        };
                        callback(json);
                    },
                    function (callback) {
                        // Тренди тижня (без російського контенту)
                        var baseUrl = 'trending/all/week';
                        baseUrl = buildApiUrl(baseUrl);
                        owner.get(baseUrl, params, function (json) {
                            if (json.results) {
                                json.results = json.results.filter(function(item) {
                                    return filterContent(item);
                                });
                            }
                            json.title = '🔥 Тренди тижня';
                            callback(json);
                        }, callback);
                    },
                    function (callback) {
                        // Топ фільми за весь час
                        var baseUrl = 'discover/movie?sort_by=vote_average.desc&vote_count.gte=1000';
                        baseUrl = buildApiUrl(baseUrl);
                        owner.get(baseUrl, params, function (json) {
                            if (json.results) {
                                json.results = json.results.filter(function(item) {
                                    return filterContent(item);
                                }).slice(0, 20);
                            }
                            json.title = '🏆 Найкращі фільми усіх часів';
                            callback(json);
                        }, callback);
                    }
                ];

                var CustomData = [];

                // Українські підбірки
                function getUkrainianContent(type, title) {
                    return function (callback) {
                        var apiUrl = 'discover/' + type + '?sort_by=popularity.desc&with_origin_country=UA';
                        apiUrl = buildApiUrl(apiUrl, {ukrainian: true});

                        owner.get(apiUrl, params, function (json) {
                            if (json.results) {
                                json.results = json.results.filter(function(item) {
                                    return filterContent(item, {ukrainian: true});
                                }).slice(0, 20);
                            }
                            json.title = title;
                            callback(json);
                        }, callback);
                    };
                }

                // Додаємо українські підбірки
                CustomData.push(getUkrainianContent('movie', '🎬 Українські фільми'));
                CustomData.push(getUkrainianContent('tv', '📺 Українські серіали'));

                // Топ серіали за весь час
                function getTopTVShows() {
                    return function (callback) {
                        var baseUrl = 'discover/tv?sort_by=vote_average.desc&vote_count.gte=500';
                        baseUrl = buildApiUrl(baseUrl);
                        owner.get(baseUrl, params, function (json) {
                            if (json.results) {
                                json.results = json.results.filter(function(item) {
                                    return filterContent(item);
                                }).slice(0, 20);
                            }
                            json.title = '🏆 Найкращі серіали';
                            callback(json);
                        }, callback);
                    };
                }

                CustomData.push(getTopTVShows());

                // Новинки (останні 6 місяців)
                function getNewReleases(type, title) {
                    return function (callback) {
                        var currentDate = new Date();
                        var sixMonthsAgo = new Date();
                        sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
                        
                        var dateField = type === 'movie' ? 'primary_release_date' : 'first_air_date';
                        var apiUrl = 'discover/' + type + '?sort_by=popularity.desc&' + 
                                    dateField + '.gte=' + sixMonthsAgo.toISOString().split('T')[0] + 
                                    '&' + dateField + '.lte=' + currentDate.toISOString().split('T')[0];
                        apiUrl = buildApiUrl(apiUrl);

                        owner.get(apiUrl, params, function (json) {
                            if (json.results) {
                                json.results = json.results.filter(function(item) {
                                    return filterContent(item);
                                }).slice(0, 15);
                            }
                            json.title = title;
                            callback(json);
                        }, callback);
                    };
                }

                CustomData.push(getNewReleases('movie', '🎉 Нові фільми'));
                CustomData.push(getNewReleases('tv', '🎉 Нові серіали'));

                // Мультфільми та анімація
                function getAnimation() {
                    return function (callback) {
                        var apiUrl = 'discover/movie?with_genres=16&sort_by=vote_average.desc&vote_count.gte=200';
                        apiUrl = buildApiUrl(apiUrl);
                        owner.get(apiUrl, params, function (json) {
                            if (json.results) {
                                json.results = json.results.filter(function(item) {
                                    return filterContent(item);
                                }).slice(0, 15);
                            }
                            json.title = '🐭 Мультфільми та анімація';
                            callback(json);
                        }, callback);
                    };
                }

                CustomData.push(getAnimation());

                // Драматичні серіали
                function getDramaTV() {
                    return function (callback) {
                        var apiUrl = 'discover/tv?with_genres=18&sort_by=popularity.desc';
                        apiUrl = buildApiUrl(apiUrl);
                        owner.get(apiUrl, params, function (json) {
                            if (json.results) {
                                json.results = json.results.filter(function(item) {
                                    return filterContent(item);
                                }).slice(0, 15);
                            }
                            json.title = '🎭 Драматичні серіали';
                            callback(json);
                        }, callback);
                    };
                }

                CustomData.push(getDramaTV());

                // Фантастика та фентезі
                function getSciFiFantasy() {
                    return function (callback) {
                        var apiUrl = 'discover/movie?with_genres=878,14&sort_by=popularity.desc';
                        apiUrl = buildApiUrl(apiUrl);
                        owner.get(apiUrl, params, function (json) {
                            if (json.results) {
                                json.results = json.results.filter(function(item) {
                                    return filterContent(item);
                                }).slice(0, 15);
                            }
                            json.title = '🚀 Фантастика та фентезі';
                            callback(json);
                        }, callback);
                    };
                }

                CustomData.push(getSciFiFantasy());

                // Комедії
                function getComedies() {
                    return function (callback) {
                        var apiUrl = 'discover/movie?with_genres=35&sort_by=popularity.desc';
                        apiUrl = buildApiUrl(apiUrl);
                        owner.get(apiUrl, params, function (json) {
                            if (json.results) {
                                json.results = json.results.filter(function(item) {
                                    return filterContent(item);
                                }).slice(0, 15);
                            }
                            json.title = '😂 Комедії';
                            callback(json);
                        }, callback);
                    };
                }

                CustomData.push(getComedies());

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
                console.log('Lampa API not available');
                return;
            }

            if (!Lampa.Api.sources || !Lampa.Api.sources.tmdb) {
                console.log('TMDB source not available');
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

            try {
                var surs_mod = assign({}, Lampa.Api.sources.tmdb, new SourceTMDB(Lampa.Api.sources.tmdb));
                Lampa.Api.sources[sourceName] = surs_mod;

                var newSourceOptions = {};
                newSourceOptions[sourceName] = sourceName;

                var mergedOptions = assign({}, Lampa.Params.values['source'], newSourceOptions);
                Lampa.Params.select('source', mergedOptions, 'tmdb');
                
                console.log('SURS plugin successfully added');
            } catch (e) {
                console.error('Error adding SURS plugin: ', e);
            }
        }

        // Додаємо переклади для всіх мов
        Lampa.Lang.add({
            surs_title_trend_week: {
                ru: "Тренды недели",
                en: "Trending This Week", 
                uk: "Тренди тижня"
            },
            surs_top_movies: {
                ru: "Лучшие фильмы",
                en: "Top Movies",
                uk: "Найкращі фільми"
            },
            surs_top_tv: {
                ru: "Лучшие сериалы", 
                en: "Top TV Shows",
                uk: "Найкращі серіали"
            }
        });

        if (window.appready) {
            console.log('App ready, adding SURS plugin');
            add();
        } else {
            console.log('Waiting for app ready');
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') {
                    console.log('App ready event received, adding SURS plugin');
                    add();
                }
            });
        }
    }

    if (!window.plugin_surs_ready) {
        console.log('Starting SURS plugin');
        startPlugin();
    }

})();
