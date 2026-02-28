import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    healthCheck() {
        return {
            status: 'ok',
            service: 'green-power-api',
            timestamp: new Date().toISOString()
        };
    }
}
