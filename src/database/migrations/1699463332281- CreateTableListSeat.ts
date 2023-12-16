import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableListSeat1699463332281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(
        new Table({
          name: 'list_seat',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'seat_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'ticket_id',
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
        'list_seat',
        new TableForeignKey({
          columnNames: ['seat_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'seat',
        }),
      );

      await queryRunner.createForeignKey(
        'list_seat',
        new TableForeignKey({
          columnNames: ['ticket_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'ticket',
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('list_seat');
  }
}
