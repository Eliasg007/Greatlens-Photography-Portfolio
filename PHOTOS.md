# Adding Photos to GREATLENS

To add new photos to the site, follow these steps:

1. **Upload the image:**
   Drop your new image file into the `public/photos/` directory. (Ensure the filename is URL-safe—no spaces or parentheses).

2. **Update the registry:**
   Open `src/data/photos.js`. This file contains the registry of all photo slots for the site.

3. **Find the slot:**
   Locate the record you want to update (e.g., in `workPhotos`, `storyPhotos`, or `journalPhotos`).

4. **Update the record:**
   - Change the `src` property to point to your new file (e.g., `"/photos/new-photo-name.jpg"`).
   - Update the `alt` property with a descriptive caption.
   - Remove the `pending: true` property from that record.

Your photo will immediately appear on the site in that slot!
