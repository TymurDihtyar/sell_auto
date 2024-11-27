import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1732728944356 implements MigrationInterface {
    name = 'FirstMigration1732728944356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."account_type_name_enum" AS ENUM('basic', 'premium')`);
        await queryRunner.query(`CREATE TABLE "account_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" "public"."account_type_name_enum" NOT NULL DEFAULT 'basic', CONSTRAINT "PK_215ed371eba21a3ec30c2cfa1de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "listing_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "image_url" text NOT NULL, "listings_id" uuid NOT NULL, CONSTRAINT "PK_2abb5c9d795f27dbc4b10ced9dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "listing_views" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "view_date" TIMESTAMP NOT NULL DEFAULT now(), "listings_id" uuid NOT NULL, CONSTRAINT "PK_5d631d8af94d7825897d10a3e87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."regions_name_enum" AS ENUM('East', 'West', 'Central', 'North', 'South')`);
        await queryRunner.query(`CREATE TABLE "regions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."regions_name_enum" NOT NULL DEFAULT 'Central', CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."listings_status_enum" AS ENUM('inactive', 'active')`);
        await queryRunner.query(`CREATE TYPE "public"."listings_currency_enum" AS ENUM('UAH', 'EUR', 'USD')`);
        await queryRunner.query(`CREATE TABLE "listings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "title" text NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "brand" text NOT NULL, "model" text NOT NULL, "year" integer NOT NULL, "status" "public"."listings_status_enum" NOT NULL DEFAULT 'inactive', "currency" "public"."listings_currency_enum" NOT NULL DEFAULT 'UAH', "user_id" uuid NOT NULL, "region_id" uuid NOT NULL, CONSTRAINT "PK_520ecac6c99ec90bcf5a603cdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."roles_name_enum" AS ENUM('user', 'seller', 'manager', 'admin')`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."roles_name_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text, "email" text NOT NULL, "password" text NOT NULL, "blocked" boolean NOT NULL DEFAULT false, "image" text, "role_id" uuid NOT NULL, "account_type_id" uuid NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brands" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text, CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "models" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text, "brand_id" uuid NOT NULL, CONSTRAINT "PK_ef9ed7160ea69013636466bf2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "currencies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "ccy" text NOT NULL, "base_ccy" text NOT NULL, "buy" text NOT NULL, "sale" text NOT NULL, CONSTRAINT "PK_d528c54860c4182db13548e08c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "listing_images" ADD CONSTRAINT "FK_c18c7311b4cc10ade5d5403755d" FOREIGN KEY ("listings_id") REFERENCES "listings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "listing_views" ADD CONSTRAINT "FK_dca6ddea5297f00f731ea649a97" FOREIGN KEY ("listings_id") REFERENCES "listings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "listings" ADD CONSTRAINT "FK_3f1539dda02eba4738ac5859ded" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "listings" ADD CONSTRAINT "FK_13e894ac4a5b9e3d9ee12faefb4" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_82af20b2ade2614301b327ccc7e" FOREIGN KEY ("account_type_id") REFERENCES "account_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "FK_f2b1673c6665816ff753e81d1a0" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "FK_f2b1673c6665816ff753e81d1a0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_82af20b2ade2614301b327ccc7e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "listings" DROP CONSTRAINT "FK_13e894ac4a5b9e3d9ee12faefb4"`);
        await queryRunner.query(`ALTER TABLE "listings" DROP CONSTRAINT "FK_3f1539dda02eba4738ac5859ded"`);
        await queryRunner.query(`ALTER TABLE "listing_views" DROP CONSTRAINT "FK_dca6ddea5297f00f731ea649a97"`);
        await queryRunner.query(`ALTER TABLE "listing_images" DROP CONSTRAINT "FK_c18c7311b4cc10ade5d5403755d"`);
        await queryRunner.query(`DROP TABLE "currencies"`);
        await queryRunner.query(`DROP TABLE "models"`);
        await queryRunner.query(`DROP TABLE "brands"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TYPE "public"."roles_name_enum"`);
        await queryRunner.query(`DROP TABLE "listings"`);
        await queryRunner.query(`DROP TYPE "public"."listings_currency_enum"`);
        await queryRunner.query(`DROP TYPE "public"."listings_status_enum"`);
        await queryRunner.query(`DROP TABLE "regions"`);
        await queryRunner.query(`DROP TYPE "public"."regions_name_enum"`);
        await queryRunner.query(`DROP TABLE "listing_views"`);
        await queryRunner.query(`DROP TABLE "listing_images"`);
        await queryRunner.query(`DROP TABLE "account_type"`);
        await queryRunner.query(`DROP TYPE "public"."account_type_name_enum"`);
    }

}
