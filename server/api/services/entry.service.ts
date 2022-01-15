import L from '../../common/logger';

export class EntryService {
  create(
    name: string,
    business: string,
    email: string,
    contactNumber: string,
    message: string,
    newsletter: string
  ): Promise<boolean> {
    L.info(`create entry with name ${name}`);
    L.info(`create entry with business ${business}`);
    L.info(`create entry with email ${email}`);
    L.info(`create entry with contactNumber ${contactNumber}`);
    L.info(`create entry with message ${message}`);
    L.info(`create entry with newsletter ${newsletter}`);
    return Promise.resolve(true);
  }
}

export default new EntryService();
