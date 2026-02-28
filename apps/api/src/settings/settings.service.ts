import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPublic(key = 'main') {
    const s = await this.prisma.siteSettings.findUnique({where: {key}});
    if (!s) throw new NotFoundException();
    return s;
  }

  getAdmin(key = 'main') {
    return this.getPublic(key);
  }

  update(key: string, data: any) {
    return this.prisma.siteSettings.update({
      where: {key},
      data
    });
  }
}

