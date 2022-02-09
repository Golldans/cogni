import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MakePlayerDto } from './dtos/makePlayer.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';
import { PlayerValidationParamsPipe } from './pipes/player-validation-params.pipe';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async makeUpdatePlayer(@Body() MakePlayerDto: MakePlayerDto) {
    await this.playersService.makeUpdatePlayer(MakePlayerDto);
  }

  @Get('/:id')
  async findPlayersById(
    @Param('id', PlayerValidationParamsPipe) id: number,
  ): Promise<Player> {
    return this.playersService.findPlayerById(id);
  }

  @Get()
  async findPlayers(): Promise<Player[]> {
    return this.playersService.findAllPlayers();
  }

  @Delete()
  async deletePlayer(
    @Query('email', PlayerValidationParamsPipe) email: string,
  ): Promise<void> {
    this.playersService.deletePlayer(email);
    return;
  }
}
