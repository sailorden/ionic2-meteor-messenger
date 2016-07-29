{{#template name="tutorials.whatsapp2.ionic.step_02.md"}}

Now that we're finished with the initial setup, we can start building our app.

An application created by Ionic's CLI will have a very clear methodology. The app is made out of pages, each page is made out of 3 files:

- page.html - A view template file written in HTML based on Angular2's new [template engine](angular.io/docs/ts/latest/guide/template-syntax.html).
- page.scss - A stylesheet file written in a CSS pre-process language called [SASS](sass-lang.com).
- page.ts - A script file written in Typescript.

By default, the application will be created with 3 pages - `about`, `home` and `contact`. Since our app's flow doesn't contain any of them, we first gonna clean them up by running the following commands:

    $ rm -rf pages/about
    $ rm -rf pages/home
    $ rm -rf pages/contact

Then we gonna clean some unnecessary SASS files importations of the pages we've just removed:

{{> DiffBox tutorialName="ionic-tutorial" step="2.2"}}

Ionic2 provides us with a new theming system. The theme is determined thanks to SASS variables located in the file `app/theme/app.variables.scss`. By changing these variables our entire app's theme will be changed as well. Not only that, but you can also add new theming colors, and they should be available on the as HTML attributes, and the should affect the theming of most Ionic elements once we use them.

Since we want our app to have a Whatsapp theme, we gonna define a new variable called `whatsapp`:

{{> DiffBox tutorialName="ionic-tutorial" step="2.2"}}

Now whenever we will use it as an HTML attrubite we gonna have a greenish background, just like Whatsapp.

Up next we gonna define the tabs which will be available in our application in its main view:

{{> DiffBox tutorialName="ionic-tutorial" step="2.3"}}

We defined 4 tabs: `chats`, `contacts`, `favorites` and `recents`. In this tutorial we want to focus only on the messaging system, therefore we only gonna implement the chats tab, the rest is just for the layout.

If you will take a closer look at the view template we've just defined, you can see that one of the tab's attributes is wrapped with \[square brackets\]. This is part of Angular2's new template syntax and what it means is that the property called `root` of the HTML element is bound to the `chatsTabRoot` property of the component.

In this case, the component who's responsible for the tab is the app's main component located in `app/app.ts`. Let's edit it and reference the chats tab to the chats page which we will soon implement:

{{> DiffBox tutorialName="ionic-tutorial" step="2.4"}}

With that said, let's go ahead and implement the chats component:

{{> DiffBox tutorialName="ionic-tutorial" step="2.5"}}

The logic is simple. Once the component is created we gonna define dummy chats just so we can test our view. As you can see we're using a package called [Moment](momentjs.com) to fabricate some date data. Let's install it:

    $ npm install moment --save

Since we're using Typescript, we also gonna need to define a custom data type for our chat model so the compiler can work properly. These custom data types are called [declerations](typescriptlang.org/docs/handbook/writing-declaration-files.html). Let's create an initial decleration file for our app's models located in `typings/models.d.ts`:

{{> DiffBox tutorialName="ionic-tutorial" step="2.7"}}

And whenever we define a new decleration file we need to import it in the main decleration file located in `typings/index.d.ts`:

{{> DiffBox tutorialName="ionic-tutorial" step="2.8"}}

Let's move on and create the chats view template and stylesheet:

{{> DiffBox tutorialName="ionic-tutorial" step="2.9"}}

{{> DiffBox tutorialName="ionic-tutorial" step="2.10"}}

{{> DiffBox tutorialName="ionic-tutorial" step="2.11"}}

The view is pretty straight forward, it's just a list of chats and it has a Whatsapp-like style into it.

Once creating an Ionic page it's recommended to use the following layout:

- <ion-header> - The header of the page. Will usually contain content that should be bounded to the top like navbar.
- <ion-content> - The content of the page. Will usually contain it's actual content like text.
- <ion-footer> - The footer of the page. Will usutally contain content that should be bounded to the bottom like toolbars.

The current view template contains an <ion-header> with a navigation bar containing the tab's title and an <ion-content> containing the list of the chats. The `*ngFor` attribute is used for iteration and is equivalent to Angular1's `ng-for` attribute. The '*' sign just tells us that this is a template directive we're dealing with (A directive that should eventually be rendered in the view). To prevent any misunderstandings, let's have a quick example for some of the notations in Angular2's template syntax that we gonna use in this tutorial:

| Template syntax                                                |                                                                                                                                     |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| <input [value]="firstName">                                    | Binds property `value` to the result of expression `firstName`.                                                                     |
| <button (click)="readRainbow($event)">                         | Calls method `readRainbow` when a click event is triggered on this button element (or its children) and passes in the event object. |
| <div title="Hello {{ponyName}}">                               | Binds a property to an interpolated string, e.g. "Hello Seabiscuit". Equivalent to: <div [title]="'Hello ' + ponyName">             |
| <my-cmp [(title)]="name">                                      | Sets up two-way data binding. Equivalent to: <my-cmp [title]="name" (titleChange)="name=$event">                                    |
| <p>Card No.: {{cardNumber \| myCreditCardNumberFormatter}}</p> | Transforms the current value of expression `cardNumber` via the pipe called `myCreditCardNumberFormatter`.                          |

> **NOTE:** Ionic elements will always have a prefix of `ion` and are self explanatory. Further information about Ionic's HTML elements can be found [here](ionicframework.com/docs/v2/component). It's very important to use these elemnts since they are the ones who provides us with the mobile-app look.

As for now the chat items in our view contain a date of the recent message sent with a very messy and unclear format. Let's use a more user friendly format called a 'calendaric format'. For this we gonna need a help of a package called `angular2-moment`:

    $ npm install angular2-moment --save

Now that it is installed, before we go ahead and use a calendar pipe in our view, we first need to provide it in our component:

{{> DiffBox tutorialName="ionic-tutorial" step="2.13"}}

And now let's apply it:

{{> DiffBox tutorialName="ionic-tutorial" step="2.14"}}

Pipes serves the same proposes as Angular1's filters and they share exactly the same sytanx, only they are called in a different name.

Lastly for this step, we wanna have the ability to remove chats from our list. There are many methods to do so, in our case we want a 'remove' button to appear once we slide the chat item to the left. For this we gonna use a specialt element provided to us by Ionic called <ion-item-sliding> and inside of it we gonna define the buttons that should appear once we slide it using an element called <ion-item-options>. Let's update the view accordingly:

{{> DiffBox tutorialName="ionic-tutorial" step="2.15"}}

Note how we used the \(round brackets\) notation on the `click` event. These brackets are used to define events and they are part of Angular2's new template syntax.

Let's add a `removeChat()` method into our component, so the data will actually get updated once we click on the 'remove' button:

{{> DiffBox tutorialName="ionic-tutorial" step="2.16"}}

This is how the chats tab should look like:

> *android* {{tutorialImage 'ionic' 'screenshot-1-md.png' 500}}

> *ios* {{tutorialImage 'ionic' 'screenshot-1-ios.png' 500}}

And once we slide a chat item to the left:

> *android* {{tutorialImage 'ionic' 'screenshot-2-md.png' 500}}

> *ios* {{tutorialImage 'ionic' 'screenshot-2-ios.png' 500}}

{{/template}}