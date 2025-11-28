import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private usersService: UsersService,
  ) {}

  // CREATE - Создание задачи с привязкой к пользователю
  async create(taskData: Partial<Task>, userId: number): Promise<Task> {
    const user = await this.usersService.findOne(userId);
    const task = this.tasksRepository.create({
      ...taskData,
      user: user,
    });
    return await this.tasksRepository.save(task);
  }

  // READ - Все задачи
  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find({ relations: ['user'] });
  }

  // READ - Все задачи конкретного пользователя
  async findAllByUser(userId: number): Promise<Task[]> {
    return await this.tasksRepository.find({
      where: { user: { id: userId } },
      relations: ['user']
    });
  }

  // READ - Одна задача по ID
  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ 
      where: { id },
      relations: ['user'] 
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  // UPDATE - Обновление задачи
  async update(id: number, updateData: Partial<Task>): Promise<Task> {
    await this.tasksRepository.update(id, updateData);
    return await this.findOne(id);
  }

  // DELETE - Удаление задачи
  async remove(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}