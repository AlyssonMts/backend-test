import { Body, HttpCode, HttpStatus , Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Controller } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
      private readonly userService: UserService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: { email: string; password: string }) {
      return this.userService.login(loginDto.email, loginDto.password);
    }
  }