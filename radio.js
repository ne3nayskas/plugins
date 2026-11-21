// =========================================
// Радіо для Lampa
// Версія: 1.16.2 | 2026.11.21
// Опис: Плагін для прослуховування ~ 100+ радіостанцій
// Aвтор - @ne3nayskas 
// Зміни 1.6.0: свайпи та кнопки ⏮ / ⏭ у вікні відтворення (мобільні)
// Зміни 1.6.1: оптимізація продуктивності, виправлено подвійний запуск потоку
// Зміни 1.6.2: після виходу з плеєра список прокручується до станції, що грає
// Зміни 1.7.0: логотипи станцій беруться з logos/<id>.webp у репозиторії (jsDelivr)
// Зміни 1.8.0: перемикач вигляду список / плитки; фоновий список прокручується за станцією, що грає
// Зміни 1.8.1: плитки: більші проміжки, тонка рамка фокуса замість білої картки (ТВ)
// Зміни 1.8.2: плитки для ТВ: 5–6 колонок, набагато більші проміжки, крупніші назви
// Зміни 1.8.3: розмір назв у плитках винесено в налаштування TILE_TITLE_FONT на початку файлу; новий синьо-жовтий логотип у меню
// Зміни 1.9.0: новий синьо-жовтий логотип у меню
// Зміни 1.9.1: у плеєрі показується поточна композиція (ICY-метадані, laut.fm, SomaFM); жвавіші хвилі з налаштуванням VIZ_SENSITIVITY; виправлено відступи та висоту смужок
// Зміни 1.9.2: назва треку — кольорова (градієнт) з ♪ і біжить стрічкою, якщо довга; нові станції laut.fm
// Зміни 1.9.3: назва треку для станцій на myradio24 (через status.json); значок ♪ з обох боків назви
// Зміни 1.9.4: назва треку для Radio ROKS, ROKS Український Рок, New Rock, Ballads та Hard & Heavy (o.tavr.media)
// Зміни 1.9.5: назва треку для Kiss FM, Hit FM, Наше Радіо, Relax, Jazz, Мелодія (o.tavr.media)
// Зміни 1.10.0: РЕЛІЗ — у плеєрі виконавець і трек для ~30 станцій (ICY-метадані, laut.fm, SomaFM, myradio24, o.tavr.media)
// Зміни 1.10.1: назва треку для Radio Bayraktar (o.tavr.media/bayraktar)
// Зміни 1.10.2: якщо трек невідомий — у стрічці показується слоган станції (tooltip) в такому ж оформленні; трек має пріоритет
// Зміни 1.11.0: один рядок на місці слогана: «♪ трек ♪ слоган ♪» (немає треку — «♪ слоган ♪»), біжить, якщо не вміщається
// Зміни 1.11.1: стабільніший старт потоку: затримка 250 мс при швидких перемиканнях, перепідключення через 8 с, ICY-запит лише після старту звуку, коректне переривання завантаження
// Зміни 1.11.2: еквалайзер і підсвітка станції, що грає, замість зеленого — кольори стрічки (синя та жовта половини) (налаштування EQ_COLOR_FROM / EQ_COLOR_TO / PLAYING_TEXT_COLOR)
// Зміни 1.11.3: назви треків для URC Radio US, 4 Ever Floyd, STUD RADIO
// Зміни 1.12.0: +24 станції TAVR (Hit, Roks, Kiss, Relax, Мелодія, Наше Радіо, Jazz, Гуляй, Gold, Music, Italiana, Ritmo Latino, Flash, Black, K-POP) з назвами треків; Classic Radio і Radio Indie UA тепер теж із треком
// Зміни 1.13.0: назви треків для всіх 28 каналів FluxFM (API fluxmusic.api.radiosphere.io)
// Зміни 1.13.1: швидший повтор підключення для cast.mediaonline.net.ua (Прямий FM, Avtoradio, NRJ): 3.5 с замість 8 с, до 3 повторів, повтор одразу після помилки
// Зміни 1.13.2: нова станція Magic Radio (Київ 93.8 FM) з назвами треків через status-json.xsl
// Зміни 1.13.3: cast.mediaonline.net.ua — повтор за 5 с (було 3.5 с); DEBUG_START показує час старту потоку
// Зміни 1.14.0: новий вигляд «лише логотипи» (без назв, щільніша сітка); кнопка вигляду перемикає список → плитки → логотипи
// Зміни 1.15.0: смужка «Зараз грає» в шапці (логотип, станція, трек); обрані станції першими (FAV_FIRST); на телефоні перший запуск — логотипи
// Зміни 1.15.1: смужка «Зараз грає» схована на мобільних; фон змінюється м'якше (BG_DELAY); «вгору» з першого ряду спершу веде на кнопки шапки плагіна
// Зміни 1.15.2: повернення з плеєра не смикає список (без прокрутки, якщо станцію видно); поява плиток без зсуву
// Зміни 1.15.3: у фокусі збільшення логотипа і тонка біла рамка (без анімацій); у режимі логотипів без підписів
// Зміни 1.15.4: ряди не зсуваються при навігації та після виходу з плеєра (прокрутка лише коли елемент поза видимою зоною); прибрано DEBUG_START і швидкі повтори для cast.mediaonline.net.ua
// Зміни 1.16.0: «Обране» одразу працює після додавання станції (меню каталогу збирається при відкритті); сердечко обраного — синьо-жовте з тонкою окантовкою; прибрано ручне додавання станцій; «вниз» з кнопок шапки веде на найближчу станцію
// Зміни 1.16.1: смужка «Зараз грає» оновлює трек і коли плеєр закритий (фонове опитування); трек в один рядок із стрічкою, як у плеєрі, більший шрифт
// Зміни 1.16.2: смужка «Зараз грає»: є трек — лише виконавець і назва, немає — лише слоган; білий текст без ♪ і без затемнення зліва
// =========================================

(function () {
  'use strict';

  // ===== НАЛАШТУВАННЯ =====
  // Розмір назв станцій у плитках (на всіх екранах). Порожній рядок '' = розміри за замовчуванням
  var TILE_TITLE_FONT = '1.5em';
  // Чутливість хвиль у плеєрі: 1 = спокійно, 2 = жваво, 3 = дуже різко
  var VIZ_SENSITIVITY = 1.5;
  // Кольори рядка з назвою треку: текст і значок ♪, та швидкість стрічки, пікселів/с
  var TRACK_COLOR_TEXT = '#4da3ff';
  var TRACK_COLOR_NOTE = '#ffd700';
  var TRACK_SCROLL_SPEED = 40;
  // Еквалайзер (перша половина смужок — EQ_COLOR_FROM, друга — EQ_COLOR_TO) і підсвітка станції, що грає: за замовчуванням кольори стрічки
  var EQ_COLOR_FROM = TRACK_COLOR_TEXT;
  var EQ_COLOR_TO = TRACK_COLOR_NOTE;
  var PLAYING_TEXT_COLOR = TRACK_COLOR_TEXT;
  // ========================

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  // =========================================
  // СТАТИЧНИЙ СПИСОК УКРАЇНСЬКИХ СТАНЦІЙ
  // =========================================
  
  // Логотипи станцій: файли logos/<id>.webp у GitHub-репозиторії (через jsDelivr).
  // jsDelivr кешує гілку main на кілька годин; для миттєвих оновлень можна вказати
  // тег релізу замість main, напр. @v1.7.0.
  var LOGO_BASE = 'https://cdn.jsdelivr.net/gh/ne3nayskas/plugins@main/logos/';
  var LOGO_EXT = '.webp';

  function logoUrl(id) {
    return LOGO_BASE + id + LOGO_EXT;
  }

  var UKRAINIAN_STATIONS = [
    {
      id: 'replaynews',
      title: 'Replay News UA',
      tooltip: 'Новини кожні п’ять хвилин 24/7',
      stream: 'https://replaynewsuk.ice.infomaniak.ch/replaynewsuk-128.mp3',
      genre: [{ id: 'news', name: 'Новини' }]
    },
    {
      id: 'replaynewsen',
      title: 'Replay News EN',
      tooltip: 'News every five minutes, 24/7',
      stream: 'https://replaynewsen.ice.infomaniak.ch/replaynewsen-128.mp3',
      genre: [{ id: 'news', name: 'Новини' }]
    },
    {
      id: 'ukrpisnia',
      title: 'Українська пісня',
      tooltip: 'Радіо пісенної класики України',
      stream: 'https://listen6.myradio24.com/50904',
      genre: [{ id: 'ukr', name: 'Українське' }]
    },
    {
      id: 'ukrradio',
      title: 'Українське Радіо',
      tooltip: 'UR1 Українське Радіо',
      stream: 'https://radio2.ukr.radio/ur1-mp3-m',
      genre: [{ id: 'news', name: 'Новини' }]
    },
    {
      id: 'radiopromin',
      title: 'Радіо Промінь',
      tooltip: 'UR2 Радіо Промінь',
      stream: 'https://radio2.ukr.radio/ur2-mp3-m',
      genre: [{ id: 'ukr', name: 'Українське' }]
    },
    {
      id: 'radioculture',
      title: 'Радіо Культура',
      tooltip: 'UR3 Радіо Культура',
      stream: 'https://radio2.ukr.radio/ur3-mp3-m',
      genre: [{ id: 'culture', name: 'Культура' }]
    },
    {
      id: 'edyninovyny',
      title: 'Єдині Новини',
      tooltip: 'Телемарафон',
      stream: 'https://online-news.radioplayer.ua/RadioNews',
      genre: [{ id: 'news', name: 'Новини' }]
    },
    {
      id: 'nv',
      title: 'Radio NV',
      tooltip: '96.0 Київ - Аналітика і новини',
      stream: 'https://online-radio.nv.ua/radionv.mp3',
      genre: [{ id: 'news', name: 'Новини' }]
    },
    {
      id: 'lvivfm',
      title: 'Львівська Хвиля',
      tooltip: '100.8 FM',
      stream: 'https://onair.lviv.fm/lviv.fm.hd',
      genre: [{ id: 'ukr', name: 'Українське' }]
    },
    {
      id: 'radiobayraktar',
      title: 'Radio Bayraktar',
      tooltip: 'Музика української перемоги',
      stream: 'https://tavr.tvstitch.com/RadioBayraktar',
      genre: [{ id: 'ukr', name: 'Українське' }]
    },
    {
      id: 'radioroks',
      title: 'Radio ROKS',
      tooltip: 'Рок. Тільки рок.',
      stream: 'https://online.radioroks.ua/RadioROKS',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'radioroks_ukr',
      title: 'Radio ROKS Український Рок',
      tooltip: 'Український Рок',
      stream: 'https://online.radioroks.ua/RadioROKS_Ukr',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'radioroks_newrock',
      title: 'Radio ROKS New Rock',
      tooltip: 'New Rock',
      stream: 'https://online.radioroks.ua/RadioROKS_NewRock',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'radioroks_classic',
      title: 'Radio ROKS Classic Rock',
      tooltip: 'Класичний рок',
      stream: 'https://tavr.tvstitch.com/RadioROKS_ClassicRock',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'radioroks_heavy',
      title: 'Radio ROKS Hard & Heavy',
      tooltip: 'Hard & Heavy',
      stream: 'https://online.radioroks.ua/RadioROKS_HardnHeavy',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'radioroks_ballads',
      title: 'Radio ROKS Ballads',
      tooltip: 'Ballads',
      stream: 'https://online.radioroks.ua/RadioROKS_Ballads',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'rock_radio_ua',
      title: 'Рок Радіо UA',
      tooltip: 'Територія українського року.',
      stream: 'https://rockradioua.online:8433/rock_256',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'rock_radio_metal',
      title: 'Рок Радіо Metal',
      tooltip: 'Територія українського металу.',
      stream: 'https://rockradioua.online:8433/metal_320',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'kissfm',
      title: 'Kiss FM',
      tooltip: 'The Best Dance Radio',
      stream: 'https://online.kissfm.ua/KissFM',
      genre: [{ id: 'dance', name: 'Dance' }]
    },
    {
      id: 'kissfm_ukraine',
      title: 'Kiss FM (Україна)',
      tooltip: 'Тільки український Dance',
      stream: 'https://online.kissfm.ua/KissFM_Ukr',
      genre: [{ id: 'dance', name: 'Dance' }]
    },
    {
      id: 'kissfm_deep',
      title: 'Kiss FM Deep',
      tooltip: 'Deep',
      stream: 'https://tavr.tvstitch.com/KissFM_Deep',
      genre: [{ id: 'dance', name: 'Dance' }]
    },
    {
      id: 'kissfm_digital',
      title: 'Kiss FM Digital',
      tooltip: 'Digital',
      stream: 'https://tavr.tvstitch.com/KissFM_Digital',
      genre: [{ id: 'dance', name: 'Dance' }]
    },
    {
      id: 'nostalgie',
      title: 'Nostalgie Україна',
      tooltip: 'Скоро перемога! Радіо Ностальжі Україна',
      stream: 'https://lux.radio.tvstitch.com/kyiv/nst_adv_hd',
      genre: [{ id: 'nst', name: 'Nostalgie' }]
    },
    {
      id: 'magicradio',
      title: 'Magic Radio',
      tooltip: 'Magic. I feel good.',
      stream: 'https://cast.brg.ua/business_main_public_mp3_hq',
      genre: [{ id: 'pop', name: 'Pop' }]
    },
    {
      id: '109fm',
      title: '109 FM Ukraine',
      tooltip: 'Stand With Ukraine',
      stream: 'http://solid48.streamupsolutions.com:8077/109fm_live',
      genre: [{ id: 'ukr', name: 'Українське' }]
    },
    {
      id: 'urcradio',
      title: 'URC Radio US',
      tooltip: 'Інноваційне медіа, яке об’єднує українців',
      stream: 'https://streamer.radio.co/sdff2fd6a8/listen',
      genre: [{ id: 'ukr', name: 'Українське' }]
    },
    {
      id: 'luxfm',
      title: 'Lux FM',
      tooltip: 'Включай настрій!',
      stream: 'https://lux.radio.tvstitch.com/rock-24-sd?npa=1',
      genre: [{ id: 'pop', name: 'Pop' }]
    },
    {
      id: 'radioindie',
      title: 'Radio Indie UA',
      tooltip: 'Незалежна музика',
      stream: 'https://online.radioplayer.ua/RadioIndieUA',
      genre: [{ id: 'indie', name: 'Indie' }]
    },
    {
      id: 'melodiafm',
      title: 'Мелодія FM',
      tooltip: 'Найкращі хіти 90-х і 2000-х!',
      stream: 'https://tavr.tvstitch.com/MelodiaFM',
      genre: [{ id: 'nst', name: 'Nostalgie' }]
    },
    {
      id: 'melodiafm_int',
      title: 'Мелодія FM International',
      tooltip: 'Міжнародні хіти',
      stream: 'https://tavr.tvstitch.com/MelodiaFM_Int',
      genre: [{ id: 'nst', name: 'Nostalgie' }]
    },
    {
      id: 'melodiafm_disco',
      title: 'Мелодія FM Disco',
      tooltip: 'Диско',
      stream: 'https://tavr.tvstitch.com/MelodiaFM_Disco',
      genre: [{ id: 'nst', name: 'Nostalgie' }]
    },
    {
      id: 'melodiafm_romantic',
      title: 'Мелодія FM Romantic',
      tooltip: 'Романтичні хіти',
      stream: 'https://tavr.tvstitch.com/MelodiaFM_Romantic',
      genre: [{ id: 'nst', name: 'Nostalgie' }]
    },
    {
      id: 'hitfm',
      title: 'Хіт FM',
      tooltip: 'Найкращі хіти',
      stream: 'https://online.hitfm.ua/HitFM',
      genre: [{ id: 'pop', name: 'Pop' }]
    },
    {
      id: 'hitfm_ukr',
      title: 'Хіт FM Українські Хіти',
      tooltip: 'Тільки українські хіти',
      stream: 'https://online.hitfm.ua/HitFM_Ukr',
      genre: [{ id: 'pop', name: 'Pop' }]
    },
    {
      id: 'hitfm_best',
      title: 'Хіт FM Найбільші хіти',
      tooltip: 'Найбільші хіти',
      stream: 'https://tavr.tvstitch.com/HitFM_Best',
      genre: [{ id: 'pop', name: 'Pop' }]
    },
    {
      id: 'hitfm_top',
      title: 'Хіт FM Сучасні хіти',
      tooltip: 'Сучасні хіти',
      stream: 'https://tavr.tvstitch.com/HitFM_Top',
      genre: [{ id: 'pop', name: 'Pop' }]
    },
    {
      id: 'nasheradio',
      title: 'Наше Радіо',
      tooltip: 'Все буде добре',
      stream: 'https://online.nasheradio.ua/NasheRadio',
      genre: [{ id: 'pop', name: 'Pop' }]
    },
    {
      id: 'nasheradio_ukr',
      title: 'Наше Радіо UkrTOP100',
      tooltip: 'Укр ТОП 100',
      stream: 'https://online.nasheradio.ua/NasheRadio_Ukr',
      genre: [{ id: 'pop', name: 'Pop' }]
    },
    {
      id: 'radiorelax',
      title: 'Radio Relax',
      tooltip: 'Музика для відпочинку',
      stream: 'https://online.radiorelax.ua/RadioRelax',
      genre: [{ id: 'relax', name: 'Relax' }]
    },
    {
      id: 'radiorelax_ukr',
      title: 'Radio Relax Українською',
      tooltip: 'Релакс українською',
      stream: 'https://tavr.tvstitch.com/RadioRelax_Ukr',
      genre: [{ id: 'relax', name: 'Relax' }]
    },
    {
      id: 'radiorelax_int',
      title: 'Radio Relax International',
      tooltip: 'Міжнародна музика для відпочинку',
      stream: 'https://tavr.tvstitch.com/RadioRelax_Int',
      genre: [{ id: 'relax', name: 'Relax' }]
    },
    {
      id: 'radiorelax_cafe',
      title: 'Radio Relax Cafe',
      tooltip: 'Музика для кав’ярні',
      stream: 'https://tavr.tvstitch.com/RadioRelax_Cafe',
      genre: [{ id: 'relax', name: 'Relax' }]
    },
    {
      id: 'radiorelax_instrumental',
      title: 'Radio Relax Instrumental',
      tooltip: 'Інструментальна музика',
      stream: 'https://tavr.tvstitch.com/RadioRelax_Instrumental',
      genre: [{ id: 'relax', name: 'Relax' }]
    },
    {
      id: 'radiojazz',
      title: 'RadioJazz',
      tooltip: 'Джазова хвиля',
      stream: 'https://online.radiojazz.ua/RadioJazz_Gold',
      genre: [{ id: 'jazz', name: 'Jazz' }]
    },
    {
      id: 'radiojazz_light',
      title: 'RadioJazz Light',
      tooltip: 'Легкий джаз',
      stream: 'https://online.radiojazz.ua/RadioJazz_Light',
      genre: [{ id: 'jazz', name: 'Jazz' }]
    },
    {
      id: 'radiojazz_ukr',
      title: 'RadioJazz From UA',
      tooltip: 'Український джаз',
      stream: 'https://tavr.tvstitch.com/RadioJazz_Ukr',
      genre: [{ id: 'jazz', name: 'Jazz' }]
    },
    {
      id: 'radiojazz_cover',
      title: 'RadioJazz Cover',
      tooltip: 'Джазові каверси',
      stream: 'https://tavr.tvstitch.com/RadioJazz_Cover',
      genre: [{ id: 'jazz', name: 'Jazz' }]
    },
    {
      id: 'radiojazz_groove',
      title: 'RadioJazz Groove',
      tooltip: 'Groove',
      stream: 'https://tavr.tvstitch.com/RadioJazz_Groove',
      genre: [{ id: 'jazz', name: 'Jazz' }]
    },
    {
      id: 'classicradio',
      title: 'Classic Radio',
      tooltip: 'Класична музика',
      stream: 'https://online.classicradio.ua/ClassicRadio',
      genre: [{ id: 'classical', name: 'Classic' }]
    },
    {
      id: 'guliayradio',
      title: 'Гуляй Радіо',
      tooltip: 'Гуляй Радіо',
      stream: 'https://tavr.tvstitch.com/GuliayRadio',
      genre: [{ id: 'ukr', name: 'Українське' }]
    },
    {
      id: 'radiogold',
      title: 'Radio Gold',
      tooltip: 'Золоті хіти',
      stream: 'https://tavr.tvstitch.com/RadioGold',
      genre: [{ id: 'nst', name: 'Nostalgie' }]
    },
    {
      id: 'musicradio',
      title: 'Music Radio',
      tooltip: 'Музичне радіо',
      stream: 'https://tavr.tvstitch.com/MusicRadio',
      genre: [{ id: 'pop', name: 'Pop' }]
    },
    {
      id: 'radioitaliana',
      title: 'Radio Italiana',
      tooltip: 'Bravo, Bravissimo!',
      stream: 'https://tavr.tvstitch.com/RadioItaliana',
      genre: [{ id: 'latin', name: 'Latin' }]
    },
    {
      id: 'radioritmolatino',
      title: 'Radio Ritmo Latino',
      tooltip: 'Латиноамериканські ритми',
      stream: 'https://tavr.tvstitch.com/RadioRitmoLatino',
      genre: [{ id: 'latin', name: 'Latin' }]
    },
    {
      id: 'flashradio',
      title: 'Flash Radio',
      tooltip: 'Нова музика',
      stream: 'https://tavr.tvstitch.com/FlashRadio',
      genre: [{ id: 'pop', name: 'Pop' }]
    },
    {
      id: 'radioblack',
      title: 'Radio Black',
      tooltip: 'Urban Music',
      stream: 'https://tavr.tvstitch.com/RadioBlack',
      genre: [{ id: 'hiphop', name: 'Hip-Hop' }]
    },
    {
      id: 'kpopradio',
      title: 'K-POP Radio',
      tooltip: 'K-Pop',
      stream: 'https://tavr.tvstitch.com/KpopRadio',
      genre: [{ id: 'pop', name: 'Pop' }]
    },
    {
      id: 'technobucharadio',
      title: 'Techno-Bucha Radio',
      tooltip: 'The Air Symphony of Bucha',
      stream: 'https://a4.asurahosting.com:7230/radio.mp3',
      genre: [{ id: 'Techno', name: 'Techno' }]
    },
    {
      id: 'technolovers',
      title: 'Goa Channel One ॐ',
      tooltip: 'Psy & Goa Trance ॐ Non-Stop!',
      stream: 'https://stream.laut.fm/goa-channel-one',
      genre: [{ id: 'psytrance', name: 'Psy Trance' }]
    },
    {
      id: 'goafm',
      title: 'GOA FM',
      tooltip: '24H Goa & Psy Trance',
      stream: 'https://stream.laut.fm/goafm',
      genre: [{ id: 'psytrance', name: 'Psy Trance' }]
    },
    {
      id: 'goabase',
      title: 'GOA-Base',
      tooltip: 'Best Psychedelic & Progressive Goa',
      stream: 'https://goa-base.stream.laut.fm/goa-base',
      genre: [{ id: 'psytrance', name: 'Psy Trance' }]
    },
    {
      id: 'goanight',
      title: 'Goa Night',
      tooltip: 'Psy Dance Music & Trippy ChillOut Tunes',
      stream: 'https://stream.laut.fm/goanight',
      genre: [{ id: 'psytrance', name: 'Psy Trance' }]
    },
    {
      id: 'groovesalad',
      title: 'SomaFM Groove Salad',
      tooltip: 'Ambient & Downtempo',
      stream: 'https://ice2.somafm.com/groovesalad-128-mp3',
      genre: [{ id: 'ambient', name: 'Ambient' }]
    },
    {
      id: 'lush',
      title: 'SomaFM Lush',
      tooltip: 'Vocal Chillout',
      stream: 'https://ice2.somafm.com/lush-128-mp3',
      genre: [{ id: 'chillout', name: 'Chillout' }]
    },
    {
      id: '4everfloyd',
      title: '4 Ever Floyd',
      tooltip: 'Pink Floyd All Day...Everyday',
      stream: 'https://us1.streamingpulse.com/ssl/7202',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'rockabilly',
      title: 'ROCKABILLY',
      tooltip: 'Rockabilly Music On The World',
      stream: 'https://hemnos.cdnstream.com/1881_128',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'psychedelicrock',
      title: '60s Psychedelic Rock',
      tooltip: 'Psychedelic Internet Radio',
      stream: 'https://streaming.live365.com/a01650',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'rockantenne',
      title: 'Rock Antenne',
      tooltip: 'Classic Rock',
      stream: 'https://stream.rockantenne.de/rockantenne',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'powerfmberlin',
      title: 'Power FM',
      tooltip: 'Power by Rock',
      stream: 'https://stream.laut.fm/powerfm',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'rockworld',
      title: 'Rock World',
      tooltip: 'World of Rock',
      stream: 'https://stream.laut.fm/rockworld',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'regenbogen2',
      title: 'REGENBOGEN 2 Indie-Rock',
      tooltip: 'Maximum Indie Rock',
      stream: 'https://stream.regenbogen2.de/indierock/mp3-128/',
      genre: [{ id: 'indie', name: 'Indie' }]
    },
    {
      id: 'bigfm',
      title: 'bigFM Deep',
      tooltip: 'Deep House',
      stream: 'https://streams.bigfm.de/bigfm-deep-128-mp3',
      genre: [{ id: 'deephouse', name: 'Deep House' }]
    },
    {
      id: 'ibizaglobal',
      title: 'Ibiza Global Radio',
      tooltip: 'House & Electronic',
      stream: 'https://ibizaglobalradio.streaming-pro.com:8024/stream',
      genre: [{ id: 'house', name: 'House' }]
    },
    {
      id: 'aniradio',
      title: 'Anime Radio',
      tooltip: '24/7 Anime Music',
      stream: 'https://stream.laut.fm/anime-radio-switzerland',
      genre: [{ id: 'altrock', name: 'Alternative Rock' }]
    },
    {
      id: 'classicfmsoundtrack',
      title: 'Classic FM Soundtracks',
      tooltip: 'Klassiek voor iedereen',
      stream: 'https://stream.classic.nl/classicnl-soundtracks.mp3',
      genre: [{ id: 'soundtrack', name: 'Soundtrack' }]
    },
    {
      id: 'soundtrack',
      title: 'Soundtracks',
      tooltip: 'Hier gibt es die besten TV und Film musik',
      stream: 'https://stream.laut.fm/soundtrack',
      genre: [{ id: 'soundtrack', name: 'Soundtrack' }]
    },
    {
      id: 'flux_live',
      title: 'FluxFM',
      tooltip: 'Radio so bunt wie Berlin',
      stream: 'https://streams.fluxfm.de/live/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'indie', name: 'Indie' }]
    },
    {
      id: 'flux_finest',
      title: 'FluxFM Finest',
      tooltip: 'Berlin · Indie',
      stream: 'https://streams.fluxfm.de/fluxkompensator/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'indie', name: 'Indie' }]
    },
    {
      id: 'flux_lounge',
      title: 'FluxLounge',
      tooltip: 'Berlin · Relax',
      stream: 'https://streams.fluxfm.de/lounge/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'relax', name: 'Relax' }]
    },
    {
      id: 'flux_clubsandwich',
      title: 'FluxFM Clubsandwich',
      tooltip: 'Berlin · Dance',
      stream: 'https://streams.fluxfm.de/clubsandwich/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'dance', name: 'Dance' }]
    },
    {
      id: 'flux_electronic_chillout',
      title: 'FluxFM Electronic Chillout',
      tooltip: 'Berlin · Chillout',
      stream: 'https://streams.fluxfm.de/klubradio/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'chillout', name: 'Chillout' }]
    },
    {
      id: 'flux_chillhop',
      title: 'FluxFM ChillHop',
      tooltip: 'Berlin · Chillout',
      stream: 'https://streams.fluxfm.de/Chillhop/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'chillout', name: 'Chillout' }]
    },
    {
      id: 'flux_80s',
      title: 'FluxFM 80s',
      tooltip: 'Berlin · Nostalgie',
      stream: 'https://streams.fluxfm.de/80er/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'nst', name: 'Nostalgie' }]
    },
    {
      id: 'flux_70s',
      title: 'FluxFM 70s',
      tooltip: 'Berlin · Nostalgie',
      stream: 'https://streams.fluxfm.de/70er/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'nst', name: 'Nostalgie' }]
    },
    {
      id: 'flux_60s',
      title: 'FluxFM 60s',
      tooltip: 'Berlin · Nostalgie',
      stream: 'https://streams.fluxfm.de/60er/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'nst', name: 'Nostalgie' }]
    },
    {
      id: 'flux_2000er',
      title: 'FluxFM 2000er',
      tooltip: 'Berlin · Nostalgie',
      stream: 'https://streams.fluxfm.de/flx_2000/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'nst', name: 'Nostalgie' }]
    },
    {
      id: 'flux_indie_disco',
      title: 'FluxFM Indie Disco',
      tooltip: 'Berlin · Indie',
      stream: 'https://streams.fluxfm.de/indiedisco/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'indie', name: 'Indie' }]
    },
    {
      id: 'flux_elektroflux',
      title: 'ElektroFlux',
      tooltip: 'Berlin · Dance',
      stream: 'https://streams.fluxfm.de/elektro/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'dance', name: 'Dance' }]
    },
    {
      id: 'flux_beach_house',
      title: 'FluxFM Berlin Beach House Radio',
      tooltip: 'Berlin · House',
      stream: 'https://streams.fluxfm.de/bbeachhouse/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'house', name: 'House' }]
    },
    {
      id: 'flux_techno_underground',
      title: 'FluxFM Techno Underground',
      tooltip: 'Berlin · Techno',
      stream: 'https://streams.fluxfm.de/technoug/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'Techno', name: 'Techno' }]
    },
    {
      id: 'flux_sound_of_berlin',
      title: 'FluxFM Sound of Berlin',
      tooltip: 'Berlin · Dance',
      stream: 'https://streams.fluxfm.de/soundofberlin/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'dance', name: 'Dance' }]
    },
    {
      id: 'flux_mini',
      title: 'Mini Flux',
      tooltip: 'Berlin · Kids',
      stream: 'https://streams.fluxfm.de/kinder1/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'kids', name: 'Kids' }]
    },
    {
      id: 'flux_hiphop_classics',
      title: 'FluxFM HipHop Classics',
      tooltip: 'Berlin · Hip-Hop',
      stream: 'https://streams.fluxfm.de/boomfmclassics/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'hiphop', name: 'Hip-Hop' }]
    },
    {
      id: 'flux_jazz_schwarzenstein',
      title: 'FluxFM Jazzradio Schwarzenstein',
      tooltip: 'Berlin · Jazz',
      stream: 'https://streams.fluxfm.de/jazzschwarz/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'jazz', name: 'Jazz' }]
    },
    {
      id: 'flux_xjazz',
      title: 'FluxFM XJAZZ',
      tooltip: 'Berlin · Jazz',
      stream: 'https://streams.fluxfm.de/xjazz/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'jazz', name: 'Jazz' }]
    },
    {
      id: 'flux_neofm',
      title: 'FluxFM neoFM',
      tooltip: 'Berlin · Classic',
      stream: 'https://streams.fluxfm.de/neofm/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'classical', name: 'Classic' }]
    },
    {
      id: 'flux_metalfm',
      title: 'FluxFM MetalFM',
      tooltip: 'Berlin · Rock',
      stream: 'https://streams.fluxfm.de/metalfm/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'rock', name: 'Rock' }]
    },
    {
      id: 'flux_radio_alternative',
      title: 'FluxFM Radio Alternative',
      tooltip: 'Berlin · Alternative Rock',
      stream: 'https://streams.fluxfm.de/radioalt/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'altrock', name: 'Alternative Rock' }]
    },
    {
      id: 'flux_bfunk',
      title: 'FluxFM B-Funk',
      tooltip: 'Berlin · Funk',
      stream: 'https://streams.fluxfm.de/event01/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'funk', name: 'Funk' }]
    },
    {
      id: 'flux_yoga_sounds',
      title: 'FluxFM Yoga Sounds',
      tooltip: 'Berlin · Relax',
      stream: 'https://streams.fluxfm.de/yogasounds/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'relax', name: 'Relax' }]
    },
    {
      id: 'flux_chillout_radio',
      title: 'FluxFM Chillout Radio',
      tooltip: 'Berlin · Chillout',
      stream: 'https://streams.fluxfm.de/chillout/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'chillout', name: 'Chillout' }]
    },
    {
      id: 'flux_htgp',
      title: 'FluxFM Hippie Trippy Garden Pretty',
      tooltip: 'Berlin · Relax',
      stream: 'https://streams.fluxfm.de/event02/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'relax', name: 'Relax' }]
    },
    {
      id: 'flux_john_reed',
      title: 'FluxFM John Reed Radio',
      tooltip: 'Berlin · Dance',
      stream: 'https://streams.fluxfm.de/john-reed/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'dance', name: 'Dance' }]
    },
    {
      id: 'flux_easy_fitness',
      title: 'FluxFM Easy Fitness',
      tooltip: 'Berlin · Dance',
      stream: 'https://streams.fluxfm.de/easyfitness/mp3-128/streams.fluxfm.de/',
      genre: [{ id: 'dance', name: 'Dance' }]
    }    
  ];

  UKRAINIAN_STATIONS.forEach(function (s) {
    s.bg_image_mobile = logoUrl(s.id);
  });

  // =========================================
  // API
  // =========================================
  
  var Api = /*#__PURE__*/function () {
    function Api() {
      _classCallCheck(this, Api);
    }

    _createClass(Api, null, [{
      key: "list",
      value: function list() {
        var genres = [];
        var seen = {};

        UKRAINIAN_STATIONS.forEach(function (s) {
          (s.genre || []).forEach(function (g) {
            if (!seen[g.id]) {
              seen[g.id] = true;
              genres.push(g);
            }
          });
        });

        return Promise.resolve({
          stations: UKRAINIAN_STATIONS,
          genre: genres
        });
      }
    }]);

    return Api;
  }();

  // =========================================
  // FAVORITES
  // =========================================
  
  var Favorites = /*#__PURE__*/function () {
    function Favorites() {
      _classCallCheck(this, Favorites);
    }

    _createClass(Favorites, null, [{
      key: "get",
      value: function get() {
        var all = Lampa.Storage.get('radio_favorite_stations', '[]');
        all.sort(function (a, b) {
          return a.added > b.added ? -1 : a.added < b.added ? 1 : 0;
        });
        return all;
      }
    }, {
      key: "find",
      value: function find(favorite) {
        return this.get().find(function (a) {
          return a.id == favorite.id;
        });
      }
    }, {
      key: "remove",
      value: function remove(favorite) {
        var list = this.get();
        var find = this.find(favorite);
        if (find) {
          Lampa.Arrays.remove(list, find);
          Lampa.Storage.set('radio_favorite_stations', list);
        }
      }
    }, {
      key: "add",
      value: function add(favorite) {
        var list = this.get();
        var find = this.find(favorite);
        if (!find) {
          Lampa.Arrays.extend(favorite, {
            id: Lampa.Utils.uid(),
            added: Date.now()
          });
          list.push(favorite);
          Lampa.Storage.set('radio_favorite_stations', list);
        }
      }
    }, {
      key: "update",
      value: function update(favorite) {
        var list = this.get();
        var find = this.find(favorite);
        if (find) {
          Lampa.Storage.set('radio_favorite_stations', list);
        }
      }
    }, {
      key: "toggle",
      value: function toggle(favorite) {
        return this.find(favorite) ? this.remove(favorite) : this.add(favorite);
      }
    }]);

    return Favorites;
  }();

  // =========================================
  // ГЛОБАЛЬНИЙ ПЛЕЄР
  // =========================================
  
  var globalAudio = null;
  var globalStation = null;
  var globalPlayerHtml = null;
  var globalScreenReset = null;
  var globalHls = null;
  var globalNotyTimers = [];
  var globalStartTimer = null;   // відкладений старт потоку (захист від частих перемикань)
  var globalWatchdog = null;     // перезапуск, якщо потік довго не стартує

  // Подія для смужки «Зараз грає» у списку станцій
  var globalNowTrack = '';
  function emitNow(station, track) {
    globalNowTrack = track || '';
    try {
      window.dispatchEvent(new CustomEvent('radio:nowplaying', { detail: { station: station || null, track: globalNowTrack } }));
    } catch (e) {}
  }

  // Оновлення треку для смужки в списку, поки повне вікно плеєра закрите
  // (коли плеєр відкритий — він сам опитує і надсилає трек через emitNow)
  var playersOpen = 0, bgNpTimer = null, bgNpAbort = null;
  function bgPoll() {
    var st = globalStation;
    if (!st || playersOpen > 0) return;
    if (bgNpAbort) { try { bgNpAbort.abort(); } catch (e) {} }
    bgNpAbort = typeof AbortController === 'function' ? new AbortController() : null;
    var allowIcy = !!(globalAudio && !globalAudio.paused && globalAudio.readyState >= 3);
    fetchNowPlaying(st, bgNpAbort ? bgNpAbort.signal : undefined, allowIcy).then(function (t) {
      if (globalStation !== st || playersOpen > 0) return;
      emitNow(st, cleanTrack(t, st));
    }, function () {});
  }
  function startBgPoll() {
    stopBgPoll();
    bgNpTimer = setInterval(bgPoll, NOW_PLAYING_EVERY);
    setTimeout(bgPoll, 2500);
  }
  function stopBgPoll() {
    if (bgNpTimer) clearInterval(bgNpTimer);
    bgNpTimer = null;
    if (bgNpAbort) { try { bgNpAbort.abort(); } catch (e) {} }
  }

  function clearPlayingClass() {
    document.querySelectorAll('.radio-item.playing').forEach(function(el) {
      el.classList.remove('playing');
    });
  }

  function hideNoty() {
    try {
      var els = document.querySelectorAll('.noty');
      for (var i = 0; i < els.length; i++) {
        els[i].style.display = 'none';
      }
    } catch(e) {}
  }

  // Без постійного інтервалу: кілька разових перевірок після старту потоку
  function startHidingNoty() {
    stopHidingNoty();
    globalNotyTimers = [0, 400, 1200].map(function(ms) {
      return setTimeout(hideNoty, ms);
    });
  }

  function stopHidingNoty() {
    globalNotyTimers.forEach(clearTimeout);
    globalNotyTimers = [];
  }

  function stopGlobalAudio() {
    stopHidingNoty();
    if (globalHls) {
      globalHls.destroy();
      globalHls = false;
    }
    clearTimeout(globalStartTimer);
    clearTimeout(globalWatchdog);
    globalStartTimer = globalWatchdog = null;
    if (globalAudio) {
      try {
        globalAudio.pause();
        // не src = '' (це може відкрити запит до сторінки): прибираємо атрибут і обриваємо завантаження
        globalAudio.removeAttribute('src');
        globalAudio.load();
      } catch(e) {}
      globalAudio = null;
    }
    if (globalScreenReset) {
      clearInterval(globalScreenReset);
      globalScreenReset = null;
    }
    if (globalPlayerHtml) {
      globalPlayerHtml.toggleClass('stop', true);
      globalPlayerHtml.toggleClass('loading', false);
      globalPlayerHtml.toggleClass('hide', true);
      globalPlayerHtml = null;
    }
    clearPlayingClass();
    globalStation = null;
    stopBgPoll();
    emitNow(null, '');
  }

  function setPlayingClass(station) {
    clearPlayingClass();
    var sid = String(station.id);
    document.querySelectorAll('.radio-item').forEach(function(el) {
      if (el.dataset && el.dataset.sid === sid) {
        el.classList.add('playing');
      }
    });
  }


  function playGlobalAudio(station) {
    stopGlobalAudio();
    
    globalStation = station;
    emitNow(station, '');
    startBgPoll();
    var url = station.stream_320 ? station.stream_320 : station.stream_128 ? station.stream_128 : station.stream ? station.stream : station.stream_hls ? station.stream_hls : '';
    
    setPlayingClass(station);
    
    globalAudio = new Audio();
    
    updateMiniPlayer(station, 'loading');
    
    function startPlay() {
      var playPromise;
      try {
        playPromise = globalAudio.play();
      } catch(e) {}
      if (playPromise !== undefined) {
        playPromise.then(function() {
          updateMiniPlayer(station, 'play');
          startHidingNoty();
        })["catch"](function() {});
      }
    }

    var started = false, retries = 0;

    function loadPlay() {
      if (!globalAudio || globalStation !== station) return;
      globalAudio.src = url;
      globalAudio.load();
      startPlay();
      armWatchdog();
    }

    // Якщо потік не почав грати за 8 с — перепідключаємось (до 2 разів)
    function armWatchdog() {
      clearTimeout(globalWatchdog);
      globalWatchdog = setTimeout(function() {
        if (started || !globalAudio || globalStation !== station) return;
        if (retries++ < 2) loadPlay();
      }, 8000);
    }

    // Невелика затримка перед підключенням: при швидких свайпах не засипаємо сервер запитами
    function loadPlayDelayed() {
      clearTimeout(globalStartTimer);
      globalStartTimer = setTimeout(loadPlay, 250);
    }

    globalAudio.addEventListener("playing", function() {
      started = true;
      clearTimeout(globalWatchdog);
      updateMiniPlayer(station, 'play');
      if (!globalScreenReset) {
        globalScreenReset = setInterval(function() {
          Lampa.Screensaver.resetTimer();
        }, 5000);
      }
    });
    
    globalAudio.addEventListener("waiting", function() {
      updateMiniPlayer(station, 'loading');
    });
    
    globalAudio.addEventListener("ended", function() {
      stopGlobalAudio();
    });

    globalAudio.addEventListener("error", function() {
      console.log('Audio error');
    });

    if (globalAudio.canPlayType('application/vnd.apple.mpegurl') || url.indexOf('.aacp') > 0 || station.stream) {
      loadPlayDelayed();
    } else if (Hls.isSupported()) {
      try {
        globalHls = new Hls();
        globalHls.attachMedia(globalAudio);
        globalHls.loadSource(url);
        globalHls.on(Hls.Events.ERROR, function(event, data) {
          if (data.details === Hls.ErrorDetails.MANIFEST_PARSING_ERROR) {
            if (data.reason === "no EXTM3U delimiter") {
              Lampa.Noty.show(Lampa.Lang.translate('radio_load_error'));
              setTimeout(hideNoty, 100);
            }
          }
        });
        globalHls.on(Hls.Events.MANIFEST_LOADED, function() {
          startPlay();
        });
      } catch(e) {
        Lampa.Noty.show(Lampa.Lang.translate('radio_load_error'));
        setTimeout(hideNoty, 100);
      }
    } else {
      loadPlayDelayed();
    }
  }

  // =========================================
  // МІНІ-ПЛЕЄР В ГОЛОВІ
  // =========================================
  
  function updateMiniPlayer(station, state) {
    if (!globalPlayerHtml) {
      globalPlayerHtml = Lampa.Template.get('radio_mini_player', {});
      $('.head__actions .open--search').before(globalPlayerHtml);
      
      globalPlayerHtml.on('hover:enter', function() {
        if (globalAudio && !globalAudio.paused) {
          stopGlobalAudio();
        }
      });
    }
    
    globalPlayerHtml.toggleClass('hide', false);
    globalPlayerHtml.toggleClass('stop', state === 'stop');
    globalPlayerHtml.toggleClass('loading', state === 'loading');
    globalPlayerHtml.toggleClass('play', state === 'play');
    
    // ПРИБИРАЄМО НАЗВУ СТАНЦІЇ В МІНІ-ПЛЕЄРІ
    // globalPlayerHtml.find('.radio-mini-player__name').text(station.title || '');
    globalPlayerHtml.find('.radio-mini-player__name').text('');
    
    var btn = globalPlayerHtml.find('.radio-mini-player__button');
    if (btn) {
      btn.css({
        "background-image": "url('" + station.bg_image_mobile + "')",
        "background-size": "cover",
        "background-position": "center"
      });
    }
  }

  // =========================================
  // PLAYER (повноекранний)
  // =========================================
  
  // =========================================
  // ПОТОЧНА КОМПОЗИЦІЯ (best-effort)
  // Працює лише там, де станція віддає метадані й дозволяє CORS.
  // Якщо даних немає — рядок із треком просто не показується.
  // =========================================

  var NOW_PLAYING_EVERY = 20000; // як часто оновлювати, мс

  // Radio ROKS: суфікс потоку (RadioROKS_<суфікс>) → назва стрічки на o.tavr.media. Інші канали додавайте сюди, коли знайдете їхні адреси
  var ROKS_FEEDS = { '': 'roks', 'ukr': 'roksukr', 'newrock': 'roksnew', 'ballads': 'roksbal', 'hardnheavy': 'rokshar' };

  // TAVR: назва потоку → стрічки на o.tavr.media (main — історія основного каналу, multi — по одному запису на підканал із полем type)
  var TAVR_CHANNEL_FEEDS = {
    hitfm_best: 'hitb', hitfm_top: 'hitt',
    radioroks_classicrock: 'rokscla',
    kissfm_deep: 'kissdeep', kissfm_digital: 'kissdigital',
    radiorelax_ukr: 'relaxukr', radiorelax_int: 'relaxint', radiorelax_cafe: 'relaxcafe', radiorelax_instrumental: 'relaxinstrumental',
    melodiafm_int: 'melodiaint', melodiafm_disco: 'melodiad', melodiafm_romantic: 'melodiar',
    nasheradio_ukr: 'nasheradio3ukr',
    radiojazz_ukr: 'jazz3ukr', radiojazz_cover: 'jazz3cover', radiojazz_groove: 'jazz3groove',
    classicradio: 'radio3classic', radioindieua: 'radio3indieua', guliayradio: 'radio3guliay',
    radiogold: 'radio3gold', musicradio: 'radio3music', radioitaliana: 'radio3italiano',
    radioritmolatino: 'radio3ritmo_latino', flashradio: 'radio3flash', radioblack: 'radio3black', kpopradio: 'radio3kpop'
  };
  var TAVR_FEEDS = {
    kissfm: { main: 'kiss', multi: 'kiss3songs' },
    hitfm: { main: 'hit', multi: 'hit3songs' },
    nasheradio: { main: 'nasheradio', multi: 'nasheradio3songs' },
    radiorelax: { main: 'relax', multi: 'relax5songs' },
    radiojazz: { main: 'jazz', multi: 'jazz3songs' },
    melodiafm: { main: 'melodia', multi: 'melodia3songs' },
    radiobayraktar: { main: 'bayraktar', multi: 'bayraktar' }
  };

  function readTavrTitle(url, signal) {
    var m = /^https?:\/\/(?:online\.[a-z]+\.ua|tavr\.tvstitch\.com)\/([A-Za-z]+)(?:_([A-Za-z]+))?(?:[?#]|$)/i.exec(url);
    // Канали з власним фідом o.tavr.media (CORS *): береться найновіший запис
    var direct = m && TAVR_CHANNEL_FEEDS[(m[1] + (m[2] ? '_' + m[2] : '')).toLowerCase()];
    if (direct) {
      return fetch('https://o.tavr.media/' + direct, { cache: 'no-store', signal: signal }).then(function (r) { return r.json(); }).then(function (j) {
        var it = Array.isArray(j) ? j[0] : null;
        if (!it || !it.stime || !it.song || it.song === 'None') return '';
        return (it.singer ? it.singer + ' - ' : '') + it.song;
      });
    }
    if (!m) return null;
    var f = TAVR_FEEDS[m[1].toLowerCase()];
    if (!f) return null;
    var type = (m[2] || '').toLowerCase();
    return fetch('https://o.tavr.media/' + (type ? f.multi : f.main), { cache: 'no-store', signal: signal }).then(function (r) { return r.json(); }).then(function (j) {
      if (!Array.isArray(j)) return '';
      var it = null;
      if (type) {
        for (var i = 0; i < j.length; i++) if (String(j[i].type || '').toLowerCase() === type) { it = j[i]; break; }
      } else {
        it = j[0];
      }
      if (!it || !it.stime || !it.song || it.song === 'None') return '';
      return (it.singer ? it.singer + ' - ' : '') + it.song;
    });
  }

  // Змішування двох #rrggbb кольорів
  function mixHex(a, b, t) {
    function p(h) { h = String(h).replace('#', ''); if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; return [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16) || 0; }); }
    var x = p(a), y = p(b);
    return 'rgb(' + [0, 1, 2].map(function (i) { return Math.round(x[i] + (y[i] - x[i]) * t); }).join(',') + ')';
  }

  // CSS кольорів еквалайзера та активної станції (перекриває стару зелену схему)
  function accentCss() {
    function grad(sel, n, extra) {
      var out = '';
      // жорсткий поділ як на прапорі (плавне змішування синього з жовтим дає брудно-зелений)
      for (var i = 1; i <= n; i++) out += sel + ':nth-child(' + i + '){background-color:' + (i <= Math.ceil(n / 2) ? EQ_COLOR_FROM : EQ_COLOR_TO) + ' !important}';
      return out;
    }
    var c = PLAYING_TEXT_COLOR;
    return grad('.radio-item__wave i', 5) +
      grad('.radio-item__shade i', 5) +
      grad('.radio-mini-player:not(.focus) .radio-mini-player__button i', 4) +
      grad('.radio-player__wave>div', 21) +
      '.radio-item.playing .radio-item__title,.radio-item.playing .radio-item__num{color:' + c + ' !important}' +
      '.radio-item.playing .radio-item__tooltip{color:' + c + ' !important;opacity:.8 !important}' +
      '.radio-mini-player:not(.focus).loading .radio-mini-player__button:before{border-top-color:' + c + ' !important}' +
      '.radio-player__btn:active{background-color:' + mixHex(c, '#000000', 0.55) + ' !important}';
  }

  function streamUrlOf(st) {
    return st.stream_320 || st.stream_128 || st.stream || st.stream_hls || '';
  }

  function cleanTrack(t, station) {
    t = (t || '').replace(/\s+/g, ' ').trim();
    if (!t || t === '-' || t === '—') return '';
    if (station && t.toLowerCase() === (station.title || '').toLowerCase()) return '';
    return t;
  }

  function decodeBytes(bytes) {
    try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); } catch (e) {}
    try { return new TextDecoder('windows-1251').decode(bytes); } catch (e2) {}
    return '';
  }

  // Метадані ICY: читаємо кілька блоків потоку й одразу обриваємо з'єднання
  // Деякі сервери дозволяють ICY через CORS, але не віддають icy-metaint браузеру — тоді беремо відомий інтервал
  var ICY_METAINT_HINT = { urcradio: 16000, '4everfloyd': 8192 };
  // Icecast/Shoutcast status-json.xsl із CORS: назва треку без читання потоку
  var STATUS_JSON_STATIONS = { studradio: 1, magicradio: 1 };

  function readStatusJsonTitle(url, signal) {
    var m = /^(https?:\/\/[^\/]+)(\/[^?#]*)?/i.exec(url);
    if (!m) return Promise.resolve('');
    return fetch(m[1] + '/status-json.xsl', { cache: 'no-store', signal: signal }).then(function (r) { return r.json(); }).then(function (j) {
      var src = j && j.icestats && j.icestats.source;
      if (!src) return '';
      var list = Array.isArray(src) ? src : [src], pick = null, path = (m[2] || '').toLowerCase();
      for (var i = 0; i < list.length; i++) {
        var lu = String(list[i].listenurl || '').toLowerCase().replace(/[?#].*$/, '');
        if (path && lu.slice(-path.length) === path) { pick = list[i]; break; }
      }
      if (!pick && list.length === 1) pick = list[0];
      if (!pick) return '';
      var t = pick.title || '';
      return (pick.artist && t ? pick.artist + ' - ' : '') + t;
    });
  }

  function readIcyTitle(url, signal, hint) {
    return fetch(url, { headers: { 'Icy-MetaData': '1' }, cache: 'no-store', signal: signal }).then(function (res) {
      var metaint = parseInt(res.headers.get('icy-metaint'), 10) || hint || 0;
      if (!metaint || !res.body || !res.body.getReader) return '';
      var reader = res.body.getReader();
      var chunks = [], total = 0, pos = 0, blocks = 0;

      function bytesAt(from, len) {
        var out = new Uint8Array(len), o = 0, off = 0;
        for (var i = 0; i < chunks.length && o < len; i++) {
          var c = chunks[i];
          if (off + c.length > from) {
            var start = Math.max(0, from - off);
            var take = Math.min(c.length - start, len - o);
            out.set(c.subarray(start, start + take), o);
            o += take;
          }
          off += c.length;
        }
        return out;
      }

      function step() {
        // потрібні: metaint байтів аудіо + 1 байт довжини
        while (total >= pos + metaint + 1) {
          var len = bytesAt(pos + metaint, 1)[0] * 16;
          if (len === 0) {
            blocks++;
            pos += metaint + 1;
            if (blocks >= 4) return '';
          } else if (total >= pos + metaint + 1 + len) {
            var text = decodeBytes(bytesAt(pos + metaint + 1, len));
            var m = /StreamTitle='([\s\S]*?)';/.exec(text);
            return m ? m[1] : '';
          } else {
            break;
          }
        }
        return reader.read().then(function (r) {
          if (r.done) return '';
          chunks.push(r.value);
          total += r.value.length;
          return step();
        });
      }

      return Promise.resolve(step()).then(function (t) {
        try { reader.cancel(); } catch (e) {}
        return t;
      }, function (e) {
        try { reader.cancel(); } catch (e2) {}
        throw e;
      });
    });
  }

  // Окремі API деяких сервісів
  // FluxFM: потік дає лише назву станції, трек — з API Flux (CORS дозволений). Ключ — каталог у streams.fluxfm.de
  var FLUX_CHANNELS = {
    live: 'FluxFM', fluxkompensator: 'fluxfm-finest', lounge: 'flux-lounge', clubsandwich: 'clubsandwich',
    klubradio: 'electronic-chillout', chillhop: 'chillhop', '80er': '80s', '70er': '70s', '60er': '60s',
    flx_2000: '2000er', indiedisco: 'indiedisco', elektro: 'elektro-flux', bbeachhouse: 'berlin-beach-house',
    technoug: 'techno-underground', soundofberlin: 'sound-of-berlin', kinder1: 'mini-flux',
    boomfmclassics: 'boom-fm-classics', jazzschwarz: 'jazz-schwarzenstein', xjazz: 'x-jazz', neofm: 'neofm',
    metalfm: 'metal-fm', radioalt: 'alternative', event01: 'b-funk', yogasounds: 'yoga-sounds',
    chillout: 'chillout-radio', event02: 'htgp', 'john-reed': 'john-reed-radio', easyfitness: 'easy-fitness'
  };

  function readServiceTitle(url, signal) {
    var m = /(?:^|\/\/)(?:[a-z0-9-]+\.)?stream\.laut\.fm\/([^\/?#]+)/i.exec(url);
    if (m) {
      return fetch('https://api.laut.fm/station/' + m[1] + '/current_song', { signal: signal }).then(function (r) { return r.json(); }).then(function (j) {
        var a = j && j.artist && (j.artist.name || j.artist);
        return (a ? a + ' - ' : '') + (j && j.title || '');
      });
    }
    // Radio ROKS: власний JSON сайту (CORS *), масив від найновішого; джингл має artist_id 0 і порожній stime
    m = /online\.radioroks\.ua\/RadioROKS(?:_([A-Za-z]+))?(?:[?#]|$)/i.exec(url);
    if (m) {
      var feed = ROKS_FEEDS[(m[1] || '').toLowerCase()];
      if (feed) {
        return fetch('https://o.tavr.media/' + feed, { cache: 'no-store', signal: signal }).then(function (r) { return r.json(); }).then(function (j) {
          var it = Array.isArray(j) ? j[0] : null;
          if (!it || !it.stime || !it.song) return '';
          return (it.singer ? it.singer + ' - ' : '') + it.song;
        });
      }
    }
    // Холдинг TAVR (Kiss, Hit, Наше Радіо, Relax, Jazz, Мелодія): o.tavr.media, CORS *
    var tv = readTavrTitle(url, signal);
    if (tv) return tv;
    // Хостинг myradio24: JSON статусу з CORS, поле song = «Виконавець - Назва»
    m = /myradio24\.(?:com|org)\/(\d+)/i.exec(url);
    if (m) {
      return fetch('https://myradio24.com/users/' + m[1] + '/status.json', { cache: 'no-store', signal: signal }).then(function (r) { return r.json(); }).then(function (j) {
        if (!j) return '';
        var t = j.song || ((j.artist ? j.artist + ' - ' : '') + (j.songtitle || ''));
        return /^(джингл|jingle)$/i.test((t || '').trim()) ? '' : t;
      });
    }
    m = /streams\.fluxfm\.de\/([^\/?#]+)/i.exec(url);
    if (m && FLUX_CHANNELS[m[1].toLowerCase()]) {
      return fetch('https://fluxmusic.api.radiosphere.io/channels/' + FLUX_CHANNELS[m[1].toLowerCase()] + '/current-track', { cache: 'no-store', signal: signal }).then(function (r) { return r.json(); }).then(function (j) {
        var ti = j && j.trackInfo;
        if (!ti || !ti.title) return '';
        return (ti.artistCredits ? ti.artistCredits + ' - ' : '') + ti.title;
      });
    }
    m = /somafm\.com\/([a-z0-9]+)-/i.exec(url);
    if (m) {
      return fetch('https://somafm.com/channels.json', { signal: signal }).then(function (r) { return r.json(); }).then(function (j) {
        var list = (j && j.channels) || [];
        for (var i = 0; i < list.length; i++) if (list[i].id === m[1]) return list[i].lastPlaying || '';
        return '';
      });
    }
    return null;
  }

  function fetchNowPlaying(station, signal, allowIcy) {
    var url = streamUrlOf(station);
    if (!url || typeof fetch !== 'function') return Promise.resolve('');
    var svc = readServiceTitle(url, signal);
    if (!svc && STATUS_JSON_STATIONS[station.id]) svc = readStatusJsonTitle(url, signal);
    var p = svc || Promise.resolve('');
    return p["catch"](function () { return ''; }).then(function (t) {
      if (cleanTrack(t, station)) return t;
      if (!allowIcy || /\.m3u8(\?|$)/i.test(url)) return '';
      return readIcyTitle(url, signal, ICY_METAINT_HINT[station.id]);
    });
  }

  function Player(station, handlers) {
    handlers = handlers || {};
    var html = Lampa.Template.js('radio_player');
    var isDestroyed = false, playerCounted = false;

    // Візуалізація: «жива» хвиля керується з JS (лише transform/opacity)
    var vizRAF = 0, vizOn = false, vizBars = [], vizVal = [], vizNoise = [], vizLast = 0;
    var vizBpm = 90, vizSeed = 0;
    (function () {
      var id = String(station.id || station.title || ''), h = 0;
      for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 100003;
      vizBpm = 92 + h % 46;      // 92–137 уд/хв, різний для кожної станції
      vizSeed = h % 628 / 100;
    })();

    function vizTick(ts) {
      if (!vizOn || isDestroyed) return;
      vizRAF = requestAnimationFrame(vizTick);
      if (ts - vizLast < 33) return; // ~30 кадрів/с достатньо
      vizLast = ts;
      var n = vizBars.length;
      var period = 60000 / vizBpm;
      var beat = Math.floor(ts / period);
      var phase = (ts % period) / period;
      var accent = beat % 4 === 0 ? 1 : (beat % 2 === 0 ? 0.8 : 0.55);
      if ((beat * 2654435761 >>> 0) % 7 === 0) accent *= 0.4;          // іноді «пропущений» удар
      var kick = Math.exp(-phase * 5.5) * accent;                       // різкий удар і спад
      var snare = Math.exp(-((phase + 0.5) % 1) * 9) * (beat % 2 ? 0.7 : 0.3);
      var energy = 0.7 + 0.3 * Math.sin(ts / 5200 + vizSeed);           // повільна зміна «гучності»
      var c = (n - 1) / 2;
      for (var i = 0; i < n; i++) {
        var x = (i - c) / c;
        var wb = Math.exp(-x * x * 1.8);                                // баси ближче до центру
        var wh = 0.35 + 0.65 * Math.abs(x);                             // верхи — по краях
        vizNoise[i] += (Math.random() - vizNoise[i]) * (0.18 + 0.25 * wh);
        var level = 0.1 + VIZ_SENSITIVITY * energy * (kick * wb * 1.0 + snare * wh * 0.55 + vizNoise[i] * (0.35 + 0.6 * wh));
        if (level > 1) level = 1;
        vizVal[i] += (level - vizVal[i]) * (level > vizVal[i] ? 0.75 : 0.17);
        var v = vizVal[i];
        vizBars[i].style.transform = 'scaleY(' + v.toFixed(3) + ')';
        vizBars[i].style.opacity = (0.45 + 0.55 * v).toFixed(2);
      }
    }

    function startViz(lines) {
      if (vizOn) return;
      vizBars = lines; vizVal = []; vizNoise = [];
      for (var i = 0; i < lines.length; i++) { vizVal.push(0.15); vizNoise.push(Math.random()); }
      vizOn = true;
      vizRAF = requestAnimationFrame(vizTick);
    }

    function stopViz() {
      vizOn = false;
      if (vizRAF) cancelAnimationFrame(vizRAF);
      vizRAF = 0;
    }

    function changeWave(class_name) {
      var lines = html.find('.radio-player__wave').querySelectorAll('div');
      var live = class_name === 'play';
      if (live) startViz(lines); else stopViz();
      for (var i = 0; i < lines.length; i++) {
        lines[i].classList.remove('play', 'loading', 'live');
        lines[i].classList.add(live ? 'live' : class_name);
        if (live) {
          lines[i].style['animation-duration'] = '';
          lines[i].style['animation-delay'] = '';
        } else {
          lines[i].style.transform = '';
          lines[i].style.opacity = '';
          lines[i].style['animation-duration'] = '400ms';
          lines[i].style['animation-delay'] = Math.round(400 / lines.length * i) + 'ms';
        }
      }
    }

    function createWave() {
      var box = html.find('.radio-player__wave');
      for (var i = 0; i < 21; i++) {
        var div = document.createElement('div');
        box.append(div);
      }
      changeWave(globalAudio && !globalAudio.paused ? 'play' : 'loading');
    }

    // Поточна композиція
    var npTimer = null, npAbort = null;
    function pollNowPlaying() {
      if (isDestroyed) return;
      if (npAbort) { try { npAbort.abort(); } catch (e) {} }
      npAbort = typeof AbortController === 'function' ? new AbortController() : null;
      // ICY відкриває друге з'єднання з потоком — робимо це лише коли звук уже грає, щоб не заважати старту
      var allowIcy = !!(audioRef && !audioRef.paused && audioRef.readyState >= 3);
      fetchNowPlaying(station, npAbort ? npAbort.signal : undefined, allowIcy).then(function (t) {
        if (isDestroyed) return;
        var box = html.find('.radio-player__track');
        // є трек — «♪ трек ♪ слоган ♪», немає — «♪ слоган ♪»
        if (box) setTrack(box, cleanTrack(t, station));
      }, function () {
        if (isDestroyed || trackShown) return;
        var box = html.find('.radio-player__track');
        if (box) setTrack(box, '');
      });
    }
    var lastTrack = null;
    var trackShown = false; // чи зараз у рядку справжній трек (а не лише слоган)
    function fallbackText() { return String(station.tooltip || '').replace(/\s+/g, ' ').trim(); }
    // Один рядок: «♪ трек ♪ слоган ♪» або, коли треку немає, «♪ слоган ♪»
    function setTrack(box, info) {
      var parts = [];
      if (info) parts.push(info);
      var slogan = fallbackText();
      if (slogan) parts.push(slogan);
      var key = parts.join('\u0001');
      if (key === lastTrack) return;
      lastTrack = key;
      trackShown = !!info;
      emitNow(station, info);
      box.textContent = '';
      if (!parts.length) return;
      var span = document.createElement('span');
      span.className = 'radio-player__track-in';
      var gap = '  '; // подвійний пробіл між значком і текстом
      function note() {
        var n = document.createElement('i');
        n.textContent = '♪';
        return n;
      }
      function fill(repeat) {
        span.textContent = '';
        for (var k = 0; k < repeat; k++) {
          for (var p = 0; p < parts.length; p++) {
            span.appendChild(note());
            span.appendChild(document.createTextNode(gap + parts[p] + gap));
          }
        }
        if (repeat === 1) span.appendChild(note()); // нерухомо: замикаючий ♪
      }
      fill(1);
      box.appendChild(span);
      // якщо не вміщається — пускаємо безперервну стрічку
      if (span.offsetWidth > box.clientWidth) {
        fill(2);
        span.style.animationDuration = Math.max(6, Math.round(span.offsetWidth / 2 / TRACK_SCROLL_SPEED)) + 's';
        span.classList.add('run');
      }
    }
    function startNowPlaying() {
      var box0 = html.find('.radio-player__track');
      if (box0) setTrack(box0, ''); // одразу слоган, поки йде запит
      pollNowPlaying();
      npTimer = setInterval(pollNowPlaying, NOW_PLAYING_EVERY);
      // щойно звук реально пішов — одразу питаємо трек ще раз (тепер уже і через ICY)
      if (audioRef) audioRef.addEventListener('playing', onAudioPlayingNp);
    }
    function onAudioPlayingNp() {
      audioRef.removeEventListener('playing', onAudioPlayingNp);
      setTimeout(pollNowPlaying, 300);
    }
    function stopNowPlaying() {
      if (audioRef) audioRef.removeEventListener('playing', onAudioPlayingNp);
      if (npTimer) clearInterval(npTimer);
      npTimer = null;
      if (npAbort) { try { npAbort.abort(); } catch (e) {} }
    }

    var audioRef = globalAudio;
    function onAudioPlaying() { if (!isDestroyed) changeWave('play'); }
    function onAudioWaiting() { if (!isDestroyed) changeWave('loading'); }
    if (audioRef) {
      audioRef.addEventListener("playing", onAudioPlaying);
      audioRef.addEventListener("waiting", onAudioWaiting);
    }

    this.create = function () {
      var cover = Lampa.Template.js('radio_cover');
      cover.find('.radio-cover__title').text(station.title || '');
      // слоган більше не окремий рядок: на його місці — рядок «трек + слоган» (див. setTrack)
      cover.find('.radio-cover__tooltip').classList.add('radio-player__track');
      var img_box = cover.find('.radio-cover__img-box');
      var img_elm = img_box.find('img');
      img_box.removeClass('loaded loaded-icon');

      img_elm.onload = function () {
        img_box.addClass('loaded');
      };
      img_elm.onerror = function () {
        img_elm.src = './img/icons/menu/movie.svg';
        img_box.addClass('loaded-icon');
      };
      img_elm.src = station.bg_image_mobile;

      html.find('.radio-player__cover').append(cover);
      html.find('.radio-player__close').on('click', function () {
        window.history.back();
      });

      // Кнопки попередня / наступна
      html.find('.radio-player__prev').on('click', function () {
        if (handlers.prev) handlers.prev();
      });
      html.find('.radio-player__next').on('click', function () {
        if (handlers.next) handlers.next();
      });

      // Свайпи
      var sx = 0, sy = 0, st = 0, tracking = false;
      html.addEventListener('touchstart', function (e) {
        if (e.touches.length !== 1) { tracking = false; return; }
        sx = e.touches[0].clientX;
        sy = e.touches[0].clientY;
        st = Date.now();
        tracking = true;
      }, { passive: true });

      html.addEventListener('touchend', function (e) {
        if (!tracking || isDestroyed) return;
        tracking = false;
        var t = e.changedTouches[0];
        var dx = t.clientX - sx;
        var dy = t.clientY - sy;
        var absX = Math.abs(dx), absY = Math.abs(dy);
        var TH = 50; // мінімальна довжина свайпу, px

        if (Date.now() - st > 800) return;      // занадто повільний жест
        if (Math.max(absX, absY) < TH) return;  // це тап, а не свайп

        var dir;
        if (absX > absY) dir = dx < 0 ? 1 : -1;  // вліво = наступна, вправо = попередня
        else dir = dy < 0 ? 1 : -1;              // вгору = наступна, вниз = попередня

        if (dir === 1 && handlers.next) handlers.next();
        if (dir === -1 && handlers.prev) handlers.prev();
      }, { passive: true });

      document.body.append(html);
      createWave();
      startNowPlaying();
      if (!playerCounted) { playerCounted = true; playersOpen++; }

      // Потік запускає Component.play(); плеєр лише відображає стан
    };

    this.destroy = function () {
      isDestroyed = true;
      if (playerCounted) { playerCounted = false; playersOpen = Math.max(0, playersOpen - 1); setTimeout(bgPoll, 400); }
      stopViz();
      stopNowPlaying();
      if (audioRef) {
        audioRef.removeEventListener("playing", onAudioPlaying);
        audioRef.removeEventListener("waiting", onAudioWaiting);
      }
      html.remove();
    };
  }

  // =========================================
  // COMPONENT
  // =========================================
  
  function Component() {
    var _this6 = this;
    var last, scroll, played, bgTimer, filtred = [], page = 0;
    var focusPlaying = false, firstDisplay = true, focusSid = null;
    var viewMode = (function () {
      var v = Lampa.Storage.get('radio_view', '');
      if (v === 'tiles' || v === 'logos' || v === 'list') return v;
      return (window.innerWidth || 1000) <= 600 ? 'logos' : 'list'; // перший запуск: на телефоні — лише логотипи
    })();
    var html = document.createElement('div');
    var img_bg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAZCAYAAABD2GxlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHASURBVHgBlZaLrsMgDENXxAf3/9XHFdXNZLm2YZHQymPk4CS0277v9+ffrut62nEcn/M8nzb69cxj6le1+75f/RqrZ9fatm3F9wwMR7yhawilNke4Gis/7j9srQbdaVFBnkcQ1WrfgmIIBcTrvgqqsKiTzvpOQbUnAykVW4VVqZXyyDllYFSKx9QaVrO7nGJIB63g+FAq/xhcHWBYdwCsmAtvFZUKE0MlVZWCT4idOlyhTp3K35R/6Nzlq0uBnsKWlEzgSh1VGJxv6rmpXMO7EK+XWUPnDFRWqitQFeY2UyZVryuWlI8ulLgGf19FooAUwC9gCWLcwzWPb7Wa60qdlZxjx6ooUuUqVQsK+y1VoAJyBeJAVsLJeYmg/RIXdG2kPhwYPBUQQyYF0XC8lwP3MTCrYAXB88556peCbUUZV7WccwkUQfCZC4PXdA5hKhSVhythZqjZM0J39w5m8BRadKAcrsIpNZsLIYdOqcZ9hExhZ1MH+QL+ciFzXzmYhZr/M6yUUwp2dp5U4naZDwAF5JRSefdScJZ3SkU0nl8xpaAy+7ml1EqvMXSs1HRrZ9bc3eZUSXmGa/mdyjbmqyX7A9RaYQa9IRJ0AAAAAElFTkSuQmCC';

    // Затримка зміни фону після фокуса, мс (більше — спокійніше під час гортання)
    var BG_DELAY = 900;
    var lastBg = '';

    // Обрані станції — на початок списку (true / false)
    var FAV_FIRST = true;

    // Кількість колонок плиток за шириною екрана (змінюйте за потреби)
    var TILE_COLS = [[600, 3], [820, 4], [1500, 5], [Infinity, 6]];

    // Кількість колонок для вигляду «лише логотипи» (трохи менші за плитки, але не дрібні)
    var LOGO_COLS = [[600, 4], [820, 5], [1500, 8], [Infinity, 8]];

    function calcCols() {
      var w = window.innerWidth || 360;
      var cols = viewMode === 'logos' ? LOGO_COLS : TILE_COLS;
      for (var i = 0; i < cols.length; i++) {
        if (w <= cols[i][0]) return cols[i][1];
      }
      return 4;
    }

    // Розмір «сторінки» підвантаження (кратний 3, 5 і 6 для плиток)
    function pageSize() {
      return viewMode === 'logos' ? 40 : viewMode === 'tiles' ? 30 : 10;
    }

    function onResize() {
      var box = html.find('.radio-content');
      if (box) box.style.setProperty('--radio-cols', calcCols());
    }

    // Повертає DOM-елемент станції за id. Якщо її ще немає в списку
    // (список підвантажується частинами), дозавантажує потрібні сторінки.
    function ensureEl(sid) {
      if (sid === null || sid === undefined || !scroll) return null;
      sid = String(sid);
      var idx = -1;
      for (var i = 0; i < filtred.length; i++) {
        if (String(filtred[i].id) === sid) { idx = i; break; }
      }
      if (idx < 0) return null;

      var size = pageSize(), guard = 0;
      while ((page + 1) * size <= idx && guard++ < 200) {
        page++;
        _this6.next();
      }

      var items = html.querySelectorAll('.radio-item');
      for (var j = 0; j < items.length; j++) {
        if (items[j].dataset && items[j].dataset.sid === sid) return items[j];
      }
      return null;
    }

    // Чи елемент повністю видно у вікні прокрутки (щоб не смикати список зайвий раз)
    // Не скролимо, якщо елемент видно і він не в останніх рядах (там скрол потрібен для підвантаження)
    function needScroll(el) {
      if (!fullyVisible(el)) return true;
      var all = html.querySelectorAll('.radio-item');
      return Array.prototype.indexOf.call(all, el) >= all.length - calcCols() * 2;
    }
    function fullyVisible(el) {
      try {
        var c = scroll.render(true).getBoundingClientRect(), r = el.getBoundingClientRect();
        var em = parseFloat(window.getComputedStyle(document.body).fontSize) || 16;
        // знизу запас під нижню панель, зверху — під підписи
        return r.height > 0 && r.top >= c.top + em && r.bottom <= c.bottom - em * 3;
      } catch (e) { return false; }
    }

    // Прокручує фоновий список до станції (без зміни фокуса), щоб вона не ховалась за екраном
    function revealStation(station) {
      if (!station) return;
      var el = ensureEl(station.id);
      if (el && needScroll(el)) scroll.update(el, true);
    }

    this.create = function () {
      var _this = this;
      this.activity.loader(true);
      Api.list().then(function (result) {
        _this.data = result;
        filtred = _this.data.stations;
        _this.build();
      })["catch"](function (e) {
        _this.data = { stations: [], genre: [] };
        _this.build();
      });
      return this.render();
    };

    this.background = function () {
      var bg = last ? last.background || img_bg : img_bg;
      if (bg === lastBg) return;
      lastBg = bg;
      Lampa.Background.change(bg); // плавна зміна замість різкого стрибка
    };

    // Домінантний колір логотипа для рамки фокуса (кеш, без помилок при CORS)
    var accentCache = {};
    function accentFrom(url, cb) {
      if (!url) return;
      if (accentCache[url]) { cb(accentCache[url]); return; }
      try {
        var im = new Image();
        im.crossOrigin = 'anonymous';
        im.onload = function () {
          try {
            var c = document.createElement('canvas');
            c.width = c.height = 16;
            var x = c.getContext('2d');
            x.drawImage(im, 0, 0, 16, 16);
            var d = x.getImageData(0, 0, 16, 16).data, r = 0, g = 0, b = 0, n = 0;
            for (var i = 0; i < d.length; i += 4) {
              if (d[i + 3] < 128) continue;
              var mx = Math.max(d[i], d[i + 1], d[i + 2]), mn = Math.min(d[i], d[i + 1], d[i + 2]);
              if (mx < 30 || mn > 225) continue;
              var w = 1 + (mx - mn) / 24;
              r += d[i] * w; g += d[i + 1] * w; b += d[i + 2] * w; n += w;
            }
            if (!n) return;
            var col = 'rgb(' + Math.round(r / n) + ',' + Math.round(g / n) + ',' + Math.round(b / n) + ')';
            accentCache[url] = col;
            cb(col);
          } catch (e) {}
        };
        im.src = url;
      } catch (e) {}
    }

    function onNowPlaying(e) {
      var bar = html.find('.radio-nowbar');
      if (!bar) return;
      var d = (e && e.detail) || {};
      if (!d.station) { bar.classList.add('hide'); return; }
      bar.classList.remove('hide');
      var im = bar.querySelector('img');
      if (im && im.getAttribute('data-src') !== d.station.bg_image_mobile) {
        im.setAttribute('data-src', d.station.bg_image_mobile || '');
        im.src = d.station.bg_image_mobile || '';
      }
      renderBarTicker(bar.querySelector('.radio-nowbar__track'), d.station, d.track);
    }

    // Один рядок: трек (виконавець — назва), а коли треку немає — слоган. Стрічка, якщо не вміщається
    var barKey = null;
    function renderBarTicker(box, station, info) {
      if (!box) return;
      var slogan = String(station.tooltip || '').replace(/\s+/g, ' ').trim();
      var text = info ? String(info) : slogan;
      var key = String(station.id) + '\u0002' + text;
      if (key === barKey) return;
      barKey = key;
      box.textContent = '';
      if (!text) return;
      var span = document.createElement('span');
      span.className = 'radio-nowbar__in';
      span.textContent = text;
      box.appendChild(span);
      if (box.clientWidth > 0 && span.offsetWidth > box.clientWidth) {
        var gap = '\u2003\u2003\u2003\u2003';
        span.textContent = text + gap + text + gap;
        span.style.animationDuration = Math.max(6, Math.round(span.offsetWidth / 2 / TRACK_SCROLL_SPEED)) + 's';
        span.classList.add('run');
      }
    }

    this.build = function () {
      var _this2 = this;
      this.activity.loader(false);
      html.append(Lampa.Template.js('radio_content'));
      scroll = new Lampa.Scroll({ mask: true, over: true });

      scroll.onEnd = function () {
        page++;
        _this2.next();
      };

      html.find('.radio-content__list').append(scroll.render(true));
      scroll.minus(html.find('.radio-content__head'));

      // позначаємо контейнер елементів для сітки плиток
      var gridBody = scroll.body ? scroll.body(true) : html.querySelector('.scroll__body');
      if (gridBody && gridBody.classList) gridBody.classList.add('radio-grid');

      this.buildCatalog();
      this.buildSearch();
      this.buildView();
      this.applyView();
      window.addEventListener('resize', onResize);
      window.addEventListener('radio:nowplaying', onNowPlaying);
      if (globalStation) onNowPlaying({ detail: { station: globalStation, track: globalNowTrack } });
      this.display();
      Lampa.Layer.update(html);
    };

    this.clearButtons = function (category, search) {
      var btn_catalog = html.find('.button--catalog');
      var btn_search = html.find('.button--search');
      btn_catalog.find('div').addClass('hide').text('');
      btn_search.find('div').addClass('hide').text('');

      if (category) btn_catalog.find('div').removeClass('hide').text(category);
      else btn_search.find('div').removeClass('hide').text(search);
    };

    this.buildCatalog = function () {
      var _this3 = this;
      var btn = html.find('.button--catalog');

      // Пункти меню збираємо щоразу при відкритті: обране могло змінитись, поки ми в плагіні
      function catalogItems() {
        var favs = Favorites.get().length;
        var items = [{
          title: Lampa.Lang.translate('settings_input_links'),
          ghost: !favs,
          noenter: !favs,
          favorite: true
        }];
        if (_this3.data.stations.length) {
          items.push({
            title: Lampa.Lang.translate('settings_param_jackett_interview_all'),
            all: true
          });
          if (_this3.data.genre) {
            _this3.data.genre.forEach(function (g) {
              items.push({ title: g.name, id: g.id });
            });
          }
        }
        return items;
      }

      if (Favorites.get().length) {
        filtred = Favorites.get();
        this.clearButtons(catalogItems()[0].title, false);
      }

      btn.on('hover:enter', function () {
        Lampa.Select.show({
          title: Lampa.Lang.translate('title_catalog'),
          items: catalogItems(),
          onSelect: function onSelect(a) {
            if (a.favorite) {
              filtred = Favorites.get();
            } else if (a.all) filtred = _this3.data.stations;
            else {
              filtred = _this3.data.stations.filter(function (s) {
                return s.genre.find(function (g) { return g.id == a.id; });
              });
            }
            _this3.clearButtons(a.title, false);
            _this3.display();
          },
          onBack: function onBack() {
            Lampa.Controller.toggle('content');
          }
        });
      });
    };

    // Застосовує поточний вигляд (список / плитки)
    this.applyView = function () {
      var box = html.find('.radio-content');
      if (!box) return;
      box.classList.toggle('radio-content--tiles', viewMode !== 'list');
      box.classList.toggle('radio-content--logos', viewMode === 'logos');
      box.style.setProperty('--radio-cols', calcCols());
    };

    // Кнопка перемикання вигляду в шапці
    this.buildView = function () {
      var _this8 = this;
      html.find('.button--view').on('hover:enter', function () {
        var cur = last && last.dataset ? last.dataset.sid : null;
        viewMode = viewMode === 'list' ? 'tiles' : viewMode === 'tiles' ? 'logos' : 'list';
        try { Lampa.Storage.set('radio_view', viewMode); } catch (e) {}
        _this8.applyView();
        focusSid = cur; // після перебудови повертаємо фокус на ту саму станцію
        _this8.display();
      });
    };

    this.buildSearch = function () {
      var _this5 = this;
      var btn = html.find('.button--search');
      btn.on('hover:enter', function () {
        Lampa.Input.edit({
          free: true,
          nosave: true,
          nomic: true,
          value: ''
        }, function (val) {
          if (val) {
            val = val.toLowerCase();
            filtred = _this5.data.stations.filter(function (s) {
              return s.title.toLowerCase().indexOf(val) >= 0 || (s.tooltip || '').toLowerCase().indexOf(val) >= 0;
            });
            _this5.clearButtons(false, val);
            _this5.display();
          } else {
            Lampa.Controller.toggle('content');
          }
        });
      });
    };

    this.display = function () {
      if (FAV_FIRST && filtred.length > 1) {
        var fv = [], rest = [];
        filtred.forEach(function (st) { (Favorites.find(st) ? fv : rest).push(st); });
        if (fv.length && rest.length) filtred = fv.concat(rest);
      }
      scroll.clear();
      scroll.reset();
      last = false;
      page = 0;

      if (filtred.length) this.next();
      else {
        for (var i = 0; i < 3; i++) {
          var empty = Lampa.Template.js('radio_list_item');
          empty.addClass('empty--item');
          empty.style.opacity = 1 - 0.3 * i;
          scroll.append(empty);
        }
        Lampa.Layer.visible(scroll.render(true));
      }
      focusPlaying = firstDisplay;
      firstDisplay = false;
      this.activity.toggle();
    };

    this.next = function () {
      var views = pageSize();
      var start = page * views;
      filtred.slice(start, start + views).forEach(_this6.append.bind(_this6));
      Lampa.Layer.visible(scroll.render(true));
    };

    this.play = function (station) {
      played = station;

      // Не перезапускаємо потік, якщо ця станція вже грає
      var alreadyPlaying = globalStation && globalStation.id === station.id && globalAudio && !globalAudio.paused;
      if (!alreadyPlaying) playGlobalAudio(station);

      // фоновий список прокручується до станції, що грає
      revealStation(station);

      var player;
      var busy = false;

      var move = function move(d) {
        if (busy) return; // захист від подвійного спрацювання
        var total = filtred.length;
        if (!total) return;
        busy = true;
        var pos = filtred.indexOf(played) + d;
        if (pos < 0) pos = total - 1;
        if (pos >= total) pos = 0;
        player.destroy();
        _this6.play(filtred[pos]);
      };

      player = new Player(station, {
        prev: function () { move(-1); },
        next: function () { move(1); }
      });
      player.create();

      Lampa.Background.change(station.bg_image_mobile || img_bg);
      Lampa.Controller.add('content', {
        invisible: true,
        toggle: function toggle() { Lampa.Controller.clear(); },
        back: function back() {
          focusPlaying = true;
          player.destroy();
          _this6.activity.toggle();
          Lampa.Controller.toggle('content');
        },
        up: function up() { move(-1); },
        down: function down() { move(1); }
      });
      Lampa.Controller.toggle('content');
    };

    this.append = function (station) {
      var _this7 = this;
      var item = Lampa.Template.js('radio_list_item');
      item.find('.radio-item__num').text((filtred.indexOf(station) + 1).pad(2));
      item.find('.radio-item__title').text(station.title);
      item.find('.radio-item__tooltip').text(station.tooltip || station.stream);
      item.background = station.bg_image_mobile || img_bg;
      item.dataset.sid = String(station.id);
      var img_box = item.find('.radio-item__cover-box');
      var img_elm = item.find('img');

      img_elm.onload = function () { img_box.addClass('loaded'); };
      img_elm.onerror = function () {
        img_elm.src = './img/icons/menu/movie.svg';
        img_box.addClass('loaded-icon');
      };
      img_elm.src = station.bg_image_mobile;

      if (globalStation && String(globalStation.id) === String(station.id)) {
        item.addClass('playing');
      } else {
        item.removeClass('playing');
      }

      item.on('hover:focus hover:hover', function () {
        last = item;
        clearTimeout(bgTimer);
        bgTimer = setTimeout(function () {
          var bg = item.background || img_bg;
          if (bg === lastBg) return; // той самий фон — не чіпаємо
          lastBg = bg;
          Lampa.Background.change(bg);
        }, BG_DELAY);
      });
      item.on('hover:focus', function () {
        if (needScroll(item)) scroll.update(item);
      });
      item.on('hover:enter', function () { _this7.play(station); });
      item.on('hover:long', function () {
        if (station.user) {
          Lampa.Select.show({
            title: Lampa.Lang.translate('menu_settings'),
            items: [
              { title: Lampa.Lang.translate('extensions_change_name'), change: 'title' },
              { title: Lampa.Lang.translate('extensions_change_link'), change: 'stream' },
              { title: Lampa.Lang.translate('extensions_remove'), remove: true }
            ],
            onSelect: function onSelect(a) {
              if (a.remove) {
                Favorites.remove(station);
                item.remove();
                last = false;
                Lampa.Controller.toggle('content');
              } else {
                Lampa.Input.edit({
                  free: true, nosave: true, nomic: true, value: station[a.change] || ''
                }, function (val) {
                  if (val) {
                    station[a.change] = val;
                    Favorites.update(station);
                    item.find('.radio-item__' + (a.change == 'title' ? 'title' : 'tooltip')).text(val);
                  }
                  Lampa.Controller.toggle('content');
                });
              }
            },
            onBack: function onBack() { Lampa.Controller.toggle('content'); }
          });
        } else {
          Favorites.toggle(station);
          item.toggleClass('favorite', Boolean(Favorites.find(station)));
        }
      });
      item.toggleClass('favorite', Boolean(Favorites.find(station)));
      if (!last) last = item;
      if (Lampa.Controller.own(this)) Lampa.Controller.collectionAppend(item);
      scroll.append(item);
    };

    this.start = function () {
      if (Lampa.Activity.active() && Lampa.Activity.active().activity !== this.activity) return;
      this.background();
      Lampa.Controller.add('content', {
        link: this,
        invisible: true,
        toggle: function toggle() {
          var target = null;
          if (focusSid !== null) {
            target = ensureEl(focusSid);
          } else if (focusPlaying && globalStation) {
            target = ensureEl(globalStation.id);
          }
          focusSid = null;
          focusPlaying = false;
          if (target) last = target;

          // повернення (з плеєра): якщо станцію вже видно — список не прокручуємо взагалі
          var keep = !!target && !needScroll(target);
          Lampa.Controller.collectionSet(html);
          Lampa.Controller.collectionFocus(target || last, html);
          if (target && !keep) {
            scroll.update(target, true);
          }
        },
        left: function left() {
          if (Navigator.canmove('left')) Navigator.move('left');
          else Lampa.Controller.toggle('menu');
        },
        right: function right() { Navigator.move('right'); },
        up: function up() {
          if (Navigator.canmove('up')) { Navigator.move('up'); return; }
          // з першого ряду — спершу на кнопки шапки плагіна (найближча по горизонталі), і лише потім у шапку Lampa
          var onHead = html.querySelector('.radio-content__head .selector.focus');
          var cur = html.querySelector('.radio-item.focus');
          var btns = onHead ? [] : Array.prototype.slice.call(html.querySelectorAll('.radio-content__head .selector'));
          if (cur && btns.length) {
            var cr = cur.getBoundingClientRect(), cx = cr.left + cr.width / 2, best = null, bd = 1e9;
            btns.forEach(function (b) {
              var r = b.getBoundingClientRect();
              if (!r.width) return;
              var d = Math.abs(r.left + r.width / 2 - cx);
              if (d < bd) { bd = d; best = b; }
            });
            if (best) { Lampa.Controller.collectionFocus(best, html); return; }
          }
          Lampa.Controller.toggle('head');
        },
        down: function down() {
          // з кнопки шапки — на найближчу по горизонталі станцію першого видимого ряду
          var from = html.querySelector('.radio-content__head .selector.focus');
          if (from) {
            var c = scroll.render(true).getBoundingClientRect();
            var em = parseFloat(window.getComputedStyle(document.body).fontSize) || 16;
            var fr = from.getBoundingClientRect(), fx = fr.left + fr.width / 2;
            var cand = [], minTop = 1e9;
            Array.prototype.forEach.call(html.querySelectorAll('.radio-item'), function (el) {
              var r = el.getBoundingClientRect();
              if (!r.width || r.bottom <= c.top + em * 2) return;
              cand.push({ el: el, r: r });
              if (r.top < minTop) minTop = r.top;
            });
            var best = null, bd = 1e9;
            cand.forEach(function (o) {
              if (o.r.top > minTop + 8) return;
              var d = Math.abs(o.r.left + o.r.width / 2 - fx);
              if (d < bd) { bd = d; best = o.el; }
            });
            if (best) { Lampa.Controller.collectionFocus(best, html); return; }
          }
          Navigator.move('down');
        },
        back: function back() { Lampa.Activity.backward(); }
      });
      Lampa.Controller.toggle('content');
    };

    this.pause = function () {};
    this.stop = function () {};
    this.render = function () { return html; };
    this.destroy = function () {
      clearTimeout(bgTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('radio:nowplaying', onNowPlaying);
      if (scroll) scroll.destroy();
      html.remove();
    };
  }

  // =========================================
  // START PLUGIN
  // =========================================
  
  function startPlugin() {
    window.plugin_record_ready = true;

    Lampa.Lang.add({
      radio_station: {
        uk: 'Радіо',
        en: 'Radio'
      },
      radio_add_station: {
        uk: 'Введіть адресу радіостанції',
        en: 'Enter the radio station address'
      },
      radio_load_error: {
        uk: 'Помилка завантаження потоку',
        en: 'Error loading stream'
      }
    });

    var manifest = {
      type: 'audio',
      version: '1.16.2',
      name: Lampa.Lang.translate('radio_station'),
      description: 'Українські радіостанції',
      component: 'radio'
    };
    Lampa.Manifest.plugins = manifest;

    Lampa.Template.add('radio_content', "\n        <div class=\"radio-content\">\n            <div class=\"radio-content__head\">\n                <div class=\"simple-button simple-button--invisible simple-button--filter selector button--catalog\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" xml:space=\"preserve\">\n                        <path fill=\"currentColor\" d=\"M478.354,146.286H33.646c-12.12,0-21.943,9.823-21.943,21.943v321.829c0,12.12,9.823,21.943,21.943,21.943h444.709\n                            c12.12,0,21.943-9.823,21.943-21.943V168.229C500.297,156.109,490.474,146.286,478.354,146.286z M456.411,468.114H55.589V190.171\n                            h400.823V468.114z\"/>\n                        <path fill=\"currentColor\" d=\"M441.783,73.143H70.217c-12.12,0-21.943,9.823-21.943,21.943c0,12.12,9.823,21.943,21.943,21.943h371.566\n                            c12.12,0,21.943-9.823,21.943-21.943C463.726,82.966,453.903,73.143,441.783,73.143z\"/>\n                        <path fill=\"currentColor\" d=\"M405.211,0H106.789c-12.12,0-21.943,9.823-21.943,21.943c0,12.12,9.823,21.943,21.943,21.943h298.423\n                            c12.12,0,21.943-9.823,21.943-21.943C427.154,9.823,417.331,0,405.211,0z\"/>\n                    </svg>\n                    <div class=\"hide\"></div>\n                </div>\n                <div class=\"simple-button simple-button--invisible simple-button--filter selector button--search\">\n                    <svg width=\"23\" height=\"22\" viewBox=\"0 0 23 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\">\n                        <circle cx=\"9.9964\" cy=\"9.63489\" r=\"8.43556\" stroke=\"currentColor\" stroke-width=\"2.4\"></circle>\n                        <path d=\"M20.7768 20.4334L18.2135 17.8701\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"></path>\n                    </svg>\n                    <div class=\"hide\"></div>\n                </div>\n                <div class=\"simple-button simple-button--invisible simple-button--filter selector button--view\">\n                    <svg class=\"view-ico view-ico--tiles\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path fill=\"currentColor\" d=\"M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z\"/>\n                    </svg>\n                    <svg class=\"view-ico view-ico--list\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path fill=\"currentColor\" d=\"M3 5h18v3H3V5zm0 5.5h18v3H3v-3zM3 16h18v3H3v-3z\"/>\n                    </svg>\n                    <svg class=\"view-ico view-ico--logos\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path fill=\"currentColor\" d=\"M3 3h5v5H3V3zm6.5 0h5v5h-5V3zM16 3h5v5h-5V3zM3 9.5h5v5H3v-5zm6.5 0h5v5h-5v-5zm6.5 0h5v5h-5v-5zM3 16h5v5H3v-5zm6.5 0h5v5h-5v-5zm6.5 0h5v5h-5v-5z\"/>\n                    </svg>\n                </div>\n                <div class=\"radio-nowbar hide\"><img /><div class=\"radio-nowbar__text\"><div class=\"radio-nowbar__track\"></div></div></div>\n            </div>\n            <div class=\"radio-content__body\">\n                <div class=\"radio-content__list\"></div>\n            </div>\n        </div>\n    ");
    
    Lampa.Template.add('radio_cover', "\n        <div class=\"radio-cover\">\n            <div class=\"radio-cover__img-container\">\n                <div class=\"radio-cover__img-box\">\n                    <img />\n                </div>\n            </div>\n            <div class=\"radio-cover__title\"></div>\n            <div class=\"radio-cover__tooltip\"></div>\n        </div>\n    ");
    
    Lampa.Template.add('radio_list_item', "\n        <div class=\"radio-item selector layer--visible\">\n            <div class=\"radio-item__num\"></div>\n            <div class=\"radio-item__cover\">\n                <div class=\"radio-item__cover-box\">\n                    <img />\n                </div>\n                <div class=\"radio-item__shade\"><i></i><i></i><i></i><i></i><i></i></div>\n            </div>\n            <div class=\"radio-item__body\">\n                <div class=\"radio-item__title\"></div>\n                <div class=\"radio-item__tooltip\"></div>\n            </div>\n            <div class=\"radio-item__wave\">\n                <i></i><i></i><i></i><i></i><i></i>\n            </div>\n            <div class=\"radio-item__icons\">\n                <div class=\"radio-item__icon-favorite\">\n                    <svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\" fill=\"url(#radio-ua-grad)\" stroke=\"rgba(255,255,255,0.55)\" stroke-width=\"1.4\" stroke-linejoin=\"round\" paint-order=\"stroke\"/>\n                    </svg>\n                </div>\n                <div class=\"radio-item__icon-play\">\n                    <svg width=\"22\" height=\"25\" viewBox=\"0 0 22 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M21 10.7679C22.3333 11.5377 22.3333 13.4622 21 14.232L3.75 24.1913C2.41666 24.9611 0.75 23.9989 0.75 22.4593L0.750001 2.5407C0.750001 1.0011 2.41667 0.0388526 3.75 0.808653L21 10.7679Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n            </div>\n        </div>\n    ");
    
    Lampa.Template.add('radio_player', "\n        <div class=\"radio-player\">\n            <div class=\"radio-player__content\">\n                <div class=\"radio-player__cover\"></div>\n                <div class=\"radio-player__wave\"></div>\n                <div class=\"radio-player__controls\">\n                    <div class=\"radio-player__btn radio-player__prev\">\n                        <svg viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M6 6h2v12H6zm3.5 6l8.5 6V6z\"/></svg>\n                    </div>\n                    <div class=\"radio-player__btn radio-player__next\">\n                        <svg viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z\"/></svg>\n                    </div>\n                </div>\n            </div>\n            <div class=\"radio-player__close\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 329.269 329\" xml:space=\"preserve\">\n                    <path d=\"M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0\" fill=\"currentColor\"></path>\n                </svg>\n            </div>\n        </div>\n    ");
    
    Lampa.Template.add('radio_mini_player', "\n        <div class=\"selector radio-mini-player hide stop\">\n            <div class=\"radio-mini-player__button\">\n                <i></i>\n                <i></i>\n                <i></i>\n                <i></i>\n            </div>\n            <div class=\"radio-mini-player__name\"></div>\n        </div>\n    ");

    Lampa.Template.add('radio_style', "\n        <style>\n        .radio-content{padding:0 1.5em}.radio-content__head{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;padding:1.5em 0}.radio-content__body{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.radio-content__list{width:100%}@media screen and (max-width:576px){.radio-content__list{width:100%}}.radio-cover{text-align:center;line-height:1.4}.radio-cover__img-container{max-width:20em;margin:0 auto}.radio-cover__img-box{position:relative;padding-bottom:100%;background-color:rgba(0,0,0,0.3);-webkit-border-radius:1em;-moz-border-radius:1em;border-radius:1em}.radio-cover__img-box>img{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-border-radius:1em;-moz-border-radius:1em;border-radius:1em;opacity:0}.radio-cover__img-box.loaded{background-color:transparent}.radio-cover__img-box.loaded>img{opacity:1}.radio-cover__img-box.loaded-icon{background-color:rgba(0,0,0,0.3)}.radio-cover__img-box.loaded-icon>img{left:20%;top:20%;width:60%;height:60%;opacity:.2}.radio-cover__title{font-weight:700;font-size:1.5em;margin-top:1em}.radio-cover__tooltip{font-weight:300;font-size:1.3em;margin-top:.2em}.radio-item{padding:1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;line-height:1.4}.radio-item__num{font-weight:700;margin-right:1em;font-size:1.3em;opacity:.4;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}@media screen and (max-width:400px){.radio-item__num{display:none}}.radio-item__body{max-width:60%}.radio-item__cover{width:5em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin-right:2em}.radio-item__cover-box{position:relative;padding-bottom:100%;background-color:rgba(0,0,0,0.3);-webkit-border-radius:1em;-moz-border-radius:1em;border-radius:1em}.radio-item__cover-box>img{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-border-radius:1em;-moz-border-radius:1em;border-radius:1em;opacity:0}.radio-item__cover-box.loaded{background-color:transparent}.radio-item__cover-box.loaded>img{opacity:1}.radio-item__cover-box.loaded-icon{background-color:rgba(0,0,0,0.3)}.radio-item__cover-box.loaded-icon>img{left:20%;top:20%;width:60%;height:60%;opacity:.2}\n\n/* ===== ТЕКСТ У СПИСКУ - БЕЗ ПІДКЛАДКИ ===== */\n.radio-item__title {\n    font-weight:700;\n    font-size:1.2em;\n    text-shadow: 0 1px 2px rgba(0,0,0,0.7);\n    transition: color 0.3s ease;\n}\n.radio-item__tooltip {\n    opacity:.5;\n    margin-top:.5em;\n    font-size:1.1em;\n    text-shadow: 0 1px 2px rgba(0,0,0,0.7);\n    transition: color 0.3s ease;\n}\n.radio-item__num {\n    transition: color 0.3s ease, opacity 0.3s ease;\n}\n\n/* ===== ЗЕЛЕНИЙ ТЕКСТ ДЛЯ АКТИВНОЇ СТАНЦІЇ ===== */\n.radio-item.playing .radio-item__title {\n    color: #00ff00 !important;\n    text-shadow: 0 1px 2px rgba(0,0,0,0.7) !important;\n}\n.radio-item.playing .radio-item__tooltip {\n    color: #66ff66 !important;\n    text-shadow: 0 1px 2px rgba(0,0,0,0.7) !important;\n    opacity: 0.9 !important;\n}\n.radio-item.playing .radio-item__num {\n    color: #00ff00 !important;\n    opacity: 1 !important;\n}\n\n.radio-item__icons{margin-left:auto;padding-left:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.radio-item__icons svg{width:1.4em !important;height:1.4em !important}.radio-item__icons>*+*{margin-left:1.5em}.radio-item__icons .radio-item__icon-favorite{display:none}.radio-item__icons .radio-item__icon-play{display:none}.radio-item.focus{background:white;color:#000;-webkit-border-radius:1em;-moz-border-radius:1em;border-radius:1em}.radio-item.focus .radio-item__icon-play{display:block}.radio-item.favorite .radio-item__icon-favorite{display:block}.radio-item.playing{background:rgba(0,255,0,0.08);border:1px solid rgba(0,255,0,0.25);border-radius:1em}.radio-item.empty--item .radio-item__title,.radio-item.empty--item .radio-item__num,.radio-item.empty--item .radio-item__tooltip{background-color:rgba(255,255,255,0.3);height:1.2em;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.radio-item.empty--item .radio-item__num{width:1.4em}.radio-item.empty--item .radio-item__title{width:7em}.radio-item.empty--item .radio-item__tooltip{width:16em}.radio-item.empty--item .radio-item__icons{display:none}.radio-item.empty--item .radio-item__cover-box{background-color:rgba(255,255,255,0.3)}.radio-item.empty--item.focus{background-color:transparent;color:#fff}\n\n/* ===== ЕКВАЛАЙЗЕР В СПИСКУ ДЛЯ АКТИВНОЇ СТАНЦІЇ ===== */\n.radio-item__wave {\n    display: none;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -moz-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -moz-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    margin-left: auto;\n    padding-left: 0.5em;\n    -webkit-flex-shrink: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    height: 2.5em;\n    gap: 2px;\n}\n\n.radio-item.playing .radio-item__wave {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.radio-item__wave i {\n    display: block;\n    width: 3px;\n    background-color: #00ff00;\n    border-radius: 1px;\n    height: 0.8em;\n    -webkit-animation: wavePlay 0.8s ease-in-out infinite alternate;\n    -moz-animation: wavePlay 0.8s ease-in-out infinite alternate;\n    -o-animation: wavePlay 0.8s ease-in-out infinite alternate;\n    animation: wavePlay 0.8s ease-in-out infinite alternate;\n}\n\n.radio-item__wave i:nth-child(1) { -webkit-animation-delay: 0s; animation-delay: 0s; height: 0.5em; }\n.radio-item__wave i:nth-child(2) { -webkit-animation-delay: 0.1s; animation-delay: 0.1s; height: 1.2em; }\n.radio-item__wave i:nth-child(3) { -webkit-animation-delay: 0.2s; animation-delay: 0.2s; height: 1.8em; }\n.radio-item__wave i:nth-child(4) { -webkit-animation-delay: 0.3s; animation-delay: 0.3s; height: 1.0em; }\n.radio-item__wave i:nth-child(5) { -webkit-animation-delay: 0.4s; animation-delay: 0.4s; height: 0.6em; }\n\n@-webkit-keyframes wavePlay {\n    0% { -webkit-transform: scaleY(0.3); transform: scaleY(0.3); opacity: 0.4; }\n    100% { -webkit-transform: scaleY(1); transform: scaleY(1); opacity: 1; }\n}\n@-moz-keyframes wavePlay {\n    0% { -moz-transform: scaleY(0.3); transform: scaleY(0.3); opacity: 0.4; }\n    100% { -moz-transform: scaleY(1); transform: scaleY(1); opacity: 1; }\n}\n@-o-keyframes wavePlay {\n    0% { -o-transform: scaleY(0.3); transform: scaleY(0.3); opacity: 0.4; }\n    100% { -o-transform: scaleY(1); transform: scaleY(1); opacity: 1; }\n}\n@keyframes wavePlay {\n    0% { -webkit-transform: scaleY(0.3); -moz-transform: scaleY(0.3); -o-transform: scaleY(0.3); transform: scaleY(0.3); opacity: 0.4; }\n    100% { -webkit-transform: scaleY(1); -moz-transform: scaleY(1); -o-transform: scaleY(1); transform: scaleY(1); opacity: 1; }\n}\n\n/* ===== ПОВНОЕКРАННИЙ ПЛЕЄР ===== */\n.radio-player {\n    position:fixed;\n    z-index:100;\n    left:0;\n    top:0;\n    width:100%;\n    height:100%;\n    display:-webkit-box;\n    display:-webkit-flex;\n    display:-moz-box;\n    display:-ms-flexbox;\n    display:flex;\n    -webkit-box-align:center;\n    -webkit-align-items:center;\n    -moz-box-align:center;\n    -ms-flex-align:center;\n    align-items:center;\n    -webkit-box-pack:center;\n    -webkit-justify-content:center;\n    -moz-box-pack:center;\n    -ms-flex-pack:center;\n    justify-content:center;\n}\n\n/* ТЕМНИЙ ФОН (без blur заради продуктивності) */\n.radio-player {\n    background: rgba(0,0,0,0.85);\n}\n\n/* СУЦІЛЬНА ПІДКЛАДКА ДЛЯ ВСЬОГО КОНТЕНТУ */\n.radio-player__content {\n    position:relative;\n    background: rgba(0, 0, 0, 0.65);\n    padding: 2em 3em;\n    border-radius: 1.5em;\n    max-width: 30em;\n    width: 100%;\n    box-shadow: 0 8px 24px rgba(0,0,0,0.6);\n    border: 1px solid rgba(255,255,255,0.08);\n}\n\n.radio-player__cover{width:100%}.radio-player__track{margin:.7em auto 0;padding:0;width:88%;max-width:88%;text-align:center;font-size:1.2em;line-height:1.4;font-weight:600;overflow:hidden;white-space:nowrap;-webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}.radio-player__track-in{display:inline-block;white-space:nowrap;color:#ffd700}.radio-player__track-in i{font-style:normal;font-size:1.3em;line-height:1;vertical-align:-.08em;color:#4da3ff}.radio-player__track-in.run{-webkit-animation:radioTrackRun 12s linear infinite;animation:radioTrackRun 12s linear infinite;will-change:transform}@-webkit-keyframes radioTrackRun{0%{-webkit-transform:translateX(0)}100%{-webkit-transform:translateX(-50%)}}@keyframes radioTrackRun{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.radio-player__track:empty{display:none}.radio-player__track+.radio-player__controls{margin-top:1.3em}.radio-player__wave{margin-top:1em;padding:.6em 0}.radio-player__wave>div.live{opacity:1;will-change:transform,opacity;-webkit-transform:scaleY(.15);transform:scaleY(.15)}.radio-player__wave{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-top:1.5em;padding:1em 0}.radio-player__wave>div{width:4px;background-color:#00ff00;margin:0 .3em;height:3.4em;opacity:0;border-radius:2px}.radio-player__wave>div.loading{-webkit-animation:radioAnimationWaveLoading 400ms ease infinite;-moz-animation:radioAnimationWaveLoading 400ms ease infinite;-o-animation:radioAnimationWaveLoading 400ms ease infinite;animation:radioAnimationWaveLoading 400ms ease infinite}.radio-player__wave>div.play{-webkit-animation:radioAnimationWavePlay 50ms linear infinite alternate;-moz-animation:radioAnimationWavePlay 50ms linear infinite alternate;-o-animation:radioAnimationWavePlay 50ms linear infinite alternate;animation:radioAnimationWavePlay 50ms linear infinite alternate}.radio-player__close{position:fixed;top:1.5em;right:50%;margin-right:-2em;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;padding:1em;display:none;background-color:rgba(255,255,255,0.1)}.radio-player__close>svg{width:1.5em;height:1.5em}body.true--mobile .radio-player__close{display:block}\n\n/* МІНІ-ПЛЕЄР В ГОЛОВІ - БЕЗ НАЗВИ */\n.radio-mini-player {\n    display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;\n    -webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;\n    -webkit-border-radius:0.3em;-moz-border-radius:0.3em;border-radius:0.3em;\n    padding:0.2em 0.4em;\n    margin-left:0.5em;\n    margin-right:0.5em;\n    cursor:pointer;\n}\n.radio-mini-player__name {\n    display:none !important;\n}\n.radio-mini-player__button {\n    position:relative;\n    width:2.2em;\n    height:2.2em;\n    display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;\n    -webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;\n    -webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;\n    -webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;\n    -webkit-border-radius:0.3em;-moz-border-radius:0.3em;border-radius:0.3em;\n    border:0.15em solid rgba(255,255,255,0.8);\n    background-size:cover !important;\n    background-position:center !important;\n    cursor:pointer;\n}\n.radio-mini-player__button i {\n    display:block;\n    width:0.2em;\n    height:1em;\n    background-color:#00ff00;\n    margin:0 0.1em;\n    -webkit-animation:sound 0ms -800ms linear infinite alternate;\n    -moz-animation:sound 0ms -800ms linear infinite alternate;\n    -o-animation:sound 0ms -800ms linear infinite alternate;\n    animation:sound 0ms -800ms linear infinite alternate;\n    -webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;\n    border-radius:1px;\n}\n.radio-mini-player__button i:nth-child(1){-webkit-animation-duration:474ms;-moz-animation-duration:474ms;-o-animation-duration:474ms;animation-duration:474ms}\n.radio-mini-player__button i:nth-child(2){-webkit-animation-duration:433ms;-moz-animation-duration:433ms;-o-animation-duration:433ms;animation-duration:433ms}\n.radio-mini-player__button i:nth-child(3){-webkit-animation-duration:407ms;-moz-animation-duration:407ms;-o-animation-duration:407ms;animation-duration:407ms}\n.radio-mini-player__button i:nth-child(4){-webkit-animation-duration:458ms;-moz-animation-duration:458ms;-o-animation-duration:458ms;animation-duration:458ms}\n.radio-mini-player.stop .radio-mini-player__button i{display:none}\n.radio-mini-player.stop .radio-mini-player__button:after{\n    content:\"\";\n    width:0.6em;\n    height:0.6em;\n    background-color:rgba(255,255,255,0.9);\n    border-radius:0.1em;\n}\n.radio-mini-player.loading .radio-mini-player__button i{display:none}\n.radio-mini-player.loading .radio-mini-player__button:before{\n    content:\"\";\n    display:block;\n    border-top:0.2em solid rgba(0,255,0,0.9);\n    border-left:0.2em solid transparent;\n    border-right:0.2em solid transparent;\n    border-bottom:0.2em solid transparent;\n    -webkit-animation:sound-loading 1s linear infinite;\n    -moz-animation:sound-loading 1s linear infinite;\n    -o-animation:sound-loading 1s linear infinite;\n    animation:sound-loading 1s linear infinite;\n    width:0.9em;height:0.9em;\n    -webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;\n    -webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;\n}\n.radio-mini-player.focus{background-color:#fff;color:#000}\n.radio-mini-player.focus .radio-mini-player__button{border-color:#000}\n.radio-mini-player.focus .radio-mini-player__button i,\n.radio-mini-player.focus .radio-mini-player__button:after{background-color:#000}\n.radio-mini-player.focus .radio-mini-player__button:before{border-top-color:#000}\n.radio-mini-player.hide{display:none}\n\n@-webkit-keyframes sound{0%{-webkit-transform:scaleY(0.1)}100%{-webkit-transform:scaleY(1)}}\n@-moz-keyframes sound{0%{-moz-transform:scaleY(0.1)}100%{-moz-transform:scaleY(1)}}\n@-o-keyframes sound{0%{-o-transform:scaleY(0.1)}100%{-o-transform:scaleY(1)}}\n@keyframes sound{0%{transform:scaleY(0.1)}100%{transform:scaleY(1)}}\n@-webkit-keyframes sound-loading{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\n@-moz-keyframes sound-loading{0%{-moz-transform:rotate(0deg);transform:rotate(0deg)}100%{-moz-transform:rotate(360deg);transform:rotate(360deg)}}\n@-o-keyframes sound-loading{0%{-o-transform:rotate(0deg);transform:rotate(0deg)}100%{-o-transform:rotate(360deg);transform:rotate(360deg)}}\n@keyframes sound-loading{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}\n\n@-webkit-keyframes radioAnimationWaveLoading{0%{-webkit-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:0.5}10%{-webkit-transform:scale3d(1,1.5,1);transform:scale3d(1,1.5,1);opacity:1}20%{-webkit-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:0.5}100%{-webkit-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:0.5}}\n@-moz-keyframes radioAnimationWaveLoading{0%{-moz-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:0.5}10%{-moz-transform:scale3d(1,1.5,1);transform:scale3d(1,1.5,1);opacity:1}20%{-moz-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:0.5}100%{-moz-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:0.5}}\n@-o-keyframes radioAnimationWaveLoading{0%{transform:scale3d(1,0.3,1);opacity:0.5}10%{transform:scale3d(1,1.5,1);opacity:1}20%{transform:scale3d(1,0.3,1);opacity:0.5}100%{transform:scale3d(1,0.3,1);opacity:0.5}}\n@keyframes radioAnimationWaveLoading{0%{-webkit-transform:scale3d(1,0.3,1);-moz-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:0.5}10%{-webkit-transform:scale3d(1,1.5,1);-moz-transform:scale3d(1,1.5,1);transform:scale3d(1,1.5,1);opacity:1}20%{-webkit-transform:scale3d(1,0.3,1);-moz-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:0.5}100%{-webkit-transform:scale3d(1,0.3,1);-moz-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:0.5}}\n@-webkit-keyframes radioAnimationWavePlay{0%{-webkit-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:0.3}100%{-webkit-transform:scale3d(1,2,1);transform:scale3d(1,2,1);opacity:1}}\n@-moz-keyframes radioAnimationWavePlay{0%{-moz-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:0.3}100%{-moz-transform:scale3d(1,2,1);transform:scale3d(1,2,1);opacity:1}}\n@-o-keyframes radioAnimationWavePlay{0%{transform:scale3d(1,0.3,1);opacity:0.3}100%{transform:scale3d(1,2,1);opacity:1}}\n@keyframes radioAnimationWavePlay{0%{-webkit-transform:scale3d(1,0.3,1);-moz-transform:scale3d(1,0.3,1);transform:scale3d(1,0.3,1);opacity:0.3}100%{-webkit-transform:scale3d(1,2,1);-moz-transform:scale3d(1,2,1);transform:scale3d(1,2,1);opacity:1}}\n\n        /* ===== ТЕКСТ У ПЛЕЄРІ - БЕЗ ОКРЕМИХ ПІДКЛАДОК ===== */\n        .radio-cover__title,\n        .radio-cover__tooltip {\n            background: transparent !important;\n            padding: 0.2em 0 !important;\n            border-radius: 0 !important;\n            display: block !important;\n            text-shadow: 0 2px 8px rgba(0,0,0,0.9) !important;\n        }\n        .radio-cover__title {\n            font-size: 1.8em !important;\n            margin-top: 0.8em !important;\n        }\n        .radio-cover__tooltip {\n            font-size: 1.2em !important;\n            margin-top: 0.3em !important;\n            opacity: 0.9 !important;\n        }\n\n        /* ===== КНОПКИ ПОПЕРЕДНЯ / НАСТУПНА + СВАЙПИ (МОБІЛЬНІ) ===== */\n        .radio-player__controls{display:none;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;gap:2em;margin-top:.5em}body.true--mobile .radio-player__controls{display:-webkit-box;display:-webkit-flex;display:flex}.radio-player__btn{width:3.4em;height:3.4em;padding:.9em;border-radius:100%;background-color:rgba(255,255,255,0.12);-webkit-tap-highlight-color:transparent;transition:background-color .15s ease,transform .15s ease}.radio-player__btn:active{background-color:rgba(0,255,0,0.3);transform:scale(.92)}.radio-player__btn>svg{width:100%;height:100%}.radio-player{touch-action:none}\n/* ===== ПЕРЕМИКАЧ ВИГЛЯДУ: СПИСОК / ПЛИТКИ ===== */\n.radio-content__head{-webkit-flex-wrap:wrap;flex-wrap:wrap}\n.radio-content .view-ico--list{display:none}\n.radio-content--tiles .view-ico--list{display:inline-block}\n.radio-content--tiles .view-ico--tiles{display:none}\n.view-ico--logos{display:none}\n.radio-content--tiles .view-ico--list{display:none}\n.radio-content--tiles .view-ico--logos{display:inline-block}\n.radio-content--logos .view-ico--logos{display:none}\n.radio-content--logos .view-ico--list{display:inline-block}\n.radio-content--logos .radio-item__body{display:none !important}\n.radio-content--logos .radio-grid,.radio-content--logos .scroll__body{grid-gap:2.4vw 3.6%;gap:2.4vw 3.6%}\n.radio-content--logos .radio-item__cover,.radio-content--logos .radio-item__shade{border-radius:.8em}\n\n.radio-item__cover{position:relative}\n.radio-item__shade{display:none;position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.62);border-radius:1em;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}\n.radio-item__shade i{display:block;width:.35em;margin:0 .13em;border-radius:2px;background-color:#00ff00;-webkit-animation:wavePlay .8s ease-in-out infinite alternate;animation:wavePlay .8s ease-in-out infinite alternate}\n.radio-item__shade i:nth-child(1){height:.9em;-webkit-animation-delay:0s;animation-delay:0s}\n.radio-item__shade i:nth-child(2){height:1.9em;-webkit-animation-delay:.1s;animation-delay:.1s}\n.radio-item__shade i:nth-child(3){height:2.8em;-webkit-animation-delay:.2s;animation-delay:.2s}\n.radio-item__shade i:nth-child(4){height:1.6em;-webkit-animation-delay:.3s;animation-delay:.3s}\n.radio-item__shade i:nth-child(5){height:1em;-webkit-animation-delay:.4s;animation-delay:.4s}\n\n.radio-content--tiles .radio-grid,.radio-content--tiles .scroll__body{display:-ms-grid;display:grid;grid-template-columns:repeat(var(--radio-cols,3),minmax(0,1fr));grid-gap:3.4vw 5.4%;gap:3.4vw 5.4%;padding:1vw 3% 2.5vw}\n.radio-content--tiles .radio-item{position:relative;display:block;min-width:0;padding:0;text-align:center;border:0;border-radius:0;background:transparent}\n.radio-content--tiles .radio-item__num,.radio-content--tiles .radio-item__tooltip,.radio-content--tiles .radio-item__wave{display:none !important}\n.radio-content--tiles .radio-item__cover{width:100%;margin:0}\n.radio-content--tiles .radio-item__body{max-width:100%;margin-top:.6em;padding:0}\n.radio-content--tiles .radio-item__title{font-size:1.2em;line-height:1.2;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word}\n.radio-content--tiles .radio-item__icons{position:absolute;z-index:1;top:.5em;right:.5em;margin:0;padding:0}\n.radio-content--tiles .radio-item__icons svg{width:1.5em !important;height:1.5em !important}\n.radio-content--tiles .radio-item__icon-play{display:none !important}\n.radio-content--tiles .radio-item.playing{background:transparent;border:0}\n.radio-content--tiles .radio-item.playing .radio-item__shade{display:-webkit-box;display:-webkit-flex;display:flex}\n/* ФОКУС У ПЛИТКАХ: тонка рамка навколо обкладинки замість білої картки */\n.radio-content--tiles .radio-item.focus{background:transparent;color:#fff}\n.radio-content--tiles .radio-item__cover{border-radius:1em;-webkit-transition:-webkit-transform .15s ease;transition:transform .15s ease}\n.radio-content--tiles .radio-item.focus .radio-item__cover{-webkit-transform:scale(1.04);transform:scale(1.04);box-shadow:0 0 0 2px rgba(255,255,255,0.85)}\n.radio-content--tiles .radio-item.focus .radio-item__title{opacity:1}\n@media screen and (max-width:600px){.radio-content--tiles .radio-grid,.radio-content--tiles .scroll__body{grid-gap:1.6em 5%;gap:1.6em 5%;padding:.5em 3% 1em}.radio-content--tiles .radio-item__title{font-size:1em}}\n@media screen and (min-width:601px) and (max-width:1099px){.radio-content--tiles .radio-item__title{font-size:.95em;word-break:normal;overflow-wrap:break-word}}@media screen and (min-width:1100px){.radio-content--tiles .radio-grid,.radio-content--tiles .scroll__body{grid-gap:3.4vw 5.4%;gap:3.4vw 5.4%;padding:1vw 3% 2.5vw}.radio-content--tiles .radio-item.focus .radio-item__cover{box-shadow:0 0 0 2px rgba(255,255,255,0.8)}}\n\n\n        \n.radio-nowbar{display:flex;align-items:center;flex:1;min-width:0;margin:0 1em;padding:.3em 1em .3em .3em;border-radius:1em;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12)}\n.radio-nowbar.hide{display:none}\n.radio-nowbar>img{width:2.6em;height:2.6em;border-radius:.7em;object-fit:cover;flex-shrink:0;margin-right:1em;background:rgba(0,0,0,.3)}\n.radio-nowbar__text{min-width:0;flex:1}\n.radio-nowbar__track{font-size:1.2em;line-height:1.4;font-weight:600;white-space:nowrap;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,#000 94%,transparent);mask-image:linear-gradient(90deg,#000 94%,transparent)}\n.radio-nowbar__track:empty{display:none}\n.radio-nowbar__in{display:inline-block;white-space:nowrap;color:#fff}\n.radio-nowbar__in.run{-webkit-animation:radioTrackRun 12s linear infinite;animation:radioTrackRun 12s linear infinite;will-change:transform}\n@keyframes radioFadeIn{from{opacity:0}to{opacity:1}}\n@keyframes radioPulse{0%,100%{box-shadow:0 0 0 2px rgba(0,255,0,.35),0 0 0 rgba(0,255,0,0)}50%{box-shadow:0 0 0 2px rgba(0,255,0,.8),0 0 16px rgba(0,255,0,.45)}}\n.radio-content--tiles .radio-item{animation:radioFadeIn .35s ease both}\n.radio-content--tiles .radio-item__cover-box{background-color:rgba(255,255,255,0.07)}\n.radio-content--tiles .radio-item__cover-box>img{transition:opacity .35s ease}\n.radio-content--tiles .radio-item.playing .radio-item__cover{box-shadow:0 0 0 2px rgba(0,255,0,.6)}\n.radio-content--tiles .radio-item.focus .radio-item__cover,.radio-content--tiles .radio-item.playing.focus .radio-item__cover{box-shadow:0 0 0 2px rgba(255,255,255,.9) !important;animation:none !important}\n@media screen and (max-width:900px),screen and (max-height:500px){.radio-nowbar{display:none !important}}\n</style>\n    ");

    function add() {
      var button = $("<li class=\"menu__item selector\">\n            <div class=\"menu__ico\">\n                <svg width=\"38\" height=\"31\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"5\" y=\"13\" width=\"38\" height=\"28\" rx=\"2\" fill=\"#0057B7\" stroke=\"#FFD700\" stroke-width=\"4\"/><circle cx=\"18\" cy=\"28\" r=\"6\" fill=\"#FFD700\" stroke=\"#0057B7\" stroke-width=\"4\"/><path d=\"M30 24L36 24\" stroke=\"#FFD700\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M30 32L36 32\" stroke=\"#FFD700\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M7 13L25 4\" stroke=\"#FFD700\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n            </div>\n            <div class=\"menu__text\">".concat(manifest.name, "</div>\n        </li>"));
      button.on('hover:enter', function () {
        Lampa.Activity.push({
          url: '',
          title: manifest.name,
          component: 'radio',
          page: 1
        });
      });
      $('.menu .menu__list').eq(0).append(button);
      $('body').append(Lampa.Template.get('radio_style', {}, true));
      // Градієнт синьо-жовтого сердечка (один раз на сторінку; не display:none, інакше градієнт не працює)
      $('body').append('<svg width="0" height="0" style="position:absolute;pointer-events:none" aria-hidden="true"><defs><linearGradient id="radio-ua-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0057b7"/><stop offset="0.5" stop-color="#0057b7"/><stop offset="0.5" stop-color="#ffd500"/><stop offset="1" stop-color="#ffd500"/></linearGradient></defs></svg>');
      $('body').append('<style>.radio-player__track-in{color:' + TRACK_COLOR_TEXT + '}.radio-player__track-in i{color:' + TRACK_COLOR_NOTE + '}</style>');
      $('body').append('<style>' + accentCss() + '</style>');
      if (TILE_TITLE_FONT) $('body').append('<style>.radio-content--tiles .radio-item__title{font-size:' + TILE_TITLE_FONT + ' !important}</style>');
    }

    Lampa.Component.add('radio', Component);
    if (window.appready) add();
    else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') add();
      });
    }
  }

  if (!window.plugin_record_ready) startPlugin();

})();
