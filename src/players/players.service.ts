import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MakePlayerDto } from './dtos/makePlayer.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly PlayerModel: Model<Player>,
  ) {}
  private readonly logger = new Logger(PlayersService.name);
  private players: Player[] = [];

  async makeUpdatePlayer(MakePlayerDto: MakePlayerDto): Promise<void> {
    const { email } = MakePlayerDto;

    const existingPlayer = await this.PlayerModel.findOne({ email }).exec();

    if (existingPlayer) {
      this.update(MakePlayerDto);
    } else {
      this.make(MakePlayerDto);
    }
  }

  async findAllPlayers(): Promise<Player[]> {
    return await this.PlayerModel.find().exec();
  }

  async findPlayerByEmail(email: string): Promise<Player> {
    const player = await this.PlayerModel.findOne({ email }).exec();

    if (!player) throw new NotFoundException('Email desconhecido');

    return player;
  }

  async deletePlayer(email: string): Promise<any> {
    return await this.PlayerModel.deleteOne({ email }).exec();
  }

  private async make(makePlayerDto: MakePlayerDto): Promise<Player> {
    const newPlayer = new this.PlayerModel(makePlayerDto);

    return await newPlayer.save();
  }

  private async update(MakePlayerDto: MakePlayerDto): Promise<Player> {
    return await this.PlayerModel.findOneAndUpdate(
      { email: MakePlayerDto.email },
      { MakePlayerDto: MakePlayerDto },
    ).exec();
  }
}
