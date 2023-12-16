import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableMovieSchedule1699451188801
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(
        new Table({
          name: 'movie_schedule',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'datetime',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'cinema_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'movie_show_time_id',
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
        'movie_schedule',
        new TableForeignKey({
          columnNames: ['cinema_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'cinema',
          onDelete: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'movie_schedule',
        new TableForeignKey({
          columnNames: ['movie_show_time_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'movie_show_time',
          onDelete: 'CASCADE',
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie_schedule');
  }
}
