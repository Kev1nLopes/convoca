import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();


export const AppDataSource = new DataSource({
    type: 'postgres',
    url: 'postgresql://e0btlr:xau_tHhJ7lD4yBJBNL232SU7BZ0Y46oSPEuU0@us-east-1.sql.xata.sh/convoca:main?sslmode=require', // Use environment variable for the URL
    synchronize: false,
    entities: [__dirname + '/database/core/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/database/migrations/*-migration.ts'],
    migrationsRun: false,
    logging: true,
});

