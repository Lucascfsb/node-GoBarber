import { ObjectId, Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm'

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  content: string;

  @Column('uuid')
  recipient_id: string;

  @Column({default: false})
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification
