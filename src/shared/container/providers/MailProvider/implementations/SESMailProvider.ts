import nodemailer, {Transporter} from 'nodemailer'
import { SESClient } from '@aws-sdk/client-ses';
import {injectable, inject} from 'tsyringe'
import mailConfig from '@config/mail';

import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    const sesClient = new SESClient({
      region: 'us-east-1',
    });

    this.client = nodemailer.createTransport({
      SES: { ses: sesClient }
    });
    /*this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2020-12-01',
        region: 'us-east-1'
      })
    })*/
  }

  public async sendMail({to, from ,subject, templateData} :ISendMailDTO): Promise<void> {
    const {name, email} = mailConfig.defaults.from

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })
  }
}
