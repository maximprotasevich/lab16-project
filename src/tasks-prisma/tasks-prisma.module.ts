import { Module } from '@nestjs/common';
import { TasksPrismaService } from './tasks-prisma.service';
import { TasksPrismaController } from './tasks-prisma.controller';

@Module({
  controllers: [TasksPrismaController],
  providers: [TasksPrismaService],
})
export class TasksPrismaModule {}