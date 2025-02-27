import { DefaultRoute } from "../router/routes";

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num) =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num;

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

const defaultTimeZone = "America/Guatemala";

export const convertDateWithTimeZone = (date) => {
  // using "en-US" to format the date as dd/mm/yyyy
  return date.toLocaleDateString("en-US", {
    timeZone: defaultTimeZone
  });
};

export const getConvertDateWithTimeZone = (date) => {
  //alert(date instanceof String)
  if (typeof date === 'string' || date instanceof String) {
    if (date.indexOf("T00:00:00.000Z") >= 0) {
      let subs = date.substring(0, date.indexOf("T"))
      const dateArray = subs.split('-');
      return dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0];;
    } else {
      return new Date(date).toLocaleDateString({
        timeZone: defaultTimeZone
      });
    }
  } else {
    return new Date(date).toLocaleDateString({
      timeZone: defaultTimeZone
    });
  }
};

export const getFormatDate = (date) => {
  return new Date(date).toLocaleDateString({
    timeZone: defaultTimeZone
  });
};

export const formatDateForQuery = (date) => {
  // using "en-CA" to get the format as yyyy-mm-dd which is required in BE
  if (date) {
    const dateParts = date.split("/");
    return new Date(
      +dateParts[2],
      +dateParts[1] - 1,
      +dateParts[0]
    ).toLocaleDateString("en-CA");
  }
};

export const calculateTotal = (arr, key) => {
  const result = arr.reduce(function (acc, obj) {
    if (typeof obj[`${key}`] == "number") {
      return acc + obj[`${key}`];
    } else return acc;
  }, 0);
  return typeof result !== "number" ? "-" : result;
};

export const mapMuniValue = (
  municipalitiesValues,
  values,
  departmentFieldName,
  muniFieldName
) => {
  return municipalitiesValues
    .filter((muni) => muni.department === values[`${departmentFieldName}`])[0]
    ?.municipalities.filter(
      (element) => element.value === values[`${muniFieldName}`]
    );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting = { month: "short", day: "numeric" };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem("userData");
export const getUserData = () => JSON.parse(localStorage.getItem("userData"));

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === "admin") return DefaultRoute;
  if (userRole === "client") return "/access-control";
  return "/login";
};

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#25c76e", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed" // for input hover border-color
  }
});
