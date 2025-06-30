
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma'; // ajuste o caminho conforme a estrutura do seu projeto

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() { super(); }
  async onModuleInit() {
    await this.$connect();
  }
}
