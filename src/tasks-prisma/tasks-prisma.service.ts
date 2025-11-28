import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksPrismaService {
  constructor(private prisma: PrismaService) {}

  async create(taskData: { title: string; description?: string; userId: number }) {
    return this.prisma.task.create({
      data: taskData,
      include: { user: true },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      include: { user: true },
    });
  }

  async findAllByUser(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
      include: { user: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async update(id: number, updateData: { title?: string; description?: string; completed?: boolean }) {
    return this.prisma.task.update({
      where: { id },
      data: updateData,
      include: { user: true },
    });
  }

  async remove(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}