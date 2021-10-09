Система сборки основана на Gulp 4 + Webpack 4

Препроцессор CSS: less + post-css обработка - autoprefixer, cssnano
Шаблонизатор: Nunjucks
Сборка JS: webpack + babel (preset-env + plugin-proposal-class-properties)
Обработка SVG: SVGO (gulp-svgmin)
DevServer: BrowserSync

Автор: dimovich85@gmail.com

Система имеет два основных скрипта: 
gulp
gulp build

Также можно:
npm run dev
npm run build

После запуска gulp (npm run dev) первым делом удаляется папка dest! Именно поэтому НЕ РАБОТАЙТЕ с файлами в папке dest
Следующий шаг - сборка файлов из папки src в папку dest и последний шаг - запуск наблюдателей за папкой src и запуск сервера, который будет обслуживать процесс разработки. По умолчанию сервер запускается на localhost:3000. Все настройки можно изменить. Наблюдатели - отдельные процессы, которые следят за изменениями в исходных файлах и при необходимости запускают сборку, обычно после этого происходит автоматическая перезагрузка страницы в браузере, благодаря серверу.

Все задачи для Gulp 4 находятся в папке gulpfile.js. Точкой входа в систему сборки является index.js

Для работы большинства задач необходимы пути откуда брать исходники и складывать результат, а также необходима информация о режиме в котором работает сборка: режим разработки (development) или собрки готового продукта (production).
Вся эта информация хранится в файле gulp.config.js
При запуске в режиме разработки многие процессы настроены на оптимизацию процесса самой сборки и разработки - кеширование файлов, отсутствие минификации, наличие sourcemaps.
В режиме production наоборот - оптимизация готовых файлов. Это включает в себя минификация, обфускация, отсутствие sourcemaps и самого сервера.

Переменная окружения env меняется при запуске задач из списка перечисленных в начале.

Для изменения порта для сервера необходимо изменить файл gulp.config.js: найти в нем объект config, и ключ port.

Система сборки умеет собирать, транспилировать, минифицировать и обфусцировать JavaScript код с помощью webpack. Здесь НЕ используется webpack-stream для Gulp, здесь отдельным процессом запускается webpack. В качестве сервера используется не webpack-dev-server, а bwSync. Сам webpack занимается только сборкой JS из папки src/js. Точкой входа является index.js. Папка src/js-lib нужна на случай подключения скриптов "по-старинке" через отдельный файл. Этот способ нежелетельный. Тем не менее - если подключать такие библиотеки, то путь указывать следующий: js/libs/{lib-name}.js Так как система сборки скопирует данный файл в dest/js/libs, а в самой папке dest/js будет лежать бандл - js.js

Графика и шрифты копируются автоматически. Растровая графика НЕ сжимается автоматически. SVG - оптимизируется с помощью svgo (gulp-svgmin).

Разметка собирается из папки templates. Однако после сборки готовые html файлы начинают иерархию от корня папки dest, в связи с этим для корректности путей следует использовать относительные пути отталкиваясь от папки dest. Тем не менее, пока работает сервер ошибка не будет заметна.
В папке templates/parts/svg можно складывать svg, которые необходимо встроить в разметку. Всегда пользуйтесь именно этой папкой для хранения исходных файлов, но подключайте через папку svgo, которая появится автоматически при старте системы сборки. Если изменить svg вручную в папке svg система обновит файл в папке svgo, но страница не перезагрузится, чтоб увидеть изменения - измените файл html, куда встроена эта картинка, после чего все изменения будут доступны.


Другие возможности системы:
gulp less - собирает less в css в режиме production
gulp nunkucks - собирает nunjucks в html в режиме production
gulp webpack - собирает js в js в режиме production

Для генерации колоночной сетки используется SmartGrid от Дмитрия Лаврика (https://www.npmjs.com/package/smart-grid). Чтоб настроить и сгенерировать сетку необходимо внести настройки в файл smart-grid.js из корня проекта. Папка, куда будет добавлен готовый файл сетки находится по пути src/precss/libs, тоже можно настроить передав первым парамтером в функцию smartgrid - нужный путь. Последний шаг:
npm run grid