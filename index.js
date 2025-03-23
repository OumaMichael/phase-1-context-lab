function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    // 'this' is the employee record
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

function hoursWorkedOnDate(givenDate) {
    const timeIn = this.timeInEvents.find(event => event.date === givenDate);
    const timeOut = this.timeOutEvents.find(event => event.date === givenDate);
    // Dividing by 100 to convert from HHMM to hours
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(givenDate) {
    const hours = hoursWorkedOnDate.call(this, givenDate);
    return hours * this.payPerHour;
}

// Providing allWagesFor function - note the use of .bind(this)
function allWagesFor() {
    const eligibleDates = this.timeInEvents.map(event => event.date);
    const payable = eligibleDates.reduce((memo, d) => memo + wagesEarnedOnDate.call(this, d), 0);
    return payable;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(rec => rec.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, rec) => total + allWagesFor.call(rec), 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

