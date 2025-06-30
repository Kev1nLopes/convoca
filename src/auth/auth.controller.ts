import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { ResponseDto } from 'src/global-dto/response.dto';
import { signInDto } from './dto/signIn.dto';
import { signUpDto } from './dto/signUp.dto';
import { CustomRequest } from 'src/guard/jwt.guard';
import { TokenRefreshDto } from './dto/token-refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('signUp')
  @ApiBody({ type: signUpDto })
  async signUp(@Body() signUpDto: signUpDto) {
    const {token, refreshToken} = await this.authService.signUp(signUpDto);
    return new ResponseDto(201, "Usuário criado com sucesso!", { token, refreshToken})
  }

  @Post('signIn')
  @ApiBody({ type: signInDto })
  async signIn(@Body() signInDto: signInDto) {
    const { token, refreshToken } = await this.authService.signIn(signInDto);
    return new ResponseDto(200, "Usuário logado com sucesso!", { token, refreshToken})
  }

  @Post('refresh-token')
  @ApiBody({ type: TokenRefreshDto })
  async refreshToken(@Req() req: CustomRequest, @Body() tokenRefreshDto: TokenRefreshDto) {
    const { token, refreshToken } = await this.authService.refreshToken(tokenRefreshDto.refreshToken);
    return new ResponseDto(200, "Token atualizado com sucesso!", { token, refreshToken})
  }

  @Post('logout')
  async logout(@Req() req: CustomRequest) {
    const { message } = await this.authService.logout(req.user.id)
    return new ResponseDto(200, message, {})

  }

}
