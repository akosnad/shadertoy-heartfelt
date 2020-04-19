var dayOfWeek = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
var clockTimeText = document.getElementById('clockTimeText');
var clockDateText = document.getElementById('clockDateText');

// Credit: https://stackoverflow.com/a/10073788
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function updateClock() {
    let now = new Date();
    clockTimeText.innerHTML = `${pad(now.getHours(), 2)}:${pad(now.getMinutes(), 2)}`
    clockDateText.innerText = `${now.getFullYear()}. ${pad(now.getMonth(), 2)}. ${pad(now.getDate(), 2)}. ${dayOfWeek[now.getDay()]}`
    setTimeout(updateClock, 15 * 1000)
}

updateClock()