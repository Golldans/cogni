import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  async makePlayer(@Body() MakePlayerDto: MakePlayerDto): Promise<Player> {
    const player = await this.playersService.makePlayer(MakePlayerDto);
    return player;
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() MakePlayerDto: MakePlayerDto,
    @Param('_id', PlayerValidationParamsPipe) _id: string,
  ): Promise<Player> {
    const player = await this.playersService.updatePlayer(_id, MakePlayerDto);
    return player;
  }

  @Get('/:id')
  async findPlayersById(
    @Param('id', PlayerValidationParamsPipe) id: string,
  ): Promise<Player> {
    return this.playersService.findPlayerById(id);
  }

  @Get()
  async findPlayers(): Promise<Player[]> {
    return this.playersService.findAllPlayers();
  }

  @Delete('/:_id')
  async deletePlayer(
    @Param('_id', PlayerValidationParamsPipe) _id: string,
  ): Promise<void> {
    this.playersService.deletePlayer(_id);
    return;
  }
}
