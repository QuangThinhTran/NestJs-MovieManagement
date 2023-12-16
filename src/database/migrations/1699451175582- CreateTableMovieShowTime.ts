import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableMovieShowTime1699451175582
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(
        new Table({
          name: 'movie_show_time',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'start_time',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'end_time',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'price',
              type: 'double',
              isNullable: true,
            },
            {
              name: 'movie_theater_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'movie_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'cinema_id',
              type: 'int',
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

      await queryRunner.createForeignKey(
        'movie_show_time',
        new TableForeignKey({
          columnNames: ['movie_theater_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'movie_theater',
          onDelete: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'movie_show_time',
        new TableForeignKey({
          columnNames: ['movie_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'movie',
          onDelete: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'movie_show_time',
        new TableForeignKey({
          columnNames: ['cinema_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'cinema',
          onDelete: 'CASCADE',
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie_show_time');
  }
}
