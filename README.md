# Art by Juanyse
 
A one-page website for **Art by Juanyse**, a Pretoria-based artist who creates custom drawings and paintings, murals, and Paint & Sip events.
 
Visitors can browse her portfolio, pick the service they want, fill in a short enquiry form, and send it straight to her WhatsApp.
 
Built with plain HTML, CSS and JavaScript. There is no framework and no build step.
 
## Features
 
- **Three enquiry forms:** Commission, Mural and Paint & Sip. Each form asks for the details that service needs, such as size, surface, wall dimensions, number of guests and venue.
- **WhatsApp enquiries:** submitting a form opens WhatsApp with the answers already written into the message.
- **Portfolio gallery:** artworks shown at their natural shape, with tap-to-zoom and a size caption under each piece.
- **Contact buttons:** round WhatsApp and Instagram icon buttons.
- **Light and dark mode:** follows the visitor's device setting.
- **Mobile friendly:** designed for phones first, and works on tablets and computers.
- **Accessible:** alt text on images, keyboard-friendly controls, and reduced motion respected.
- **Custom branding:** butterfly icon, rust, blue and sage colour palette, and a round cover photo.
## Project structure
 
```
art-by-juanyse/
├── index.html      Page structure and content
├── styles.css      All styling, colours and layout
├── script.js       Enquiry forms, WhatsApp message and gallery
├── images/
│   ├── juanyse.jpg           Cover photo (square, round crop)
│   └── 01-… to 11-….jpg      Portfolio artworks
└── README.md
```
 
## Getting started
 
No install is needed.
 
1. Download or clone the repository.
2. Open `index.html` in a browser.
To run it from a local server instead:
 
```bash
python -m http.server 8000
```
 
Then open `http://localhost:8000`.
 
## Customising
 
### Change the WhatsApp number
 
At the top of `script.js`:
 
```javascript
const WA='27793340711';
```
 
Use the international format without `+` or spaces. The WhatsApp button in the contact section of `index.html` has the number in its link too, so change it there as well.
 
### Change the Instagram link
 
In the contact section of `index.html`, update the link and the text line below the icons.
 
### Add or edit artworks
 
1. Put the image in `images/`.
2. Add an entry to the `IM` list in `script.js`:
```javascript
{"src": "images/12-new-piece.jpg", "alt": "Short description of the artwork", "w": 900, "h": 1200, "size": "A3, acrylic on canvas"},
```
 
| Field | Meaning |
|-------|---------|
| `src` | Path to the image file |
| `alt` | Description for screen readers |
| `w`, `h` | Image size in pixels (not the real artwork size) |
| `size` | The real artwork size and medium, shown as the caption. If left empty, the caption says "Size to be added" |
 
Tip: resize images to about 900 px on the longest side so the page loads quickly on phones.
 
### Change the cover photo
 
Replace `images/juanyse.jpg` with a new square photo, at least 600 × 600 px, with the face and shoulders in the middle of the image.
 
### Change prices and form questions
 
Prices, notes and form fields for each service are in the `T` object at the top of `script.js`.
 
### Change the colours
 
The colour variables are on the first lines of `styles.css`:
 
| Variable | Used for |
|----------|----------|
| `--bg` | Page background |
| `--ink` | Main text |
| `--a` | Rust accent (buttons, prices, name) |
| `--t`, `--td`, `--tint` | Blue accent, darker blue for small text, soft blue wash |
 
The dark-mode colours are in the `prefers-color-scheme: dark` block just below.
 
## Deployment
 
### GitHub Pages
 
1. Push the files to a GitHub repository, with `index.html` in the root.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. The site goes live at `https://<your-username>.github.io/<repo-name>/`.
### Netlify or any static host
 
Drag the project folder onto [Netlify Drop](https://app.netlify.com/drop), or upload the files to any static host. Keep `index.html` and the `images/` folder together.
 
### Custom domain
 
The site is intended for **artbyjuanyse.co.za**. Point the domain's DNS to the host you choose by following its custom domain instructions.
 
## Notes
 
- The enquiry forms use a WhatsApp link, so there is no server or database. Reference photos can't be attached through that link, so the forms ask clients to send them in the chat afterwards.
- Fonts (Fraunces and DM Sans) load from Google Fonts. If they can't load, the page falls back to Georgia and the system font.
- Her email address is not on the site yet. The contact section says "coming soon".
## Credits
 
- Design and development: Armand Schutte Rieck
- Artwork, photos and branding: Juanyse
## License
 
This project was built for a client. The artwork, photos and branding belong to Juanyse and may not be used without her permission. All rights reserved.
