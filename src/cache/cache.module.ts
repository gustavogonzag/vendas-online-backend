/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as CacheModuleNest } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModuleNest.register({
    ttl: 90000000,
  })],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
