import { ObjectId } from 'mongodb'
import { envConfig } from '~/constants/config'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { RegisterReqBody } from '~/models/requests/Auth.requests'
import { signToken, verifyToken } from '~/utils/jwt'
import databaseService from './database.services'
import User from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/crypto'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { AUTH_MESSAGES } from '~/constants/messages'
import { generateRandomNumber } from '~/utils/generate'
import { sendEmail } from '~/utils/email'
import axios from 'axios'
import { ErrorWithStatus } from '~/models/Error'
import HTTP_STATUS from '~/constants/httpStatus'
import Playlist from '~/models/schemas/Playlist.schema'

class AuthService {
  private signAccessToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify
      },
      privateKey: envConfig.jwtSecretAccessToken,
      options: {
        expiresIn: envConfig.accessTokenExpiresIn
      }
    })
  }

  private signRefreshToken({ user_id, verify, exp }: { user_id: string; verify: UserVerifyStatus; exp?: number }) {
    if (exp) {
      return signToken({
        payload: {
          user_id,
          token_type: TokenType.RefreshToken,
          verify,
          exp
        },
        privateKey: envConfig.jwtSecretRefreshToken
      })
    }
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        verify
      },
      privateKey: envConfig.jwtSecretRefreshToken,
      options: {
        expiresIn: envConfig.refreshTokenExpiresIn
      }
    })
  }

  private signEmailVerifyToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.EmailVerifyToken,
        verify
      },
      privateKey: envConfig.jwtSecretEmailVerifyToken,
      options: {
        expiresIn: envConfig.emailVerifyTokenExpiresIn
      }
    })
  }

  private signForgotPasswordToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.ForgotPasswordToken,
        verify
      },
      privateKey: envConfig.jwtSecretForgotPasswordToken,
      options: {
        expiresIn: envConfig.forgotPasswordTokenExpiresIn
      }
    })
  }

  private signAccessAndRefreshToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return Promise.all([this.signAccessToken({ user_id, verify }), this.signRefreshToken({ user_id, verify })])
  }

  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({
      token: refresh_token,
      secretOrPublicKey: envConfig.jwtSecretRefreshToken
    })
  }

  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()
    let genre_arr = []
    if (payload.genres) {
      genre_arr = JSON.parse(payload.genres as string)
    }
    const genreId = genre_arr && genre_arr.length > 0 ? genre_arr.map((item: string) => new ObjectId(item)) : undefined
    await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        verify: UserVerifyStatus.Verified,
        password: hashPassword(payload.password),
        role: parseInt(payload.role),
        genres: genreId
      })
    )
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Verified
    })
    const { iat, exp } = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    )
    await databaseService.playlists.insertOne(new Playlist({ user_id: new ObjectId(user_id), favorite: true }))
    return {
      access_token,
      refresh_token
    }
  }

  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  async getListEmail() {
    const users = await databaseService.users.find().toArray()
    const emails = users.map((item) => item.email)
    return emails
  }

  async login({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      user_id,
      verify
    })
    const { iat, exp } = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    )
    return {
      access_token,
      refresh_token
    }
  }

  async logout(refresh_token: string) {
    await databaseService.refreshTokens.deleteOne({ token: refresh_token })
    return {
      message: AUTH_MESSAGES.LOGOUT_SUCCESS
    }
  }

  async sendVerifyEmail(email: string) {
    const subject = 'Verify email'
    const title = 'Verify email'
    const otp = generateRandomNumber(6)

    await databaseService.verify.insertOne({
      email,
      otp,
      expiresAt: new Date(Date.now() + 3 * 60 * 1000)
    })

    sendEmail({ email, subject, title, otp })

    return {
      message: AUTH_MESSAGES.SEND_VERIFY_EMAIL_SUCCESS
    }
  }

  async verifyEmail({ email, otp }: { email: string; otp: string }) {
    const verify = await databaseService.verify.findOneAndDelete({ email, otp })
    if (verify !== null) {
      await databaseService.verified.insertOne({ email })
      return true
    }
    return false
  }

  async verifyForgotPassword({ email, otp }: { email: string; otp: string }) {
    const verify = await databaseService.verify.findOneAndDelete({ email, otp })
    return Boolean(verify)
  }

  async forgotPassword({ user_id, verify, email }: { user_id: string; email: string; verify: UserVerifyStatus }) {
    const subject = 'Forgot password'
    const title = 'Forgot password'
    const otp = generateRandomNumber(6)

    await databaseService.verify.insertOne({
      email,
      otp,
      expiresAt: new Date(Date.now() + 3 * 60 * 1000)
    })

    sendEmail({ email, subject, title, otp })

    return {
      message: AUTH_MESSAGES.CHECK_EMAIL_TO_RESET_PASSWORD
    }
  }

  async resetPassword(email: string, password: string) {
    databaseService.users.updateOne(
      {
        email
      },
      {
        $set: {
          password: hashPassword(password)
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
    return {
      message: AUTH_MESSAGES.RESET_PASSWORD_SUCCESS
    }
  }

  async refreshToken({
    user_id,
    verify,
    refresh_token,
    exp
  }: {
    user_id: string
    verify: UserVerifyStatus
    refresh_token: string
    exp: number
  }) {
    const [new_access_token, new_refresh_token] = await Promise.all([
      this.signAccessToken({ user_id, verify }),
      this.signRefreshToken({ user_id, verify, exp }),
      databaseService.refreshTokens.deleteOne({ token: refresh_token })
    ])
    const decoded_refresh_token = await this.decodeRefreshToken(new_refresh_token)
    databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: new_refresh_token,
        iat: decoded_refresh_token.iat,
        exp: decoded_refresh_token.exp
      })
    )
    return {
      access_token: new_access_token,
      refresh_token: new_refresh_token
    }
  }

  private async getOauthGoogleToken(code: string) {
    const body = {
      code,
      client_id: envConfig.googleClientId,
      client_secret: envConfig.googleClientSecret,
      redirect_uri: envConfig.googleRedirectUri,
      grant_type: 'authorization_code'
    }
    const { data } = await axios.post('https://oauth2.googleapis.com/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return data as {
      access_token: string
      id_token: string
    }
  }

  private async getGoogleUserInfo(access_token: string, id_token: string) {
    const { data } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      params: {
        access_token,
        alt: 'json'
      },
      headers: {
        Authorization: `Bearer ${id_token}`
      }
    })
    return data as {
      id: string
      email: string
      verified_email: boolean
      name: string
      given_name: string
      family_name: string
      picture: string
      locale: string
    }
  }

  async oauth(code: string) {
    const { id_token, access_token } = await this.getOauthGoogleToken(code)
    const userInfo = await this.getGoogleUserInfo(access_token, id_token)
    if (!userInfo.verified_email) {
      throw new ErrorWithStatus({
        message: AUTH_MESSAGES.GMAIL_NOT_VERIFIED,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }
    const user = await databaseService.users.findOne({ email: userInfo.email })
    if (user) {
      const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
        user_id: user._id.toString(),
        verify: user.verify
      })
      const { iat, exp } = await this.decodeRefreshToken(refresh_token)
      await databaseService.refreshTokens.insertOne(
        new RefreshToken({ user_id: user._id, token: refresh_token, iat, exp })
      )
      return {
        access_token,
        refresh_token,
        newUser: 0,
        verify: user.verify
      }
    } else {
      const password = Math.random().toString(36).substring(2, 15)
      const data = await this.register({
        role: '0',
        email: userInfo.email,
        name: userInfo.name,
        password,
        gender: 'male',
        genres: undefined
      })
      await databaseService.verified.insertOne({
        email: userInfo.email
      })
      return { ...data, newUser: 1, verify: UserVerifyStatus.Verified }
    }
  }
}

const authService = new AuthService()
export default authService
