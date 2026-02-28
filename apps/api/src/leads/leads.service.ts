import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {TelegramService} from '../telegram/telegram.service';
import {CreateLeadDto} from './dto/create-lead.dto';
import {UpdateLeadDto} from './dto/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegram: TelegramService
  ) {}

  async create(dto: CreateLeadDto) {
    if (dto.honeypot) {
      throw new BadRequestException('Invalid request');
    }
    const lead = await this.prisma.lead.create({
      data: {
        name: dto.name,
        company: dto.company,
        phone: dto.phone,
        telegram: dto.telegram,
        segment: dto.segment,
        power: dto.power,
        flowPerDay: dto.flowPerDay,
        network: dto.network
      }
    });

    const msg = this.telegram.formatLeadMessage(lead);
    await this.telegram.sendMessage(msg);

    return {id: lead.id};
  }

  async findAll(status?: string) {
    return this.prisma.lead.findMany({
      where: status ? {status} : undefined,
      orderBy: {createdAt: 'desc'}
    });
  }

  async update(id: string, dto: UpdateLeadDto) {
    return this.prisma.lead.update({
      where: {id},
      data: dto
    });
  }
}

