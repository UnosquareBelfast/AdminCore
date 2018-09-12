# AdminCore

AdminCore is currently an internal solution for Unosquare to manage employee holidays.

There are currently 3 parts to the AdminCore project:
1. Web-App - Is the front-end for the AdminCore web-app.
2. NativeApp - Is the front-end for the AdminCore android and iOS apps.
3. BackEnd - The back-end to the project. Web-App and NativeApp run off this.

## Getting up and running
Before following the steps be sure to clone this repository to the local machine.

### BackEnd
**Note: If you're on a Windows machine that doesn't have the pro version of the operating system, follow the non-pro instructions.**

1. Download & Install [Docker](https://www.docker.com/products/docker-desktop).
2. Download & Install [PostgreSQL](https://www.postgresql.org/download/)
3. Login to docker: Try `docker login` first, or if using bash `winpty docker login`. Note it asks for **username**, not email.
4. Build the Docker images:
    1. Navigate to `/BackEnd/` in your terminal.
    2. Run `docker build -f docker/admin.core.Dockerfile -t unosquare/admincore:latest . --no-cache`
    3. Run `docker build -f docker/express.cors.proxy.Dockerfile -t unosquare/cors-proxy:latest . --no-cache`
5. Finally, run the project with `docker-compose up`

#### Non-Pro Windows:

1. Download & Install [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/).
2. Follow the docs in the above guide until you get the docker command console open. Enter all docker commmands here.
3. Follow the standard instructions from point 2.

#### Mac (Make)
For mac users you can us Make to build Docker images.
1. `(make | nmake) build_admin_core version=latest`
2. `(make | nmake) build_cors_proxy version=latest`
3. `(make | nmake) version=latest`


### Web-App
**Note: Follow the back-end instructions first.**

1. Download & Install [Node V8.11.1](https://nodejs.org/en/download/releases/) for NPM.
2. Navigate to `/web-app/`.
3. Run `npm install` to get the dependencies for the project.
4. Create a file `.env` inside `/web-app/` with the following line: `DOMAIN='http://localhost:8081'`. This points to the back-end. If you are using Docker Toolbox the domain may differ.
5. Run `npm start` to start the web-server.

### Native App
**Note: Follow the back-end instructions first.**

1. Navigate to `/NativeApp`.
2. Run `npm install` to get the dependencies for the project.
3. Create a `.env` inside `/NativeApp/` and add the following line: `DOMAIN='http://localhost:8081'`.
4. If running on an android simulator, you will need to add an IP address to `baseURl` in `/utilities/AxiosInstance` (temporary).

#### Running on IOS or Android device
1. Install the [Expo](https://expo.io) client app on your IOS or Android.
2. Connect to the same wireless network as your computer.
3. Ensure enviornment variable is your IP address instead of localhost.
3. For Android, scan QR code from your terminal to open.
4. For IOS, you can get a link through email or text. Follow on-screen instructions after running `npm run start`.

#### Running on app on a simulator or virtual device
**Note: A mac is required to run IOS simulator**

To run the app on a IOS simulator or Android Virtual Device, please refer to this link: [React Native getting started.](https://facebook.github.io/react-native/docs/getting-started).

Then follow the instructions under Building Projects with Native Code.

Once setup, you can then launch the app by running `npm run android` or `npm run ios`.

#### Available Scripts
##### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). 

#### Using Genymotion (optional)
You can also use Genymotion as your emmulator, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

#### `npm run eject`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.

You can find more information within the NativeApps [read me](https://github.com/UnosquareBelfast/AdminCore/tree/develop/NativeApp) file.


## How to update the back end
Currently it's a bit of handling to update the backend. Here's how to it. Run the following commands in `/BackEnd/`. I've found that I need to use powershell or git bash for some of the following commands.

1. De-compose the BackEnd `docker-compose down`.
2. Delete all containers `docker rm -f $(docker ps -a -q)`
3. Delete all volumes `docker volume rm $(docker volume ls -q)`
4. Remove images: `docker rmi unosquare/admincore unosquare/cors-proxy`
5. Follow BackEnd setup guide above from point 4.

## Back end troubleshooting
- If you're experiencing problems after running `docker-compose up` it may be due to PostgresQL running locally. Use task manager or the mac equivilent to shut down all the PostgresQL processes.

