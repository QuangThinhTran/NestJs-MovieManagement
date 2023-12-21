export enum Messages {
  REGISTER_SUCCESS = 'Register Successful',
  LOGIN_SUCCESS = 'Login Successful',
  LOGIN_FAILED = 'Login failed. Please check username or password!!!',
  LOGOUT_SUCCESS = 'Logout Successful',
  CREATE_SUCCESS = 'Create Successful',
  UPDATE_SUCCESS = 'Update Successful',
  DELETE_SUCCESS = 'Delete Successful',
  RESTORE_SUCCESS = 'Restore Successful',
  NOT_FOUND = 'Not Found',
  DUPLICATE_DATA = 'is exists',
  MOVIE_NOW_SHOWING = 'Now showing',
  MOVIE_NOT_SHOWING = 'Stop showing',
  MOVIE_THEATER_ACTIVE = 'Active',
  MOVIE_THEATER_INACTIVE = 'Inactive',
  STATUS_SEAT_BOOKED = 'Booked',
  STATUS_SEAT_BOOK = `Haven't booked yet`,
  TYPE_SEAT_VIP = 'V.I.P',
  TYPE_SEAT_NOMAL = 'Nomal'
}
export enum Constant {
  STATUS_MOVIE_ACTIVE = 1,
  STATUS_MOVIE_INACTIVE = 0,
  STATUS_MOVIE_THEATER_ACTIVE = 1,
  STATUS_MOVIE_THEATER_INACTIVE = 0,
  TYPE_SEAT_VIP = 1,
  TYPE_SEAT_NOMAL = 2
}
