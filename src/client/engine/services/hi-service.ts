
import {Observable} from "rxjs/Observable";
import {httpClient} from "../core/index";
import {Resources} from "../constants/resource-constants";
import {AjaxResponse} from "rxjs/Rx";
export function sayHi():Promise<string> {

    console.log("hi-service saying hi...");
    return Promise.resolve("hi");
}

export function getValueFromApi():Observable<string> {

    return httpClient.get(Resources.URL.base + "/api/value").map((result:AjaxResponse) => {
        return result.response;
    });
}