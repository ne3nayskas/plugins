/**
 * Lampa Track Finder v2.5 (Jackett Version)
 * --------------------------------------------------------------------------------
 * Цей плагін призначений для пошуку та відображення інформації про наявність
 * українських аудіодоріжок через підрахунок знайдених торрентів у Jackett.
 * --------------------------------------------------------------------------------
 */
(function() {
    'use strict';

    // ===================== КОНФІГУРАЦІЯ ПЛАГІНА =====================
    var LTF_CONFIG = {
        // --- Налаштування кешу ---
        CACHE_VERSION: 6,
        CACHE_KEY: 'lampa_ukr_tracks_cache',
        CACHE_VALID_TIME_MS: 12 * 60 * 60 * 1000,
        CACHE_REFRESH_THRESHOLD_MS: 6 * 60 * 60 * 1000,

        // --- Налаштування логування ---
        LOGGING_GENERAL: false,
        LOGGING_TRACKS: false,
        LOGGING_CARDLIST: false,

        // --- Налаштування Jackett API ---
        JACKETT_PROTOCOL: 'http://',
        JACKETT_URL: 'jackett.example.com', // ЗАМІНІТЬ НА ВАШ ДОМЕН
        JACKETT_API_KEY: 'your_api_key_here', // ЗАМІНІТЬ НА ВАШ КЛЮЧ
        JACKETT_INDEXERS: 'all',
        PROXY_LIST: [
            'http://cors.bwa.workers.dev/'
        ],
        PROXY_TIMEOUT_MS: 3500,
        MAX_PARALLEL_REQUESTS: 16,

        // --- Налаштування функціоналу ---
        SHOW_TRACKS_FOR_TV_SERIES: true,
        
        // --- Налаштування відображення ---
        MIN_TORRENTS_FOR_DISPLAY: 1, // Мінімальна кількість торрентів для показу мітки
        SHOW_EXACT_COUNT: true, // Показувати точну кількість (true) або тільки іконку (false)
    };

    // ======== АВТОМАТИЧНЕ СКИДАННЯ СТАРОГО КЕШУ ========
    (function resetOldCache() {
        var cache = Lampa.Storage.get(LTF_CONFIG.CACHE_KEY) || {};
        var hasOld = Object.keys(cache).some(k => !k.startsWith(LTF_CONFIG.CACHE_VERSION + '_'));
        if (hasOld) {
            console.log('UA-Finder: очищено старий кеш доріжок');
            Lampa.Storage.set(LTF_CONFIG.CACHE_KEY, {});
        }
    })();
    
    // ===================== СТИЛІ CSS =====================
    var styleTracks = "<style id=\"lampa_tracks_styles\">" +
        ".card__view { position: relative; }" +
        ".card__tracks {" +
        " position: absolute !important; " +
        " right: 0.3em !important; " +
        " left: auto !important; " +
        " top: 0.3em !important; " +
        " background: rgba(0,0,0,0.5) !important;" +
        " color: #FFFFFF !important;" +
        " font-size: 1.3em !important;" +
        " padding: 0.2em 0.5em !important;" +
        " border-radius: 1em !important;" +
        " font-weight: 700 !important;" +
        " z-index: 20 !important;" +
        " width: fit-content !important; " +
        " max-width: calc(100% - 1em) !important; " +
        " overflow: hidden !important;" +
        " display: flex !important;" +
        " align-items: center !important;" +
        " gap: 4px !important;" +
        "}" +
        ".card__tracks.positioned-below-rating {" +
        " top: 1.85em !important; " +
        "}" +
        ".card__tracks-count {" +
        " font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif !important;" +
        " font-weight: 700 !important;" +
        " letter-spacing: 0.1px !important;" +
        " font-size: 1.05em !important;" +
        " color: #FFFFFF !important;" +
        " padding: 0 !important;" +
        " text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.3) !important;" +
        "}" +
        "</style>";
    
    Lampa.Template.add('lampa_tracks_css', styleTracks);
    $('body').append(Lampa.Template.get('lampa_tracks_css', {}, true));

    // ===================== УПРАВЛІННЯ ЧЕРГОЮ ЗАПИТІВ =====================
    var requestQueue = [];
    var activeRequests = 0;

    function enqueueTask(fn) {
        requestQueue.push(fn);
        processQueue();
    }

    function processQueue() {
        if (activeRequests >= LTF_CONFIG.MAX_PARALLEL_REQUESTS) return;
        var task = requestQueue.shift();
        if (!task) return;

        activeRequests++;
        try {
            task(function onTaskDone() {
                activeRequests--;
                setTimeout(processQueue, 0);
            });
        } catch (e) {
            console.error("LTF-LOG", "Помилка виконання завдання з черги:", e);
            activeRequests--;
            setTimeout(processQueue, 0);
        }
    }

    // ===================== МЕРЕЖЕВІ ФУНКЦІЇ =====================
    function fetchWithProxy(url, cardId, callback) {
        var currentProxyIndex = 0;
        var callbackCalled = false;

        function tryNextProxy() {
            if (currentProxyIndex >= LTF_CONFIG.PROXY_LIST.length) {
                if (!callbackCalled) {
                    callbackCalled = true;
                    callback(new Error('Всі проксі не відповіли для ' + url));
                }
                return;
            }
            
            var proxyUrl = LTF_CONFIG.PROXY_LIST[currentProxyIndex] + encodeURIComponent(url);
            var timeoutId = setTimeout(function() {
                if (!callbackCalled) {
                    currentProxyIndex++;
                    tryNextProxy();
                }
            }, LTF_CONFIG.PROXY_TIMEOUT_MS);

            fetch(proxyUrl)
                .then(function(response) {
                    clearTimeout(timeoutId);
                    if (!response.ok) throw new Error('Помилка проксі: ' + response.status);
                    return response.text();
                })
                .then(function(data) {
                    if (!callbackCalled) {
                        callbackCalled = true;
                        callback(null, data);
                    }
                })
                .catch(function(error) {
                    clearTimeout(timeoutId);
                    if (!callbackCalled) {
                        currentProxyIndex++;
                        tryNextProxy();
                    }
                });
        }
        tryNextProxy();
    }
    
    // ===================== ДОПОМІЖНІ ФУНКЦІЇ =====================
    function getCardType(cardData) {
        var type = cardData.media_type || cardData.type;
        if (type === 'movie' || type === 'tv') return type;
        return cardData.name || cardData.original_name ? 'tv' : 'movie';
    }

    /**
     * Перевіряє, чи потрібно показувати мітку на основі кількості знайдених торрентів
     * @param {number} count - Кількість знайдених торрентів
     * @returns {boolean} - Чи потрібно показувати мітку
     */
    function shouldDisplayLabel(count) {
        return count && count >= LTF_CONFIG.MIN_TORRENTS_FOR_DISPLAY;
    }

    // ===================== ПОШУК НА JACKETT =====================
    function getTorrentsCount(normalizedCard, cardId, callback) {
        enqueueTask(function(done) {
            if (!normalizedCard.release_date || normalizedCard.release_date.toLowerCase().includes('невідомо') || isNaN(new Date(normalizedCard.release_date).getTime())) {
                callback(0);
                done();
                return;
            }
            
            var releaseDate = normalizedCard.release_date ? new Date(normalizedCard.release_date) : null;
            if (releaseDate && releaseDate.getTime() > Date.now()) {
                callback(0);
                done();
                return;
            }

            var year = '';
            if (normalizedCard.release_date && normalizedCard.release_date.length >= 4) {
                year = normalizedCard.release_date.substring(0, 4);
            }
            if (!year || isNaN(parseInt(year, 10))) {
                callback(0);
                done();
                return;
            }

            function searchJackettApi(searchTitle, searchYear, apiCallback) {
                var apiUrl = LTF_CONFIG.JACKETT_PROTOCOL + LTF_CONFIG.JACKETT_URL + '/api/v2.0/indexers/' + LTF_CONFIG.JACKETT_INDEXERS + '/results?' +
                    'apikey=' + encodeURIComponent(LTF_CONFIG.JACKETT_API_KEY) +
                    '&Query=' + encodeURIComponent(searchTitle + ' ' + searchYear);
                
                if (LTF_CONFIG.LOGGING_TRACKS) console.log('LTF-LOG', `[${cardId}] Пошук за: ${searchTitle} (${searchYear})`);
                
                fetchWithProxy(apiUrl, cardId, function(error, responseText) {
                    if (error || !responseText) {
                        if (LTF_CONFIG.LOGGING_TRACKS) console.log('LTF-LOG', `[${cardId}] Помилка запиту:`, error);
                        apiCallback(0);
                        return;
                    }
                    
                    try {
                        var response = JSON.parse(responseText);
                        var torrents = response.Results || [];
                        
                        if (LTF_CONFIG.LOGGING_TRACKS) console.log('LTF-LOG', `[${cardId}] Знайдено торрентів:`, torrents.length);

                        var filteredTorrents = torrents.filter(function(torrent) {
                            var torrentType = (torrent.Type || '').toLowerCase();
                            var torrentTitle = (torrent.Title || '').toLowerCase();
                            
                            if (normalizedCard.type === 'tv') {
                                var isSeries = /(сезон|season|s\d{1,2}|серії|episodes|епізод)/.test(torrentTitle) || 
                                              torrentType.includes('tv') || 
                                              torrentType.includes('series');
                                return isSeries;
                            } else {
                                var isMovie = !/(сезон|season|s\d{1,2}|серії|episodes|епізод)/.test(torrentTitle) &&
                                             (torrentType.includes('movie') || torrentType.includes('film') || !torrentType);
                                return isMovie;
                            }
                        });

                        if (LTF_CONFIG.LOGGING_TRACKS) console.log('LTF-LOG', `[${cardId}] Після фільтрації:`, filteredTorrents.length);
                        apiCallback(filteredTorrents.length);
                        
                    } catch (e) {
                        console.error("LTF-LOG", `Помилка парсингу відповіді Jackett для ${cardId}:`, e);
                        apiCallback(0);
                    }
                });
            }

            const titlesToSearch = [normalizedCard.original_title, normalizedCard.title];
            const uniqueTitles = [...new Set(titlesToSearch)].filter(Boolean);
            
            if (LTF_CONFIG.LOGGING_TRACKS) console.log('LTF-LOG', `[${cardId}] Запускаємо пошук за назвами:`, uniqueTitles);
            
            const searchPromises = uniqueTitles.map(title => {
                return new Promise(resolve => {
                    searchJackettApi(title, year, resolve);
                });
            });

            Promise.all(searchPromises).then(results => {
                let maxCount = Math.max(...results);
                if (LTF_CONFIG.LOGGING_TRACKS) console.log('LTF-LOG', `[${cardId}] Максимальна кількість торрентів:`, maxCount);
                callback(maxCount);
                done();
            });
        });
    }

    // ===================== РОБОТА З КЕШЕМ =====================
    function getTracksCache(key) {
        var cache = Lampa.Storage.get(LTF_CONFIG.CACHE_KEY) || {};
        var item = cache[key];
        var isCacheValid = item && (Date.now() - item.timestamp < LTF_CONFIG.CACHE_VALID_TIME_MS);
        return isCacheValid ? item : null;
    }

    function saveTracksCache(key, data) {
        var cache = Lampa.Storage.get(LTF_CONFIG.CACHE_KEY) || {};
        cache[key] = {
            torrent_count: data.torrent_count,
            timestamp: Date.now()
        };
        Lampa.Storage.set(LTF_CONFIG.CACHE_KEY, cache);
    }
    
    // ===================== ОНОВЛЕННЯ ІНТЕРФЕЙСУ =====================
    function updateCardListTracksElement(cardView, torrentCount) {
        const shouldDisplay = shouldDisplayLabel(torrentCount);
        const existingElement = cardView.querySelector('.card__tracks');
        
        if (existingElement) existingElement.remove();
        if (!shouldDisplay) return;
        
        const trackDiv = document.createElement('div');
        trackDiv.className = 'card__tracks';

        // Перевірка позиції рейтингу для сумісності з RatingUp
        const parentCard = cardView.closest('.card');
        if (parentCard) {
            const voteElement = parentCard.querySelector('.card__vote');
            if (voteElement && getComputedStyle(voteElement).top !== 'auto' && parseInt(getComputedStyle(voteElement).top) < 100) {
                trackDiv.classList.add('positioned-below-rating');
            }
        }
        
        // Додаємо кількість торрентів, якщо потрібно (ПЕРЕД прапором)
        if (LTF_CONFIG.SHOW_EXACT_COUNT) {
            const countElement = document.createElement('div');
            countElement.className = 'card__tracks-count';
            countElement.textContent = torrentCount.toString();
            trackDiv.appendChild(countElement);
        }
        
        // Створюємо прапор України як емодзі
        const flagElement = document.createElement('span');
        flagElement.textContent = '🇺🇦'; // Встав сюди емодзі прапора України
        trackDiv.appendChild(flagElement);
        
        cardView.appendChild(trackDiv);
    }

    // ===================== ГОЛОВНИЙ ОБРОБНИК КАРТОК =====================
    function processListCard(cardElement) {
        var cardData = cardElement.card_data;
        var cardView = cardElement.querySelector('.card__view');
        if (!cardData || !cardView) return;

        if (cardElement.hasAttribute('data-ltf-tracks-processed')) return;
        
        var isTvSeries = (getCardType(cardData) === 'tv');
        if (isTvSeries && !LTF_CONFIG.SHOW_TRACKS_FOR_TV_SERIES) return;

        var normalizedCard = {
            id: cardData.id || '',
            title: cardData.title || cardData.name || '',
            original_title: cardData.original_title || cardData.original_name || '',
            type: getCardType(cardData),
            release_date: cardData.release_date || cardData.first_air_date || ''
        };
        
        var cardId = normalizedCard.id;
        var cacheKey = `${LTF_CONFIG.CACHE_VERSION}_${normalizedCard.type}_${cardId}`;
        cardElement.setAttribute('data-ltf-tracks-processed', 'true');

        var cachedData = getTracksCache(cacheKey);
        if (cachedData) {
            updateCardListTracksElement(cardView, cachedData.torrent_count);
            
            if (Date.now() - cachedData.timestamp > LTF_CONFIG.CACHE_REFRESH_THRESHOLD_MS) {
                getTorrentsCount(normalizedCard, cardId, function(torrentCount) {
                    saveTracksCache(cacheKey, { torrent_count: torrentCount });
                    if (document.body.contains(cardElement)) {
                        updateCardListTracksElement(cardView, torrentCount);
                    }
                });
            }
        } else {
            getTorrentsCount(normalizedCard, cardId, function(torrentCount) {
                if (document.body.contains(cardElement)) {
                    saveTracksCache(cacheKey, { torrent_count: torrentCount });
                    updateCardListTracksElement(cardView, torrentCount);
                }
            });
        }
    }
    
    // ===================== ІНІЦІАЛІЗАЦІЯ ПЛАГІНА =====================
    var observerDebounceTimer = null;
    var cardsToProcess = [];

    function debouncedProcessCards() {
        clearTimeout(observerDebounceTimer);
        observerDebounceTimer = setTimeout(function() {
            const batch = [...new Set(cardsToProcess)];
            cardsToProcess = [];
            
            if (LTF_CONFIG.LOGGING_CARDLIST) console.log("LTF-LOG: Обробка пачки з", batch.length, "унікальних карток.");

            batch.forEach(card => {
                if (card.isConnected) {
                    processListCard(card);
                }
            });
        }, 100);
    }
    
    var observer = new MutationObserver(function(mutations) {
        let newCardsFound = false;
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { 
                        if (node.classList && node.classList.contains('card')) {
                            cardsToProcess.push(node);
                            newCardsFound = true;
                        }
                        const nestedCards = node.querySelectorAll('.card');
                        if (nestedCards.length) {
                           nestedCards.forEach(card => cardsToProcess.push(card));
                           newCardsFound = true;
                        }
                    }
                });
            }
        });
        
        if (newCardsFound) {
            debouncedProcessCards();
        }
    });

    function initializeLampaTracksPlugin() {
        if (window.lampaTrackFinderPlugin) return;
        window.lampaTrackFinderPlugin = true;

        var containers = document.querySelectorAll('.cards, .card-list, .content, .main, .cards-list, .preview__list');
        if (containers.length) {
            containers.forEach(container => observer.observe(container, { childList: true, subtree: true }));
        } else {
            observer.observe(document.body, { childList: true, subtree: true });
        }

        if (LTF_CONFIG.LOGGING_GENERAL) console.log("LTF-LOG: Плагін пошуку торрентів успішно ініціалізовано!");
    }

    if (document.body) {
        initializeLampaTracksPlugin();
    } else {
        document.addEventListener('DOMContentLoaded', initializeLampaTracksPlugin);
    }
})();
