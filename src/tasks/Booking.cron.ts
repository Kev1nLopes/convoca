import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { addDays, startOfDay } from "date-fns";
import { PrismaService } from "src/prisma.service";
import { BookingStatus } from "src/types/booking.enum";

@Injectable()
export class BookingCron {
  private readonly logger = new Logger(BookingCron.name);
  @Inject()
  private readonly prismaService: PrismaService;


  /*
  45: minuto (45 minutos após a hora)
  0: hora (0 horas, ou seja, meia-noite)
  *: dia do mês (qualquer dia do mês)
  *: mês (qualquer mês)
  0: dia da semana (0 = domingo, 1 = segunda-feira, ..., 6 = sábado)
  */

  //@Cron('45 0 * * 0')

  @Cron('45 * * * * *')
  async handleCron() {
    // Pensar em adicionar uma fila aqui
    this.logger.debug('Called when the current second is 45');

    // Consultar os sport_centers
for (const sportCenter of await this.prismaService.sportCenter.findMany()) {
  const courts = await this.prismaService.court.findMany({ where: { sportCenterId: sportCenter.id } });

  const open = new Date(sportCenter.open_hour).getHours();
  const close = new Date(sportCenter.end_hour).getHours();   // ex: 22 → fecha às 22 h

  // gera um array de 0‥6 => hoje‥+6 dias
  for (let offset = 0; offset < 7; offset++) {
    const day = startOfDay(addDays(new Date(), offset));      // lida sozinho com troca de mês/ano

    const promises: Promise<any>[] = [];

    for (const court of courts) {
      for (let h = open; h < close; h++) {        
        promises.push(
          this.prismaService.booking.upsert({                             // evita duplicar se já existir
            where: {
              courtId_date_startTime: {                       // cria UNIQUE INDEX antes!
                courtId: court.id,
                date: day,
                startTime: `1970-01-01T${h.toString().padStart(2, '0')}:00:00.000Z`,
              },
            },
            update: {},                                       // nada a alterar se já existe
            create: {
              courtId: court.id,
              date: day,
              startTime: `1970-01-01T${h.toString().padStart(2, '0')}:00:00.000Z`,
              endTime: `1970-01-01T${(h+1).toString().padStart(2, '0')}:00:00.000Z`,
              status: BookingStatus.OPEN,
            },
          }),
        );
      }
    }

    await Promise.all(promises);                              // executa em paralelo e aguarda
  }
}


    return
    // Fazer algo com os sport_centers

  }
}