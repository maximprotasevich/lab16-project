import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // тот же ключ что в auth.service.ts
    });
  }

  async validate(payload: any) {
    // ЗАГРУЖАЕМ ПОЛЬЗОВАТЕЛЯ С РОЛЯМИ
    const user = await this.usersRepository.findOne({
      where: { id: payload.sub },
      relations: ['roles'], // ВАЖНО: загружаем связанные роли
    });
    return user;
  }
}