// Anchor
anchors.options.placement = 'left';
anchors.add();

// Style blockquotes with emojis
$.each($('blockquote'), function () {
    var warningEmoji = "⚠️";

    if ($(this).text().indexOf(warningEmoji) >= 0) {
        // Contains warning emoji
        $(this).addClass('blockquote-warning');
    }
});

// Remove extra space from code blocks
$("code").each(function () {
    $(this).html($.trim($(this).text()));
});

// Highlight code blocks
$('pre').addClass('line-numbers border py-2');
$('pre:not([class*="language-"])').addClass('language-none');
Prism.highlightAll();