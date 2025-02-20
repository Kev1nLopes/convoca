import { MigrationInterface, QueryRunner } from "typeorm";

export class PublicAtletaTime1739925027201 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        let schemas = process.env.ESPORTES?.split(',') || []
        
        for (const schema of schemas) {

            await queryRunner.query(`CREATE TABLE IF NOT EXISTS ${schema}.atleta_time(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                cargo VARCHAR(100) DEFAULT 'Atleta',
                usuario_id UUID NOT NULL,
                time_id UUID NOT NULL,
                data_saida TIMESTAMP ,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,       
                CONSTRAINT fk_usuario
                    FOREIGN KEY(usuario_id)
                    REFERENCES public.usuario(id),
                CONSTRAINT fk_time
                    FOREIGN KEY(time_id)
                    REFERENCES ${schema}.time(id)
                )`)
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const schemas = process.env.ESPORTES?.split(',') || [];

        for (const schema of schemas) {
            await queryRunner.query(`DROP TABLE IF EXISTS ${schema}.time CASCADE`);
        }
    }

}
