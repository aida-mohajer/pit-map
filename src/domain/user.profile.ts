// import { AutomapperProfile } from '@automapper/nestjs';
// import { createMap, type Mapper } from '@automapper/core';
// import { Injectable } from '@nestjs/common';
// import { InjectMapper } from '@automapper/nestjs';
// import { Supply } from 'src/entity/supply.entity';
// import { CreateSupplyDto } from './supply/dto/create-supply.dto';

// @Injectable()
// export class AuthProfile extends AutomapperProfile {
//   constructor(@InjectMapper() mapper: Mapper) {
//     super(mapper);
//   }

//   override get profile() {
//     return (mapper) => {
//       // createMap(mapper, ReadUserDto, UserProfile);
//       // createMap(mapper, Supply, ReadUserDto);
//       createMap(mapper, CreateSupplyDto, Supply);

//       // createMap(mapper, ReadUserDto, UserProfile);
//       // createMap(mapper, UserProfile, ReadUserDto);
//       // createMap(mapper, CreateUserDto, UserProfile);
//     };
//   }
// }
