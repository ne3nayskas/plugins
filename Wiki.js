(function () {
    'use strict';

    function WikiDualPlugin() {
        var ICON_WIKI = 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Wikipedia-logo-v2-en.svg';
        
        this.init = function () {
            var self = this;
            Lampa.Listener.follow('full', function (e) {
                if (e.type === 'complite') {
                    self.process(e.data.movie, e.object.activity.render());
                }
            });
        };

        this.process = function (movie, render) {
            if (!movie) return;
            $('.surs_wiki_row', render).remove();

            var row = $('<div class="surs_wiki_row" style="width: 100%; display: block; margin: 0.4em 0; clear: both;"></div>');
            var studioBox = $('<div class="wiki_studio_info" style="margin-bottom: 8px; font-size: 1.2em; color: #fff; opacity: 0.9;"></div>');
            studioBox.html('<span>Студія: <span class="studio_list">Пошук...</span></span>');
            
            var box = $('<div class="surs_wiki_box" style="display: inline-flex; align-items: center; background: rgba(255, 255, 255, 0.08); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.1); font-size: 1.2em; color: #fff; cursor: pointer;"></div>');
            box.html('<img src="' + ICON_WIKI + '" style="width: 1.4em; height: 1.4em; margin-right: 8px; filter: invert(1);"> <span class="wiki_text">Читати на Wiki</span>');
            
            row.append(studioBox);
            row.append(box);

            this.injectToUI(row, render);
            this.searchSmartWiki(movie, box, studioBox);
        };

        this.injectToUI = function (row, render) {
            var slogan = $('.full-start__slogan', render);
            var ratings = $('.full-start-new__rate-line', render);
            if (slogan.length) slogan.after(row);
            else if (ratings.length) ratings.before(row);
            else $('.full-start__info', render).prepend(row);
        };

        // Функція для відкриття модального вікна (як у вашому другому прикладі)
        this.openWikiModal = function (url, title) {
            var enabled = Lampa.Controller.enabled().name;
            
            // Створюємо контент для модального вікна (iframe для перегляду Wiki)
            var html = $('<div class="wiki_modal_content" style="height: 100%; min-height: 500px;">' +
                '<iframe src="' + url + '" style="width: 100%; height: 500px; border: none; border-radius: 8px; background: #fff;"></iframe>' +
            '</div>');

            Lampa.Modal.open({
                title: title,
                html: html,
                size: 'large',
                nopadding: false,
                onBack: function() {
                    Lampa.Modal.close();
                    Lampa.Controller.toggle(enabled);
                }
            });

            Lampa.Modal.scroll().render(true).addClass('scroll--nopadding');
        };

        this.searchSmartWiki = function (movie, box, studioBox) {
            var self = this;
            var wikiText = box.find('.wiki_text');
            var studioList = studioBox.find('.studio_list');
            
            var titleEN = movie.original_title || movie.original_name;
            var year = (movie.release_date || movie.first_air_date || '').substring(0, 4);

            $.ajax({
                url: 'https://en.wikipedia.org/w/api.php',
                data: {
                    action: 'query',
                    list: 'search',
                    srsearch: titleEN + ' ' + year + ' film',
                    format: 'json',
                    origin: '*'
                },
                dataType: 'json',
                success: function(resEN) {
                    var pageEN = resEN.query && resEN.query.search && resEN.query.search[0] ? resEN.query.search[0] : null;

                    if (pageEN) {
                        $.ajax({
                            url: 'https://en.wikipedia.org/w/api.php',
                            data: {
                                action: 'query',
                                prop: 'langlinks',
                                lllang: 'uk',
                                pageids: pageEN.pageid,
                                format: 'json',
                                origin: '*'
                            },
                            dataType: 'json',
                            success: function(details) {
                                var pageData = details.query.pages[pageEN.pageid];
                                var uaLink = (pageData.langlinks && pageData.langlinks[0]) ? pageData.langlinks[0]['*'] : null;
                                
                                var langLabel = uaLink ? '(UA)' : '(EN)';
                                wikiText.text('Читати на Wiki ' + langLabel);

                                // Натискання тепер викликає Modal
                                box.unbind('click').on('click', function() {
                                    var url = uaLink 
                                        ? 'https://uk.m.wikipedia.org/wiki/' + encodeURIComponent(uaLink) 
                                        : 'https://en.m.wikipedia.org/?curid=' + pageEN.pageid;
                                    
                                    // Використовуємо мобільну версію (m.wikipedia.org) для кращого відображення в модалці
                                    self.openWikiModal(url, movie.title || movie.name);
                                });

                                // Отримання студії
                                $.ajax({
                                    url: 'https://en.wikipedia.org/w/api.php',
                                    data: {
                                        action: 'parse',
                                        pageid: pageEN.pageid,
                                        prop: 'text',
                                        section: 0,
                                        format: 'json',
                                        origin: '*'
                                    },
                                    dataType: 'json',
                                    success: function(data) {
                                        if (data.parse && data.parse.text) {
                                            var html = data.parse.text['*'];
                                            var tempDiv = document.createElement('div');
                                            tempDiv.innerHTML = html;
                                            var company = "";
                                            var rows = tempDiv.querySelectorAll('.infobox tr');
                                            
                                            for (var i = 0; i < rows.length; i++) {
                                                var label = rows[i].querySelector('.infobox-label');
                                                if (label) {
                                                    var labelText = label.innerText.toLowerCase();
                                                    if (labelText.indexOf('production') > -1 || labelText.indexOf('company') > -1) {
                                                        var dataCell = rows[i].querySelector('.infobox-data');
                                                        if (dataCell && !company) {
                                                            company = dataCell.innerText.replace(/\[\d+\]/g, '').trim();
                                                        }
                                                    }
                                                }
                                            }

                                            var studioName = company ?
                                                company.split(/\n|,/).map(function(s) { return s.trim(); }).filter(Boolean).join(', ') : 'Не вказано';
                                            studioList.text(studioName);
                                        }
                                    }
                                });
                            }
                        });
                    } else {
                        studioList.text('Не знайдено');
                        wikiText.text('Wiki: Не знайдено');
                    }
                },
                error: function() {
                    studioList.text('Помилка запиту');
                    wikiText.text('Wiki: Помилка');
                }
            });
        };
    }

    if (window.Lampa) {
        new WikiDualPlugin().init();
    } else {
        $(document).on('lampa:ready', function() { 
            new WikiDualPlugin().init(); 
        });
    }
})();
