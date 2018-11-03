import moment from 'moment';

export function EventIsOpen(date) {
  const eventDate = moment(FormatDate(date), 'MM-DD-YYYY Z').valueOf();
  const today = moment(FormatDate(GetToday(0)), 'MM-DD-YYYY Z').valueOf();

  if (today - eventDate <= 0) {
    return true;
  }

  return false;
}

export function SnapshotToArray(snapshot) {
  const returnArr = [];

  snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
  });

  return returnArr;
}

export function GetTodayFormatDateddmmYYYY() {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) {
      dd = '0' + dd;
  }

  if (mm < 10) {
      mm = '0' + mm;
  }

  const dateFormated = dd + '/' + mm + '/' + yyyy;

  return dateFormated;
}

export function FormatDateddmmYYYY(date) {
  const cadena = date.split('-');

  const d = cadena[2];
  const m = cadena[1];
  const Y = cadena[0];

  const dateFormated = d + '-' + m + '-' + Y;

  return dateFormated;
}

export function FormatDate(date, order = null) {
  let cadena = date.split('T');
  const h = cadena[1].split(':');

  cadena = cadena[0].split('-');
  const dd = cadena[2];
  const mm = cadena[1];
  const yyyy = cadena[0];

  let newDate = mm + '-' + dd + '-' + yyyy + ' T';

  if (order) {
    newDate = dd + '/' + mm + '/' + yyyy + '   ' + h[0] + ':' + h[1];
  }
  return newDate;
}

export function GetToday(anos) {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  const yyyy = today.getFullYear();
  const hours = today.getHours();
  const mins = today.getMinutes();
  const secs = today.getSeconds();

  if (dd < 10) {
      dd = '0' + dd;
  }

  if (mm < 10) {
      mm = '0' + mm;
  }
  if (anos > 0) {
      today = yyyy + anos + '-' + mm + '-' + dd + 'T' + hours + ':' + mins + ':' + secs;
  } else {
    today = yyyy + anos + '-' + mm + '-' + dd + 'T:';
  }

  return today;
}

export function GetFutureDay(anos) {
  let today = new Date(2000, 11, 11);
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  const yyyy = today.getFullYear();
  const hours = today.getHours();
  const mins = today.getMinutes();
  const secs = today.getSeconds();

  if (dd < 10) {
      dd = '0' + dd;
  }

  if (mm < 10) {
      mm = '0' + mm;
  }
  if (anos > 0) {
      today = yyyy + anos + '-' + mm + '-' + dd + 'T' + hours + ':' + mins + ':' + secs;
  } else {
    today = yyyy + anos + '-' + mm + '-' + dd + 'T:';
  }

  return today;
}


export function GetDatePickerSelected(date) {
  const currentDate = new Date(new Date(date).getTime() + (24 * 60 * 60 * 1000));
  let dateFormated = '';

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  dateFormated = year + '/' + month + '/' + day;

  return dateFormated;
}

export function GetDateYYYYmmdd(daysInFuturo = 0) {
  const currentDate = new Date(new Date().getTime() + (daysInFuturo * 24 * 60 * 60 * 1000));
  let dateFormated = '';

  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();

  if (day < 10) {
      day = '0' + day;
  }

  if (month < 10) {
      month = '0' + month;
  }

  dateFormated = year + '-' + month + '-' + day;

  return dateFormated;
}

export function GetWeekDay(date) {
  const d = new Date(date);
  const weekday = new Array(7);

  weekday[0] = 'Domingo';
  weekday[1] = 'Lunes';
  weekday[2] = 'Martes';
  weekday[3] = 'Miércoles';
  weekday[4] = 'Jueves';
  weekday[5] = 'Viernes';
  weekday[6] = 'Sábado';

  return weekday[d.getDay()];
}
