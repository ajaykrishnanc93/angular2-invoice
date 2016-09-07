
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
enableProdMode();
import {AppModule} from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule);
