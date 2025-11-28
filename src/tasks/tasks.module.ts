import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksAdminController } from './tasks.admin.controller'; // ДОЛЖЕН БЫТЬ ИМПОРТ
import { Task } from './entities/task.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsersModule,
  ],
  controllers: [TasksController, TasksAdminController], // ДОЛЖЕН БЫТЬ ЗДЕСЬ
  providers: [TasksService],
})
export class TasksModule {}