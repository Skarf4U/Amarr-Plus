# ![Ripper Stream](https://assets.lol/media/streaming-screenshot-1-2023-03-17.png)

## 🔗 Links
- **[Demo](https://riptv.net)**
- **[Discord](https://ripper.lol/discord.html)**
- **[ripper.lol](https://ripper.lol)**

## 🖥️ Requirements
- Static Web Hosting - **[ObiNode](https://l.obinode.com/lhDqRb)**

## 📂 Download

1. Install Git on your system if you haven't already.
2. Run `git clone https://git.ripper.lol/ripper/Stream.git`

## 🔧 Setup
1. Install Node.js if you haven't already from [nodejs.org](https://nodejs.org)
2. Download the script using instructions above.
3. Open a terminal in the script directory.
4. Run `npm install` to install dependencies, then `npm run dev` to start the dev server.
5. Open `http://localhost:5173` in your browser.
6. **(Optional)** Change the site logo by uploading a png file to `/public/assets` and naming it `logo.png`
7. **(Optional)** Change the main color of the site by opening `/src/styles/main.scss` and editing the line with `$primary-color: ...;`
8. **(Optional)** Change the config in `/src/config.ts` and change the site name in `/index.html`
9. **(Optional)** Add any advertisement codes in `/index.html` (Adsterra, Clickadu, etc.)
10. Run `npm run build` in the terminal to build the production files
11. Upload the contents of the `/dist` folder to production

## ☁️ ObiNode
#### How to host on ObiNode for FREE!
1. Go to **[ObiNode](https://l.obinode.com/cNi7ms)** and create an account
2. Create a new site in the dashboard
3. Click on the site and go to the **"Deploy"** tab
4. Click the upload zone and upload the `/dist` folder

# ![ObiNode](https://api.rypr.io/files/view/311303b6-8d68-4fed-8572-06810d7d2d9d/firefox_BirEYoDRdu.png)