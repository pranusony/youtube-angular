import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {YouTubeService} from "../services/YouTubeService";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
@Component({
    selector: "search",
    providers: [YouTubeService],
    template: `<section>
        <div class="input-group input-group-lg">
            
            <input  type="text"  [formControl]= "inputField" class="form-control" placeholder="Search"/>

            <div class="input-group-btn">
                <button class="btn btn-default" (click)="handleSearchButtonClicked()"><i class="glyphicon glyphicon-search"></i></button>
            </div>
        </div>
        <div *ngFor="let video of searchResults">
            <h6>{{video.snippet.title}}</h6>
            <img [src]="video.snippet.thumbnails.default.url"/>
        </div>
    </section>`
})

export class Search  {

    inputField: FormControl = new FormControl();
    searchResults:any[] = [];

    private searchQuery:string;

   constructor(private youtubeservice: YouTubeService) {

     this.inputField.valueChanges
         .debounceTime(500)
           .subscribe((input) => {
                this.searchQuery = input;
           });

   }

    handleSearchButtonClicked():void {
       // this.searchVideos(this.searchInput.nativeElement.value);
        this.searchVideos(this.searchQuery);
    }

   searchVideos(query: string) {
       this.youtubeservice.fetchVideos(query)
           .subscribe((items) => {
                this.searchResults = items;
           });
   }

}