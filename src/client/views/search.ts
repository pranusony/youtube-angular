import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {YouTubeService} from "../services/YouTubeService";
import {FormControl} from "@angular/forms";

declare  const YT:any;
declare const global:any;

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
        <div id="player"></div>
        <div *ngFor="let video of searchResults" (click)="playVideo(video)">
            <h6>{{video.snippet.title}}</h6>
            <img [src]="video.snippet.thumbnails.default.url"/>
        </div>
        
    </section>`
})

export class Search implements AfterViewInit {

    @ViewChild("videoPlayer") videoplayer: any;

    private player;
    private isPlayerAPIReady:boolean = false;
    private isViewCreated:boolean = false;

    inputField: FormControl = new FormControl();
    searchResults:any[] = [];
    private currentVideoID: string = " ";

    private searchQuery:string;

   constructor(private youtubeservice: YouTubeService) {

     this.inputField.valueChanges
         .debounceTime(500)
           .subscribe((input) => {
                this.searchQuery = input;
           });

       // 2. This code loads the IFrame Player API code asynchronously.
       let tag = document.createElement("script");

       tag.src = "https://www.youtube.com/iframe_api";
       let firstScriptTag = document.getElementsByTagName("script")[0];
       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

       // 3. This function creates an <iframe> (and YouTube player)
       //    after the API code downloads.
       global.onYouTubeIframeAPIReady = () => {
            this.isPlayerAPIReady = true;
            this.createYTPlayer();
       };

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

   playVideo(video:any) {
       this.player.loadVideoById(video.id.videoId);
   }
    ngAfterViewInit(): void {

       this.isViewCreated = true;
       this.createYTPlayer();

/*        // 2. This code loads the IFrame Player API code asynchronously.
        let tag = document.createElement("script");

        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        global.onYouTubeIframeAPIReady = () => {
           this. player = new YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "",

            });
        };*/

        // 4. The API will call this function when the video player is ready

    }

    createYTPlayer():void {

       if(this.isPlayerAPIReady && this.isViewCreated) {

           this. player = new YT.Player("player", {
               height: "390",
               width: "640",
               videoId: "",

           });
       }

    }

}