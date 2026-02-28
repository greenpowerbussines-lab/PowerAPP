import {Body, Controller, Get, Param, Patch, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {SettingsService} from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settings: SettingsService) {}

  @Get()
  getPublic(@Query('key') key?: string) {
    return this.settings.getPublic(key || 'main');
  }

  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  getAdmin(@Query('key') key?: string) {
    return this.settings.getAdmin(key || 'main');
  }

  @Patch(':key')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('key') key: string, @Body() body: any) {
    return this.settings.update(key, body);
  }
}

