
**Instructions**
 1. Put music in the `music` folder (you probably have to create the
   music folder
	- The music MUST have metadata associated with it
 2.  Run `formatMusic.py`
	- The required libraries can be installed with `pip install mutagen colorthief`
	- You need to run this every time you add more music to the music folder
	- Depending on how many music files you have, this could take a while
 3. Open `index.html` in a browser



**Advanced Instructions**\
The only benefit to this is that the album cover shows up in the media controls
1. Complete steps 1 and 2 above
2. Create an HTTP server
    - This can be done with `python -m http.server 8000`
3. Open the location of the server in the browser
	- If you used the example above, go to `localhost:8000` in a browser
