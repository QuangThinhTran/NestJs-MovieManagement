import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableMovie1699451024482 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(
        new Table({
          name: 'movie',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'movie_name',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'description',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'banner',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'trailer',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'status',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'created_at',
              type: 'datetime',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'datetime',
              isNullable: true,
            },
            {
              name: 'deleted_at',
              type: 'datetime',
              isNullable: true,
            },
          ],
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie');
  }
}
