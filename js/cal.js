/*Mandeep  */
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");
display = document.getElementById("display");
date = document.getElementById("date");
event = document.getElementById("event");
textarea = document.getElementById("textarea");
eventStored ="";
cellData = "";
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
eventArr = [];
monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function nextMonth() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previousMonth() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jumpMonth() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar-body");


    tbl.innerHTML = "";


    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;


    let date = 1;
    for (let i = 0; i < 6; i++) {

        let row = document.createElement("tr");


        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                    cell.classList.remove("info");

                }
                debugger;

                cell.appendChild(cellText);
                var selectedDate = localStorage.getItem("events");
                if (selectedDate == null) {} else {
                    selectedDate = selectedDate.split("|");
                    for (var k = 0; k <= selectedDate.length - 1; k++) {
                        var arrayDate = selectedDate[k].split(",");
                        var dateSelected = parseInt(arrayDate[0]);
                        if (date == dateSelected) {
                            cell.style.border = "2px solid #0000FF";
                        }
                    }
                }
                cell.addEventListener("click", function (e) {

                    $('#calendar-body td').removeClass("info");
                    cellData = parseInt(e.currentTarget.firstChild.data);
                    e.currentTarget.classList.add("info");
                    // e.currentTarget.style.border = "2px solid #0000FF";

                    getEvents(cellData);


                });
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row);
    }

}

function mark() {

}

function getEvents(cellData) {
    textarea.innerHTML = "";
    var li = document.createElement("li");
    var monthNyear = monthAndYear.innerHTML;
    var date1 = parseInt(cellData);
    display.style.display = "block";
    date.value = date1 + " " + monthNyear;
    var arr_event = localStorage.getItem("events");
    if (arr_event == null) {

    } else {
        arr_event = arr_event.split("|");
        for (var j = 0; j <= arr_event.length - 1; j++) {
            var arr = arr_event[j].split(",");
            if ((parseInt(arr[0]) === cellData) && (parseInt(arr[1]) == currentMonth)) {

                createSpan(arr[2]);

            }


        }

    }
}

function toDoList() {
    var inputValue = event.value;
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        eventStored += cellData + "," + currentMonth + "," + inputValue + "||";
        localStorage.setItem("events", eventStored);
        var selectedcell = document.getElementsByClassName("info");
        selectedcell[0].style.border = "2px solid #0000FF";
        createSpan(inputValue);
    }

}

function createSpan(valueStr) {
    document.getElementById("spanEvent").style.display = "block";
    var li = document.createElement("li");
    var inputValue = valueStr;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    textarea.appendChild(li);
    var span = document.createElement("SPAN");

    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    span.addEventListener("click", close);


    event.value = "";
}

function close() {
    var div = this.parentElement;
    div.style.display = "none";
}


function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
