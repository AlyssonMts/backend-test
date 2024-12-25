import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthModule } from './auth.module';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10; // Número de rounds para hash da senha

  constructor(private readonly jwtService: JwtService) {}


  async hashPassword(password: string): Promise<string> {
    if (!password) {
      throw new BadRequestException('Senha não pode estar vazia');
    }
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    if (!password || !hashedPassword) {
      throw new BadRequestException('hash ou senha inválida');
    }
    return bcrypt.compare(password, hashedPassword);
  }

  async generateToken(payload: { id: object; email: string }): Promise<string> {
    if (!payload || !payload.id || !payload.email) {
      throw new BadRequestException('Payload inválido para o token');
    }

    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }

  async validateUser(payload: { id: number; email: string }): Promise<{ id: number; email: string }> {

    if (!payload || !payload.id || !payload.email) {
      throw new UnauthorizedException('Usuário não autorizado');
    }
    return payload;
  }
}
