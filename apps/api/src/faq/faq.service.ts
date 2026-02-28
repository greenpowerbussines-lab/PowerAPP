import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class FaqService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.fAQ.create({data});
  }

  findAllPublic() {
    return this.prisma.fAQ.findMany({
      where: {published: true},
      orderBy: [{order: 'asc'}, {createdAt: 'asc'}]
    });
  }

  findAllAdmin() {
    return this.prisma.fAQ.findMany({
      orderBy: [{order: 'asc'}, {createdAt: 'asc'}]
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.fAQ.findUnique({where: {id}});
    if (!item) throw new NotFoundException();
    return item;
  }

  update(id: string, data: any) {
    return this.prisma.fAQ.update({where: {id}, data});
  }

  remove(id: string) {
    return this.prisma.fAQ.delete({where: {id}});
  }
}

