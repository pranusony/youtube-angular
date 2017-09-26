import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {Application} from "./views/Application";
import {HttpModule} from "@angular/http";
import {Search} from  "./views/search";
import {YouTubeService} from "./services/YouTubeService";
import {ReactiveFormsModule} from "@angular/forms";
import { YoutubePlayerModule } from "ng2-youtube-player";

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        ReactiveFormsModule,
        YoutubePlayerModule
    ],
    declarations:[
        Application,
        Search
    ],
    providers: [
        YouTubeService
    ],
    bootstrap:[Application]
})

export class AppModule { }