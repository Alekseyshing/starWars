const cssPromises = {};

function loadResource(src) {
    // JS модуль,
    if (src.endsWith('.js')) {
        return import(src);
    }
    // CSS файл,
    if (src.endsWith('.css')) {
        if (!cssPromises[src]) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = src;
            cssPromises[src] = new Promise(resolve => {
                link.addEventListener('load', () => resolve());
            });
            document.head.append(link);
        }
        return cssPromises[src];
    }
    //данные сервера
    return fetch(src).then(res => res.json());
}

const appContainer = document.getElementById('app');


function renderPage(moduleName, apiUrl, css) {
    Promise.all([moduleName, apiUrl, css]
            .map(src => loadResource(src)))
        .then(([pageModule, data]) => {
            appContainer.innerHTML = '';
            appContainer.append(pageModule.render(data, loadPage));
        });
}

function loadPage() {
    const searchParams = new URLSearchParams(location.search);
    const itemtId = searchParams.get('itemId');

    if (itemtId) {
        //загрузка детальной страницы товара
        renderPage(
            './film-details.js',
            `https://swapi.dev/api/films/${itemtId}`,
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
        );
    } else {
        renderPage(
            './films-list.js',
            'https://swapi.dev/api/films/',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
        );
    }
}

loadPage();

window.addEventListener('popstate', loadPage);
