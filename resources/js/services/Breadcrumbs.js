export function getBreadcrumbs(slug) {
    let paths = window.location.pathname.split('/');
    paths = paths.filter((pathStr) => pathStr != '');
    if (paths[0] !== 'home') {
        paths.unshift('home');
    }
    if (slug) {
        paths[paths.length - 1] = slug;
    }
    return paths;
}