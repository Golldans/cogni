import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MakePlayerDto } from './dtos/makePlayer.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly PlayerModel: Model<Player>,
  ) {}
  private readonly logger = new Logger(PlayersService.name);

  async makePlayer(MakePlayerDto: MakePlayerDto): Promise<Player> {
    return this.make(MakePlayerDto);
  }

  async updatePlayer(_id, MakePlayerDto: MakePlayerDto): Promise<Player> {
    const { email } = MakePlayerDto;

    this.checkForOneEmail(email);

    return this.update(_id, MakePlayerDto);
  }

  async findAllPlayers(): Promise<Player[]> {
    return await this.PlayerModel.find().exec();
  }

  async findPlayerById(id: string): Promise<Player> {
    const player = await this.checkForOneId(id);

    return player;
  }

  async deletePlayer(id: string): Promise<any> {
    this.checkForOneId(id);

    return await this.PlayerModel.deleteOne({ id }).exec();
  }

  private async make(makePlayerDto: MakePlayerDto): Promise<Player> {
    const newPlayer = new this.PlayerModel(makePlayerDto);

    return await newPlayer.save();
  }

  private async update(_id, MakePlayerDto: MakePlayerDto): Promise<Player> {
    this.checkForOneId(_id);

    return await this.PlayerModel.findOneAndUpdate(
      { _id },
      { $set: MakePlayerDto },
    ).exec();
  }

  private async checkForOneId(_id: string): Promise<Player> {
    const player = this.PlayerModel.findById({ _id }).exec();

    if (!player) throw new NotFoundException('ID desconhecido chefia');

    return player;
  }

  private async checkForOneEmail(email: string): Promise<void> {
    const player = this.PlayerModel.findOne({ email });

    if (!player) throw new NotFoundException('Email já cadastrado');
  }
}
