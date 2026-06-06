# Mike's Services LLC - Image Management Guide

## How Images Work

The website loads images from a configuration file (`assets.json`) instead of hardcoding them in HTML. This means you can add/update images without touching the website code.

---

## Where to Add Image URLs

Edit the **`assets.json`** file in the root folder. Each image has a specific location:

### 1. **Logo** (Header - Optional)
Location in `assets.json`:
```json
{
  "logo": "https://your-image-url-here.webp"
}
```
- **Where it appears**: Top-left of header, next to "Mike's Services LLC"
- **Size**: ~50px height (auto width)
- **Format**: .webp, .png, or .jpg
- **Example**: Your red/white/blue equipment logo

---

### 2. **Hero Image** (Main banner under header)
Location in `assets.json`:
```json
{
  "hero": "https://your-image-url-here.webp"
}
```
- **Where it appears**: Right side of hero section with headline
- **Size**: 1200x800 pixels recommended
- **Format**: .webp (best), or .jpg
- **This image**: Excavation/site work showing your equipment in action

---

### 3. **Service Card Images** (4 images - Septic, Excavation, Land Clearing, Demolition)
Location in `assets.json`:
```json
{
  "services": {
    "septic": "https://septic-install-image-url.webp",
    "excavation": "https://excavation-work-image-url.webp",
    "landClearing": "https://land-clearing-image-url.webp",
    "demolition": "https://demolition-removal-image-url.webp"
  }
}
```
- **Where they appear**: 2x2 grid below "Our Services" heading
- **Size**: 640x420 pixels each (landscape photos)
- **Format**: .webp or .jpg
- **What to show**: Before/after or completed work for each service type

---

### 4. **Featured Images** (3 images - Featured section + Septic hero)
Location in `assets.json`:
```json
{
  "featured": {
    "featuredImage2": "https://featured-work-image-url.webp",
    "septicHero": "https://septic-installation-hero-image-url.webp",
    "featuredImage1": "https://another-featured-image-url.webp"
  }
}
```
- **Where they appear**: 
  - `featuredImage2`: Full-width image in "Dependable Site Work" section
  - `septicHero`: Featured service section below
  - `featuredImage1`: (currently not used but available)
- **Size**: 1600x900 or 900x600 pixels
- **Format**: .webp or .jpg
- **What to show**: Best portfolio work or detailed septic installation processes

---

## Complete Example: assets.json

```json
{
  "logo": "https://example-cdn.com/mikes-logo.webp",
  "hero": "https://example-cdn.com/excavation-hero.webp",
  "services": {
    "septic": "https://example-cdn.com/septic-install-work.webp",
    "excavation": "https://example-cdn.com/excavation-site-prep.webp",
    "landClearing": "https://example-cdn.com/land-clearing-job.webp",
    "demolition": "https://example-cdn.com/demolition-removal.webp"
  },
  "featured": {
    "featuredImage1": "https://example-cdn.com/featured-site-work.webp",
    "septicHero": "https://example-cdn.com/septic-hero-install.webp",
    "featuredImage2": "https://example-cdn.com/featured-excavation.webp"
  }
}
```

---

## How to Get Image URLs

### Option 1: **Image Hosting Service** (Recommended)
1. Upload your images to a free service like:
   - **Cloudinary** (cloudinary.com) - Free tier, great CDN
   - **Imgur** (imgur.com) - Fast, simple
   - **Google Photos** (photos.google.com) - Shared album with public link
   - **AWS S3** (if you have an account)

2. Copy the public URL
3. Paste into `assets.json`

### Option 2: **GitHub Issues (Quick & Free)**
1. Go to your repo: https://github.com/BbotAI/mikes-services-llc
2. Click **Issues** → **New Issue**
3. Drag & drop your image into the text box (doesn't need to be a real issue)
4. Copy the URL it generates
5. Don't submit; just copy the URL and close
6. Paste into `assets.json`

### Option 3: **Upload to /images folder directly** (if you want local files)
1. Upload .webp or .jpg files to `/images` folder in the repo
2. Use local paths in `assets.json`:
   ```json
   {
     "logo": "./images/logo.webp",
     "hero": "./images/hero.webp"
   }
   ```

---

## Steps to Update Images

1. **Get your 8 image URLs** (logo + 7 service/featured images)
2. **Edit `assets.json`** with those URLs
3. **Commit & push** to GitHub:
   ```bash
   git add assets.json
   git commit -m "Update image URLs"
   git push
   ```
4. **Wait 30 seconds** for GitHub Pages to refresh
5. **Visit the site** – images will appear automatically

---

## Image Summary - What Goes Where

| Image Name | Location in Code | Appears On Page | Size | What to Show |
|---|---|---|---|---|
| **logo** | `assets.json` → `logo` | Header left | ~50px | Company logo/wordmark |
| **hero** | `assets.json` → `hero` | Hero section right | 1200x800 | Excavation/equipment in action |
| **septic** | `assets.json` → `services.septic` | Service grid top-left | 640x420 | Septic installation work |
| **excavation** | `assets.json` → `services.excavation` | Service grid top-right | 640x420 | Excavation/site prep work |
| **landClearing** | `assets.json` → `services.landClearing` | Service grid bottom-left | 640x420 | Land clearing/removal work |
| **demolition** | `assets.json` → `services.demolition` | Service grid bottom-right | 640x420 | Demolition/removal work |
| **septicHero** | `assets.json` → `featured.septicHero` | Featured service section | 900x600 | Detailed septic installation |
| **featuredImage2** | `assets.json` → `featured.featuredImage2` | Featured work section | 1600x900 | Best portfolio work |

---

## Troubleshooting

**Images not showing?**
- Check the URL is correct (copy/paste the link into browser to verify)
- Wait 30 seconds for GitHub Pages cache to refresh
- Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

**Want to use local images?**
- Upload to `/images` folder
- Use `./images/filename.webp` in `assets.json`

**Need to remove an image?**
- Set the URL to empty string: `"logo": ""` or just delete the line
- Site will fall back to text-only for that section

---

## Ready?

1. Prepare your 8 images (or URLs)
2. Edit `assets.json` 
3. Push to GitHub
4. Done! 🎉
