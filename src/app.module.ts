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
  ],
  controllers: [AppController],
  providers: [AppService, TimezoneService],
})
export class AppModule {
  constructor(private readonly timezoneService: TimezoneService) {
    this.timezoneService.setTimezone('Asia/Ho_Chi_Minh');
  }
}
