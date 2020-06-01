import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  async getConfig(featureName: string) {
    // return this.configCatClient.getValueAsync(featureName, false);
    return Promise.resolve(false);
  }
}
