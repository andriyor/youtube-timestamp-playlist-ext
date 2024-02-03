# youtube-playlist

YouTube playlist by time interval (works only with YouTube Premium)

## Screenshots

### Playlists

<img width="1329" alt="image" src="https://github.com/andriyor/youtube-timestamp-playlist-ext/assets/11459840/f6104707-db6a-40f3-b863-ff164ff9ada3">

### Sections

<img width="1312" alt="image" src="https://github.com/andriyor/youtube-timestamp-playlist-ext/assets/11459840/245aa52a-5844-4795-a5f2-cb205af78f49">

### Popup

<img width="319" alt="image" src="https://github.com/andriyor/youtube-timestamp-playlist-ext/assets/11459840/0ea155dd-f1a0-4acd-b213-0b43d82a4bca">

## Related project

[cytsunny/youtube-playlist](https://github.com/cytsunny/youtube-playlist/)

## TODO

### Features

- [x] POC
- [x] basic UI
- [x] set section time from video position
- [x] delete playlist
- [x] edit playlist name
- [x] change order of sections
- [x] delete section
- [x] edit section time
- [x] add validation of time (end time should be after start time)
- [x] import/export playlist
- [x] play selected section
- [x] support dark mode
- [x] show thumbnails
- [ ] add scroll
- [ ] handle youtube adds
- [ ] edit time manually
- [ ] validate file input

### Tech debt

- [x] try [zustand](https://github.com/pmndrs/zustand)
- [x] strict eslint rules
- [x] github action with release
- [ ] try [parcel](https://parceljs.org/recipes/web-extension/)
- [ ] lint file names convention
- [ ] unit tests

## Develop

```shell
pnpm install
pnpm run build
# to run in Firefox
cd dist
web-ext run
```

## Publish to Firefox

create `.env` file

```
WEB_EXT_API_KEY="*****"
WEB_EXT_API_SECRET="*****"
```

[Obtain your personal access credentials here.](https://addons.mozilla.org/en-US/developers/addon/api/key/)

```shell
pnpm run publish
```

## Create releae on GitHub

```shell
git tag -a v1.0.4 -m "my version 1.0.4"
git push origin master --tags
```
