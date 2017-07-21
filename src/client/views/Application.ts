
import {appManager, appState, userManager} from "../engine/engine";
import {subscribeToResult} from "rxjs/util/subscribeToResult";

export class Application {

    private appNode:HTMLElement;

    private sayHiButton:HTMLButtonElement;
    private setUserButton:HTMLButtonElement;
    private setUserFirstNameButton:HTMLButtonElement;
    private getAPIValueButton:HTMLButtonElement;

    private setUserNameInput:HTMLInputElement;
    private setUserFirstNameInput:HTMLInputElement;

    private sayHiResponseLabel:HTMLSpanElement;
    private currentUserLabel:HTMLSpanElement;
    private firstNameLabel:HTMLSpanElement;
    private apiValueLabel:HTMLSpanElement;

    /*
     * This Is an application
     * */
    constructor(appNode:HTMLElement) {

        this.appNode = appNode;
        this.sayHiButton = document.getElementById("sayHiButton") as HTMLButtonElement;
        this.setUserButton = document.getElementById("setUserButton") as HTMLButtonElement;
        this.setUserFirstNameButton = document.getElementById("setUserFirstNameButton") as HTMLButtonElement;
        this.getAPIValueButton = document.getElementById("getAPIValueButton") as HTMLButtonElement;

        this.setUserNameInput = document.getElementById("setUserNameInput") as HTMLInputElement;
        this.setUserFirstNameInput = document.getElementById("setUserFirstNameInput") as HTMLInputElement;

        this.sayHiResponseLabel = document.getElementById("sayHiResponseLabel") as HTMLSpanElement;
        this.currentUserLabel = document.getElementById("currentUserLabel");
        this.firstNameLabel = document.getElementById("firstNameLabel");
        this.apiValueLabel = document.getElementById("apiValueLabel");

    }

    initialize():void {

        this.sayHiResponseLabel.textContent = appState.helloValue;

        if (!appState.currentUser) {
            this.setUserFirstNameInput.disabled = true;
            this.setUserFirstNameButton.disabled = true;
        }

        appState.subscribeTo("helloValue", (result) => {
            this.sayHiResponseLabel.textContent = appState.helloValue;
        });

        appState.subscribeTo("currentUser", () => {

            if (appState.currentUser) {

                this.setUserFirstNameInput.disabled = false;
                this.setUserFirstNameButton.disabled = false;

                this.currentUserLabel.textContent = appState.currentUser.user.username;

                appState.currentUser.subscribeTo("userFirstName", (result) => {
                    this.firstNameLabel.textContent = result;
                });
            }

        });

        appState.subscribeTo("apiValue", () => {
            this.apiValueLabel.textContent = appState.apiValue;
        });

        this.sayHiButton.addEventListener("click", () => {
            // performing an action by calling the manager
            appManager.sayHelloHi();
        });

        this.setUserButton.addEventListener("click", () => {
            // performing an action by calling the manager
            userManager.changeUser(this.setUserNameInput.value);
        });

        this.setUserFirstNameButton.addEventListener("click", () => {
            // performing an action by calling the manager
            userManager.changeUserFirstName(this.setUserFirstNameInput.value);
        });

        this.getAPIValueButton.addEventListener("click", () => {
            // performing an action by calling the manager
            appManager.getValueFromApi();
        });
    }
}