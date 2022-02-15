import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PlayersModule,
    MongooseModule.forRoot(
      'mongodb+srv://golldan:@golldans.hi3na.mongodb.net/Golldans?retryWrites=true&w=majority',
      {},
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
