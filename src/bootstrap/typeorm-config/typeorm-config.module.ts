
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Supply } from 'src/domain/supply/entities/supply.entity';

@Module({
  imports: [
    ConfigModule, // Ensure ConfigModule is imported here
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], // Correctly positioned
      useFactory: async (configService: ConfigService) => {
        // Create options object
        const options = {
          type:'postgres' as 'postgres',
          host: configService.get('DB_URL'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          synchronize: configService.get('CREATE_DB') == 'true', // Ensure this is a boolean
          logging: true,
          entities: [Supply], // Reference the Supply entity directly
          autoLoadEntities: true,
        };
        // console.log(configService.get('DB_URL'), configService.get('DB_DATABASE'));

        return options; 
      },
    }),
  ],
})
export class TypeOrmConfigModule {}
