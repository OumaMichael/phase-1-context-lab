
/**
 * createEmployeeRecord
 * @param {Array} arr - [firstName, familyName, title, payPerHour]
 * @returns {Object} - Employee record object
 */
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  /**
   * createEmployeeRecords
   * @param {Array} arrs - Array of arrays, each representing an employee record
   * @returns {Array} - Array of employee record objects
   */
  function createEmployeeRecords(arrs) {
    return arrs.map(record => createEmployeeRecord(record));
  }
  
  /**
   * createTimeInEvent
   * @param {Object} record - Employee record object
   * @param {String} dateStamp - "YYYY-MM-DD HHMM"
   * @returns {Object} - Updated employee record object
   */
  function createTimeInEvent(record, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    record.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return record;
  }
  
  /**
   * createTimeOutEvent
   * @param {Object} record - Employee record object
   * @param {String} dateStamp - "YYYY-MM-DD HHMM"
   * @returns {Object} - Updated employee record object
   */
  function createTimeOutEvent(record, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    record.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return record;
  }
  
  /**
   * hoursWorkedOnDate
   * @param {Object} record - Employee record object
   * @param {String} targetDate - "YYYY-MM-DD"
   * @returns {Number} - Hours worked (integer)
   */
  function hoursWorkedOnDate(record, targetDate) {
    const timeIn = record.timeInEvents.find(event => event.date === targetDate);
    const timeOut = record.timeOutEvents.find(event => event.date === targetDate);
    // Assumes hours are in HHMM format on the hour so dividing by 100 gives whole hours
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  /**
   * wagesEarnedOnDate
   * @param {Object} record - Employee record object
   * @param {String} targetDate - "YYYY-MM-DD"
   * @returns {Number} - Wages earned for the day
   */
  function wagesEarnedOnDate(record, targetDate) {
    const hours = hoursWorkedOnDate(record, targetDate);
    return hours * record.payPerHour;
  }
  
  /**
   * allWagesFor
   * Uses the employee record as context (this)
   * @returns {Number} - Total wages for all dates
   */
  function allWagesFor() {
    // 'this' refers to the employee record
    const eligibleDates = this.timeInEvents.map(e => e.date);
    const payable = eligibleDates.reduce((memo, d) => memo + wagesEarnedOnDate(this, d), 0);
    return payable;
  }
  
  /**
   * findEmployeeByFirstName
   * @param {Array} srcArray - Array of employee records
   * @param {String} firstName - The first name to search for
   * @returns {Object|undefined} - Matching employee record or undefined if not found
   */
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
  }
  
  /**
   * calculatePayroll
   * @param {Array} employeeRecords - Array of employee records
   * @returns {Number} - Total payroll for all employees
   */
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
      // Using call to set the context to the current employee record
      return total + allWagesFor.call(record);
    }, 0);
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
  };

  
  

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

*/