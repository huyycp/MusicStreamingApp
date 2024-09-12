import { JwtPayload } from 'jsonwebtoken'
import { RoleType, TokenType, UserVerifyStatus } from '~/constants/enums'

export interface RegisterReqBody {
  role: string
  name: string
  email: string
  password: string
  gender?: string
}

export interface LoginReqBody {
  email: string
  password: string
}

export interface LogoutReqBody {
  refresh_token: string
}

export interface SendVerifyEmailReqBody {
  email: string
}

export interface VerifyEmailReqBody {
  email: string
  otp: string
}

export interface ForgotPasswordReqBody {
  email: string
}

export interface VerifyForgotPasswordReqBody {
  email: string
  otp: string
}

export interface ResetPasswordReqBody {
  email: string
  password: string
}

export interface RefreshTokenReqBody {
  refresh_token: string
}

export interface TokenPayLoad extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
  exp: number
  iat: number
}
