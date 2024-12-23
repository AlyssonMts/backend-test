import { Controller, Post, Body, Delete, Param, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { use } from 'passport';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  

  @Post('register')
  async register(@Body() body: { username : string; password: string }) {
    return this.userService.register(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string,}) {
    return this.userService.login(body.username, body.password);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string) {      
    await this.userService.deleteUser(id);
    return { message: 'Usuário deletado com sucesso' };
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
