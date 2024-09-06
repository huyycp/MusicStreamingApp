import { JwtPayload } from 'jsonwebtoken'
import { RoleType, TokenType, UserVerifyStatus } from '~/constants/enums'

export interface RegisterReqBody {
  role: string
  name: string
  email: string
  password: string
  gender: string
}

export interface LoginReqBody {
  email: string
  password: string
}

export interface LogoutReqBody {
  refresh_token: string
}

export interface VerifyEmailReqBody {
  email_verify_token: string
}

export interface ForgotPasswordReqBody {
  email: string
}

export interface TokenPayLoad extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
  exp: number
  iat: number
}
