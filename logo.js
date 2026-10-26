(function () {
	"use strict";

	if (typeof Lampa === "undefined" || window.logoplugin) return;
	window.logoplugin = true;

	var LOGO_COMPONENT = "logo_settings_nested";
	var STYLE_ID = "logo-plugin-style";

	var CACHE_KEY = "logo_cache_v2";
	var LEGACY_PREFIX = "logo_cache_width_based_v1_";
	var CACHE_MAX = 300;
	var CACHE_TTL = 30 * 24 * 3600 * 1000;
	var CACHE_NONE_TTL = 24 * 3600 * 1000;

	var SAFE_DELAY = 50;
	var FADE_OUT_TEXT = 150;
	var MORPH_HEIGHT = 250;
	var FADE_IN_IMG = 250;

	var memCache = null;

	function cacheLoad() {
		if (memCache) return memCache;
		try {
			var raw = localStorage.getItem(CACHE_KEY);
			memCache = raw ? JSON.parse(raw) : {};
			if (!memCache || typeof memCache !== "object") memCache = {};
		} catch (e) {
			memCache = {};
		}
		return memCache;
	}

	function cacheSave() {
		var c = cacheLoad();
		var keys = Object.keys(c);
		if (keys.length > CACHE_MAX) {
			keys.sort(function (a, b) {
				return (c[a].t || 0) - (c[b].t || 0);
			});
			for (var i = 0; i < keys.length - CACHE_MAX; i++) delete c[keys[i]];
		}
		try {
			localStorage.setItem(CACHE_KEY, JSON.stringify(c));
		} catch (e) {}
	}

	function cacheGet(key) {
		var c = cacheLoad();
		var entry = c[key];
		if (!entry) return null;
		var ttl = entry.u === "none" ? CACHE_NONE_TTL : CACHE_TTL;
		if (Date.now() - (entry.t || 0) > ttl) {
			delete c[key];
			return null;
		}
		return entry.u;
	}

	function cacheSet(key, url) {
		cacheLoad()[key] = { u: url, t: Date.now() };
		cacheSave();
	}

	function cacheDel(key) {
		delete cacheLoad()[key];
		cacheSave();
	}

	function cacheClear() {
		memCache = {};
		try {
			localStorage.removeItem(CACHE_KEY);
			var rm = [];
			for (var i = 0; i < localStorage.length; i++) {
				var k = localStorage.key(i);
				if (k && k.indexOf(LEGACY_PREFIX) === 0) rm.push(k);
			}
			rm.forEach(function (k) {
				localStorage.removeItem(k);
			});
		} catch (e) {}
	}

	function injectStyle() {
		if (document.getElementById(STYLE_ID)) return;
		var st = document.createElement("style");
		st.id = STYLE_ID;
		st.textContent =
			".logo-img{display:block;box-sizing:border-box;margin:0;padding:0 0 .2em;" +
			"width:7em;height:auto;max-width:100%;max-height:none;" +
			"object-fit:contain;object-position:left bottom}" +
			"@media (max-width:767px){" +
			".logo-img{width:100%}" +
			".logo-img--tagline{padding-bottom:.5em}" +
			"}" +
			".logo-img--text{width:auto;max-width:100%}";
		document.head.appendChild(st);
	}

	function animateProperty(el, prop, start, end, duration, unit, cb) {
		var startTime = null;
		function step(ts) {
			if (!startTime) startTime = ts;
			var progress = ts - startTime;
			var percent = Math.min(progress / duration, 1);
			var ease = 1 - Math.pow(1 - percent, 3);
			el.style[prop] = start + (end - start) * ease + unit;
			if (progress < duration) requestAnimationFrame(step);
			else if (cb) cb();
		}
		requestAnimationFrame(step);
	}

	function fade(el, from, to, duration, mode, cb) {
		el.style.transition = "none";
		el.style.opacity = String(from);
		if (mode === "js") {
			animateProperty(el, "opacity", from, to, duration, "", cb);
		} else {
			void el.offsetHeight;
			el.style.transition = "opacity " + duration / 1000 + "s ease";
			el.style.opacity = String(to);
			if (cb) setTimeout(cb, duration);
		}
	}

	function morphHeight(el, from, to, duration, mode, cb) {
		el.style.transition = "none";
		el.style.height = from + "px";
		if (mode === "js") {
			animateProperty(el, "height", from, to, duration, "px", cb);
		} else {
			void el.offsetHeight;
			el.style.transition =
				"height " + duration / 1000 + "s cubic-bezier(0.4, 0, 0.2, 1)";
			el.style.height = to + "px";
			if (cb) setTimeout(cb, duration);
		}
	}

	function inDom(el) {
		return !!el && document.body.contains(el);
	}

	function pickLogo(logos, lang) {
		if (!logos || !logos.length) return null;
		function best(list) {
			list.sort(function (a, b) {
				return (b.vote_average || 0) - (a.vote_average || 0);
			});
			return list[0];
		}
		var byLang = lang
			? logos.filter(function (l) {
					return l.iso_639_1 === lang;
			  })
			: [];
		if (byLang.length) return best(byLang);
		var en = logos.filter(function (l) {
			return l.iso_639_1 === "en";
		});
		if (en.length) return best(en);
		return best(logos.slice());
	}

	function applyLogoClasses(img, hasTagline, textHeight) {
		img.className = "logo-img" + (hasTagline ? " logo-img--tagline" : "");
		if (Lampa.Storage.get("logo_use_text_height", true) && textHeight) {
			img.className += " logo-img--text";
			img.style.height = textHeight + "px";
		}
	}

	function onFull(e) {
		if (e.type !== "complite") return;
		if (String(Lampa.Storage.get("logo_glav", "0")) === "1") return;

		var data = e.data && e.data.movie;
		if (!data || !data.id) return;

		var type = data.name ? "tv" : "movie";
		var render = e.object.activity.render();
		var title_elem = render.find(".full-start-new__title");
		var head_elem = render.find(".full-start-new__head");
		var details_elem = render.find(".full-start-new__details");
		var tagline_elem = render.find(".full-start-new__tagline");
		var has_tagline =
			tagline_elem.length > 0 && tagline_elem.text().trim() !== "";
		var dom_title = title_elem[0];
		if (!dom_title) return;

		var start_text_height = dom_title.getBoundingClientRect().height;

		var user_lang = Lampa.Storage.get("logo_lang", "");
		var target_lang = user_lang || Lampa.Storage.get("language");
		var size = Lampa.Storage.get("logo_size", "w500");
		var mode = Lampa.Storage.get("logo_animation_type", "css") === "js" ? "js" : "css";

		var cache_key = type + "_" + data.id + "_" + target_lang + "_" + size;

		var hideTimer = null;
		var titleHidden = false;

		function showTitle() {
			clearTimeout(hideTimer);
			titleHidden = false;
			title_elem.css({ opacity: "1", transition: "none" });
		}

		function hideTitle(maxMs) {
			titleHidden = true;
			title_elem.css({ opacity: "0", transition: "none" });
			clearTimeout(hideTimer);
			hideTimer = setTimeout(showTitle, maxMs);
		}

		function moveHeadToDetails() {
			if (!head_elem.length || !details_elem.length) return;
			if (details_elem.find(".logo-moved-head").length > 0) return;
			var content = head_elem.html();
			if (!content) return;

			var item = $('<span class="logo-moved-head">' + content + "</span>");
			var sep = $(
				'<span class="full-start-new__split logo-moved-separator">●</span>'
			);
			head_elem.css({ display: "none" });
			if (details_elem.children().length > 0) details_elem.append(sep);
			details_elem.append(item);
		}
		moveHeadToDetails();

		function placeInstant(img) {
			if (!inDom(dom_title)) return;
			applyLogoClasses(img, has_tagline, start_text_height);
			title_elem.empty().append(img);
			showTitle();
		}

		function swapAnimated(img) {
			setTimeout(function () {
				if (!inDom(dom_title)) return;
				var current_h = dom_title.getBoundingClientRect().height;

				fade(dom_title, 1, 0, FADE_OUT_TEXT, mode, function () {
					if (!inDom(dom_title)) return;

					applyLogoClasses(img, has_tagline, current_h);
					img.style.opacity = "0";
					title_elem.empty().append(img);

					dom_title.style.transition = "none";
					dom_title.style.height = "";
					dom_title.style.opacity = "1";
					var target_h = dom_title.getBoundingClientRect().height;

					dom_title.style.display = "block";
					dom_title.style.overflow = "hidden";
					dom_title.style.boxSizing = "border-box";

					morphHeight(dom_title, current_h, target_h, MORPH_HEIGHT, mode);

					setTimeout(function () {
						if (!inDom(img)) return;
						fade(img, 0, 1, FADE_IN_IMG, mode);
					}, Math.max(0, MORPH_HEIGHT - 100));

					setTimeout(function () {
						if (!inDom(dom_title)) return;
						dom_title.style.height = "";
						dom_title.style.overflow = "";
						dom_title.style.display = "";
						dom_title.style.boxSizing = "";
						dom_title.style.transition = "none";
						img.style.opacity = "";
						img.style.transition = "";
					}, MORPH_HEIGHT - 100 + FADE_IN_IMG + 40);
				});
			}, SAFE_DELAY);
		}

		function loadImage(url, onReady, onFail) {
			var img = new Image();
			var fired = false;
			img.onload = function () {
				if (fired) return;
				fired = true;
				onReady(img);
			};
			img.onerror = function () {
				if (fired) return;
				fired = true;
				onFail();
			};
			img.src = url;
			if (!fired && img.complete && img.naturalWidth > 0) {
				fired = true;
				onReady(img);
			}
		}

		function fetchLogo() {
			var langs = [target_lang, "en", "null"].filter(function (l, i, arr) {
				return l && arr.indexOf(l) === i;
			});
			var url = Lampa.TMDB.api(
				type +
					"/" +
					data.id +
					"/images?api_key=" +
					Lampa.TMDB.key() +
					"&include_image_language=" +
					langs.join(",")
			);

			$.ajax({ url: url, dataType: "json", timeout: 8000 })
				.done(function (res) {
					var logo = pickLogo(res && res.logos, target_lang);
					if (!logo || !logo.file_path) {
						cacheSet(cache_key, "none");
						showTitle();
						return;
					}
					var img_url = Lampa.TMDB.image(
						"/t/p/" + size + logo.file_path.replace(/\.svg$/i, ".png")
					);
					loadImage(
						img_url,
						function (img) {
							cacheSet(cache_key, img_url);
							if (titleHidden) placeInstant(img);
							else swapAnimated(img);
						},
						function () {
							cacheSet(cache_key, "none");
							showTitle();
						}
					);
				})
				.fail(function () {
					showTitle();
				});
		}

		var cached = cacheGet(cache_key);
		if (cached === "none") {
			showTitle();
			return;
		}
		if (cached) {
			title_elem.css({ opacity: "0", transition: "none" });
			var placed = false;
			var safety = setTimeout(function () {
				if (!placed) showTitle();
			}, 1500);
			loadImage(
				cached,
				function (img) {
					placed = true;
					clearTimeout(safety);
					placeInstant(img);
				},
				function () {
					clearTimeout(safety);
					cacheDel(cache_key);
					showTitle();
					fetchLogo();
				}
			);
			return;
		}

		hideTitle(4000);
		fetchLogo();
	}

	function registerSettings() {
		Lampa.SettingsApi.addComponent({
			component: LOGO_COMPONENT,
			name: "Логотипи"
		});

		Lampa.Settings.listener.follow("open", function (e) {
			if (e.name !== "main") return;
			var render = Lampa.Settings.main().render();
			var sel = '[data-component="' + LOGO_COMPONENT + '"]';
			if (render.find(sel).length === 0) {
				Lampa.SettingsApi.addComponent({
					component: LOGO_COMPONENT,
					name: "Логотипи"
				});
				Lampa.Settings.main().update();
			}
			render.find(sel).addClass("hide");
		});

		Lampa.SettingsApi.addParam({
			component: "interface",
			param: { name: "logo_settings_entry", type: "static" },
			field: { name: "Логотипи", description: "Налаштування логотипів" },
			onRender: function (item) {
				item.on("hover:enter", function () {
					Lampa.Settings.create(LOGO_COMPONENT);
					try {
						var en = Lampa.Controller.enabled();
						if (en && en.controller) {
							en.controller.back = function () {
								Lampa.Settings.create("interface");
							};
						}
					} catch (err) {}
				});
			}
		});

		Lampa.SettingsApi.addParam({
			component: LOGO_COMPONENT,
			param: { name: "logo_back_to_int", type: "static" },
			field: { name: "Назад", description: "Повернутись в налаштування" },
			onRender: function (item) {
				item.on("hover:enter", function () {
					Lampa.Settings.create("interface");
				});
			}
		});

		Lampa.SettingsApi.addParam({
			component: LOGO_COMPONENT,
			param: {
				name: "logo_glav",
				type: "select",
				values: { 1: "Приховати", 0: "Показати" },
				default: "0"
			},
			field: {
				name: "Лого замість назв",
				description: "Показуємо логотип замість назви фільму"
			}
		});

		Lampa.SettingsApi.addParam({
			component: LOGO_COMPONENT,
			param: {
				name: "logo_lang",
				type: "select",
				values: {
					"": "Як в Lampa",
					en: "English",
					uk: "Українська",
					be: "Беларуская",
					kz: "Қазақша",
					pt: "Português",
					es: "Español",
					fr: "Français",
					de: "Deutsch",
					it: "Italiano"
				},
				default: ""
			},
			field: {
				name: "Мова логотипів",
				description: "Пріоритетна мова пошуку логотипа"
			}
		});

		Lampa.SettingsApi.addParam({
			component: LOGO_COMPONENT,
			param: {
				name: "logo_size",
				type: "select",
				values: {
					w300: "w300",
					w500: "w500",
					w780: "w780",
					original: "Оригінал"
				},
				default: "w500"
			},
			field: {
				name: "Розмір логотипа",
				description: "Роздільна здатність логотипа"
			}
		});

		Lampa.SettingsApi.addParam({
			component: LOGO_COMPONENT,
			param: {
				name: "logo_animation_type",
				type: "select",
				values: { js: "JavaScript", css: "CSS" },
				default: "css"
			},
			field: {
				name: "Тип анімації логотипів",
				description: "Спосіб анімації логотипів"
			}
		});

		Lampa.SettingsApi.addParam({
			component: LOGO_COMPONENT,
			param: { name: "logo_use_text_height", type: "trigger", default: true },
			field: {
				name: "Логотип по висоті текста",
				description: "Розмір логотипа по висоті текста"
			}
		});

		Lampa.SettingsApi.addParam({
			component: LOGO_COMPONENT,
			param: { name: "logo_clear_cache", type: "button" },
			field: {
				name: "Скинути кеш логотипів",
				description: "Натисніть для очистки кеша"
			},
			onChange: function () {
				Lampa.Select.show({
					title: "Скинути кеш?",
					items: [{ title: "Так", confirm: true }, { title: "Ні" }],
					onSelect: function (a) {
						if (a.confirm) {
							cacheClear();
							if (Lampa.Noty && Lampa.Noty.show) Lampa.Noty.show("Кеш логотипів очищено");
						}
						Lampa.Controller.toggle("settings_component");
					},
					onBack: function () {
						Lampa.Controller.toggle("settings_component");
					}
				});
			}
		});
	}

	function applyDefaultsOnce() {
		try {
			if (Lampa.Storage.get("logo_defaults_v2", "") === "done") return;
			Lampa.Storage.set("logo_use_text_height", true);
			Lampa.Storage.set("logo_size", "w500");
			Lampa.Storage.set("logo_defaults_v2", "done");
		} catch (err) {}
	}

	function init() {
		applyDefaultsOnce();
		injectStyle();
		registerSettings();
		Lampa.Listener.follow("full", onFull);
	}

	if (window.appready) init();
	else
		Lampa.Listener.follow("app", function (e) {
			if (e.type === "ready") init();
		});
})();
