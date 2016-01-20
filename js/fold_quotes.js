(function () {
    var els = document.querySelectorAll('.post blockquote');
    [].forEach.call(els, function (el) {
        el.style.display = 'none';
        el.previousElementSibling.innerHTML += '<span> [<a href="#" onclick="return show_quote(this);">показать цитату</a>]</span>';
    });

})();

function show_quote(link) {
    link.parentNode.parentNode.nextElementSibling.style.display = 'block';
    link.parentNode.style.display = 'none';
    return false;
}
