$(document).ready(function () {
    var start_month = document.getElementById("start_month");
    var start_day = document.getElementById("start_day");
    var day_of_the_week = document.getElementById("day_of_the_week");
    var last_day_per_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var week_range = document.getElementById("number_of_weeks1");
    var week_text = document.getElementById("number_of_weeks2");
    var board = document.getElementById('capture');
    var border = [];
    var bordershadow = 1.25;
    var base_color = "rgb(235, 255, 115)";
    var white_color = "rgb(255, 255, 255)";
    var erasecell = [];

    window.oncontextmenu = function () { return false; };
    window.onselectstart = function () { return false; };

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
        var tablestart = "<table id=\"calendar\">";
        var tableend = "</table>";
        str += tablestart;
        border = [];

        for (var i = 0; i < parseInt(week_range.value); i++) {
            str += "<tr id=\"line" + (i + 1) + "\">";
            for (var j = 0; j < 7; j++) {
                if (j == 0)
                    str += "<td id=\"cell" + (i + 1) + j + "\"class=\"sunday\">";
                else if (j == 6)
                    str += "<td id=\"cell" + (i + 1) + j + "\"class=\"saturday\">";
                else
                    str += "<td id=\"cell" + (i + 1) + j + "\">";
                if (i == 0) {
                    if (j == dw)
                        str += sm + "/" + sd;
                    else if (j > dw) {
                        inc_day++;
                        if (sd + inc_day > last_day_per_month[sm - 1]) {
                            sm++;
                            if (sm == 13)
                                sm = 1;
                            sd = 1;
                            inc_day = 0;
                            str += sm + "/" + sd;
                            border.push(i + 1);
                            border.push(j);
                        }
                        else
                            str += sd + inc_day;
                    }
                } else {
                    inc_day++;
                    if (sd + inc_day > last_day_per_month[sm - 1]) {
                        sm++;
                        if (sm == 13)
                            sm = 1;
                        sd = 1;
                        inc_day = 0;
                        str += sm + "/" + sd;
                        border.push(i + 1);
                        border.push(j);
                    }
                    else
                        str += sd + inc_day;
                }
                str += "</td>";
            }
            str += "</tr>";
        }
        str += tableend;
        board.innerHTML = str;

        /*
        좌표보다 크면 top
좌표보다 작으면 bottom
좌표면 left

좌표가 첫줄일때
좌표보다 작으면 bottom
    좌표가 첫칸이아닐때
    좌표면 left

좌표가 막줄일때
    좌표가 첫칸이아닐때
    좌표면 left
좌표보다 크면 top
좌표면 top

좌표가 첫줄막줄이 아닐때
좌표보다 크면 top
좌표보다 작으면 bototm
    좌표가 첫칸이 아닐때
    좌표면 left
좌표면 top
*/

        for (var i = 0; i < border.length / 2; i++) {
            for (var j = 0; j < 7; j++) {
                var cell = document.getElementById("cell" + border[parseInt(i * 2)] + j);
                var cell_up, cell_down, cell_left;
                if (parseInt(border[parseInt(i * 2)]) != 0)
                    cell_up = document.getElementById("cell" + (border[parseInt(i * 2)] - 1) + j);
                if (parseInt(border[parseInt(i * 2)]) != parseInt(week_range.value))
                    cell_down = document.getElementById("cell" + (border[parseInt(i * 2)] + 1) + j);
                if (parseInt(border[parseInt(i * 2 + 1)]) != 0)
                    cell_left = document.getElementById("cell" + border[i * 2] + (j - 1));

                if (parseInt(border[parseInt(i * 2)]) == 1) {
                    if (j < parseInt(border[parseInt(i * 2 + 1)])) {
                        cell.style.boxShadow = "0 -" + bordershadow + "px 0 0 black inset";
                        cell_down.style.boxShadow = "0 " + bordershadow + "px 0 0 black inset";
                    }
                    else if (j == parseInt(border[parseInt(i * 2 + 1)]) && j != 0) {
                        cell.style.boxShadow = bordershadow + "px 0 0 0 black inset";
                        cell_left.style.boxShadow = "-" + bordershadow + "px -" + bordershadow + "px 0 0 black inset";
                    }
                }
                else if (parseInt(border[parseInt(i * 2)]) == parseInt(week_range.value)) {
                    if (j >= parseInt(border[parseInt(i * 2 + 1)])) {
                        cell.style.boxShadow = "0 " + bordershadow + "px 0 0 black inset";
                        cell_up.style.boxShadow = "0 -" + bordershadow + "px 0 0 black inset";
                    }
                    if (j == parseInt(border[parseInt(i * 2 + 1)]) && j != 0) {
                        cell.style.boxShadow = bordershadow + "px " + bordershadow + "px 0 0 black inset";
                        cell_left.style.boxShadow = "-" + bordershadow + "px 0 0 0 black inset";
                    }
                }
                else {
                    if (j >= parseInt(border[parseInt(i * 2 + 1)])) {
                        cell.style.boxShadow = "0 " + bordershadow + "px 0 0 black inset";
                        cell_up.style.boxShadow = "0 -" + bordershadow + "px 0 0 black inset";
                    }
                    else if (j < parseInt(border[parseInt(i * 2 + 1)])) {
                        cell.style.boxShadow = "0 -" + bordershadow + "px 0 0 black inset";
                        cell_down.style.boxShadow = "0 " + bordershadow + "px 0 0 black inset";
                    }
                    if (j == parseInt(border[parseInt(i * 2 + 1)]) && j != 0) {
                        cell.style.boxShadow = bordershadow + "px " + bordershadow + "px 0 0 black inset";
                        cell_left.style.boxShadow = "-" + bordershadow + "px -" + bordershadow + "px 0 0 black inset";
                    }
                }
            }
        }

        var tag_array = document.getElementsByTagName("td");
        for (var i = 0; i < tag_array.length; i++) {
            tag_array[i].style.height = "50px";
            tag_array[i].style.width = "79px";
        }

        document.getElementById("calendar").addEventListener("mousedown", function (e) {
            var x = parseInt((e.layerX - 25) / 80);
            var y = parseInt((e.layerY - 22) / 80 + 1);
            var clicked_cell = document.getElementById("cell" + y.toString() + x.toString());
            console.log((e.layerY - 22) + ", " + (e.layerX - 25));
            console.log(y + ", " + x);
            if (e.button == 0)
                clicked_cell.style.backgroundColor = base_color;
            else if (e.button == 2)
                clicked_cell.style.backgroundColor = white_color;
            else if (e.button == 1) {
                if (clicked_cell.innerHTML == "") {
                    for (var i = 0; i < erasecell.length; i++) {
                        if (erasecell[i * 3] == y) {
                            if (erasecell[i * 3 + 1] == x) {
                                clicked_cell.innerHTML = erasecell[i * 3 + 2];
                            }
                        }
                    }
                } else {
                    erasecell.push(y);
                    erasecell.push(x);
                    erasecell.push(clicked_cell.innerHTML);
                    clicked_cell.innerHTML = "";
                }
            }
        })
    })

    document.getElementById('saveButton').addEventListener('click', function () {
        var captureElement = document.getElementById('capture');
        domtoimage.toPng(captureElement)
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.href = dataUrl;
                var str = imgName();
                link.download = str + ".png";
                //link.download = 'capture.png';
                link.click();
            })
            .catch(function (error) {
                console.error('Capture failed', error);
            });
    });
    function imgName() {
        var date = new Date();
        var current_year = date.getFullYear() % 100;
        var current_month = "";
        var result = current_year + ".";
        var str = "";
        var isFirst = true;
        var tdarr = document.getElementsByTagName("td");
        Array.from(tdarr).forEach((element) => {
            if (element.innerHTML != "" && isFirst) {
                str = element.innerHTML;
                result += nomalizeDate(str);
                isFirst = false;
            }
            if (element.innerHTML.indexOf("/") == 1) {
                if (current_month == "12")
                    current_year++;
                current_month = element.innerHTML.substring(0, 1);
            } else if (element.innerHTML.indexOf("/") == 2) {
                if (current_month == "12")
                    current_year++;
                current_month = element.innerHTML.substring(0, 2);
            }
        });
        result += "~" + current_year + ".";
        isFirst = true;
        var tdarrayrev = Array.from(tdarr).reverse();
        var last_day = "";
        for (var i = 0; i < tdarrayrev.length; i++) {
            var e = tdarrayrev[i].innerHTML;
            if (e != "" && isFirst) {
                if (e.includes("/")) {
                    result += nomalizeDate(e);
                    break;
                } else
                    last_day = e;
                isFirst = false;
            }
            if (e.includes("/") && !isFirst) {
                str = e;
                result += nomalizeDate(str);
                result = result.substring(0, result.length - 2);
                if (last_day.length == 1)
                    result += "0";
                result += last_day;
                break;
            }
        }
        return result;
    }
    function nomalizeDate(str) {
        var result = "";
        if (str.indexOf("/") == 1) {
            result += "0";
            result += str.substring(0, 1);
        } else
            result += str.substring(0, 2);
        result += ".";
        if (str.indexOf("/") == str.length - 2) {
            result += "0";
            result += str.substring(str.length - 1, str.length);
        } else {
            result += str.substring(str.length - 2, str.length);
        }
        return result;
    }
});