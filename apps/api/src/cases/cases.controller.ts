import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {CasesService} from './cases.service';

@Controller('cases')
export class CasesController {
  constructor(private readonly cases: CasesService) {}

  @Get()
  findAllPublic() {
    return this.cases.findAllPublic();
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.cases.findBySlugPublic(slug);
  }

  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  findAllAdmin() {
    return this.cases.findAllAdmin();
  }

  @Get('admin/:id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.cases.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: any) {
    return this.cases.create(body);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() body: any) {
    return this.cases.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.cases.remove(id);
  }
}

