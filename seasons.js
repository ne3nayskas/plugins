(function () {  
    'use strict';  
  
    if (window.SeasonBadgePlugin && window.SeasonBadgePlugin.__initialized) return;  
  
    window.SeasonBadgePlugin = window.SeasonBadgePlugin || {};  
    window.SeasonBadgePlugin.__initialized = true;  
  
    var CONFIG = {  
        tmdbApiKey: '3baac7c58b4daea1999d615c5d12b226',  
        cacheTime: 24 * 60 * 60 * 1000,  
        processedCacheTime: 7 * 24 * 60 * 60 * 1000,  
        updateCheckTime: 12 * 60 * 60 * 1000,  
        enabled: true,  
        language: 'uk',  
        maxConcurrentRequests: 2,  
        requestDelay: 200,  
        batchSize: 10  
    };  
  
    var style = document.createElement('style');  
    style.textContent = `  
    .card--season-complete,   
    .card--season-progress {  
        position: absolute;  
        right: 0;  
        top: 0;  
        z-index: 12;  
        display: inline-block;  
        height: auto;  
        background: rgba(0,0,0,0.5);  
        border-radius: 0 0.8em 0 0.8em;  
        overflow: hidden;  
        opacity: 0;  
        transition: opacity 0.22s ease-in-out;  
        pointer-events: auto;  
        box-sizing: border-box;  
    }  
    .card--season-complete > div,   
    .card--season-progress > div {  
        text-transform: uppercase;  
        font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;  
        font-weight: 700;  
        padding: 0.3em 0.6em;  
        white-space: nowrap;  
        display: flex;  
        align-items: center;  
        justify-content: flex-start;  
        gap: 4px;  
        text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.25);  
        line-height: 1;  
        overflow: hidden;  
        text-overflow: ellipsis;  
    }  
    .card--season-complete > div {  
        color: #4CAF50;  
    }  
    .card--season-progress > div {  
        color: #FFC107;  
    }  
    .card--season-complete.show,   
    .card--season-progress.show {  
        opacity: 1;  
    }  
    @media (max-width: 1024px) {  
        .card--season-complete > div,   
        .card--season-progress > div {  
            padding: 0.25em 0.5em;  
        }  
    }  
    @media (max-width: 480px) {  
        .card--season-complete > div,   
        .card--season-progress > div {  
            padding: 0.2em 0.4em;  
        }  
    }  
    `;  
    document.head.appendChild(style);  
  
    function getMediaType(cardData) {  
        if (!cardData) return 'unknown';  
        if (cardData.name || cardData.first_air_date) return 'tv';  
        if (cardData.title || cardData.release_date) return 'movie';  
        return 'unknown';  
    }  
  
    var cache = Lampa.Storage.cache('seasonBadgeCache', 500, {});  
    var processedCards = Lampa.Storage.cache('seasonBadgeProcessed', 1000, {});  
    var requestQueue = [];  
    var activeRequests = 0;  
    var processing = false;  
  
    function needsUpdate(cardId) {  
        var processed = processedCards[cardId];  
        if (!processed) return true;  
        var timeSinceUpdate = Date.now() - (processed.timestamp || 0);  
        return timeSinceUpdate > CONFIG.updateCheckTime;  
    }  
  
    function fetchSeriesData(tmdbId, forceUpdate) {  
        return new Promise(function(resolve, reject) {  
            if (!forceUpdate && cache[tmdbId] && (Date.now() - cache[tmdbId].timestamp < CONFIG.cacheTime)) {  
                return resolve(cache[tmdbId].data);  
            }  
  
            if (!CONFIG.tmdbApiKey || CONFIG.tmdbApiKey === 'ваш_tmdb_api_key_тут') {  
                return reject(new Error('Будь ласка, вставте коректний TMDB API ключ'));  
            }  
  
            requestQueue.push({  
                tmdbId: tmdbId,  
                resolve: resolve,  
                reject: reject  
            });  
  
            if (!processing) {  
                processQueue();  
            }  
        });  
    }  
  
    function processQueue() {  
        if (requestQueue.length === 0 || activeRequests >= CONFIG.maxConcurrentRequests) {  
            processing = false;  
            return;  
        }  
  
        processing = true;  
  
        var nextRequest = requestQueue.shift();  
        if (!nextRequest) {  
            processing = false;  
            return;  
        }  
  
        activeRequests++;  
  
        var url = 'https://api.themoviedb.org/3/tv/' + nextRequest.tmdbId + '?api_key=' + CONFIG.tmdbApiKey + '&language=' + CONFIG.language;  
  
        fetch(url)  
            .then(function(response) { return response.json(); })  
            .then(function(data) {  
                if (data.success === false) throw new Error(data.status_message);  
  
                cache[nextRequest.tmdbId] = {  
                    data: data,  
                    timestamp: Date.now()  
                };  
  
                Lampa.Storage.set('seasonBadgeCache', cache);  
                nextRequest.resolve(data);  
            })  
            .catch(nextRequest.reject)  
            .finally(function() {  
                activeRequests--;  
                setTimeout(processQueue, CONFIG.requestDelay);  
            });  
    }  
  
    function getSeasonProgress(tmdbData) {  
        if (!tmdbData || !tmdbData.seasons || !tmdbData.last_episode_to_air)  
            return false;  
  
        var lastEpisode = tmdbData.last_episode_to_air;  
        var currentSeason = tmdbData.seasons.find(function(s) {  
            return s.season_number === lastEpisode.season_number && s.season_number > 0;  
        });  
  
        if (!currentSeason) return false;  
  
        var totalEpisodes = currentSeason.episode_count || 0;  
        var airedEpisodes = lastEpisode.episode_number || 0;  
  
        return {  
            seasonNumber: lastEpisode.season_number,  
            airedEpisodes: airedEpisodes,  
            totalEpisodes: totalEpisodes,  
            isComplete: airedEpisodes >= totalEpisodes  
        };  
    }  
  
    function createBadge(content, isComplete, loading) {  
        var badge = document.createElement('div');  
        var badgeClass = isComplete ? 'card--season-complete' : 'card--season-progress';  
        badge.className = badgeClass + (loading ? ' loading' : '');  
        badge.innerHTML = '<div>' + content + '</div>';  
        return badge;  
    }  
  
    function addSeasonBadge(cardEl) {  
        if (!cardEl) return;  
  
        if (!cardEl.card_data) {  
            if (!cardEl._seasonBadgeListenerAdded) {  
                cardEl._seasonBadgeListenerAdded = true;  
                cardEl.addEventListener('visible', function() {  
                    addSeasonBadge(cardEl);  
                }, { once: true });  
            }  
            return;  
        }  
  
        var data = cardEl.card_data;  
        var cardId = data.id;  
  
        if (getMediaType(data) !== 'tv') {  
            return;  
        }  
  
        var view = cardEl._cachedView || (cardEl._cachedView = cardEl.querySelector('.card__view'));  
        if (!view) return;  
  
        var oldBadges = view.querySelectorAll('.card--season-complete, .card--season-progress');  
        oldBadges.forEach(function(badge) {  
            badge.remove();  
        });  
  
        var processed = processedCards[cardId];  
        var shouldUpdate = needsUpdate(cardId);  
  
        if (processed && !shouldUpdate && cache[cardId]) {  
            var badge = createBadge('...', false, false);  
            view.appendChild(badge);  
            updateBadgeWithData(cardEl, badge, cache[cardId].data, false);  
            return;  
        }  
  
        var badge = createBadge('...', false, true);  
        view.appendChild(badge);  
  
        if ('requestIdleCallback' in window) {  
            requestIdleCallback(function() {  
                fetchSeriesData(cardId, shouldUpdate)  
                    .then(function(tmdbData) {  
                        updateBadgeWithData(cardEl, badge, tmdbData, true);  
                    })  
                    .catch(function(error) {  
                        handleBadgeError(cardEl, badge, error);  
                    });  
            }, { timeout: 1000 });  
        } else {  
            setTimeout(function() {  
                fetchSeriesData(cardId, shouldUpdate)  
                    .then(function(tmdbData) {  
                        updateBadgeWithData(cardEl, badge, tmdbData, true);  
                    })  
                    .catch(function(error) {  
                        handleBadgeError(cardEl, badge, error);  
                    });  
            }, 50);  
        }  
    }  
  
    function updateBadgeWithData(cardEl, badge, tmdbData, saveToCache) {  
        var progressInfo = getSeasonProgress(tmdbData);  
  
        if (progressInfo) {  
            var content = '';  
            var isComplete = progressInfo.isComplete;  
  
            if (isComplete) {  
                content = 'S' + progressInfo.seasonNumber + ' ✓';  
            } else {  
                content = 'S' + progressInfo.seasonNumber + ' ' + progressInfo.airedEpisodes + '/' + progressInfo.totalEpisodes;  
            }  
  
            badge.className = isComplete ? 'card--season-complete' : 'card--season-progress';  
            badge.innerHTML = '<div>' + content + '</div>';  
  
            requestAnimationFrame(function() {  
                badge.classList.add('show');  
            });  
  
            if (saveToCache && cardEl.card_data) {  
                processedCards[cardEl.card_data.id] = {  
                    status: isComplete ? 'complete' : 'in-progress',  
                    timestamp: Date.now(),  
                    seasonNumber: progressInfo.seasonNumber,  
                    airedEpisodes: progressInfo.airedEpisodes,  
                    totalEpisodes: progressInfo.totalEpisodes  
                };  
                Lampa.Storage.set('seasonBadgeProcessed', processedCards);  
            }  
        } else {  
            badge.remove();  
              
            if (saveToCache && cardEl.card_data) {  
                processedCards[cardEl.card_data.id] = {  
                    status: 'error',  
                    timestamp: Date.now()  
                };  
                Lampa.Storage.set('seasonBadgeProcessed', processedCards);  
            }  
        }  
    }  
  
    function handleBadgeError(cardEl, badge, error) {  
        console.log('SeasonBadgePlugin помилка:', error.message);  
        badge.remove();  
          
        if (cardEl.card_data) {  
            processedCards[cardEl.card_data.id] = {  
                status: 'error',  
                timestamp: Date.now()  
            };  
            Lampa.Storage.set('seasonBadgeProcessed', processedCards);  
        }  
    }  
  
    function processCardsInBatches(cards) {  
        var batch = cards.slice(0, CONFIG.batchSize);  
        var remaining = cards.slice(CONFIG.batchSize);  
  
        batch.forEach(function(card) {  
            requestAnimationFrame(function() {  
                if (card.isConnected) {  
                    addSeasonBadge(card);  
                }  
            });  
        });  
  
        if (remaining.length > 0) {  
            requestIdleCallback(function() {  
                processCardsInBatches(remaining);  
            }, { timeout: 1000 });  
        }  
    }  
  
    function scanAndProcessCards() {  
        var cards = document.querySelectorAll('.card');  
        if (cards.length > 0) processCardsInBatches(Array.from(cards));  
    }  
  
    function initPlugin() {  
        if (!CONFIG.enabled) return;  
  
        scanAndProcessCards();  
  
        if (typeof MutationObserver !== 'undefined') {  
            var observer = new MutationObserver(function(mutations) {  
                var hasNewCards = mutations.some(function(m) {  
                    return Array.from(m.addedNodes).some(function(node) {  
                        return node.classList && node.classList.contains('card');  
                    });  
                });  
                  
                if (hasNewCards) {  
                    if ('requestIdleCallback' in window) {  
                        requestIdleCallback(function() {  
                            scanAndProcessCards();  
                        }, { timeout: 2000 });  
                    } else {  
                        setTimeout(scanAndProcessCards, 100);  
                    }  
                }  
            });  
  
            observer.observe(document.body, {  
                childList: true,  
                subtree: true  
            });  
        }  
    }  
  
    if (window.appready) {  
        initPlugin();  
    } else if (window.Lampa && Lampa.Listener) {  
        Lampa.Listener.follow('app', function(e) {  
            if (e.type === 'ready') initPlugin();  
        });  
    } else {  
        if ('requestIdleCallback' in window) {  
            requestIdleCallback(initPlugin, { timeout: 3000 });  
        } else {  
            setTimeout(initPlugin, 3000);  
        }  
    }  
})();
