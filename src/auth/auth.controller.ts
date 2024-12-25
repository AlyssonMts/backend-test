import { Body, HttpCode, HttpStatus , Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body('email') email: string, @Body('password') password: string):Promise<boolean> {
        return this.authService.comparePasswords(email, password)
    }
}
