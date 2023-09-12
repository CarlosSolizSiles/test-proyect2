function createCookie(name: string, value: String, days: number) {
    var expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = name + "=" + value + ";expires=" + expires.toUTCString();
}

function checkCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}
function getCookieUserId(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(nameEQ) === 0) {
            // return c.substring(0, nameEQ.length);
            return c.split("=")[1];
        }
    }
    return null;
}

function deleteCookie(name: string) {
    var expires = new Date();
    expires.setDate(expires.getDate() - 1);
    document.cookie = name + "=;expires=" + expires.toUTCString();
}

export { createCookie, checkCookie, getCookieUserId, deleteCookie };
