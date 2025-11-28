import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: 'your-secret-key', // ДОБАВЬТЕ ЭТУ СТРОКУ
        expiresIn: '1h'
      }),
    };
  }

  async register(userData: { username: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
    
    return await this.usersRepository.save(user);
  }
}