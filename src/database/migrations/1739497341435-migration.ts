import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739497341435 implements MigrationInterface {
    name = 'Migration1739497341435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "convite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "tipo_convite" "public"."convite_tipo_convite_enum" NOT NULL, "status" "public"."convite_status_enum" NOT NULL, "data_envio" TIMESTAMP NOT NULL DEFAULT now(), "data_resposta" TIMESTAMP, "mensagem" text, "time_id" uuid, "usuario_id" uuid, CONSTRAINT "PK_a96974896fa45d8560c62b35b7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partida" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "data_criacao" TIMESTAMP NOT NULL, "id_desafio" integer NOT NULL, "placar_time_desafiado" integer, "placar_time_desafiante" integer, CONSTRAINT "PK_10d41cde1840f4c9d8c44d245af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "desafio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "datahora_cricao_desafio" TIMESTAMP WITH TIME ZONE NOT NULL, "datahora_desafio" TIMESTAMP WITH TIME ZONE NOT NULL, "usuario_id" integer NOT NULL, "status" "public"."desafio_status_enum" NOT NULL, "nome_campo" character varying NOT NULL, "id_time_desafiante" uuid, "id_time_desafiado" uuid, "authorId" uuid, CONSTRAINT "PK_918deb47068b98e2fa8d8b33664" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "esporte" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "nome" character varying NOT NULL, "limite_atletas_inicial" integer NOT NULL, CONSTRAINT "PK_7b91f4cb6b48d7293bdada46434" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "historico_atleta_time" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "posicao" character varying NOT NULL, "motivo_saida" text NOT NULL, "data_inicio" TIMESTAMP WITH TIME ZONE NOT NULL, "data_fim" TIMESTAMP WITH TIME ZONE NOT NULL, "atleta_id" uuid, "time_id" uuid, CONSTRAINT "PK_65a7b46597dd20389de7b1c581e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "time" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "nome" character varying NOT NULL, "sigla" character varying NOT NULL, "logotipo_url" character varying, "publico" boolean DEFAULT false, "dt_fundacao" date NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "dt_criacao" TIMESTAMP NOT NULL DEFAULT now(), "fundador_id" uuid, "esporte_id" uuid, CONSTRAINT "PK_9ec81ea937e5d405c33a9f49251" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "atleta_time" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "cargo" character varying NOT NULL DEFAULT 'Atleta', "principal" boolean NOT NULL DEFAULT false, "usuario_id" uuid, "time_id" uuid, CONSTRAINT "PK_db451565afff71205f867fe73d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "nome" character varying NOT NULL, "senha" character varying NOT NULL, "email" character varying NOT NULL, "data_nasc" date NOT NULL, "cpf" character varying, "cep" character varying, "uf" character varying, "cidade" character varying, "bairro" character varying, "ativo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "UQ_28cd8597e57c8197d4929a98e7a" UNIQUE ("cpf"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "convite" ADD CONSTRAINT "FK_44f2e1947a504d2ef2fb73001ad" FOREIGN KEY ("time_id") REFERENCES "time"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "convite" ADD CONSTRAINT "FK_6fcc6f1522b7ded0df48379d422" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "desafio" ADD CONSTRAINT "FK_9581d267d1e296003941c64726e" FOREIGN KEY ("id_time_desafiante") REFERENCES "time"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "desafio" ADD CONSTRAINT "FK_020ad2849fec0a83863ed8befde" FOREIGN KEY ("id_time_desafiado") REFERENCES "time"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "desafio" ADD CONSTRAINT "FK_6500bc3f3cbce2733ff15d1e4cd" FOREIGN KEY ("authorId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "historico_atleta_time" ADD CONSTRAINT "FK_0aff46bd1761c6fcb7a2fee7f79" FOREIGN KEY ("atleta_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "historico_atleta_time" ADD CONSTRAINT "FK_d7610ddbbacf0245d6ec8e58381" FOREIGN KEY ("time_id") REFERENCES "time"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time" ADD CONSTRAINT "FK_e424b0b1c476a12a6ea92013d2f" FOREIGN KEY ("fundador_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time" ADD CONSTRAINT "FK_e1355a64de982159c5105768637" FOREIGN KEY ("esporte_id") REFERENCES "esporte"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "atleta_time" ADD CONSTRAINT "FK_bb0aa39df6e79378b3bcbacba6f" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "atleta_time" ADD CONSTRAINT "FK_1cb33b5939f48e4e26141ea22d0" FOREIGN KEY ("time_id") REFERENCES "time"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "atleta_time" DROP CONSTRAINT "FK_1cb33b5939f48e4e26141ea22d0"`);
        await queryRunner.query(`ALTER TABLE "atleta_time" DROP CONSTRAINT "FK_bb0aa39df6e79378b3bcbacba6f"`);
        await queryRunner.query(`ALTER TABLE "time" DROP CONSTRAINT "FK_e1355a64de982159c5105768637"`);
        await queryRunner.query(`ALTER TABLE "time" DROP CONSTRAINT "FK_e424b0b1c476a12a6ea92013d2f"`);
        await queryRunner.query(`ALTER TABLE "historico_atleta_time" DROP CONSTRAINT "FK_d7610ddbbacf0245d6ec8e58381"`);
        await queryRunner.query(`ALTER TABLE "historico_atleta_time" DROP CONSTRAINT "FK_0aff46bd1761c6fcb7a2fee7f79"`);
        await queryRunner.query(`ALTER TABLE "desafio" DROP CONSTRAINT "FK_6500bc3f3cbce2733ff15d1e4cd"`);
        await queryRunner.query(`ALTER TABLE "desafio" DROP CONSTRAINT "FK_020ad2849fec0a83863ed8befde"`);
        await queryRunner.query(`ALTER TABLE "desafio" DROP CONSTRAINT "FK_9581d267d1e296003941c64726e"`);
        await queryRunner.query(`ALTER TABLE "convite" DROP CONSTRAINT "FK_6fcc6f1522b7ded0df48379d422"`);
        await queryRunner.query(`ALTER TABLE "convite" DROP CONSTRAINT "FK_44f2e1947a504d2ef2fb73001ad"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "atleta_time"`);
        await queryRunner.query(`DROP TABLE "time"`);
        await queryRunner.query(`DROP TABLE "historico_atleta_time"`);
        await queryRunner.query(`DROP TABLE "esporte"`);
        await queryRunner.query(`DROP TABLE "desafio"`);
        await queryRunner.query(`DROP TABLE "partida"`);
        await queryRunner.query(`DROP TABLE "convite"`);
    }

}
