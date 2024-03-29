## React Boilerplate для модульного приложения

Модульность реализована через Yarn Workspaces (https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/)

Storybook расположена в packages/storybook

Приложение находится в папке /packages/apps/box-frontend. 

#### Скрипты и начало работы
- `yarn unit` - Запускает тесты по всем пакетам в режиме --watchAll.
- `yarn start-front` - запускает центральное приложение на порту 2518 в режиме hot-reload
- `yarn storybook` - поднимает storybook на порту 9009
- `yarn build-storybook` - билдит storybook 
- `yarn make-version` - запускает инструмент обновления версий. Запускаете, когда закончили работу с пакетом и готовите пулл-реквест. Повышает версии пакетов, пушит изменения в активную ветку удаленного репозитория, после чего заново устанавливает все зависимости для обновления связей между пакетами с учётом новых версий. Поддерживает дополнительные параметры - см. ниже "Контроль версий и пулл реквесты". 
- `yarn make-release` - то же, что и предыдущий, но дополнительно создаёт файлы changelog для каждого пакета из описаний каждого коммита (содержимое флага -m" ").
- `yarn status` - выводит в консоль статистику по монорепозиторию: версию каждого пакета, текущую ветку, наличие незакомиченных изменений
- `yarn clean` - удаляет все папки 'node_modules' во всех пакетах, приложениях, и корне монорепозитория. 
- `yarn remove-all` - удаляет зависимость, указанную в качестве параметра скрипта, из всех пакетов монорепозитория.  


После установки репозитория для начала работы нужно выполнить `yarn` из корня для установки всех зависимостей. 

#### Mock api
До наличия бэкенда и endpoints модули используют mock api через json-server. Json-server необходимо установить глобально. После чего перед запуском приложения необходимо зайти в папку .mock и в ней выполнить `json-server <somefile.json>`

Помимо прочего в папке .mock лежат файлы jest для обработки .css при тестах

Все модули собираются в приложении, и указываются в его package.json как зависимости по шаблону
 
    
    "@project/module-folder-name": module-version
    
    
Чтобы приложение "видело" папки с модулями, их нужно указать в корневом package.json:
```
"workspaces": {    
    "packages": [
      "packages/apps/*",
      "packages/components",
      "packages/storybook",
      "packages/widgets",
      "packages/utils",
      "packages/styled",
      "packages/services",
      "packages/modules"
    ],
    //другие настройки worspaces
  },
```

Индивидуальные зависимости каждого модуля вносятся в локальный package.json папки, в которой он находится, при помощи обычного yarn add, выполненного локально в папке пакета. Зависимость появится в "dependencies", но физически будет находиться в конревом `node_modules`. Локальные папки `node_modules` появляются только в случае разницы в версиях зависимостей (типа `babel-loader` у Storybook).

Для возможности легкого переиспользования модулей зависимости могут дублироваться - тот же React применяется и в приложении, и в компонентах, и в модулях, однако установка этой зависимости не порождает локальные `node_modules`, он устанавливается один раз, все ссылки из пакетов ведут на одну и ту же зависимость.   

Модуль в приложении импортируется как из любой внешней зависимости, взятой из NPM-репозитория:
```
import {projectCard} from '@project/modules';
```

Будьте внимательны с `export default` - ввиду специфики пакетов обычные `export const` могут "потеряться" при последующем импорте в приложение/пакет-"потребитель". Пакеты, находящиеся в репозитории "для примера" в качестве `export default` экспортируют массив переменных, на которые потом можно ссылаться при импорте пакета в другой пакет или в приложение. 

Никаких дополнительных настроек сборщика не требуется.

Приложение запускается командой yarn start из папки приложения

### Если проблемы с запуском
Если приложение не запускается из-за конфликтующих пакетов, добавьте в корень приложения файл .env со следующей строкой:
```
SKIP_PREFLIGHT_CHECK=true
```
без кавычек и прочего. Если не помогает - делайте Issue.

### Создание нового пакета
Новый пакет создаётся в папке packages. Он должен иметь следующую структуру:

```
root
|
|_packages
    |
    |__new-module-folder
              |
              |__src
              |   |_subfolders+_tests_ для каждого subfolder
              |__index.js
              |__import.js
              |__package.json                            
    
 ```
 
 -`index.js` - единая точка экспорта из пакета. Другие пакеты, как и центральное приложение, будут ссылаться на экспорты из этого файла.
 -`imports.js` - единая точка импорта в пакет компонентов из других пакетов. Все внутренние импорты файлов из папки `src` должны ссылаться только на этот файл.
 - `src` - все файлы пакета, организованные по папкам. Например, в пакете `components` папки "common","main" и т.п.
 - `package.json` - конфигурация и зависимости пакета. Конфигуация должна соблюдать формат:
 
 ```{
    "name": "@project/name-of-module",
    "version": "1.0.0",
    "description": "описание модуля",
    "main": "src/index.js", // не менять
    "main:src": "src/index.js",  // не менять
    "license": "MIT", // чтобы не было предупреждений об отсутствии лицензии
        //зависимости модуля
     "dependencies": {
      "@project/components": "1.0.0", //так выглядят импорты из других пакетов монорепозитория
      "@project/services": "1.0.0", //так выглядят импорты из других пакетов монорепозитория
      "ramda": "^0.26.1",
      "throttle-debounce": "^2.1.0"
    },
    //зависимости модуля для тестирования и отладки
    "devDependencies": {
      "fetch-mock": "^7.3.3"
    }
  }
  ``` 
  
  По возможности стоит стремиться использовать peerDependencies вместо локальных зависимостей в случае написания нового модуля в уже существующем проекте. 
  
  Каждый раз, как вы создаете какой-либо пакет и добавляете его в другой пакет в пределах репозитория, нужно выполнять `yarn` из любого места в монорепозитории, чтобы пакет и ссылки на него были зарегистрированы в workspaces. Yarn автоматически перепроверяет и перерегистрирует все ссылки на пакеты в пределах репозитория при каждой установке зависимостей. 
  
 ### Контроль версий и пулл реквесты
 Команды, относящиеся к управлению версиями монорепозитория поддерживают флаги, и по сути являются обертками над lerna version. 
 
 Полный список дополнительных параметров можно посмотреть по ссылке 
 ```
 https://github.com/lerna/lerna/tree/master/commands/version
 ```
 
 Важно понимать следующее. Lerna не умеет в контроль версии отдельного пакета - она может только обновить версии ВСЕХ изменившихся пакетов в монорепозитории, и запушить их в активную ветку удаленного репозитория. Однако она делает дополнительную работу в виде прописывания новых зависимостей во всех packaje.json, использующих пакет. Если, например, приложение использует пакеты 'modules' и 'components', и их версии изменились с 1.0.1 на 1.0.6-alpha.0, скрипт изменит ссылки в package.json приложения с 1.0.1 на 1.0.6-alpha.0
 
 Таким образом, если, например, в монорепозитории есть приложение, пакеты components, modules, services и widgets, были произведены изменения в components и modules, скрипт предложит обновить версии пакетов components и modules, а так же приложение - потому что в его package.json будут внесены изменения в версии зависимостей. Это же относится и к пакетам, зависящим от изменённых пакетов - lerna считает нужным обновить и их версии тоже из-за обновившихся версий зависимостей в package.json 
 
 Поэтому вводится конвенция:
 в случае, если во время работы вы не трогали код самого приложения/пакета, и изменения вносились только в пакеты-зависимости - из предлагаемой версии для ПРИЛОЖЕНИЯ выбирайте вариант "prepatch" - он присвоит версию с приставкой "aplpha" - так при рассмотрении pull request будет понятно, что единственное, что поменялось - это версия зависимости в package.json 