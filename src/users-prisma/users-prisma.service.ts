import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersPrismaService {
  constructor(private prisma: PrismaService) {}

  async create(userData: { username: string; email: string }) {
    return this.prisma.user.create({
      data: userData,
      include: { tasks: true },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: { tasks: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { tasks: true },
    });
  }
}