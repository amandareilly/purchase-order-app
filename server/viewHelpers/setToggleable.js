const setToggleable = function(context, options) {

    const baseUrl = `/${options.hash.base}`;
    const query = (options.hash.query ? `?${options.hash.query}` : '');
    const userFilter = (options.hash.query ? `&user=${options.hash.user}` : `?user=${options.hash.user}`);

    let link = baseUrl + query;
    let toggleable = link;
    if (context) {
        link = link + userFilter;
    } else {
        toggleable = link + userFilter;
    }

    return `<a href="${link}" class=${options.hash.class} data-toggleable="${toggleable}">${options.hash.text}</a>`;

}

module.exports = setToggleable;