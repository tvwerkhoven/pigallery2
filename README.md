# PiGallery2 
![GitHub package.json version](https://img.shields.io/github/package-json/v/bpatrik/pigallery2)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/bpatrik/pigallery2.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bpatrik/pigallery2/context:javascript)
[![Build Status](https://travis-ci.org/bpatrik/pigallery2.svg?branch=master)](https://travis-ci.org/bpatrik/pigallery2)
[![Coverage Status](https://coveralls.io/repos/github/bpatrik/pigallery2/badge.svg?branch=master)](https://coveralls.io/github/bpatrik/pigallery2?branch=master)
[![Heroku](https://heroku-badge.herokuapp.com/?app=pigallery2&style=flat)](https://pigallery2.herokuapp.com)
[![Docker build](https://github.com/bpatrik/pigallery2/workflows/docker-buildx/badge.svg)](https://github.com/bpatrik/pigallery2/actions)
[![dependencies Status](https://david-dm.org/bpatrik/pigallery2/status.svg)](https://david-dm.org/bpatrik/pigallery2)
 

Homepage: http://bpatrik.github.io/pigallery2/

This is a **fast** (like faster than your PC fast) **directory-first photo gallery website**, optimised for running on low resource servers (especially on raspberry pi).

✔️ Strenghts:
 * ⚡ Fast, like for real
 * ✔️ Simple. Point to your photos folder and a temp folder and you are good to go

⛔ Weakness:
 * 😥 Its simple. Shows what you have that's it. No gallery changes (photo delete, rotate, enhance, tag, organize, etc), your gallery folder is read-only.

## Live Demo
Live Demo @ heroku: https://pigallery2.herokuapp.com/ 
 - the demo page **first load** might take up **30s**: the time while the free webservice boots up

![PiGallery2 - Animated gif demo](docs/demo.gif)

## Table of contents
1. [Getting started](#1-getting-started-also-works-on-raspberry-pi)
2. [Translate the page to your own language](#2-translate-the-page-to-your-own-language)
3. [Feature list](#3-feature-list)
4. [Suggest/endorse new features](#4-suggestendorse-new-features)
5. [Known errors](#5-known-errors)
6. [Credits](#6-credits) 



## 1. Getting started (also works on Raspberry Pi)

### 1.1 [Install and Run with Docker (recommended)](docker/README.md)

[Docker](https://www.docker.com/) with [docker-compose](https://docs.docker.com/compose/) is the official and recommend way of installing and running *Pigallery2*.
It contains all necessary dependencies, auto restarts on reboot, supports https, easy to upgrade to newer versions.
For configuration and docker-compose files read more [here](docker/README.md) or check all builds: https://hub.docker.com/r/bpatrik/pigallery2/tags/



### 1.2 Direct Install (if you are familiar with Node.js and building npm packages from source)
As an alternative, you can also directly install Node.js and the app and run it natively. 
### 1.2.0 [Install Node.js](https://nodejs.org/en/download/)
Download and extract
```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Full node install on raspberry pi description: https://www.w3schools.com/nodejs/nodejs_raspberrypi.asp
 
### 1.2.1 Install PiGallery2
#### 1.2.1-a Install from release

```bash
cd ~
wget https://github.com/bpatrik/pigallery2/releases/download/1.8.0/pigallery2.zip
unzip pigallery2.zip -d pigallery2
cd pigallery2
npm install
```
#### 1.2.1-b Install from source

**Note:** A build requires a machine with around 2GB or memory.


```bash
cd ~
wget https://github.com/bpatrik/pigallery2/archive/master.zip
unzip master.zip
cd pigallery2-master # enter the unzipped directory
npm install
npm run build
```

**Note**: It is recommended to create a release version with `npm run create-release` on a more powerful machine and deploy that to you server.

**Note**: you can use `npm run create-release -- --languages=fr,ro` to restrict building to the listed languages (English is added by default)

#### 1.2.2 Run PiGallery2
```bash
npm start
```
To configure it, run `PiGallery2` first to create `config.json` file, then edit it and restart.
The app has a nice UI for settings, you may use that too. 

Default user: `admin` pass: `admin`. (It is not possible to change the admin password, you need to create an other user and delete the default `admin` user, see  #220)

**Note**: First run, you might have file access issues and port 80 issue, see [#115](https://github.com/bpatrik/pigallery2/issues/115).
Running `npm start -- --Server-port=8080` will start the app on port 8080 that does not require `root`
Adding read/write permissions to all files can solve the file access issue `chmod -R o-w .`, see [#98](https://github.com/bpatrik/pigallery2/issues/98).

##### 1.2.2.1 Run on startup
You can run the app up as a service to run it on startup. Read more at [#42](https://github.com/bpatrik/pigallery2/issues/42#issuecomment-458340945)

### 1.3 Advanced configuration
You can set up the app the following ways:
 * Using the UI
 * Manually editing the `config.json`
 * Through switches
   * Like: `node start -- --Server-port=3000 --Client-authenticationRequired=false`
   * You can check the generated `config.json` for the config hierarchy
 * Through environmental variable
   * like set env. variable `Server-port` to `3000`   

Full list of configuration options are available at the [MANPAGE.md](MANPAGE.md).

### 1.4 Useful links/tips:

#### using nginx
It is recommended to use a reverse proxy like nginx before node
https://stackoverflow.com/questions/5009324/node-js-nginx-what-now

#### making https
With cerbot & nginx it is simple to set up secure connection. You have no excuse not doing so.
https://certbot.eff.org/

#### node install error:
If you get error during module installation, make sure you have everything to build node modules from source
```bash
apt-get install build-essential  libkrb5-dev gcc g++
```


## 2. Translate the page to your own language
1. [Install Pigallery2](#121-b-install-from-source) from source (with the release it won't work) 
2. add your language e.g: fr
   * copy `src/frontend/translate/messages.en.xls` to `src/frontend/translate/messages.fr.xls`
   * add the new translation to the `angular.json` `projects->pigallery2->i18n->locales` section 
3. translate the file by updating the `<target>` tags
4. test if it works:
   build and start the app
   ```bash
   npm install
   npm run build
   npm start
   ```
5. (optional) create a pull request at github to add your translation to the project.

**Note**: you can also build your own release with as described in [1.1.1-b Install from source](#121-b-install-from-source);



## 3. Feature list

 * supported formats [full list here](https://github.com/bpatrik/pigallery2/blob/master/src/common/SupportedFormats.ts):
   * images: **jpg, jpeg, jpe, webp, png, gif, svg**
   * videos: **mp4, ogg, ogv, webm**
     * with (built-in) transcoding: avi, mkv, mov, wmv, flv, mts, m2ts, mpg, 3gp, m4v, mpeg, vob, divx, xvid, ts
 * **Rendering directories as it is**
   * Listing subdirectories recursively
   * Listing photos in a nice grid layout
     * showing **tag/keywords, locations, GPS coordinates** for photos
     * rendering photos on demand (on scroll)
 * **On the fly thumbnail generation** in several sizes
   * prioritizes thumbnail generation (generating thumbnail first for the visible photos)
   * saving generated thumbnails to TEMP folder for reuse
   * supporting multi-core CPUs
   * supporting hardware acceleration ([sharp](https://github.com/lovell/sharp))
 * Custom lightbox for full screen photo and video viewing
   * keyboard support for navigation  
   * showing low-res thumbnail while full image loads
   * Information panel for showing **Exif info**  
   * Automatic playing
   * gesture support (swipe left, right, up)
   * shortcut support
 * On the fly photo downscaling for faster load [#50](https://github.com/bpatrik/pigallery2/issues/50)
   * on zoom, the original photo loads
 * Client side caching (directories and search results)
 * Rendering **photos** with GPS coordinates **on open street maps**
   * .gpx file support: rendering paths to map
   * supports [OSM](https://www.openstreetmap.org) and [Mapbox](https://www.mapbox.com) by default, but you can add any provider that has a tile url
 * **Two modes: SQL database and no-database mode**
   * both modes supports
     * user management
     * password protection can be disabled/enabled
   * database mode supports:
     * faster directory listing
     * searching
       * instant search, auto complete
     * sharing 
       * setting link expiration time
 * Faces (persons) support
    * reads Adobe's XMP Face region metadata. (It is defined by the Metadata Working Group (MWG).)
    * shows face bounding box over images
 * internalization / translation support
   * currently supported languages: eng, hun, ro, ru, fr
 * Nice design 
    * responsive design (phone, tablet desktop support)
 * Setup page
 * Random photo url
   * You can generate an url that returns a random photo from your gallery. You can use this feature to develop 3rd party applications, like: changing desktop background
 * duplicate photo detection  
 * video support
   * fully supports `*.mp4` files and partially (might have errors with safari and IE) supports `*.ogg`, `*.ogv`, `*.webm` files
   * uses ffmpeg and ffprobe to generate video thumbnails
   * can transcode videos to mp4 for better support
 * job scheduling support, with the following supported task: [#92](https://github.com/bpatrik/pigallery2/issues/92)
   * converting/transcoding videos [#66](https://github.com/bpatrik/pigallery2/issues/66) [#71](https://github.com/bpatrik/pigallery2/issues/71)
   * generating thumbnails
   * generating converted photos
   * cleaning up temp folder
   * indexing db
 * folder ignoring [#87](https://github.com/bpatrik/pigallery2/issues/87)
 * `.pg2conf` UI modifying files. [#177](https://github.com/bpatrik/pigallery2/issues/177).
    * List of these files are passed down to the UI modify its behaviour.
    * Currently, supported custom, per folder sorting.
 * Dockerized 
 * **Markdown based blogging support** - `future plan`
   * you can write some note in the blog.md for every directory
 * bug free :) - `In progress`
 
 
## 4. Suggest/endorse new features
  You are welcome to suggest new features to the application via [github issues](https://github.com/bpatrik/pigallery2/issues).  
  Unfortunatly, lately I only have a limited time for this hobby project of mine. 
  So, I mostly focuse on those features that are align with my needs. Sorry :(.
  Although, I try to fixs bugs ASAP (that can still take from a few days to months).
  I also try to implement some of the feature requests that have a lots of 'likes' (i.e.: `+1`-s or thumbs ups) on it.
  If you have a feature that you really would like to happen, I welcome contributions to the app. See [CONTRIBUTING.md](https://github.com/bpatrik/pigallery2/blob/master/CONTRIBUTING.md) for more details.

## 5. Recovering admin access

In case you lose your admin password, the only way to recover access is modifying the sqlite database. Follow these instructions to do so.

pigallery2 uses [version `$2b$`](https://en.wikipedia.org/wiki/Bcrypt#Versioning_history) of the [bcrypt hash function](https://en.wikipedia.org/wiki/Bcrypt) with difficulty 9 using the [npm library](https://www.npmjs.com/package/bcrypt), implemented in [`PasswordHelper.ts`](https://github.com/bpatrik/pigallery2/blob/24942b2ee1a2de01048c1aa053d7b68a28b73d37/src/backend/model/PasswordHelper.ts).

First compute your password's bcrypt hash (source [here](https://unix.stackexchange.com/questions/307994/compute-bcrypt-hash-from-command-line) and [here](https://www.ask-sheldon.com/create-a-bcrypt-hash-on-commandline/)):

	htpasswd -bnBC 9 "" helloworld
  
which generates something like:

  :$2y$09$SF8FOnMkfM8nnynMzrhT8OEYXRCPOCvQo43mzcGimyhrO0eWhAWcG

Open the sqlite database as root:

	sudo sqlite3 db-data/sqlite.db

Update password of specific user in the `user_entity` table using the hash made previously. Remove the ':' at the start, and be sure to set the first 4 characters to '$2b$':

	UPDATE user_entity
	SET password = '$2b$09$SF8FOnMkfM8nnynMzrhT8OEYXRCPOCvQo43mzcGimyhrO0eWhAWcG'
	WHERE name = '<username>';

## 6. Known errors
* IOS map issue
  * Map on IOS prevents using the buttons in the image preview navigation, see #155
* Video support on weak servers (like raspberry pi) with low upload rate
  * video playback may use up too much resources and the server might not response for a while. Enable video transcoding in the app, to transcode the videos to lover bitrate. 
  
## 7. Credits
Crossbrowser testing sponsored by [Browser Stack](https://www.browserstack.com)
[<img src="https://camo.githubusercontent.com/a7b268f2785656ab3ca7b1cbb1633ee5affceb8f/68747470733a2f2f64677a6f7139623561736a67312e636c6f756466726f6e742e6e65742f70726f64756374696f6e2f696d616765732f6c61796f75742f6c6f676f2d6865616465722e706e67" alt="Browser Stack" height="31px" style="background: cornflowerblue;">](https://www.browserstack.com)

