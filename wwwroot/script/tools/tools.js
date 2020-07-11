class ProvinceDataUnit {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

let getNewDate = function (year, month, day) {
    return new Date(year, month - 1, day);
};

let dateToString = function (date) {
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
};

let addDays = function (date, days) {
    let value = date.getTime();
    value += days * 24 * 3600 * 1000;

    return new Date(value);
};

let compareDate = function (date1, date2) {
    let month1 = date1.getMonth();
    let day1 = date1.getDate();
    let month2 = date2.getMonth();
    let day2 = date2.getDate();

    if (month1 === month2) {
    }

    return date1.getTime() - date2.getTime();
};

let getTimeSeriesArray = function () {
    let timeSeries = [];

    let startDate = getNewDate(2020,1,25);
    let endDate = getNewDate(2020,3,31);

    for (let time = startDate; compareDate(endDate, time) >= 0; time = addDays(time, 1)) {
        timeSeries.push(dateToString(time));
    }

    return timeSeries;
};