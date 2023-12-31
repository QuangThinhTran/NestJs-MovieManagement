import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableSeat1699456530111 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(
        new Table({
          name: 'seat',
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
              isNullable: true,
              isUnique: true,
            },
            {
              name: 'type',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'status',
              type: 'boolean',
              isNullable: true,
            },
            {
              name: 'movie_showtime_id',
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
        'seat',
        new TableForeignKey({
          columnNames: ['movie_showtime_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'movie_show_time',
        }),
      );

      await queryRunner.createForeignKey(
        'seat',
        new TableForeignKey({
          columnNames: ['movie_theater_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'movie_theater',
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('seat');
  }
}
