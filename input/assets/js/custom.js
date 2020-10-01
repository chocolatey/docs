// Anchor
anchors.options.placement = 'left';
anchors.add();

// Clipboard
var snippets = document.querySelectorAll("pre > code");
[].forEach.call(snippets, function(snippet) {
    snippet.insertAdjacentHTML("beforebegin", "<button class='btn-copy' data-clipboard-snippet><img class='clippy' width=13 src='/assets/images/clippy.svg' alt='Copy to clipboard'></button>");
});
var clipboardSnippets = new Clipboard('[data-clipboard-snippet]', {
    target: function(trigger) {
        return trigger.nextElementSibling;
    }
});
clipboardSnippets.on('success', function(e) {
    e.clearSelection();
    showTooltip(e.trigger, "Copied!");
});
clipboardSnippets.on('error', function(e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
});
var btns = document.querySelectorAll('.btn-copy');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('mouseleave', function(e) {
        e.currentTarget.setAttribute('class', 'btn-copy');
        e.currentTarget.removeAttribute('aria-label');
    });
}
function showTooltip(elem, msg) {
    elem.setAttribute('class', 'btn-copy tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
}
function fallbackMessage(action) {
    var actionMsg = '';
    var actionKey = (action === 'cut' ? 'X' : 'C');
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = 'No support :(';
    } else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
    } else {
        actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
    }
    return actionMsg;
}

// Style blockquotes with emojis
$.each($('blockquote'), function () {
    var warningEmoji = "⚠️";

    if ($(this).text().indexOf(warningEmoji) >= 0) {
        // Contains warning emoji
        $(this).addClass('blockquote-warning');
    }
});