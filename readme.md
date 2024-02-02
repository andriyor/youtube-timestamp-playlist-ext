# youtube-playlist

YouTube playlist by time interval

## Related project

[cytsunny/youtube-playlist](https://github.com/cytsunny/youtube-playlist?tab=readme-ov-file)

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
- [ ] store thumbnail URL
- [ ] support dark mode
- [ ] handle youtube adds
- [ ] edit time manually
- [ ] validate file input
- [ ] fin appropriate icon

### Tech debt

- [x] try [zustand](https://github.com/pmndrs/zustand)
- [ ] try [parcel](https://parceljs.org/recipes/web-extension/)
- [x] strict eslint rules
- [ ] lint file names convention
- [ ] unit tests
- [ ] github action with release

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
