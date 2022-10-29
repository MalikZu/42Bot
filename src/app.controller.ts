import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth/auth.service';
import { Res } from '@nestjs/common';
import { Redirect } from '@nestjs/common';
import { BotService } from './bot/bot.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService,
     private authService: AuthService, private botService: BotService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('init')
  async init() {
    this.botService.start();
  }
  @Redirect()
  @Get('/logme')
  async logme(@Req() request: Request) {
    
    // let token = await this.authService.generateToken42User(request.query.code as string);
    // console.log(token);
    return { url : `https://wa.me/971509394777?text=tk:${request.query.code}:`, status: 200 };
  }
}