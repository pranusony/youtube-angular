import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class YouTubeService {
    constructor(private http: Http) {

    }

    fetchVideos(query: string):Observable<any> {

/*        let httpObservable:Observable<any> = this.http
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}` +
                "&maxResults=10" +
                "&type=video" +
                "&key=AIzaSyAqlwGWx85x2zxjY4AUQfuOMT9OeRer_fY");
        let jsonParsingObsvrable = httpObservable.map(jsonParse);
        let itemsObservable = jsonParsingObsvrable.map(getItems);
        return itemsObservable;*/

        return this.http
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}` +
                "&maxResults=10" +
                "&type=video" +
                "&key=AIzaSyAqlwGWx85x2zxjY4AUQfuOMT9OeRer_fY")
            .map(response => response.json())
            .map((videosResponse) => {
                return videosResponse.items;
            });
    }
}