import { Module } from '@nestjs/common';
import { SupplyModule } from './supply/supply.module';
// import { AuthProfile } from './user.profile';

@Module({
  imports: [SupplyModule],
  // providers: [AuthProfile],
})
export class DomainModule {}
