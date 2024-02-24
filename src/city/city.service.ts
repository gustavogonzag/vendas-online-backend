/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        private readonly cacheService: CacheService,
    ) { }

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {

        return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, () =>
            this.cityRepository.find({
                where: {
                    stateId,
                },
            }),
        )
    }

    async findCityById(cityId: number): Promise<CityEntity> {
        const city = await this.cityRepository.findOne({
            where:
                { id: cityId }
        });

        if (!city) {
            throw new NotFoundException('City not found');
        }

        return city
    }

}
