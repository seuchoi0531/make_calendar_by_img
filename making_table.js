$(document).ready(function () {
    var start_month = document.getElementById("start_month");
    var start_day = document.getElementById("start_day");
    var day_of_the_week = document.getElementById("day_of_the_week");
    var last_day_per_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var week_range = document.getElementById("number_of_weeks1");
    var week_text = document.getElementById("number_of_weeks2");
    var board = document.getElementById('capture');

    start_month.addEventListener("change", function () {
        start_day.innerHTML = "";
        for (var day = 1; day <= last_day_per_month[start_month.value - 1]; day++) {
            start_day.innerHTML += "<option value=" + day + ">" + day + "</option>";
        }
    })
    for (var month = 1; month <= 12; month++) {
        start_month.innerHTML += "<option value=" + month + ">" + month + "</option>";
    }

    week_range.addEventListener("input", function () {
        week_text.value = week_range.value;
    })
    week_text.addEventListener("input", function () {
        week_range.value = week_text.value;
        if (week_text.value > 9) {
            week_text.value = 9;
            week_range.value = 9;
        }
        if (week_text.value < 1) {
            week_text.value = 1;
            week_range.value = 1;
        }
        if (week_text.value == "") {
            week_text.value = "";
        }
    })

    document.getElementById('makeButton').addEventListener('click', function () {
        board.innerHTML = "";
        var sm = parseInt(start_month.value);
        var sd = parseInt(start_day.value);
        var dw = parseInt(day_of_the_week.value);
        var str = "";
        var inc_day = 0;
        var tablestart = "<table>";
        var tableend = "</table>";
        var tableline = "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
        str += tablestart;
        for (var i = 0; i < parseInt(week_range.value); i++) {
            str += "<tr id=\"line" + (i + 1) + "\">";
            for (var j = 0; j < 7; j++) {
                str += "<td id=\"cell" + (i + 1) + j + "\">";
                if (i == 0) {
                    if (j == dw)
                        str += sm + "/" + sd;
                    else if (j > dw){
                        inc_day++;
                        str += sd + inc_day;
                    }
                } else {
                    inc_day++;
                    str += sd + inc_day;
                }
                str += "</td>";
            }
            str += "</tr>";
        }
        str += tableend;
        board.innerHTML = str;
        console.log(board.innerHTML);
    })

    document.getElementById('saveButton').addEventListener('click', function () {
        html2canvas(document.getElementById('capture')).then(canvas => {
            // Convert the canvas to a data URL
            var imgData = canvas.toDataURL('image/png');

            // Create a temporary link element
            var link = document.createElement('a');
            link.href = imgData;
            link.download = 'capture.png';

            // Trigger the download
            link.click();
        });
    });
});