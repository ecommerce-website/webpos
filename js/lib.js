function include(filename) {
    var head = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    head.appendChild(script);
}