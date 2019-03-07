// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {platformNativeScriptDynamic} from "nativescript-angular/platform";

import * as application from "tns-core-modules/application";
import {ApplicationEventData, LaunchEventData} from "tns-core-modules/application";

import {AppModule} from "./app/app.module";
import {JiguangPush} from "nativescript-jiguang-push";
// import PackageManager = android.content.pm.PackageManager;


if (application.ios) {
    console.log("current on iOS platform");
}

application.on(application.launchEvent, (eventData: LaunchEventData) => {
    console.log('application launche event fire');
    // console.dir(eventData);
    JiguangPush.init(null);
});

application.on(application.suspendEvent, (eventData: ApplicationEventData) => {
    console.log('application suspendEvent fire');
    // console.dir(eventData);
});

application.on(application.resumeEvent, (eventData: ApplicationEventData) => {
    console.log('application resumeEvent fire');
    console.dir(eventData);
});


if (application.android) {
    let currentContext: android.content.Context = application.android.currentContext;
    let pmanager: android.content.pm.PackageManager = currentContext.getPackageManager();
    let applicationInfo: android.content.pm.ApplicationInfo = pmanager.getApplicationInfo(currentContext.getPackageName(),
        android.content.pm.PackageManager.GET_META_DATA);
    let appId = applicationInfo.metaData.getString("JPUSH_APPID");

}

// A traditional NativeScript application starts by initializing global objects,
// setting up global CSS rules, creating, and navigating to the main page.
// Angular applications need to take care of their own initialization:
// modules, components, directives, routes, DI providers.
// A NativeScript Angular app needs to make both paradigms work together,
// so we provide a wrapper platform object, platformNativeScriptDynamic,
// that sets up a NativeScript application and can bootstrap the Angular framework.
platformNativeScriptDynamic().bootstrapModule(AppModule);
