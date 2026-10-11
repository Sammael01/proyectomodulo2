import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';

<<<<<<< HEAD
platformBrowser()
  .bootstrapModule(AppModule, {})
  .catch((err) => console.error(err));
=======
platformBrowser().bootstrapModule(AppModule, {
  
})
  .catch(err => console.error(err));
>>>>>>> e13e5d3ce5a208655d301fe4b7dc05eebfa9226f
