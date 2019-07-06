export function getBreadcrumbs() {
    let paths = window.location.pathname.split('/');
    paths = paths.filter((pathStr) => pathStr != '');
    if (paths[0] !== 'home') {
        paths.unshift('home');
    }
    return paths;
}