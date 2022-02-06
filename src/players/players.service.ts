import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MakePlayerDto } from './dtos/makePlayer.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: Player[] = [];

  async makeUpdatePlayer(MakePlayerDto: MakePlayerDto): Promise<void> {
    const { email } = MakePlayerDto;

    const existingPlayer = await this.players.find(
      (player) => player.email === email,
    );

    if (existingPlayer) {
      return this.update(MakePlayerDto, existingPlayer);
    } else {
      this.make(MakePlayerDto);
    }
  }

  async findAllPlayers(): Promise<Player[]> {
    return await this.players;
  }

  async findPlayerByEmail(email: string): Promise<Player> {
    const player = await this.players.find((player) => player.email === email);
    if (!player) {
      throw new NotFoundException('Email desconhecido');
    }
    return player;
  }

  async deletePlayer(email: string): Promise<void> {
    const foundPlayer = await this.players.find(
      (player) => player.email === email,
    );
    this.players = this.players.filter(
      (player) => player.email !== foundPlayer.email,
    );
  }

  private make(makePlayerDto: MakePlayerDto): void {
    const { phone, email, name } = makePlayerDto;
    const player: Player = {
      _id: uuidv4(),
      phone,
      email,
      name,
      ranking: 'Incrivel',
      rankingPosition: 10,
      photoURL: 'www.google.com',
    };
    this.logger.log(`makePlayerDto: ${JSON.stringify(player)}`);
    this.players.push(player);
  }

  private update(MakePlayerDto: MakePlayerDto, player: Player): void {
    const { name } = MakePlayerDto;
    player.name = name;
  }
}
