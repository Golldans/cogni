import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { MakePlayerDto } from './dtos/makePlayer.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  @Post()
  async makeUpdatePlayer(@Body() MakePlayerDto: MakePlayerDto) {
    await this.playersService.makeUpdatePlayer(MakePlayerDto);
  }

  @Get()
  async findPlayers(@Query('email') email: string): Promise<Player[] | Player> {
    if (email) {
      return this.playersService.findPlayerByEmail(email);
    } else {
      return this.playersService.findAllPlayers();
    }
  }

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    this.playersService.deletePlayer(email);
    return;
  }
}
