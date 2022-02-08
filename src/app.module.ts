import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { PlayersService } from './players/players.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PlayersModule,
    MongooseModule.forRoot(
      'mongodb+srv://golldan:TESk1r1m!7676@golldans.hi3na.mongodb.net/Golldans?retryWrites=true&w=majority',
      {},
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
