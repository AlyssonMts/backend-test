import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from './user.repository';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async register(email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email em uso');
    }

    const hashedPassword = await this.authService.hashPassword(password);
    return this.userRepository.create({ email, password: hashedPassword });
  }

  async login(email: string, password: string): Promise<{ token: string; user: Partial<User> }> {
    // Busca o usuário pelo email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Valida a senha
    const passwordValid = await this.authService.comparePasswords(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gera o token
    const token = await this.authService.generateToken({ id: user.id, email: user.email });

    // Retorna o token e os dados do usuário
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não existe');
    }

    await this.userRepository.delete(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
