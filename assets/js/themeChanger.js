var sunOrMoon = document.getElementById('sunOrMoon');
var themes = {
    'light': 'dark',
    'dark': 'light'
}
function setTheme() {
    var theme = localStorage.getItem("theme");
    if (theme) {
        document.body.className = theme;
        changeThemeIcon(theme)
    } else {
        localStorage.setItem("theme", "dark");
        setTheme();
    }
}

function changeTheme() {
    var theme = localStorage.getItem('theme');
    document.body.className = themes[theme];
    localStorage.setItem("theme", themes[theme]);
    changeThemeIcon(themes[theme])
}

function changeThemeIcon(theme) {
    if (theme == 'dark') {
        sunOrMoon.className = "fas fa-sun"
    } else {
        sunOrMoon.className = "fas fa-moon"
    }
}

setTheme();