import { NgModule } from "@angular/core";

import { AuthInterceptor } from "./auth/auth.interceptor.service";
import { AuthGuardCanActivate } from "./auth/guards/auth.guard";
import { AlertifyService } from "./services/alertify-service.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({

  providers: [AlertifyService, AuthGuardCanActivate, {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]
})

export class CoreModule{

}
