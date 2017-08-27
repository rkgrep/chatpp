let loader;

console.log('creating loader')

loader = setInterval(() => {
    if (typeof CW !== "undefined" && typeof RM !== "undefined") {
        console.log(CW, RM)
        window.clearInterval(loader);
    }
}, 500)

console.log(chrome)
