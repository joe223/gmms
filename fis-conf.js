fis.match('*.js', {
    packTo: '/static/aio.js'
});

fis.match('*.js', {
    useHash: true
});

fis.match('*.css', {
    useHash: false
});

fis.match('*.png', {
    useHash: false
});

fis.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: true
    })
})
