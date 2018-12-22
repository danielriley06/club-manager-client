import isEmpty from "lodash/isEmpty";
import moment from "moment";

export function normalizeUrl(url: string): string {
  const urlObject = new URL(url);
  const parts = [
    urlObject.host,
    urlObject.pathname,
    urlObject.search,
    urlObject.hash
  ].map(item => item.replace(/\/\//, "/"));
  return `${urlObject.protocol}//${parts.join("")}`;
}

export const formatSeasonDate = (date: string | null): string => {
  if (!isEmpty(date)) {
    return moment(date as string).format("ddd., MMMM Do YYYY");
  }
  return "None";
};
