import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LeadsModule } from './leads/leads.module';
import { CasesModule } from './cases/cases.module';
import { FaqModule } from './faq/faq.module';
import { SettingsModule } from './settings/settings.module';
import { TelegramModule } from './telegram/telegram.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '../../.env'] }),
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 60
      }
    ]),
    PrismaModule,
    TelegramModule,
    AuthModule,
    LeadsModule,
    CasesModule,
    FaqModule,
    SettingsModule
  ],
  controllers: [AppController]
})
export class AppModule { }

