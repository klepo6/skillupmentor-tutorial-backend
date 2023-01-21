import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Request } from 'express'
import { AuthService } from '../auth.service'
import { TokenPayload } from 'interfaces/auth.interface'
import { UserData } from 'interfaces/user.interface'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private authService: AuthService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refresh_token
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    })
  }

  async validate(req: Request, payload: TokenPayload): Promise<UserData> {
    const refreshToken = req.cookies?.refresh_token
    return this.authService.getUserIfRefreshTokenMatches(refreshToken, payload.sub)
  }
}
