import { Injectable, isDevMode } from '@angular/core';

type Config = {
  production: {
    fontPath: string;
  };
  development: {
    fontPath: string;
  };
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: Config = {
    production: {
      fontPath: '/quickTry-management/assets/fonts/Pridi/Pridi-Regular.ttf',
    },
    development: {
      fontPath: '../../assets/fonts/Pridi/Pridi-Regular.ttf',
    },
  };

  getConfigValue(variable: keyof Config['production']): string {
    const environment = isDevMode() ? 'development' : 'production';
    return this.config[environment][variable];
  }
}
