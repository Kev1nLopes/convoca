import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();


const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.XATA_URL, // Use environment variable for the URL
    synchronize: false,
    entities: ['src/database/core/**/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/*-migration.ts'],
    migrationsRun: false,
    logging: true,
});

export default AppDataSource;