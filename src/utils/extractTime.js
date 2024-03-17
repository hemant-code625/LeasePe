const padZero = (num) => {
    return num < 10 ? '0' + num : num;
  }
  export const extractTime =(dateString)=> {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
  }
  export const extractDate =(timestamp)=> {
    var date = new Date(timestamp);
    var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    var offset = 330 * 60000;
    var ist = new Date(utc + offset);
    var day = ist.getDate();
    var month = ist.getMonth() + 1; // Months are zero-based, so we add 1
    var year = ist.getFullYear();

    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;

    return `${day}-${month}-${year}`;
  }