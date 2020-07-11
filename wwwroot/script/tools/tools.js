class ProvinceDataUnit {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

let dateToString = function (date) {
    return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
}

let addOneDay = function (date) {
    let month = date.getMonth();
    let day = date.getDate();

    if (month === 2) {
        if (day === 29) {
            month += 1;
            day = 1;
        }
    } else if (month === 1) {
        if (day === 31) {
            month += 1;
            day = 1
        }
    }

    return new Date(2020, month, day);
}

let compareDate = function (date1, date2) {
    let month1 = date1.getMonth();
    let day1 = date1.getDate();
    let month2 = date2.getMonth();
    let day2 = date2.getDate();

    if (month1 === month2) {
    }

    return date1.getTime() - date2.getTime();
}