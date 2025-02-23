import { MigrationInterface, QueryRunner } from "typeorm";

export class Convite1740179989824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        const schemas = process.env.ESPORTES?.split(',') || []

        for(const schema of schemas){
            await queryRunner.query(`CREATE TABLE IF NOT EXISTS ${schema}.convites(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                usuario_id UUID NOT NULL,
                time_id UUID NOT NULL,
                status VARCHAR(20) DEFAULT 'Pendente',
                mensagem TEXT,
                data_resposta TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_convite_usuario
                    FOREIGN KEY(usuario_id)
                    REFERENCES public.usuario(id),
                CONSTRAINT fk_convite_time
                    FOREIGN KEY(time_id)
                    REFERENCES ${schema}.time(id)
                )`)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const schemas = process.env.ESPORTES?.split(',') || [];

        for (const schema of schemas) {
            await queryRunner.query(`DROP TABLE IF EXISTS ${schema}.convite CASCADE`);
        }
    }

}
