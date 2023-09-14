import { DotenvParseOutput, config } from 'dotenv';
import { IConfigService } from './config.interface';

export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor() {
    const { error, parsed } = config();

    if (error) {
      throw new Error('File .env not found');
    }

    if (!parsed) {
      throw new Error('Empty .env file');
    }

    this.config = parsed;
  }

  get(key: string): string {
    const response = this.config[key];
    if (!response) {
      throw new Error('Key not found');
    }

    return response;
  }
}
