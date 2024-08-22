import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1724299755076 implements MigrationInterface {
    name = 'Migration1724299755076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "tags" varchar NOT NULL, "surname" varchar NOT NULL, "completeName" varchar NOT NULL, CONSTRAINT "UQ_384deada87eb62ab31c5d5afae5" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL, "authorId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL, "authorId" integer, CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "author" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "text", "authorId") SELECT "id", "title", "text", "authorId" FROM "post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL, "authorId" integer)`);
        await queryRunner.query(`INSERT INTO "post"("id", "title", "text", "authorId") SELECT "id", "title", "text", "authorId" FROM "temporary_post"`);
        await queryRunner.query(`DROP TABLE "temporary_post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
