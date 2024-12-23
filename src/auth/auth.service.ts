import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthModule } from './auth.module';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10; // Número de rounds para hash da senha

  constructor(private readonly jwtService: JwtService) {}

  /**
   * Gera um hash seguro para uma senha.
   * @param password A senha em texto claro.
   * @returns O hash da senha.
   */
  async hashPassword(password: string): Promise<string> {
    if (!password) {
      throw new BadRequestException('Senha não pode estar vazia');
    }
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Compara uma senha em texto claro com um hash.
   * @param password A senha em texto claro.
   * @param hashedPassword O hash da senha.
   * @returns True se a senha for válida, False caso contrário.
   */
  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    if (!password || !hashedPassword) {
      throw new BadRequestException('hash ou senha inválida');
    }
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Gera um token JWT para o usuário.
   * @param payload Dados a serem incluídos no token.
   * @returns O token JWT.
   */
  async generateToken(payload: { id: object; email: string }): Promise<string> {
    if (!payload || !payload.id || !payload.email) {
      throw new BadRequestException('Payload inválido para o token');
    }

    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }

  /**
   Valida o payload de um token JWT.
   @param payload O payload extraído do token JWT.
   @returns O payload validado.
   @throws UnauthorizedException se o payload for inválido.
   */
  async validateUser(payload: { id: number; email: string }): Promise<{ id: number; email: string }> {
    if (!payload || !payload.id || !payload.email) {
      throw new UnauthorizedException('Usuário não autorizado');
    }

    // Adicionar aqui uma consulta ao banco para verificar se o usuário ainda existe
    // Exemplo: const user = await this.userService.findById(payload.id);
    // if (!user) throw new UnauthorizedException('Usuário não existe');

    return payload;
  }
}
