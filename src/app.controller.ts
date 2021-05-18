import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { userdata } from './userdata/app.constant';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get("/getBMI")
  async getUserDataAnalysis():Promise<any> {
    return await this.appService.getUserDataAnalysys(userdata);
  }
}
