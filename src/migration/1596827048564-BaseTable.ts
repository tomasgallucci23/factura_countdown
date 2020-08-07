import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class BaseTable1596827048564 implements MigrationInterface {
  tableName: string;

  constructor(inputTableName = 'users') {
    this.tableName = inputTableName;
  }

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'lastname',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '14',
            isNullable: false,
          },
          {
            name: 'date_birthday',
            type: 'datetime',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'nvarchar',
            length: '500',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '150',
          },
        ],
      }),
      true
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    await queryRunner.dropTable(this.tableName);
  }
}
