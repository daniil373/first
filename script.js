function addEvent() {
    const day = document.getElementById("day").value;
    const time = document.getElementById("time").value;
    const eventText = document.getElementById("event").value;

    const table = document.getElementById("schedule");
    const row = table.rows[parseInt(time) + 1];  // +1 для thead
    const cell = row.cells[parseInt(day)];

    cell.textContent = eventText;
}

function saveSchedule() {
    const table = document.getElementById("schedule");
    const scheduleData = [];

    // Сохраняем только данные ячеек (без заголовков)
    for (let i = 1; i < table.rows.length; i++) {
        const rowData = [];
        for (let j = 1; j < table.rows[i].cells.length; j++) {
            rowData.push(table.rows[i].cells[j].textContent);
        }
        scheduleData.push(rowData);
    }

    localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
    alert("Расписание сохранено!");
}

function loadSchedule() {
    const scheduleDataString = localStorage.getItem("scheduleData");

    if (scheduleDataString) {
        const scheduleData = JSON.parse(scheduleDataString);
        const table = document.getElementById("schedule");

        for (let i = 1; i < table.rows.length; i++) {
            for (let j = 1; j < table.rows[i].cells.length; j++) {
                table.rows[i].cells[j].textContent = scheduleData[i-1][j-1] || ""; // Подстраховка от отсутствия данных
            }
        }
        alert("Расписание загружено!");
    } else {
        alert("Расписание не найдено!");