import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ParallaxHeaderDirective } from '../directives/parallax-header/parallax-header';
// import { SwiperModule, SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';

// const config: SwiperConfigInterface = {
//   initialSlide: 0,    
//   direction: 'horizontal',
//   keyboardControl: true,
//   nextButton: '.swiper-button-next',
//   prevButton: '.swiper-button-prev',
//   parallax: false,
//   speed: 600,
//   pagination: '.swiper-pagination',
//   slidesPerView: 1,
//   paginationClickable: true,
//   spaceBetween: 0,
//   freeMode: true,
// };
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ParallaxHeaderDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // SwiperModule.forRoot(config),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    // SwiperComponent,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
