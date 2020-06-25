# TrackAndTraceLuxMonitor
Periodically update information from www.trackandtrace.lu/ from CLI! And by using with `watch` you will immedicately see if there is any update!

If you have `watch` installed, you can just call the `track.sh` command like this:
```
$ chmod +x track.sh
$ ./track.sh <your package number>
```

And you will get whole information, that will update every 20 seconds.
If you want to get lower level control, then you can easily call the track.js like this:
```
$ node track.js <your package number>
```
With this it will load the available data once.

### TODO List:
- [ ] track multiple items at once
- [ ] better output - maybe with tables
- [ ] better handling of the messages
