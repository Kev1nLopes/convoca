import { MigrationInterface, QueryRunner } from "typeorm";

export class PublicEsportes1739922778442 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS esportes(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            nome varchar(50) NOT NULL,
            limite_titulares INTEGER NOT NULL,
            limite_jogadores_inicial INTEGER NOT NULL,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP
            )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS esportes`);
    }

}
