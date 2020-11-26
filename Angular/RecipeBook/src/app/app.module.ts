import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './auth/auth-intercepter.service';
import { SharedModule } from './shared/shared.module';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { LoggingService } from './logging.service';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
  ],
  providers: [
    DataStorageService,
    RecipeService,
    ShoppingListService,
    AuthService,
    RecipesResolverService,
    AuthGuard,
    // LoggingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
