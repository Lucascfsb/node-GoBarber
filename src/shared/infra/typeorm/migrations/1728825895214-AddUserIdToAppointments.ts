import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AddUserIdToAppointments1728825895214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('appointments', new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      })
    )

    await queryRunner.createForeignKeys('appointments', [
      new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }),
   ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.dropForeignKeys('appointments', [
      new TableForeignKey({
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }),
   ]);

    await queryRunner.dropColumn('appointments', 'user_id')
  }
}
