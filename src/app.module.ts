import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimezoneService } from './services/Timezone.service';
import { RoleModule } from './role/role.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import { CinemaModule } from './cinema/cinema.module';
import { TypeModule } from './type/type.module';
import { MovieModule } from './movie/movie.module';
import { ListTypeModule } from './list-type/list-type.module';
import { MovieTheaterModule } from './movie-theater/movie-theater.module';
import { MovieShowTimeModule } from './movie-show-time/movie-show-time.module';
import { SeatModule } from './seat/seat.module';
import { TicketModule } from './ticket/ticket.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    DatabaseModule,
    RoleModule,
    UserModule,
    AuthModule,
    LoggerModule,
    CinemaModule,
    TypeModule,
    MovieModule,
    ListTypeModule,
    MovieTheaterModule,
    MovieShowTimeModule,
    SeatModule,
    TicketModule,
    SearchModule
  ],
  controllers: [AppController],
  providers: [AppService, TimezoneService],
})
export class AppModule {
  constructor(private readonly timezoneService: TimezoneService) {
    this.timezoneService.setTimezone('Asia/Ho_Chi_Minh');
  }
}
