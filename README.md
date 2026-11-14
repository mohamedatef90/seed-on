# Seed On

A static, Arabic-language marketing website for a digital-marketing company, built as a four-page site with Bootstrap. It uses placeholder company text ("Your Company" in the page titles) and has no build step or backend.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: hero, client and results sections, work showcase, services, and a contact section |
| `services.html` | Services (خدماتنا) |
| `portfolio.html` | Portfolio (مشاريعنا) |
| `contact.html` | Contact (تواصل معنا) |

## Features

- Right-to-left Arabic layout (`lang="ar"`) using Bootstrap 5.3.2 and Bootstrap Icons from CDNs, the Tajawal font from Google Fonts, and a local custom font (`fonts/Arshid.otf`).
- A navbar with a scroll effect, active-link highlighting, and smooth scrolling (`script.js`, `style.css`).
- A show-more toggle for the services list, and modals for service and project details.
- Contact forms with client-side validation (required fields, email, and phone number). A valid submission only shows a success message and resets the form: nothing is sent to a server.

## Running

Open `index.html` in a browser, or serve the folder with any static server, for example:

```bash
python3 -m http.server 8000
```

Bootstrap, Bootstrap Icons, and Google Fonts load from CDNs, so an internet connection is needed for full styling.

## Project structure

```
index.html, services.html, portfolio.html, contact.html
script.js     Interactions and form validation
style.css     Custom styles
fonts/        Custom font
assets/       Images, logos, and brand assets
brief/        Two reference images
```
