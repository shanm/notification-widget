import * as types from "./actionTypes";

export function getAllNotifications() {
  return { type: types.FETCH_ALL_NOTIFICATIONS };
}

export function modifyNotification(notifications) {
  return { type: types.MODIFY_NOTIFICATION, notifications };
}
