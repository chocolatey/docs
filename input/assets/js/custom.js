const leftSidebarNav =  $('#leftSidebarNav')
      table = $('table'),
      themeToggle = $('#themeToggle'),
      topNoticeAlert = $('#topNoticeAlert'),
      topNotice = window.sessionStorage.getItem('notice'),
      searchQuery = $('#searchQuery'),
      searchBox = $('#searchBox');

var keys = {},
    isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

// Anchor
anchors.options.placement = 'left';
anchors.add();

// Toggle theme but do not allow in IE (not supported)
if(!/MSIE \d|Trident.*rv:/.test(navigator.userAgent))
{
    const themePreference = localStorage.getItem('theme');

    // On load find if user has set a preference & toggle
    if (themePreference) {
        if (themePreference == 'dark') {
            themeToggle.prop('checked', true);
            table.addClass('table-dark');
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeToggle.prop('checked', true);
        table.addClass('table-dark');
    }

    // Detect system color scheme changes while user is on page
    $(window.matchMedia('(prefers-color-scheme: dark)')).on('change', function(e) {
        const newThemePreference = e.matches ? "dark" : "light";

        if (newThemePreference == 'dark' && !localStorage.getItem('theme')) {
            themeToggle.prop('checked', true);
            table.addClass('table-dark');
        } else if (!localStorage.getItem('theme')) {
            themeToggle.prop('checked', false);
            table.removeClass('table-dark');
        }
    });

    themeToggle.click(function() {
        if (themeToggle.is(':checked')) {
            $('html').attr('data-user-color-scheme', 'dark');
            localStorage.setItem('theme', 'dark');
            table.addClass('table-dark');
        } else {
            $('html').attr('data-user-color-scheme', 'light');
            localStorage.setItem('theme', 'light');
            table.removeClass('table-dark');
        }
    });
} else {
    themeToggle.attr('disabled', 'true').next().addClass('disabled');
}

// Top notice alert
if (topNotice) {
    topNoticeAlert.remove();
} else {
    topNoticeAlert.removeClass('d-none');
}

topNoticeAlert.find('button').click(function() {
    sessionStorage.setItem('notice', 'true');
});

// Show/hide child page title
if (!$('h2:first-of-type').hasClass('title-child')) {
    $('.title-child').removeClass('d-none');
}

// Left navigation
$.each(leftSidebarNav.find('.nav-link-collapse.active'), function (i, value) {
    var showActiveNav = $($(this).find('.btn-collapse').attr('href'));
    
    showActiveNav.collapse('show');

    // If the nav is collapsed, highlight the collapsed parent
    $(this).find('.btn-collapse').click(function() {
        $('.active-child').removeClass('active-child');

        if (!$(this).hasClass('collapsed')) {
            $(this).parent().addClass('active-child');
        } else {
            $($(this).attr('href')).find('.nav-link-collapse.active').addClass('active-child');
        }
    });
});

// When nav item is expanded, add class to parent for styling purposes
leftSidebarNav.find('.btn-collapse').click(function() {
    if ($(this).hasClass('collapsed')) {
        $(this).parent().addClass('nav-link-open');
    } else {
        $(this).parent().removeClass('nav-link-open');
    }
});

// Find new height for navigation scroll after collapse has shown/hidden
$('.collapse').on('shown.bs.collapse', function () {
    getLeftSidebarNavHeight();
}).on('hidden.bs.collapse', function () {
    getLeftSidebarNavHeight();
});

// Opens tabbed/collapse information based on hash
showCollapsedHash();

// Functions based on viewport
getWindowVHHeight();
toggleRightSidebarNav();
toggleStickyTop();
getLeftSidebarNavHeight();

// Insert correct command key in search box based on OS
if (isMac) {
    $('.search-key').html('&#8984;');
} else {
    $('.search-key').text('ctrl');
}

// Style Tables
$.each(table, function () {
    $(this).wrap('<div class="table-responsive"></div>');
    $(this).addClass('table table-bordered table-striped');
});

// Style blockquotes with emojis
$.each($('blockquote'), function () {
    var warningEmoji = "⚠️";

    if ($(this).text().indexOf(warningEmoji) >= 0) {
        // Contains warning emoji
        $(this).addClass('blockquote-warning');
    }
});

// Remove extra space from code blocks
$.each($('code'), function () {
    $(this).html($.trim($(this).html()));
});

// Highlight code blocks
$('pre').addClass('line-numbers py-2');
$('pre:not([class*="language-"])').addClass('language-none');
Prism.highlightAll();

// Cookie Notice
const cookieNoticeAlert = $('#cookieNoticeAlert'),
      cookieNoticeName = 'chocolatey_hide_cookies_notice',
      cookieNotice = getCookie(cookieNoticeName);

if (cookieNotice) {
    cookieNoticeAlert.remove();
} else {
    cookieNoticeAlert.removeClass('d-none');
}

cookieNoticeAlert.find('button').click(function() {
    if (~location.hostname.indexOf('chocolatey.org')) {
        document.cookie = cookieNoticeName + '=true; ' + getCookieExpirationNever() + 'path=/; domain=chocolatey.org;';
    } else {
        document.cookie = cookieNoticeName + '=true;' + getCookieExpirationNever() + 'path=/;';
    }
});

// Search
searchBox.on('shown.bs.modal', function (e) {
    searchQuery.focus();

    searchQuery.focus(function() {
        $(this).parentsUntil('form').parent().addClass('active');
    });
    searchQuery.blur(function() {
        $(this).parentsUntil('form').parent().removeClass('active');
    });
});

// Open search box on key command
$(document).keydown(function(e) {
    keys[e.which] = true;

    if (isMac) {
        if (keys[91] && keys[75]) { // Ctrl + k
            e.preventDefault();
            searchBox.modal('show');
        }
    } else {
        if (keys[17] && keys[75]) { // Cmd + k
            e.preventDefault();
            searchBox.modal('show');
        }
    }
});
$(document).keyup(function(e) {
  delete keys[e.which];
});

//Highlight/ find active right sidebar nav links when scrolling/clicked
$.each($('#rightSidebarNav li[class^="level"] a'), function() {
    var scrollHash = $(this).attr('href');

    // Find active link on load
    findActiveRightNavLink(scrollHash);

    // Highlight active links when scrolled
    $(window).scroll(function() {
        findActiveRightNavLink(scrollHash);
    });

    // TODO: Add active class and continue scrolling behavior if link is clicked but no more scroll can occur

    function findActiveRightNavLink(scrollHash) {
        // Enable selecting ID's with "." in them
        if (~scrollHash.indexOf('.')) {
            scrollHash = scrollHash.replace(/\./g, "\\.");
        }

        if ($(scrollHash).length) {
            if ($(window).scrollTop() >= $(scrollHash).offset().top && $(scrollHash).is(':visible')) {
                $('a[href="' + scrollHash + '"]').addClass('active');
                $('a[href="' + scrollHash + '"]').parent().prev().find('a.active').removeClass('active');
            } else {
                $('a[href="' + scrollHash + '"]').removeClass('active');
            }
        }
    }
});

// Smooth scroll
$('a')
    // Remove links we don't want to smooth scroll to
    .not('[data-toggle="collapse"]')
    .not('[data-toggle="tab"]')
    .not('[data-toggle="pill"]')
    .not('[data-slide="prev"]')
    .not('[data-slide="next"]')
    .not('[href*="/"]')
    .click(function(e) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {

        e.preventDefault();

        // Store hash
        var hash = this.hash,
            scrollHash = this.hash;

        // Enable selecting ID's with "." in them
        if (~scrollHash.indexOf('.')) {
            scrollHash = hash.replace(/\./g, "\\.");
        }

        if ($(scrollHash).is(':hidden')) {
            $(scrollHash).parent().collapse('show');

            $(scrollHash).parent().on('shown.bs.collapse', function () {
                animateScroll();
            })
        } else {
            animateScroll();
        }

        function animateScroll() {
            $('html, body').animate({
                scrollTop: $(scrollHash).offset().top
                }, 800, function() {
                window.location.hash = hash;
            });
        }
    }
});

// Show collapsed items when link is clicked that navigates inside it. Add class "btn-collapse-target" to active this feature as well as adding a "data-href" to the target collapse item ID.
$.each($('.btn-collapse-target'), function() {
    $(this).click(function() {
        var collapseTarget = $($(this).attr('data-href'));

        collapseTarget.collapse('show');
    });
});

$(window).on("resize", function () {
    getWindowVHHeight();
    toggleRightSidebarNav();
    toggleStickyTop();
    getLeftSidebarNavHeight();
});

// Manually remove loader so it's not still playing animation in the background
leftSidebarNav.find('.loader-container').fadeOut(3000, function () {
    $(this).remove();
});

function getCookieExpirationNever() {
    var d = new Date();
    // 100 years in milliseconds: 100 years * 365 days * 24 hours * 60 minutes * 60 seconds * 1000ms
    d.setTime(d.getTime() + (100 * 365 * 24 * 60 * 60 * 1000));
    return 'expires=' + d.toUTCString() + ';';
}

function getWindowVHHeight() {
    let vh = window.innerHeight * 0.01;
    $('html').css('--vh', vh + 'px');
}

function toggleRightSidebarNav() {
    const rightSidebar =  $('#rightSidebar');

    if (window.innerWidth < 1200) {
        rightSidebar.collapse('hide');
    } else {
        rightSidebar.collapse('show');
    }

    $('#rightSidebarNav li[class^="level"] a').click(function() {
        if (window.innerWidth < 1200) {
            rightSidebar.collapse('hide');
        }
    });
}

function toggleStickyTop() {
    if (window.innerWidth < 768) {
        leftSidebarNav.removeClass('sticky-top');
    } else {
        leftSidebarNav.addClass('sticky-top');
    }
}

function getLeftSidebarNavHeight() {
    var leftSidebarNavHeight;

    if (window.innerWidth >= 768) {
        if ($(document).height() - $(window).height() >= 0) {
            var topNoticeAlertHeight = topNoticeAlert.outerHeight(true);

            if (!topNoticeAlertHeight) {
                topNoticeAlertHeight = 0;
            }

            leftSidebarNavHeight = $(document).height() - (topNoticeAlertHeight + $('#globalNav').outerHeight(true) + $('#topNav').outerHeight(true) + $('footer').outerHeight(true)) + 'px';

            leftSidebarNav.css('height', leftSidebarNavHeight);
        }
        else {
            leftSidebarNav.css('height', '');
        }
    } else {
        leftSidebarNav.css('height', '');
    }
}

function showCollapsedHash() {
    // Enable selecting ID's with "." in them
    if (~location.hash.indexOf('.')) {
        location.hash = location.hash.replace(/\./g, "\\.");
    }

    if ($(location.hash).length) {
        $(location.hash).parent().collapse('show');
        
        $(location.hash).parent().on('shown.bs.collapse', function () {
            $('a[href="' + location.hash + '"]').trigger('click');
        })
    }
}

// Get cookies
function getCookie(name) {
    var pattern = RegExp(name + "=.[^;]*"),
        matched = document.cookie.match(pattern);

    if (matched) {
        var cookie = matched[0].split('=');
        return cookie[1];
    }
    return false;
}