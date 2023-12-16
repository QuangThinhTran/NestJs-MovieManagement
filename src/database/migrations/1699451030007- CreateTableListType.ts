import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableListType1699451030007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(
        new Table({
          name: 'list_type',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'type_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'movie_id',
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
        'list_type',
        new TableForeignKey({
          columnNames: ['type_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'type',
        }),
      );

      await queryRunner.createForeignKey(
        'list_type',
        new TableForeignKey({
          columnNames: ['movie_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'movie',
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('list_type');
  }
}
