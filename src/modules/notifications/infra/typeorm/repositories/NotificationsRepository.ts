import { MongoDataSource } from "@shared/infra/typeorm/index";
import { MongoRepository } from "typeorm";

import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationDTO";

import Notification from "../schemas/Notification";

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>

  constructor () {
    this.ormRepository = MongoDataSource.getMongoRepository(Notification)
  }

  public async create({recipient_id, content}: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({recipient_id, content})

    await this.ormRepository.save(notification)

    return notification
  }
}

export default NotificationsRepository
