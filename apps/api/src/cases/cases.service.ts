import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class CasesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.caseStudy.create({data});
  }

  findAllPublic() {
    return this.prisma.caseStudy.findMany({
      where: {published: true},
      orderBy: {createdAt: 'desc'}
    });
  }

  findAllAdmin() {
    return this.prisma.caseStudy.findMany({
      orderBy: {createdAt: 'desc'}
    });
  }

  async findBySlugPublic(slug: string) {
    const item = await this.prisma.caseStudy.findFirst({
      where: {slug, published: true}
    });
    if (!item) throw new NotFoundException();
    return item;
  }

  async findOne(id: string) {
    const item = await this.prisma.caseStudy.findUnique({where: {id}});
    if (!item) throw new NotFoundException();
    return item;
  }

  update(id: string, data: any) {
    return this.prisma.caseStudy.update({where: {id}, data});
  }

  remove(id: string) {
    return this.prisma.caseStudy.delete({where: {id}});
  }
}

