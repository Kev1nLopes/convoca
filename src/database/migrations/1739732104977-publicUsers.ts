import { MigrationInterface, QueryRunner } from "typeorm";

export class PublicUsers1739732104977 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS usuario(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            nome VARCHAR(100) NOT NULL,
            senha VARCHAR(255) NOT NULL,
            email VARCHAR(100) NOT NULL,
            data_nasc DATE NOT NULL,
            cpf VARCHAR(11) UNIQUE NOT NULL,
            cep VARCHAR(8),
            uf varchar(2),
            cidade varchar(50),
            bairro varchar(50),
            ativo BOOLEAN DEFAULT FALSE,
            createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )`)
            
        let schemas = process.env.ESPORTES?.split(',') || []
        console.log("🚀 ~ PublicUsers1739732104977 ~ up ~ schemas:", schemas)
        
        for (const schema of schemas) {
            await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
            
            await queryRunner.query(`CREATE TABLE IF NOT EXISTS ${schema}.time(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                nome VARCHAR(100) NOT NULL,
                sigla VARCHAR(10) UNIQUE NOT NULL,
                logotipo_url TEXT,
                publico BOOLEAN DEFAULT FALSE,
                dt_fundacao DATE NOT NULL,
                ativo BOOLEAN DEFAULT TRUE,
                fundador_id UUID,
                CONSTRAINT fk_fundador
                    FOREIGN KEY(fundador_id)
                    REFERENCES usuario(id)
                )`)
            
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverter as mudanças (drop das tabelas e schemas)
        const schemas = process.env.ESPORTES?.split(',') || [];

        for (const schema of schemas) {
            await queryRunner.query(`DROP TABLE IF EXISTS ${schema}.time CASCADE`);
            await queryRunner.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
        }

        await queryRunner.query(`DROP TABLE IF EXISTS usuario CASCADE`);
    }

}
