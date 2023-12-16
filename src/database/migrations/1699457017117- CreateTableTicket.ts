import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableTicket1699457017117 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(
        new Table({
          name: 'ticket',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'total',
              type: 'double',
              isNullable: true,
            },
            {
              name: 'seat',
              type: 'varchar',
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
          ],
        }),
      );

      await queryRunner.createForeignKey(
        'ticket',
        new TableForeignKey({
          columnNames: ['movie_show_time_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'movie_show_time',
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ticket');
  }
}
