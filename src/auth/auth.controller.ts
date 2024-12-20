import {
  Bind,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './gaurds/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './gaurds/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './gaurds/jwt-auth/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { GoogleAuthGuard } from './gaurds/google-auth/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @Bind(Request())
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/sign')
  async google() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res) {
    const response = await this.authService.login(req.user);
    res.redirect(
      `http://localhost:3000/auth/redirect?token=${response.refresh_token}`,
    );
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return this.authService.logout(req.id);
  }
}
