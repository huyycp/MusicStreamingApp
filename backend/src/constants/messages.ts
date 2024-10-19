export const AUTH_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  ROLE_IS_REQUIRED: 'Role is required',
  ROLE_MUST_BE_A_STRING: 'Role must be a string',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_10_TO_50: 'Password length must be from 10 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be 10-50 characters long and contain at least 1 character, 1 digit, and 1 special character',
  GENDER_IS_REQUIRED: 'Gender is required',
  GENDER_MUST_BE_A_STRING: 'Gender must be a string',
  REGISTER_SUCCESS: 'Register success',
  LOGIN_SUCCESS: 'Login success',
  GET_LIST_EMAIL_SUCCESS: 'Get list email success',
  CHECK_EMAIL_SUCCESS: 'Check email success',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',
  LOGOUT_SUCCESS: 'Logout success',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  CHECK_EMAIL_VERIFY_SUCCESS: 'Check email verify success',
  RESEND_VERIFY_EMAIL_SUCCESS: 'Resend verify email success',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  VERIFY_FORGOT_PASSWORD_SUCCESS: 'Verify forgot password success',
  INVALID_FORGOT_PASSWORD_TOKEN: 'Invalid forgot password token',
  RESET_PASSWORD_SUCCESS: 'Reset password success',
  REFRESH_TOKEN_SUCCESS: 'Refresh token success',
  SEND_VERIFY_EMAIL_SUCCESS: 'Send verify email sucess',
  USER_NOT_VERIFIED: 'User not verified',
  CHECK_FORGOT_PASSWORD_VERIFY_SUCCESS: 'Check forgot password verify success',
  GMAIL_NOT_VERIFIED: 'Gmail not verified'
} as const

export const TRACKS_MESSAGES = {
  GET_LIST_TRACKS_SUCCESS: 'Get list tracks success',
  GET_LIST_TRACKS_BY_ARTIST_SUCCESS: 'Get list tracks by artist success',
  GET_DETAIL_TRACK_SUCCESS: 'Get detail track success',
  TRACK_ID_IS_REQUIRED: 'Track id is required',
  TRACK_ID_IS_INVALID: 'Track id is invalid',
  TRACK_NOT_FOUND: 'Track not found',
  CREATE_TRACK_SUCCESS: 'Create track success',
  ROLE_NOT_ARTIST: 'Role not artist',
  ARTIST_ID_IS_REQUIRED: 'Artist id is required',
  ARTIST_ID_IS_INVALID: 'Artist id is invalid',
  ARTIST_NOT_FOUND: 'Artist not found'
} as const

export const ALBUMS_MESSAGES = {
  CREATE_ALBUM_SUCCESS: 'Create album success',
  GET_LIST_ALBUMS_BY_ARTIST_SUCCESS: 'Get list albums by artist success',
  GET_DETAIL_ALBUM_SUCCESS: 'Get detail album success',
  ALBUM_ID_IS_REQUIRED: 'Album id is required',
  ALBUM_ID_IS_INVALID: 'Album id is invalid',
  ALBUM_NOT_FOUND: 'Album not found',
  ADD_TRACKS_TO_ALBUM_SUCCESS: 'Add tracks to album success',
  LIST_OF_TRACKS_IS_REQUIRED: 'List of tracks is required',
  LIST_OF_TRACKS_IS_INVALID: 'List of tracks is invalid',
  EXISTING_TRACK_NOT_FOUND: 'Existing track not found',
  GET_LIST_ALBUMS_SUCCESS: 'Get list albums success'
} as const

export const USERS_MESSAGES = {
  GET_ME_SUCCESS: 'Get me success'
} as const
