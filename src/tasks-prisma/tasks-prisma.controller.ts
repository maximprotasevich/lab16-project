import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TasksPrismaService } from './tasks-prisma.service';

@Controller('prisma/tasks')
export class TasksPrismaController {
  constructor(private readonly tasksPrismaService: TasksPrismaService) {}

  @Post()
  create(
    @Body() taskData: { title: string; description?: string; userId: number },
  ) {
    return this.tasksPrismaService.create(taskData);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.tasksPrismaService.findAllByUser(+userId);
    }
    return this.tasksPrismaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksPrismaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: { title?: string; description?: string; completed?: boolean },
  ) {
    return this.tasksPrismaService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksPrismaService.remove(+id);
  }
}