/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
    ) {}

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
        return this.cityRepository.find({ where: { stateId, }, });
    } 

}
