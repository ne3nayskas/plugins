(function() {
    'use strict';
    Lampa.Lang.add({
        ratimg_omdb_avg: {
            ru: 'ИТОГ',
            en: 'TOTAL',
            uk: '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij48cGF0aCBmaWxsPSIjRkZBQzMzIiBkPSJNMjcuMjg3IDM0LjYyN2MtLjQwNCAwLS44MDYtLjEyNC0xLjE1Mi0uMzcxTDE4IDI4LjQyMmwtOC4xMzUgNS44MzRhMS45NyAxLjk3IDAgMCAxLTIuMzEyLS4wMDhhMS45NzEgMS45NzEgMCAwIDEtLjcyMS0yLjE5NGwzLjAzNC05Ljc5MmwtOC4wNjItNS42ODFhMS45OCAxLjk4IDAgMCAxLS43MDgtMi4yMDNhMS45NzggMS45NzggMCAwIDEgMS44NjYtMS4zNjNMMTIuOTQ3IDEzbDMuMTc5LTkuNTQ5YTEuOTc2IDEuOTc2IDAgMCAxIDMuNzQ5IDBMMjMgMTNsMTAuMDM2LjAxNWExLjk3NSAxLjk3NSAwIDAgMSAxLjE1OSAzLjU2NmwtOC4wNjIgNS42ODFsMy4wMzQgOS43OTJhMS45NyAxLjk3IDAgMCAxLS43MiAyLjE5NGExLjk1NyAxLjk1NyAwIDAgMS0xLjE2LjM3OXoiLz48L3N2Zz4=" style="height:14px; width:14px; display:inline-block; vertical-align:middle; object-fit:contain;">',
            be: 'ВЫНІК',
            pt: 'TOTAL',
            zh: '总评',
            he: 'סה"כ',
            cs: 'VÝSLEDEK',
            bg: 'РЕЗУЛТАТ'
        },
        maxsm_unit_bln: {
            ru: 'млрд',
            en: 'B',
            uk: 'млрд',
            be: 'млрд',
            pt: 'bi',
            zh: 'B',
            he: 'B',
            cs: 'mld.',
            bg: 'млрд.'
        },
        maxsm_unit_mln: {
            ru: 'млн',
            en: 'M',
            uk: 'млн',
            be: 'млн',
            pt: 'mi',
            zh: 'M',
            he: 'M',
            cs: 'mil.',
            bg: 'млн.'
        },
        maxsm_boxoffice_us: {
            ru: ' (США)',
            en: ' (US)',
            uk: ' (США)',
            be: ' (ЗША)',
            pt: ' (EUA)',
            zh: ' (美国)',
            he: ' (ארה"ב)',
            cs: ' (USA)',
            bg: ' (САЩ)'
        },
        loading_dots: {
            ru: 'Загрузка рейтингов',
            en: 'Loading ratings',
            uk: 'Трішки зачекаємо ...',
            be: 'Загрузка рэйтынгаў',
            pt: 'Carregando classificações',
            zh: '载入评分',
            he: 'טוען דירוגים',
            cs: 'Načítání hodnocení',
            bg: 'Зареждане на рейтинги'
        },
        maxsm_boxoffice: {
            ru: 'Сборы',
            en: 'Box office',
            uk: 'Касові збори',
            be: 'Збор',
            pt: 'Bilheteria',
            zh: '票房',
            he: 'קופות',
            cs: 'Tržby',
            bg: 'Приходи'
        },
        maxsm_omdb_oscars: {
            ru: 'Оскары',
            en: 'Oscars',
            uk: '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnMiIKICAgdmlld0JveD0iMCAwIDM4LjE4NTc0NCAxMDEuNzY1IgogICBoZWlnaHQ9IjEzNS42Njk0NSIKICAgd2lkdGg9IjUwLjkwODIwMyI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMTYiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMxNCIgLz4KICA8ZwogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04LjQwNjE3NDUsMC42OTMpIgogICAgIGlkPSJnNCIKICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmU7ZmlsbDojZmZjYzAwIj4KICAgIDxwYXRoCiAgICAgICBpZD0icGF0aDYiCiAgICAgICBkPSJtIDI3LjM3MSwtMC42OTMgYyAtMy45MjcsMC4zNjYgLTUuMjI5LDMuNTM4IC00Ljk2Myw2Ljc3OCAwLjI2NiwzLjIzOSAzLjY4NSw2Ljk3MiAwLjEzNSw4Ljk1NiAtMS41NzcsMS40MTMgLTMuMTU0LDMuMDczIC01LjIwNywzLjU0IC0yLjY3OSwwLjYwNyAtNC4yODcsMy4wNTQgLTQuNjA3LDYuNDE5IDEuMzg4LDQuODI0IDAuMzY1LDkuMjg1IDEuNzczLDEyLjgyNCAxLjQwNywzLjUzOSAzLjY5NiwzLjgzMSAzLjk4Niw1LjA3NiAwLjMxNyw3LjYzNyAyLjM0MSwxNy41MzUgMC44NTYsMjQuOTMgMS4xNzIsMC4xODQgMC45MywwLjQ0NCAwLjg5NCwwLjcyOSAtMC4wMzYsMC4yODQgLTAuNDgsMC4zODEgLTEuMDg4LDAuNTI3IDAuODQ3LDcuNjg0IC0wLjI3OCwxMi4xMzYgMS45ODMsMTguNzcxIGwgMCwzLjU5MiAtMS4wNywwIDAsMS41MjQgYyAwLDAgLTcuMzEsLTAuMDA1IC04LjU2NSwwIDAsMCAwLjY4LDIuMTU5IC0xLjUyMywzLjAyNyAwLjAwOCwxLjEgMCwyLjcxOSAwLDIuNzE5IGwgLTEuNTY5LDAgMCwyLjM1MyBjIDEzLjIyMTcwMywwIDI2LjgzNzkwNywwIDM4LjE4NiwwIGwgMCwtMi4zNTIgLTEuNTcsMCBjIDAsMCAtMC4wMDcsLTEuNjE5IDAuMDAxLC0yLjcxOSBDIDQyLjgyLDk1LjEzMyA0My41LDkyLjk3NCA0My41LDkyLjk3NCBjIC0xLjI1NSwtMC4wMDUgLTguNTY0LDAgLTguNTY0LDAgbCAwLC0xLjUyNCAtMS4wNzMsMCAwLC0zLjU5MiBjIDIuMjYxLC02LjYzNSAxLjEzOCwtMTEuMDg3IDEuOTg1LC0xOC43NzEgLTAuNjA4LC0wLjE0NiAtMS4wNTQsLTAuMjQzIC0xLjA5LC0wLjUyNyAtMC4wMzYsLTAuMjg1IC0wLjI3OCwtMC41NDUgMC44OTQsLTAuNzI5IC0wLjg0NSwtOC4wNTggMC45MDIsLTE3LjQ5MyAwLjg1OCwtMjQuOTMgMC4yOSwtMS4yNDUgMi41NzksLTEuNTM3IDMuOTg2LC01LjA3NiAxLjQwOCwtMy41MzkgMC4zODUsLTggMS43NzQsLTEyLjgyNCAtMC4zMiwtMy4zNjUgLTEuOTMxLC01LjgxMiAtNC42MSwtNi40MiAtMi4wNTMsLTAuNDY2IC0zLjQ2OSwtMi42IC01LjM2OSwtMy44ODQgLTMuMTE4LC0yLjQ3MiAtMC42MSwtNS4zNjQgMC4zNzMsLTguNTc4IDAsLTUuMDEgLTIuMTU0LC02LjQ4MyAtNS4yOTMsLTYuODExIHoiCiAgICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmU7b3BhY2l0eToxO2ZpbGw6I2ZmY2MwMCIgLz4KICA8L2c+Cjwvc3ZnPgo=" style="height:14px; width:auto; display:inline-block; vertical-align:middle; object-fit:contain; transform:scale(1.2);">',
            be: 'Оскары',
            pt: 'Oscars',
            zh: '奥斯卡奖',
            he: 'אוסקר',
            cs: 'Oscary',
            bg: 'Оскари'
        },
        source_imdb: {
            ru: 'IMDB',
            en: 'IMDB',
            uk: '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgNTc1IDI4OS44MyIgd2lkdGg9IjU3NSIgaGVpZ2h0PSIyODkuODMiPjxkZWZzPjxwYXRoIGQ9Ik01NzUgMjQuOTFDNTczLjQ0IDEyLjE1IDU2My45NyAxLjk4IDU1MS45MSAwQzQ5OS4wNSAwIDc2LjE4IDAgMjMuMzIgMEMxMC4xMSAyLjE3IDAgMTQuMTYgMCAyOC42MUMwIDUxLjg0IDAgMjM3LjY0IDAgMjYwLjg2QzAgMjc2Ljg2IDEyLjM3IDI4OS44MyAyNy42NCAyODkuODNDNzkuNjMgMjg5LjgzIDQ5NS42IDI4OS44MyA1NDcuNTkgMjg5LjgzQzU2MS42NSAyODkuODMgNTczLjI2IDI3OC44MiA1NzUgMjY0LjU3QzU3NSAyMTYuNjQgNTc1IDQ4Ljg3IDU3NSAyNC45MVoiIGlkPSJkMXB3aGY5d3kyIj48L3BhdGg+PHBhdGggZD0iTTY5LjM1IDU4LjI0TDExNC45OCA1OC4yNEwxMTQuOTggMjMzLjg5TDY5LjM1IDIzMy44OUw2OS4zNSA1OC4yNFoiIGlkPSJnNWpqbnEyNnlTIj48L3BhdGg+PHBhdGggZD0iTTIwMS4yIDEzOS4xNUMxOTcuMjggMTEyLjM4IDE5NS4xIDk3LjUgMTk0LjY3IDk0LjUzQzE5Mi43NiA4MC4yIDE5MC45NCA2Ny43MyAxODkuMiA1Ny4wOUMxODUuMjUgNTcuMDkgMTY1LjU0IDU3LjA5IDEzMC4wNCA1Ny4wOUwxMzAuMDQgMjMyLjc0TDE3MC4wMSAyMzIuNzRMMTcwLjE1IDExNi43NkwxODYuOTcgMjMyLjc0TDIxNS40NCAyMzIuNzRMMjMxLjM5IDExNC4xOEwyMzEuNTQgMjMyLjc0TDI3MS4zOCAyMzIuNzRMMjcxLjM4IDU3LjA5TDIxMS43NyA1Ny4wOUwyMDEuMiAxMzkuMTVaIiBpZD0iaTNQcmgxSnBYdCI+PC9wYXRoPjxwYXRoIGQ9Ik0zNDYuNzEgOTMuNjNDMzQ3LjIxIDk1Ljg3IDM0Ny40NyAxMDAuOTUgMzQ3LjQ3IDEwOC44OUMzNDcuNDcgMTE1LjcgMzQ3LjQ3IDE3MC4xOCAzNDcuNDcgMTc2Ljk5QzM0Ny40NyAxODguNjggMzQ2LjcxIDE5NS44NCAzNDUuMiAxOTguNDhDMzQzLjY4IDIwMS4xMiAzMzkuNjQgMjAyLjQzIDMzMy4wOSAyMDIuNDNDMzMzLjA5IDE5MC45IDMzMy4wOSA5OC42NiAzMzMuMDkgODcuMTNDMzM4LjA2IDg3LjEzIDM0MS40NSA4Ny42NiAzNDMuMjUgODguN0MzNDUuMDUgODkuNzUgMzQ2LjIxIDkxLjM5IDM0Ni43MSA5My42M1pNMzY3LjMyIDIzMC45NUMzNzIuNzUgMjI5Ljc2IDM3Ny4zMSAyMjcuNjYgMzgxLjAxIDIyNC42N0MzODQuNyAyMjEuNjcgMzg3LjI5IDIxNy41MiAzODguNzcgMjEyLjIxQzM5MC4yNiAyMDYuOTEgMzkxLjE0IDE5Ni4zOCAzOTEuMTQgMTgwLjYzQzM5MS4xNCAxNzQuNDcgMzkxLjE0IDEyNS4xMiAzOTEuMTQgMTE4Ljk1QzM5MS4xNCAxMDIuMzMgMzkwLjQ5IDkxLjE5IDM4OS40OCA4NS41M0MzODguNDYgNzkuODYgMzg1LjkzIDc0LjcxIDM4MS44OCA3MC4wOUMzNzcuODIgNjUuNDcgMzcxLjkgNjIuMTUgMzY0LjEyIDYwLjEzQzM1Ni4zMyA1OC4xMSAzNDMuNjMgNTcuMDkgMzIxLjU0IDU3LjA5QzMxOS4yNyA1Ny4wOSAzMDcuOTMgNTcuMDkgMjg3LjUgNTcuMDlMMjg3LjUgMjMyLjc0TDM0Mi43OCAyMzIuNzRDMzU1LjUyIDIzMi4zNCAzNjMuNyAyMzEuNzUgMzY3LjMyIDIzMC45NVoiIGlkPSJhNG92OXJSR1FtIj48L3BhdGg+PHBhdGggZD0iTTQ2NC43NiAyMDQuN0M0NjMuOTIgMjA2LjkzIDQ2MC4yNCAyMDguMDYgNDU3LjQ2IDIwOC4wNkM0NTQuNzQgMjA4LjA2IDQ1Mi45MyAyMDYuOTggNDUyLjAxIDIwNC44MUM0NTEuMDkgMjAyLjY1IDQ1MC42NCAxOTcuNzIgNDUwLjY0IDE5MEM0NTAuNjQgMTg1LjM2IDQ1MC42NCAxNDguMjIgNDUwLjY0IDE0My41OEM0NTAuNjQgMTM1LjU4IDQ1MS4wNCAxMzAuNTkgNDUxLjg1IDEyOC42QzQ1Mi42NSAxMjYuNjMgNDU0LjQxIDEyNS42MyA0NTcuMTMgMTI1LjYzQzQ1OS45MSAxMjUuNjMgNDYzLjY0IDEyNi43NiA0NjQuNiAxMjkuMDNDNDY1LjU1IDEzMS4zIDQ2Ni4wMyAxMzYuMTUgNDY2LjAzIDE0My41OEM0NjYuMDMgMTQ2LjU4IDQ2Ni4wMyAxNjEuNTggNDY2LjAzIDE4OC41OUM0NjUuNzQgMTk3Ljg0IDQ2NS4zMiAyMDMuMjEgNDY0Ljc2IDIwNC43Wk00MDYuNjggMjMxLjIxTDQ0Ny43NiAyMzEuMjFDNDQ5LjQ3IDIyNC41IDQ1MC40MSAyMjAuNzcgNDUwLjYgMjIwLjAyQzQ1NC4zMiAyMjQuNTIgNDU4LjQxIDIyNy45IDQ2Mi45IDIzMC4xNEM0NjcuMzcgMjMyLjM5IDQ3NC4wNiAyMzMuNTEgNDc5LjI0IDIzMy41MUM0ODYuNDUgMjMzLjUxIDQ5Mi42NyAyMzEuNjIgNDk3LjkyIDIyNy44M0M1MDMuMTYgMjI0LjA1IDUwNi41IDIxOS41NyA1MDcuOTIgMjE0LjQyQzUwOS4zNCAyMDkuMjYgNTEwLjA1IDIwMS40MiA1MTAuMDUgMTkwLjg4QzUxMC4wNSAxODUuOTUgNTEwLjA1IDE0Ni41MyA1MTAuMDUgMTQxLjZDNTEwLjA1IDEzMSA1MDkuODEgMTI0LjA4IDUwOS4zNCAxMjAuODNDNTA4Ljg3IDExNy41OCA1MDcuNDcgMTE0LjI3IDUwNS4xNCAxMTAuODhDNTAyLjgxIDEwNy40OSA0OTkuNDIgMTA0Ljg2IDQ5NC45OCAxMDIuOThDNDkwLjU0IDEwMS4xIDQ4NS4zIDEwMC4xNiA0NzkuMjYgMTAwLjE2QzQ3NC4wMSAxMDAuMTYgNDY3LjI5IDEwMS4yMSA0NjIuODEgMTAzLjI4QzQ1OC4zNCAxMDUuMzUgNDU0LjI4IDEwOC40OSA0NTAuNjQgMTEyLjdDNDUwLjY0IDEwOC44OSA0NTAuNjQgODkuODUgNDUwLjY0IDU1LjU2TDQwNi42OCA1NS41Nkw0MDYuNjggMjMxLjIxWiIgaWQ9ImZrOTY4QnBzWCI+PC9wYXRoPjwvZGVmcz48Zz48Zz48Zz48dXNlIHhsaW5rOmhyZWY9IiNkMXB3aGY5d3kyIiBvcGFjaXR5PSIxIiBmaWxsPSIjZjZjNzAwIiBmaWxsLW9wYWNpdHk9IjEiPjwvdXNlPjxnPjx1c2UgeGxpbms6aHJlZj0iI2QxcHdoZjl3eTIiIG9wYWNpdHk9IjEiIGZpbGwtb3BhY2l0eT0iMCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIj48L3VzZT48L2c+PC9nPjxnPjx1c2UgeGxpbms6aHJlZj0iI2c1ampucTI2eVMiIG9wYWNpdHk9IjEiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMSI+PC91c2U+PGc+PHVzZSB4bGluazpocmVmPSIjZzVqam5xMjZ5UyIgb3BhY2l0eT0iMSIgZmlsbC1vcGFjaXR5PSIwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLW9wYWNpdHk9IjAiPjwvdXNlPjwvZz48L2c+PGc+PHVzZSB4bGluazpocmVmPSIjaTNQcmgxSnBYdCIgb3BhY2l0eT0iMSIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIxIj48L3VzZT48Zz48dXNlIHhsaW5rOmhyZWY9IiNpM1ByaDFKcFh0IiBvcGFjaXR5PSIxIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMCI+PC91c2U+PC9nPjwvZz48Zz48dXNlIHhsaW5rOmhyZWY9IiNhNG92OXJSR1FtIiBvcGFjaXR5PSIxIiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiPjwvdXNlPjxnPjx1c2UgeGxpbms6aHJlZj0iI2E0b3Y5clJHUW0iIG9wYWNpdHk9IjEiIGZpbGwtb3BhY2l0eT0iMCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIj48L3VzZT48L2c+PC9nPjxnPjx1c2UgeGxpbms6aHJlZj0iI2ZrOTY4QnBzWCIgb3BhY2l0eT0iMSIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIxIj48L3VzZT48Zz48dXNlIHhsaW5rOmhyZWY9IiNmazk2OEJwc1giIG9wYWNpdHk9IjEiIGZpbGwtb3BhY2l0eT0iMCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIj48L3VzZT48L2c+PC9nPjwvZz48L2c+PC9zdmc+" style="height:14px; width:auto; display:inline-block; vertical-align:middle; object-fit:contain; transform:scale(1.2);">',
            be: 'IMDB',
            pt: 'IMDB',
            zh: 'IMDB',
            he: 'IMDB',
            cs: 'IMDB',
            bg: 'IMDB'
        },
        source_tmdb: {
            ru: 'TMDB',
            en: 'TMDB',
            uk: '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTg1LjA0IDEzMy40Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6dXJsKCNsaW5lYXItZ3JhZGllbnQpO308L3N0eWxlPjxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50IiB5MT0iNjYuNyIgeDI9IjE4NS4wNCIgeTI9IjY2LjciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM5MGNlYTEiLz48c3RvcCBvZmZzZXQ9IjAuNTYiIHN0b3AtY29sb3I9IiMzY2JlYzkiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMGIzZTUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48dGl0bGU+QXNzZXQgNDwvdGl0bGU+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik01MS4wNiw2Ni43aDBBMTcuNjcsMTcuNjcsMCwwLDEsNjguNzMsNDloLS4xQTE3LjY3LDE3LjY3LDAsMCwxLDg2LjMsNjYuN2gwQTE3LjY3LDE3LjY3LDAsMCwxLDY4LjYzLDg0LjM3aC4xQTE3LjY3LDE3LjY3LDAsMCwxLDUxLjA2LDY2LjdabTgyLjY3LTMxLjMzaDMyLjlBMTcuNjcsMTcuNjcsMCwwLDAsMTg0LjMsMTcuN2gwQTE3LjY3LDE3LjY3LDAsMCwwLDE2Ni42MywwaC0zMi45QTE3LjY3LDE3LjY3LDAsMCwwLDExNi4wNiwxNy43aDBBMTcuNjcsMTcuNjcsMCwwLDAsMTMzLjczLDM1LjM3Wm0tMTEzLDk4aDYzLjlBMTcuNjcsMTcuNjcsMCwwLDAsMTAyLjMsMTE1LjdoMEExNy42NywxNy42NywwLDAsMCw4NC42Myw5OEgyMC43M0ExNy42NywxNy42NywwLDAsMCwzLjA2LDExNS43aDBBMTcuNjcsMTcuNjcsMCwwLDAsMjAuNzMsMTMzLjM3Wm04My45Mi00OWg2LjI1TDEyNS41LDQ5aC04LjM1bC04LjksMjMuMmgtLjFMOTkuNCw0OUg5MC41Wm0zMi40NSwwaDcuOFY0OWgtNy44Wm0yMi4yLDBoMjQuOTVWNzcuMkgxNjcuMVY3MGgxNS4zNVY2Mi44SDE2Ny4xVjU2LjJoMTYuMjVWNDloLTI0Wk0xMC4xLDM1LjRoNy44VjYuOUgyOFYwSDBWNi45SDEwLjFaTTM5LDM1LjRoNy44VjIwLjFINjEuOVYzNS40aDcuOFYwSDYxLjlWMTMuMkg0Ni43NVYwSDM5Wm00MS4yNSwwaDI1VjI4LjJIODhWMjFoMTUuMzVWMTMuOEg4OFY3LjJoMTYuMjVWMGgtMjRabS03OSw0OUg5VjU3LjI1aC4xbDksMjcuMTVIMjRsOS4zLTI3LjE1aC4xVjg0LjRoNy44VjQ5SDI5LjQ1bC04LjIsMjMuMWgtLjFMMTMsNDlIMS4yWm0xMTIuMDksNDlIMTI2YTI0LjU5LDI0LjU5LDAsMCwwLDcuNTYtMS4xNSwxOS41MiwxOS41MiwwLDAsMCw2LjM1LTMuMzcsMTYuMzcsMTYuMzcsMCwwLDAsNC4zNy01LjVBMTYuOTEsMTYuOTEsMCwwLDAsMTQ2LDExNS44YTE4LjUsMTguNSwwLDAsMC0xLjY4LTguMjUsMTUuMSwxNS4xLDAsMCwwLTQuNTItNS41M0ExOC41NSwxOC41NSwwLDAsMCwxMzMuMDcsOTksMzMuNTQsMzMuNTQsMCwwLDAsMTI1LDk4SDExMy4yOVptNy44MS0yOC4yaDQuNmExNy40MywxNy40MywwLDAsMSw0LjY3LjYyLDExLjY4LDExLjY4LDAsMCwxLDMuODgsMS44OCw5LDksMCwwLDEsMi42MiwzLjE4LDkuODcsOS44NywwLDAsMSwxLDQuNTIsMTEuOTIsMTEuOTIsMCwwLDEtMSw1LjA4LDguNjksOC42OSwwLDAsMS0yLjY3LDMuMzQsMTAuODcsMTAuODcsMCwwLDEtNCwxLjgzLDIxLjU3LDIxLjU3LDAsMCwxLTUsLjU1SDEyMS4xWm0zNi4xNCwyOC4yaDE0LjVhMjMuMTEsMjMuMTEsMCwwLDAsNC43My0uNSwxMy4zOCwxMy4zOCwwLDAsMCw0LjI3LTEuNjUsOS40Miw5LjQyLDAsMCwwLDMuMTAtMyw4LjUyLDguNTIsMCwwLDAsMS4yLTQuNjgsOS4xNiw5LjE2LDAsMCwwLS41NS0zLjIsNy43OSw3Ljc5LDAsMCwwLTEuNTctMi42Miw4LjM4LDguMzgsMCwwLDAtMi40NS0xLjg1LDEwLDEwLDAsMCwwLTMuMTgtMXYtLjFhOS4yOCw5LjI4LDAsMCwwLDQuNDMtMi44Miw3LjQyLDcuNDIsMCwwLDAsMS42Ny01LDguMzQsOC4zNCwwLDAsMC0xLjE1LTQuNjUsNy44OCw3Ljg4LDAsMCwwLTMtMi43MywxMi45LDEyLjksMCwwLDAtNC4xNy0xLjMsMzQuNDIsMzQuNDIsMCwwLDAtNC42My0uMzJoLTEzLjJabTcuOC0yOC44aDUuM2ExMC43OSwxMC43OSwwLDAsMSwxLjg1LjE3LDUuNzcsNS43NywwLDAsMSwxLjcuNTgsMy4zMywzLjMzLDAsMCwxLDEuMjMsMS4xMywzLjIyLDMuMjIsMCwwLDEsLjQ3LDEuODIsMy42MywzLjYzLDAsMCwxLS40MiwxLjgsMy4zNCwzLjM0LDAsMCwxLTEuMTMsMS4yLDQuNzgsNC43OCwwLDAsMS0xLjU3LjY1LDguMTYsOC4xNiwwLDAsMS0xLjc4LjJIMTY1Wm0wLDE0LjE1aDUuOWExNS4xMiwxNS4xMiwwLDAsMSwyLjA1LjE1LDcuODMsNy44MywwLDAsMSwyLC41NSw0LDQsMCwwLDEsMS41OCwxLjE3LDMuMTMsMy4xMywwLDAsMSwuNjIsMiwzLjcxLDMuNzEsMCwwLDEtLjQ3LDEuOTUsNCw0LDAsMCwxLTEuMjMsMS4zLDQuNzgsNC43OCwwLDAsMS0xLjY3LjcsOC45MSw4LjkxLDAsMCwxLTEuODMuMmgtN1oiLz48L2c+PC9nPjwvc3ZnPg==" style="height:14px; width:auto; display:inline-block; vertical-align:middle; object-fit:contain; transform:scale(1.2);">',
            be: 'TMDB',
            pt: 'TMDB',
            zh: 'TMDB',
            he: 'TMDB',
            cs: 'TMDB',
            bg: 'TMDB'
        },
        source_rt: {
            ru: 'Rotten Tomatoes',
            en: 'Rotten Tomatoes',
            uk: '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnIGlkPSJzdmczMzkwIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSIxNDEuMjUiIHZpZXdCb3g9IjAgMCAxMzguNzUgMTQxLjI1IiB3aWR0aD0iMTM4Ljc1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiA8bWV0YWRhdGEgaWQ9Im1ldGFkYXRhMzM5NiI+CiAgPHJkZjpSREY+CiAgIDxjYzpXb3JrIHJkZjphYm91dD0iIj4KICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgPGRjOnR5cGUgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIvPgogICAgPGRjOnRpdGxlLz4KICAgPC9jYzpXb3JrPgogIDwvcmRmOlJERj4KIDwvbWV0YWRhdGE+CiA8ZyBpZD0ibGF5ZXIxIiBmaWxsPSIjZjkzMjA4Ij4KICA8cGF0aCBpZD0icGF0aDM0MTIiIGQ9Im0yMC4xNTQgNDAuODI5Yy0yOC4xNDkgMjcuNjIyLTEzLjY1NyA2MS4wMTEtNS43MzQgNzEuOTMxIDM1LjI1NCA0MS45NTQgOTIuNzkyIDI1LjMzOSAxMTEuODktNS45MDcxIDQuNzYwOC04LjIwMjcgMjIuNTU0LTUzLjQ2Ny0yMy45NzYtNzguMDA5eiIvPgogIDxwYXRoIGlkPSJwYXRoMzQ3MSIgZD0ibTM5LjYxMyAzOS4yNjUgNC43Nzc4LTguODYwNyAyOC40MDYtNS4wMzg0IDExLjExOSA5LjIwODJ6Ii8+CiA8L2c+CiA8ZyBpZD0ibGF5ZXIyIj4KICA8cGF0aCBpZD0icGF0aDM0MzciIGQ9Im0zOS40MzYgOC41Njk2IDguOTY4Mi01LjI4MjYgNi43NTY5IDE1LjQ3OWMzLjc5MjUtNi4zMjI2IDEzLjc5LTE2LjMxNiAyNC45MzktNC42Njg0LTQuNzI4MSAxLjI2MzYtNy41MTYxIDMuODU1My03LjczOTcgOC40NzY4IDE1LjE0NS00LjE2OTcgMzEuMzQzIDMuMjEyNyAzMy41MzkgOS4wOTExLTEwLjk1MS00LjMxNC0yNy42OTUgMTAuMzc3LTQxLjc3MSAyLjMzNCAwLjAwOSAxNS4wNDUtMTIuNjE3IDE2LjYzNi0xOS45MDIgMTcuMDc2IDIuMDc3LTQuOTk2IDUuNTkxLTkuOTk0IDEuNDc0LTE0Ljk4Ny03LjYxOCA4LjE3MS0xMy44NzQgMTAuNjY4LTMzLjE3IDQuNjY4IDQuODc2LTEuNjc5IDE0Ljg0My0xMS4zOSAyNC40NDgtMTEuNDI1LTYuNzc1LTIuNDY3LTEyLjI5LTIuMDg3LTE3LjgxNC0xLjQ3NSAyLjkxNy0zLjk2MSAxMi4xNDktMTUuMTk3IDI4LjYyNS04LjQ3NnoiIGZpbGw9IiMwMjkwMmUiLz4KIDwvZz4KPC9zdmc+Cg==" style="height:14px; width:auto; display:inline-block; vertical-align:middle; object-fit:contain; transform:scale(1.2);">',
            be: 'Rotten Tomatoes',
            pt: 'Rotten Tomatoes',
            zh: '烂番茄',
            he: 'Rotten Tomatoes',
            cs: 'Rotten Tomatoes',
            bg: 'Rotten Tomatoes'
        },
        source_mc: {
            ru: 'Metacritic',
            en: 'Metacritic',
            uk: '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4OCIgaGVpZ2h0PSI4OCI+CjxjaXJjbGUgZmlsbD0iIzAwMUIzNiIgc3Ryb2tlPSIjRkMwIiBzdHJva2Utd2lkdGg9IjQuNiIgY3g9IjQ0IiBjeT0iNDQiIHI9IjQxLjYiLz4KPHBhdGggdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwLTk2MSkgbWF0cml4KDEuMjc1NjYyOSwtMS4zNDg3NzMzLDEuMzY4NTcxNywxLjI2MzQ5ODcsLTI2Ny4wNDcwNiwxMDY2LjA3NDMpIiBmaWxsPSIjRkZGIgpkPSJtMTI2LjczNDM4LDkyLjA4NzAwMiA1LjA1ODU5LDAgMCwyLjgzMjAzMSBjIDEuODA5ODktMi4yMDA1MDEgMy45NjQ4My0zLjMwMDc2IDYuNDY0ODQtMy4zMDA3ODEgMS4zMjgxMSwyLjFlLTUgMi40ODA0NSwuMjczNDU4IDMuNDU3MDMsLjgyMDMxMiAuOTc2NTUsLjU0Njg5NSAxLjc3NzMzLDEuMzczNzE3IDIuNDAyMzUsMi40ODA0NjkgLjkxMTQ0LTEuMTA2NzUyIDEuODk0NTEtMS45MzM1NzQgMi45NDkyMi0yLjQ4MDQ2OSAxLjA1NDY2LTAuNTQ2ODU0IDIuMTgwOTYtMC44MjAyOTEgMy4zNzg5LTAuODIwMzEyIDEuNTIzNDEsMi4xZS01IDIuODEyNDcsLjMwOTI2NSAzLjg2NzE5LC45Mjc3MzQgMS4wNTQ2NiwuNjE4NTA5IDEuODQyNDIsMS41MjY3MTEgMi4zNjMyOCwyLjcyNDYwOSAuMzc3NTcsLjg4NTQzNCAuNTY2MzcsMi4zMTc3MjQgLjU2NjQxLDQuMjk2ODc1IGwgMCwxMy4yNjE3Mi01LjQ4ODI4LDAgMC0xMS44NTU0NyBjLTNlLTUtMi4wNTcyNzctMC4xODg4My0zLjM4NTQwMS0wLjU2NjQxLTMuOTg0Mzc1LTAuNTA3ODQtMC43ODEyMzMtMS4yODkwOS0xLjE3MTg1OC0yLjM0Mzc1LTEuMTcxODc1LTAuNzY4MjUsMS43ZS01LTEuNDkwOTEsLjIzNDM5Mi0yLjE2Nzk3LC43MDMxMjUtMC42NzcxLC40Njg3NjYtMS4xNjUzOCwxLjE1NTYxNC0xLjQ2NDg0LDIuMDYwNTQ3LTAuMjk5NSwuOTA0OTYxLTAuNDQ5MjQsMi4zMzM5OTgtMC40NDkyMiw0LjI4NzEwOCBsIDAsOS45NjA5NC01LjQ4ODI4LDAgMC0xMS4zNjcxOSBjLTJlLTUtMi4wMTgyMTQtMC4wOTc3LTMuMzIwMjk2LTAuMjkyOTctMy45MDYyNDgtMC4xOTUzMy0wLjU4NTkyMi0wLjQ5ODA2LTEuMDIyMTItMC45MDgyLTEuMzA4NTk0LTAuNDEwMTctMC4yODY0NDItMC45NjY4MS0wLjQyOTY3MS0xLjY2OTkzLTAuNDI5Njg4LTAuODQ2MzYsMS43ZS01LTEuNjA4MDgsLjIyNzg4Mi0yLjI4NTE1LC42ODM1OTQtMC42NzcxLC40NTU3NDUtMS4xNjIxMiwxLjExMzI5Ny0xLjQ1NTA4LDEuOTcyNjU2LTAuMjkyOTgsLjg1OTM4OS0wLjQzOTQ2LDIuMjg1MTctMC40Mzk0NSw0LjI3NzM0IGwgMCwxMC4wNzgxMy01LjQ4ODI4LDB6Ii8+Cjwvc3ZnPg==" style="height:14px; width:auto; display:inline-block; vertical-align:middle; object-fit:contain; transform:scale(1.2);">',
            be: 'Metacritic',
            pt: 'Metacritic',
            zh: 'Metacritic',
            he: 'Metacritic',
            cs: 'Metacritic',
            bg: 'Metacritic'
        }
    });

    var style = "<style id=\"maxsm_omdb_rating\">" +
        ".full-start-new__rate-line {" +
        "visibility: hidden;" +
        "flex-wrap: wrap;" +
        " gap: 0.4em 0;" +
        "}" +
        ".full-start-new__rate-line > * {" +
        " margin-left: 0 !important;" +
        " margin-right: 0.6em !important;" +
        "}" +
        ".rate--oscars { color: gold; }" +
        ".full-start__rate > div:last-child { flex-shrink: 0; }" +
        ".full-start__rate > div:last-child img { max-width: none !important; flex-shrink: 0; }" +
        ".full-start__rate > div:last-child svg { width: 14px !important; height: 14px !important; max-width: none !important; flex-shrink: 0; }" +
        ".full-start-new__rate-line > .full-start__rate { max-height: 2.4em; }" +
        ".maxsm-budget > *:last-child," +
        ".maxsm-boxoffice > *:last-child {" +
        " color: #00e676 !important;" +
        "}" +
        "</style>";
    Lampa.Template.add('card_css', style);
    $('body').append(Lampa.Template.get('card_css', {}, true));

    var loadingStyles = "<style id=\"maxsm_loading_animation\">" +
        ".loading-dots-container {" +
        " position: absolute;" +
        " top: 50%;" +
        " left: 0;" +
        " right: 0;" +
        " text-align: left;" +
        " transform: translateY(-50%);" +
        " z-index: 10;" +
        "}" +
        ".full-start-new__rate-line {" +
        " position: relative;" +
        "}" +
        ".loading-dots {" +
        " display: inline-flex;" +
        " align-items: center;" +
        " gap: 0.4em;" +
        " color: #ffffff;" +
        " font-size: 1em;" +
        " background: rgba(0, 0, 0, 0.3);" +
        " padding: 0.6em 1em;" +
        " border-radius: 0.5em;" +
        "}" +
        ".loading-dots__text {" +
        " margin-right: 1em;" +
        "}" +
        ".loading-dots__dot {" +
        " width: 0.5em;" +
        " height: 0.5em;" +
        " border-radius: 50%;" +
        " background-color: currentColor;" +
        " animation: loading-dots-bounce 1.4s infinite ease-in-out both;" +
        "}" +
        ".loading-dots__dot:nth-child(1) {" +
        " animation-delay: -0.32s;" +
        "}" +
        ".loading-dots__dot:nth-child(2) {" +
        " animation-delay: -0.16s;" +
        "}" +
        "@keyframes loading-dots-bounce {" +
        " 0%, 80%, 100% { transform: translateY(0); opacity: 0.6; }" +
        " 40% { transform: translateY(-0.5em); opacity: 1; }" +
        "}" +
        "</style>";
    Lampa.Template.add('loading_animation_css', loadingStyles);
    $('body').append(Lampa.Template.get('loading_animation_css', {}, true));

    var voteStyle = "<style id=\"maxsm_vote_colors\">" +
        ".card__vote {" +
        " position: absolute; right: 0; bottom: 0; z-index: 12; height: auto;" +
        " background: rgba(0,0,0,0.6);" +
        " border-radius: 1em 0 0.75em 0 !important;" +
        " overflow: hidden; pointer-events: auto; box-sizing: border-box;" +
        " text-transform: uppercase;" +
        " font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;" +
        " font-weight: 700 !important; font-size: 0.8em !important;" +
        " padding: 0.35em 0.65em !important; white-space: nowrap;" +
        " display: flex !important; align-items: center; justify-content: flex-start;" +
        " text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.25);" +
        " line-height: 1 !important; text-overflow: ellipsis;" +
        "}" +
        ".card__age {" +
        " position: absolute !important; right: 0; top: 0; z-index: 12; height: auto;" +
        " background: rgba(0,0,0,0.6);" +
        " border-radius: 0 0.8em 0 0.75em !important;" +
        " overflow: hidden; pointer-events: auto; box-sizing: border-box;" +
        " text-transform: uppercase;" +
        " font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;" +
        " font-weight: 700 !important; font-size: 0.8em !important;" +
        " padding: 0.35em 0.65em !important; white-space: nowrap;" +
        " display: flex !important; align-items: center; justify-content: flex-start;" +
        " text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.25);" +
        " line-height: 1 !important; text-overflow: ellipsis;" +
        " color: #ffffff !important; margin: 0; transform: translateX(0);" +
        "}" +
        "@media (max-width: 1024px) {" +
        " .card__vote, .card__age { font-size: 1em; padding: 0.25em 0.5em; }" +
        " .card__type svg { width: 2.3em; height: 2.3em; }" +
        "}" +
        "@media (max-width: 480px) {" +
        " .card__vote, .card__age { font-size: 0.95em; padding: 0.2em 0.4em; }" +
        "}" +
        "</style>";
    $('body').append(voteStyle);

    var CACHE_TIME = 3 * 24 * 60 * 60 * 1000;
    var EMPTY_CACHE_TIME = 24 * 60 * 60 * 1000;
    var SAFETY_TIMEOUT = 6000;
    var OMDB_CACHE = 'maxsm_rating_omdb';
    var ID_MAPPING_CACHE = 'maxsm_rating_id_mapping';
    var OMDB_API_KEY = (window.RATINGS_PLUGIN_TOKENS && window.RATINGS_PLUGIN_TOKENS.OMDB_API_KEY) || ''; // OMDB API KEY ----- !

    var AGE_RATINGS = {
        'G': '3+',
        'PG': '6+',
        'PG-13': '13+',
        'R': '17+',
        'NC-17': '18+',
        'TV-Y': '0+',
        'TV-Y7': '7+',
        'TV-G': '3+',
        'TV-PG': '6+',
        'TV-14': '14+',
        'TV-MA': '17+'
    };

    var WEIGHTS = {
        imdb: 0.40,
        tmdb: 0.40,
        mc: 0.10,
        rt: 0.10
    };

    function parseOscars(awardsText) {
        if (typeof awardsText !== 'string') return null;
        var match = awardsText.match(/Won (\d+) Oscars?/i);
        if (match && match[1]) {
            return parseInt(match[1], 10);
        }
        return null;
    }

    function parseBoxOffice(text) {
        if (typeof text !== 'string' || text === 'N/A') return null;
        var num = parseInt(text.replace(/[^0-9]/g, ''), 10);
        return isNaN(num) || num <= 0 ? null : num;
    }

    function decimalSep() {
        var lang = Lampa.Storage.get('language', 'ru');
        return (lang === 'en' || lang === 'zh' || lang === 'he') ? '.' : ',';
    }

    function formatMoney(n) {
        n = Math.round(n);
        var value, unit;
        if (n >= 1e9) {
            value = Math.round(n / 1e7) / 100;
            unit = 'maxsm_unit_bln';
        } else if (n >= 1e6) {
            value = Math.round(n / 1e5) / 10;
            unit = 'maxsm_unit_mln';
        } else {
            return '$ ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }
        return '$ ' + String(value).replace('.', decimalSep()) + ' ' + Lampa.Lang.translate(unit);
    }

    function findBudgetBlock(render) {
        var found = null;
        $('.full-descr__info', render).each(function() {
            var block = $(this);
            if (block.hasClass('maxsm-boxoffice')) return;
            var kids = block.children();
            if (kids.length < 2) return;
            var value = kids.last().text().trim();
            if (!found && value.indexOf('$') === 0) found = block;
        });
        return found;
    }

    function markBudget(render) {
        if (!render) return;
        var budget = findBudgetBlock(render);
        if (!budget) return;
        budget.addClass('maxsm-budget');

        if (!budget.data('maxsm-short')) {
            var valueEl = budget.children().last();
            var raw = parseInt(valueEl.text().replace(/[^0-9]/g, ''), 10);
            if (raw > 0) valueEl.text(formatMoney(raw));
            budget.data('maxsm-short', true);
        }
    }

    function insertBoxOffice(render, revenue, isUS) {
        if (!render) return;

        markBudget(render);
        var budget = findBudgetBlock(render);
        if (!budget) return;

        if (!revenue || isNaN(revenue) || revenue <= 0) return;
        if ($('.maxsm-boxoffice', render).length) return;

        var el = budget.clone().removeClass('maxsm-budget').addClass('maxsm-boxoffice');
        el.children().first().text(
            Lampa.Lang.translate('maxsm_boxoffice') +
            (isUS ? Lampa.Lang.translate('maxsm_boxoffice_us') : '')
        );
        el.children().last().text(formatMoney(revenue));
        el.insertAfter(budget);
    }

    function addLoadingAnimation(render) {
        if (!render) return;

        var rateLine = $('.full-start-new__rate-line', render);
        if (!rateLine.length || $('.loading-dots-container', rateLine).length) return;

        rateLine.append(
            '<div class="loading-dots-container">' +
            '<div class="loading-dots">' +
            '<span class="loading-dots__text">' + Lampa.Lang.translate("loading_dots") + '</span>' +
            '<span class="loading-dots__dot"></span>' +
            '<span class="loading-dots__dot"></span>' +
            '<span class="loading-dots__dot"></span>' +
            '</div>' +
            '</div>'
        );

        $('.loading-dots-container', rateLine).css({
            'opacity': '1',
            'visibility': 'visible'
        });
    }

    function removeLoadingAnimation(render) {
        if (!render) return;
        $('.loading-dots-container', render).remove();
    }

    function getCardType(card) {
        var type = card.media_type || card.type;
        if (type === 'movie' || type === 'tv') return type;
        return card.name || card.original_name ? 'tv' : 'movie';
    }

    function getRatingColor(rating) {
        if (rating <= 3) return '#ff3333';
        if (rating < 6) return '#ff9933';
        if (rating < 8) return '#3399ff';
        return '#33cc33';                    
    }

    function findParentByClass(el, cls) {
        while (el && el !== document) {
            if (el.classList && el.classList.contains(cls)) return el;
            el = el.parentNode;
        }
        return null;
    }

    function colorizePosterLabels() {
        var votes = document.querySelectorAll('.card__vote');
        for (var i = 0; i < votes.length; i++) {
            var vote = parseFloat((votes[i].textContent || '').trim());
            if (!isNaN(vote)) votes[i].style.color = getRatingColor(vote);
        }

        var ages = document.querySelectorAll('.card__age');
        for (var j = 0; j < ages.length; j++) {
            var age = ages[j];
            var year = parseInt((age.textContent || '').trim(), 10);
            if (isNaN(year) || year === 0) continue;
            var parent = age.parentNode;
            if (parent && parent.classList && parent.classList.contains('card__view')) continue;
            var card = findParentByClass(age, 'card');
            var view = card ? card.querySelector('.card__view') : null;
            if (view) view.appendChild(age);
        }
    }

    function colorizeDetailRates() {
        var rates = document.querySelectorAll('.full-start__rate');
        for (var i = 0; i < rates.length; i++) {
            var rate = rates[i];
            if (rate.classList.contains('rate--oscars')) continue;
            var num = rate.firstElementChild;
            if (!num) continue;
            var value = parseFloat((num.textContent || '').trim());
            if (isNaN(value) || value <= 0 || value > 10) continue;
            num.style.setProperty('color', getRatingColor(value), 'important');
        }
    }

    var colorTimer = null;

    function colorizeAll() {
        colorTimer = null;
        try {
            colorizePosterLabels();
            colorizeDetailRates();
        } catch (e) {
            console.warn('Ratings colors error:', e);
        }
    }

    function scheduleColorize() {
        if (!colorTimer) colorTimer = setTimeout(colorizeAll, 120);
    }

    function initColors() {
        var start = function() {
            colorizeAll();
            if (typeof MutationObserver !== 'undefined') {
                new MutationObserver(scheduleColorize).observe(document.body, {
                    childList: true,
                    subtree: true,
                    characterData: true
                });
            }
        };
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
        else start();
    }

    function fetchAdditionalRatings(card, render, state) {
        if (!render) return;

        var normalizedCard = {
            id: card.id,
            imdb_id: card.imdb_id || card.imdb || null,
            title: card.title || card.name || '',
            original_title: card.original_title || card.original_name || '',
            type: getCardType(card),
            release_date: card.release_date || card.first_air_date || '',
            revenue: card.revenue || 0
        };

        state.revenue = normalizedCard.revenue;
        state.isUS = false;
        insertBoxOffice(render, state.revenue, false);

        var rateLine = $('.full-start-new__rate-line', render);
        if (rateLine.length) {
            rateLine.css('visibility', 'hidden');
            addLoadingAnimation(render);
        }

        var safetyTimer = setTimeout(function() {
            calculateAverageRating(render);
        }, SAFETY_TIMEOUT);

        var cacheKey = normalizedCard.type + '_' + (normalizedCard.imdb_id || normalizedCard.id);
        var cachedData = getOmdbCache(cacheKey);
        var ratingsData = {};

        var imdbElement = $('.rate--imdb:not(.hide)', render);
        if (imdbElement.length > 0 && !!imdbElement.find('> div').eq(0).text().trim()) {
            clearTimeout(safetyTimer);
            calculateAverageRating(render);
            return;
        }

        if (cachedData) {
            fillFromOmdb(cachedData);
            updateUI();
        } else if (normalizedCard.imdb_id) {
            fetchOmdbRatings(normalizedCard, cacheKey, function(omdbData) {
                if (omdbData) {
                    fillFromOmdb(omdbData);
                    saveOmdbCache(cacheKey, omdbData);
                }
                updateUI();
            });
        } else {
            getImdbIdFromTmdb(normalizedCard.id, normalizedCard.type, function(newImdbId) {
                if (newImdbId) {
                    normalizedCard.imdb_id = newImdbId;
                    cacheKey = normalizedCard.type + '_' + newImdbId;
                    fetchOmdbRatings(normalizedCard, cacheKey, function(omdbData) {
                        if (omdbData) {
                            fillFromOmdb(omdbData);
                            saveOmdbCache(cacheKey, omdbData);
                        }
                        updateUI();
                    });
                } else {
                    updateUI();
                }
            });
        }

        function fillFromOmdb(d) {
            ratingsData.rt = d.rt;
            ratingsData.mc = d.mc;
            ratingsData.imdb = d.imdb;
            ratingsData.ageRating = d.ageRating;
            ratingsData.oscars = d.oscars;
            ratingsData.boxoffice = d.boxoffice;
        }

        function updateUI() {
            clearTimeout(safetyTimer);
            insertRatings(render, ratingsData.rt, ratingsData.mc, ratingsData.oscars);
            updateHiddenElements(render, ratingsData);
               state.isUS = !normalizedCard.revenue && !!ratingsData.boxoffice;
            state.revenue = normalizedCard.revenue || ratingsData.boxoffice || 0;
            insertBoxOffice(render, state.revenue, state.isUS);
            calculateAverageRating(render);
        }
    }

    function getOmdbCache(key) {
        var cache = Lampa.Storage.get(OMDB_CACHE) || {};
        var item = cache[key];
        if (!item) return null;
        var ttl = item.empty ? EMPTY_CACHE_TIME : CACHE_TIME;
        return (Date.now() - item.timestamp < ttl) ? item : null;
    }

    function saveOmdbCache(key, data) {
        var hasValidRating = (
            (data.rt && data.rt !== "N/A" && !isNaN(data.rt)) ||
            (data.mc && data.mc !== "N/A" && !isNaN(data.mc)) ||
            (data.imdb && data.imdb !== "N/A" && !isNaN(data.imdb))
        );

        var hasValidAgeRating = (
            data.ageRating && data.ageRating !== "N/A" && data.ageRating !== "Not Rated"
        );

        var hasOscars = typeof data.oscars === 'number' && data.oscars > 0;
        var hasBoxOffice = typeof data.boxoffice === 'number' && data.boxoffice > 0;

        var isEmpty = !(hasValidRating || hasValidAgeRating || hasOscars || hasBoxOffice);

        var cache = Lampa.Storage.get(OMDB_CACHE) || {};

        var now = Date.now();
        for (var k in cache) {
            if (cache.hasOwnProperty(k)) {
                var it = cache[k];
                var ttl = it && it.empty ? EMPTY_CACHE_TIME : CACHE_TIME;
                if (!it || now - it.timestamp >= ttl) delete cache[k];
            }
        }

        cache[key] = {
            rt: data.rt,
            mc: data.mc,
            imdb: data.imdb,
            ageRating: data.ageRating,
            oscars: data.oscars || null,
            boxoffice: data.boxoffice || null,
            empty: isEmpty,
            timestamp: now
        };
        Lampa.Storage.set(OMDB_CACHE, cache);
    }

    function getImdbIdFromTmdb(tmdbId, type, callback) {
        if (!tmdbId) return callback(null);

        var cleanType = type === 'movie' ? 'movie' : 'tv';
        var cacheKey = cleanType + '_' + tmdbId;
        var cache = Lampa.Storage.get(ID_MAPPING_CACHE) || {};

        if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < CACHE_TIME)) {
            return callback(cache[cacheKey].imdb_id);
        }

        var url = 'https://api.themoviedb.org/3/' + cleanType + '/' + tmdbId + '/external_ids?api_key=' + Lampa.TMDB.key();

        var makeRequest = function(url, success, error) {
            new Lampa.Reguest().silent(url, success, function() {
                new Lampa.Reguest().native(url, function(data) {
                    try {
                        success(typeof data === 'string' ? JSON.parse(data) : data);
                    } catch(e) {
                        error();
                    }
                }, error, false, { dataType: 'json' });
            });
        };

        makeRequest(url, function(data) {
            if (data && data.imdb_id) {
                cache[cacheKey] = {
                    imdb_id: data.imdb_id,
                    timestamp: Date.now()
                };
                Lampa.Storage.set(ID_MAPPING_CACHE, cache);
                callback(data.imdb_id);
            } else {
                if (cleanType === 'tv') {
                    var altUrl = 'https://api.themoviedb.org/3/tv/' + tmdbId + '?api_key=' + Lampa.TMDB.key();
                    makeRequest(altUrl, function(altData) {
                        var imdbId = (altData && altData.external_ids && altData.external_ids.imdb_id) || null;
                        if (imdbId) {
                            cache[cacheKey] = {
                                imdb_id: imdbId,
                                timestamp: Date.now()
                            };
                            Lampa.Storage.set(ID_MAPPING_CACHE, cache);
                        }
                        callback(imdbId);
                    }, function() {
                        callback(null);
                    });
                } else {
                    callback(null);
                }
            }
        }, function() {
            callback(null);
        });
    }

    function fetchOmdbRatings(card, cacheKey, callback) {
        if (!card.imdb_id) {
            callback(null);
            return;
        }

        var url = 'https://www.omdbapi.com/?apikey=' + OMDB_API_KEY + '&i=' + card.imdb_id;
        new Lampa.Reguest().silent(url, function(data) {
            if (data && data.Response === 'True') {
                var imdbRating = data.imdbRating && data.imdbRating !== 'N/A' ? parseFloat(data.imdbRating) : null;

                callback({
                    rt: extractRating(data.Ratings, 'Rotten Tomatoes'),
                    mc: extractRating(data.Ratings, 'Metacritic'),
                    imdb: imdbRating,
                    ageRating: data.Rated || null,
                    oscars: parseOscars(data.Awards || ''),
                    boxoffice: parseBoxOffice(data.BoxOffice)
                });
            } else if (data && data.Response === 'False' && data.Error && !/limit/i.test(data.Error)) {
                callback({ empty: true });
            } else {
                callback(null);
            }
        }, function() {
            callback(null);
        });
    }

    function updateHiddenElements(render, ratings) {
        if (!render || !render[0]) return;

        var pgElement = $('.full-start__pg.hide', render);
        if (pgElement.length && ratings.ageRating) {
            var invalidRatings = ['N/A', 'Not Rated', 'Unrated'];
            var isValid = invalidRatings.indexOf(ratings.ageRating) === -1;
            if (isValid) {
                var localizedRating = AGE_RATINGS[ratings.ageRating] || ratings.ageRating;
                pgElement.removeClass('hide').text(localizedRating);
            }
        }

        var imdbContainer = $('.rate--imdb', render);
        if (imdbContainer.length) {
            if (ratings.imdb && !isNaN(ratings.imdb) && parseFloat(ratings.imdb) > 0) {
                if (imdbContainer.hasClass('hide')) {
                    imdbContainer.removeClass('hide');
                }
                var imdbDivs = imdbContainer.children('div');
                if (imdbDivs.length >= 2) {
                    imdbDivs.eq(0).text(parseFloat(ratings.imdb).toFixed(1));
                    imdbDivs.eq(1).html(Lampa.Lang.translate('source_imdb'));
                }
            } else {
                imdbContainer.addClass('hide');
            }
        }

        var tmdbContainer = $('.rate--tmdb', render);
        if (tmdbContainer.length) {
            tmdbContainer.find('> div:nth-child(2)').html(Lampa.Lang.translate('source_tmdb'));
        }
    }

    function extractRating(ratings, source) {
        if (!ratings || !Array.isArray(ratings)) return null;
        for (var i = 0; i < ratings.length; i++) {
            if (ratings[i].Source === source) {
                try {
                    return source === 'Rotten Tomatoes' ? parseFloat(ratings[i].Value.replace('%', '')) / 10 : parseFloat(ratings[i].Value.split('/')[0]) / 10;
                } catch(e) {
                    console.error('Помилка при парсингу рейтингу:', e);
                    return null;
                }
            }
        }
        return null;
    }

    function insertRatings(render, rtRating, mcRating, oscars) {
        if (!render) return;

        var rateLine = $('.full-start-new__rate-line', render);
        if (!rateLine.length) return;

        var lastRate = $('.full-start__rate:last', rateLine);

        if (rtRating && !isNaN(rtRating) && !$('.rate--rt', rateLine).length) {
            var rtValue = rtRating.toFixed(1);
            var rtElement = $(
                '<div class="full-start__rate rate--rt">' +
                '<div>' + rtValue + '</div>' +
                '<div class="source--name"></div>' +
                '</div>'
            );
            rtElement.find('.source--name').html(Lampa.Lang.translate('source_rt'));
            if (lastRate.length) rtElement.insertAfter(lastRate);
            else rateLine.prepend(rtElement);
        }

        if (mcRating && !isNaN(mcRating) && !$('.rate--mc', rateLine).length) {
            var mcValue = mcRating.toFixed(1);
            var insertAfter = $('.rate--rt', rateLine).length ? $('.rate--rt', rateLine) : lastRate;
            var mcElement = $(
                '<div class="full-start__rate rate--mc">' +
                '<div>' + mcValue + '</div>' +
                '<div class="source--name"></div>' +
                '</div>'
            );
            mcElement.find('.source--name').html(Lampa.Lang.translate('source_mc'));
            if (insertAfter.length) mcElement.insertAfter(insertAfter);
            else rateLine.prepend(mcElement);
        }

        if (oscars && !isNaN(oscars) && oscars > 0 && !$('.rate--oscars', rateLine).length) {
            var oscarsElement = $(
                '<div class="full-start__rate rate--oscars">' +
                '<div>' + oscars + '</div>' +
                '<div class="source--name"></div>' +
                '</div>'
            );
            oscarsElement.find('.source--name').html(Lampa.Lang.translate("maxsm_omdb_oscars"));
            rateLine.prepend(oscarsElement);
        }
    }

    function calculateAverageRating(render) {
        if (!render) return;

        var rateLine = $('.full-start-new__rate-line', render);
        if (!rateLine.length) return;

        var ratings = {
            imdb: parseFloat($('.rate--imdb div:first', rateLine).text()) || 0,
            tmdb: parseFloat($('.rate--tmdb div:first', rateLine).text()) || 0,
            mc: parseFloat($('.rate--mc div:first', rateLine).text()) || 0,
            rt: parseFloat($('.rate--rt div:first', rateLine).text()) || 0
        };

        var totalWeight = 0;
        var weightedSum = 0;
        var ratingsCount = 0;

        for (var key in ratings) {
            if (ratings.hasOwnProperty(key) && !isNaN(ratings[key]) && ratings[key] > 0) {
                weightedSum += ratings[key] * WEIGHTS[key];
                totalWeight += WEIGHTS[key];
                ratingsCount++;
            }
        }

        $('.rate--avg', rateLine).remove();

        if (ratingsCount > 1 && totalWeight > 0) {
            var averageRating = weightedSum / totalWeight;
            var avgElement = $(
                '<div class="full-start__rate rate--avg">' +
                '<div>' + averageRating.toFixed(1) + '</div>' +
                '<div class="source--name">' + Lampa.Lang.translate("ratimg_omdb_avg") + '</div>' +
                '</div>'
            );
            $('.full-start__rate:first', rateLine).before(avgElement);
        }

        colorizeDetailRates();
        removeLoadingAnimation(render);
        rateLine.css('visibility', 'visible');
    }

    function startPlugin() {
        window.combined_ratings_plugin = true;
        initColors();
        Lampa.Listener.follow('app', function(e) {
            if (e.type === 'ready') scheduleColorize();
        });
        Lampa.Listener.follow('full', function(e) {
            if (e.type !== 'complite') return;

            var active = Lampa.Activity.active();
            if (!active || !active.activity) return;
            var render = active.activity.render();
            var state = { revenue: 0, isUS: false };

            setTimeout(function() {
                markBudget(render);
                fetchAdditionalRatings(e.data.movie, render, state);
            }, 500);

            [1500, 3000, 5000].forEach(function(delay) {
                setTimeout(function() {
                    markBudget(render);
                    insertBoxOffice(render, state.revenue, state.isUS);
                }, delay);
            });
        });
    }

    if (!window.combined_ratings_plugin) startPlugin();
})();
