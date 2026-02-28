import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {FaqService} from './faq.service';

@Controller('faqs')
export class FaqController {
  constructor(private readonly faq: FaqService) {}

  @Get()
  findAllPublic() {
    return this.faq.findAllPublic();
  }

  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  findAllAdmin() {
    return this.faq.findAllAdmin();
  }

  @Get('admin/:id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.faq.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: any) {
    return this.faq.create(body);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() body: any) {
    return this.faq.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.faq.remove(id);
  }
}

