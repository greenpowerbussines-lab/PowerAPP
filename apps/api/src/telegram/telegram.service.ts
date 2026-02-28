import {Injectable} from '@nestjs/common';

@Injectable()
export class TelegramService {
  private token = process.env.TELEGRAM_BOT_TOKEN;
  private chatId = process.env.TELEGRAM_CHAT_ID;

  async sendMessage(text: string): Promise<void> {
    if (!this.token || !this.chatId) return;
    await fetch(`https://api.telegram.org/bot${this.token}/sendMessage`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({chat_id: this.chatId, text})
    }).catch(() => undefined);
  }

  formatLeadMessage(data: {
    phone: string;
    name?: string | null;
    company?: string | null;
    telegram?: string | null;
    segment?: string | null;
    power?: number | null;
    flowPerDay?: number | null;
    network?: string | null;
  }): string {
    const lines = [
      'New lead',
      `Phone: ${data.phone}`,
      data.name && `Name: ${data.name}`,
      data.company && `Company: ${data.company}`,
      data.telegram && `Telegram: ${data.telegram}`,
      data.segment && `Segment: ${data.segment}`,
      data.power && `Power: ${data.power} kW`,
      data.flowPerDay && `Flow/day: ${data.flowPerDay}`,
      data.network && `Network: ${data.network}`
    ].filter(Boolean);
    return lines.join('\n');
  }
}

