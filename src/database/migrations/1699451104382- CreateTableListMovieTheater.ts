import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableListMovieTheater1699451104382
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(
        new Table({
          name: 'movie_theater',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'name',
              type: 'varchar',
              isUnique: true,
              isNullable: true,
            },
            {
              name: 'status',
              type: 'varchar',
              isUnique: true,
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
    await queryRunner.dropTable('movie_theater');
  }
}
