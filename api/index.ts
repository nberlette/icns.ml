// TODO: #5 Switch to Next.js or SvelteKit as the frontend has outgrown this format.
import type { Response, Request } from './utils';
import icons, { SimpleIcon } from 'simple-icons';
import { marked } from 'marked';
import { tc } from './utils'
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_TWITTER,
  SITE_AUTHOR_URL,
  SITE_AUTHOR_NAME,
  GITHUB_URL,
  LICENSE_URL,
  VERCEL_URL,
  DISPLAY_ICONS_COUNT,
  markedOptions,
  MarkedOptions
} from './constants';


// I know, it's disgusting... but it works for the time being :)
try {
  delete icons.Get;
} catch {}

const randomIcons: any[] = Object
  .values(icons)
  .sort((a, b) => Math.random() > 0.5 ? -1 : 1)
  .slice(0, DISPLAY_ICONS_COUNT);

let homepage_head = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>${SITE_TITLE}</title>
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0" />
    <meta charSet="utf-8" />

    <meta name="title" content="${SITE_TITLE}" />
    <meta name="description" content="${SITE_DESCRIPTION}" />
    <meta name="keywords" content="${SITE_KEYWORDS}" />

    <meta name="twitter:site" content="${SITE_TWITTER}" />
    <meta name="twitter:user_id" content="${SITE_TWITTER}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${SITE_URL}/og.png" />
    <meta name="twitter:image:src" content="${SITE_URL}/og.png" />
    <meta name="twitter:title" content="${SITE_NAME}" />
    <meta name="twitter:description" content="${SITE_TAGLINE}" />
    <meta name="twitter:url" content="${SITE_URL}/?utm_source=twitter" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="${SITE_NAME}" />
    <meta property="og:description" content="${SITE_TAGLINE}" />
    <meta property="og:image" content="${SITE_URL}/og.png" />
    <meta property="og:url" content="${SITE_URL}/?utm_source=opengraph" />

    <meta name="author" content="${SITE_AUTHOR_NAME}" />
    <meta name="canonical" property="canonical" content="${SITE_URL}/" />
    <link rel="canonical" href="${SITE_URL}/" type="canonical" />

    <link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png" purpose="any" sizes="180x180" />
    <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" purpose="maskable any" />
    <link rel="icon" href="/mstile-144x144.png" type="image/png" sizes="144x144" purpose="any" />
    <link rel="safari-pinned-tab" href="/safari-pinned-tab.svg" type="image/svg+xml" color="#223344" purpose="maskable safari-pinned-tab any" />
    <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
    <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />

    <link rel="stylesheet" href="https://unpkg.com/@geist-ui/style/dist/style.css" type="text/css" />
    <link rel="preload" href="/assets/fonts.css" as="font" />

    <style type="text/css">
            html,
      body {
        background: transparent;
        margin: 0;
        padding: 0;
      }
      
      html {
        box-shadow: inset 0 0 14vw 8vw var(--icns-background, #f0f0f0);
        background: var(--icns-background-hero, #e7f0f0) var(--icns-background-image);
        margin: 0;
        padding: 0;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        min-width: 100vw;
        min-height: 100vh;
      }

      .light, :root {
        --icns-background: #fff;
        --icns-foreground: #234;
        --icns-background-hero: #e7f0f0;
        --icns-foreground-hero: #59657c;
        --icns-background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2359657c' fill-opacity='0.33'%3E%3Cpath opacity='0.45' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        --icns-logo-shadow-hover: 0 0.3rem 0.1rem;
        --icns-logo-shadow: 0.3rem 2rem 1.2rem;
        --icns-logo-shadow-color: #11223322;
        --icns-logo-shadow-hover-color: #11223322;
        --icons-width: 5vw;
        --icons-opacity: 0.75;
        --icons-hover-opacity: 0.9;
        --icons-transition-duration: 0.75s;
        --icns-github-corner-fill: #234 !important;
        --icns-github-corner-color: #fff !important;
        --font-mono: 'MonoLisa', 'Operator Mono Lig', 'Operator Mono', Menlo, Monaco, Lucida Console, 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier New,monospace;
      }
      .dark, .dark-theme {
          --icns-background: #234;
          --icns-foreground: #f0f0f0;
          --icns-background-hero: #59657c;
          --icns-foreground-hero: #e7f0f0;
          --icns-background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23e7f0f0' fill-opacity='0.33'%3E%3Cpath opacity='0.45' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") !important;
          --icns-github-corner-fill: #e7f0f0 !important;
          --icns-github-corner-color: #223344 !important;
        }

      code::before, code::after {
        content: '' !important;
      }

      pre, code, kbd {
        font-family: 'MonoLisa', 'monolisa', 'Mono Lisa', var(--font-mono, monospace) !important;
        font-weight: normal;
        font-style: regular;
      }

      .markdown-body {
        max-width: 90vw;
        margin: 1rem auto;
        background: transparent !important;
      }

      body { 
        max-width: 70vw; margin: 2rem auto; 
        background: transparent !important;
      }

      body > div {
        margin: 1rem 0;
      }

      header {
        width: 100%;
        margin: 4rem 0 2rem 0;
        position: relative;
        display: grid;
        place-items: center;
        align-items: center;
      }

      header h1 {
        width: fit-content;
        margin: 2rem auto 1rem auto;
      }

      header h3 {
        font-size: 1rem !important;
        text-shadow: var(--shadow-small);
        color: var(--accents-8) !important;
        transition: text-shadow 0.4s ease-in-out;
        text-transform: lowercase !important;
        margin: 0;
        padding: 0;
      }

      header h3 a {
        color: inherit !important;
      }

      small.caps {
        text-transform: uppercase !important;
        font-weight: 700 !important;
        font-size: 0.95em;
      }

      header h3:hover {
        text-shadow: var(--shadow-medium);
      }

        header h3 img {
          width: 1.2rem;
          height: 1.2rem;
          padding: 7px 8px 0 8px;
        }

      header svg.logo {
        width: auto;
        min-width: 20vw;
        max-width: 30vw;
        filter: drop-shadow(var(--icns-logo-shadow-hover) var(--icns-logo-shadow-hover-color, #11223322));
        transition: all 1s ease-in-out;
      }

      h1:hover svg.logo,
      h1 svg.logo:hover {
        filter: drop-shadow(var(--icns-logo-shadow) var(--icns-logo-shadow-color, #11223322));
      }

      .zi-card {
         margin: 2rem 0 !important; 
         box-shadow: var(--shadow-large), var(--shadow-small) !important;
         transition: box-shadow 0.5s ease-in-out;
      }
      .zi-card:hover {
        box-shadow: var(--shadow-medium), var(--shadow-small) !important;
      }
      .zi-dark {
        background: var(--accents-8) !important;
        color: var(--accents-1) !important;
        border-color: var(--accents-7) !important;
      }
      .footer.zi-dark, .footer.dark, footer.dark, .dark footer {
        color: var(--accents-1) !important;
      }
      .footer.zi-dark a, .footer.dark a, .dark footer a, footer.dark a {
        color: var(--accents-2) !important;
        text-decoration: none;
        font-weight: bold;
      }
      footer a img {
        opacity: 0.75;
        transition: opacity 0.3s ease-in;
        padding: 5px 8px 0 8px;
      }
      footer a:hover img, footer a img:hover {
        opacity: 1;
      }
      .url {
        border-radius: 8px;
        border: 2px solid var(--accents-2);
        background-color: var(--accents-1);
        font-style: italic;
        color: var(--icns-foreground);
        cursor: pointer;
        padding: 10px;
        transition: all 0.5s ease-in;
        position: relative;
        overflow: hidden;
      }
      .url.success, .success .url {
        border-color: seagreen !important;
      }
      .url > span {
        font-size: 1.1rem;
      }
      .url > span:before {
        background: seagreen;
        content: '✔️ copied';
        color: white !important;
        display: block;
        opacity: 0;
        transition: opacity 0.8s ease-in-out;
        padding: 10px;
        position: absolute;
        right: 0px;
        top: 0px;
        text-shadow: 0 3px 6px #0002, 0 1px 1px #0003;
      }
      .success .url > .span:before, .url.success > span:before {
        opacity: 0.9;
      }
      a.github-corner {
        color: var(--icns-github-corner-color, #fff) !important;
        text-decoration: none !important;
      }
      .github-corner:hover .octo-arm {
        animation:octocat-wave 666ms ease-in-out;
      }
      @keyframes octocat-wave{
        0%,100%{transform:rotate(0)}
        20%,60%{transform:rotate(-20deg)}
        40%,80%{transform:rotate(10deg)}
      }
      @media (max-width:500px) {
        .github-corner:hover .octo-arm{animation:none}
        .github-corner .octo-arm{animation:octocat-wave 666ms ease-in-out}
      }

</style>
<script nonce="icns">
  var $cl = document.documentElement.classList;
  var theme_user = ('theme' in window.localStorage) ? window.localStorage.theme : 'auto';
  var theme_system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  if ((theme_system == 'dark' && theme_user == 'auto') || theme_user == 'dark') {
    $cl.toggle('dark-theme', true);
    $cl.toggle('dark', true);
    $cl.toggle('light', false);
  } else {
    $cl.toggle('dark-theme', false);
    $cl.toggle('dark', false);
    $cl.toggle('light', true);
  }
</script>
</head>
<body>
<a href="${GITHUB_URL}" class="github-corner" aria-label="View Source on GitHub">
  <svg width="80" height="80" viewBox="0 0 250 250" style="fill:var(--icns-github-corner-fill, #223344);color:(--icns-github-corner-color, #fff);position:fixed;top:0;border:0;right:0;" aria-hidden="true">
    <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
    <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
    <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
  </svg>
</a>

<header align=center>
  <h1>
    <a href="/" title="${SITE_TITLE}" aria-label="${SITE_TITLE}">
      <svg xmlns="http://www.w3.org/2000/svg" class="logo" id="logo" width="300" height="66" viewBox="0 0 545 120">
        <style>@media (prefers-color-scheme: dark){svg.logo, svg.logo path{fill:#fff}}@media (prefers-color-scheme: light){svg.logo, svg.logo path{fill:#234}}</style>
        <path fill="#234" d="M34 118H0V0h34Zm116-45q0 8.7-.4 14.8a67.8 67.8 0 0 1-1.3 10.6 28.2 28.2 0 0 1-2.4 7.4 27 27 0 0 1-4 5.4 21.2 21.2 0 0 1-8.2 5.2q-4.6 1.6-13.3 1.6H79.7q-9 0-14.2-1.6a22.2 22.2 0 0 1-9.3-5.7 28.2 28.2 0 0 1-5-6.8 38.5 38.5 0 0 1-3.3-9.8A97 97 0 0 1 46 79.8q-.5-8.4-.5-20.8t.5-20.8a97.2 97.2 0 0 1 2-14.4 38.6 38.6 0 0 1 3.3-9.7 28.2 28.2 0 0 1 5-6.9 20.6 20.6 0 0 1 9.2-5.6A51.5 51.5 0 0 1 79.8 0h40.1q8.8 0 13.7 1.6A21.5 21.5 0 0 1 142 7a20.1 20.1 0 0 1 4 5.5 34.8 34.8 0 0 1 2.4 7.3 62.8 62.8 0 0 1 1.3 10.3q.3 5.9.3 14h-32q-.3-8.6-.6-11.4a6.4 6.4 0 0 0-1.3-3.5 6 6 0 0 0-2.6-1.6 21.6 21.6 0 0 0-5.2-.5H91a34.1 34.1 0 0 0-5.7.4 4.7 4.7 0 0 0-2.8 1.7 6.1 6.1 0 0 0-1 1.9 18 18 0 0 0-1 4.6q-.3 3.2-.4 9T80 59.4v14.8a58.8 58.8 0 0 0 .5 8.6 17.2 17.2 0 0 0 .9 4.4 5.9 5.9 0 0 0 1 1.9 4.5 4.5 0 0 0 2.7 1.5 32.8 32.8 0 0 0 5.6.3h16.7a20.8 20.8 0 0 0 4.9-.4 5.7 5.7 0 0 0 2.6-1.4q1-1 1.4-4.1t.5-12Zm10 45V0h35v16.3q5.8-5.3 9.7-8.6a43.7 43.7 0 0 1 7.3-4.9 22.4 22.4 0 0 1 6.6-2.2A46.5 46.5 0 0 1 226 0h13.7q14.7 0 21.3 6.7a21 21 0 0 1 5.3 9.6q1.6 6 1.6 19V118h-35V40q0-6.8-2.5-9.4a8 8 0 0 0-3.2-1.9 20.8 20.8 0 0 0-6-.6H213a29.6 29.6 0 0 0-8.2 1.1 104 104 0 0 0-9.9 3.6V118Zm223.2-36.3q0 13.5-2.4 20.4t-6 10.7a15.6 15.6 0 0 1-6.8 4 38.6 38.6 0 0 1-10.5 1.2h-50.6a54 54 0 0 1-13-1.3 15.6 15.6 0 0 1-8-4.3 17.6 17.6 0 0 1-3-4 24.5 24.5 0 0 1-2-6 58.6 58.6 0 0 1-1.4-9q-.4-5.4-.6-13.4h30.6a81.4 81.4 0 0 0 .5 8.5 6.6 6.6 0 0 0 1.2 3 2.5 2.5 0 0 0 1.8 1.2 20.4 20.4 0 0 0 4.4.3h26.2a21.5 21.5 0 0 0 4.4-.3 4.2 4.2 0 0 0 2-1 4.6 4.6 0 0 0 1-2.3 37.6 37.6 0 0 0 .3-6 33.5 33.5 0 0 0-.3-5.7 5.1 5.1 0 0 0-3.7-3.7 43.6 43.6 0 0 0-5.6-.9l-38.1-4.4a46.4 46.4 0 0 1-10.7-2.4 18.3 18.3 0 0 1-6.4-4 17.8 17.8 0 0 1-3-3.8 17.2 17.2 0 0 1-1.7-5 58.3 58.3 0 0 1-1-7.5q-.3-4.3-.3-10.5 0-12.6 2.3-19.6t6-10.6a16.7 16.7 0 0 1 6.7-4A35.2 35.2 0 0 1 306.2 0h47.6A49.9 49.9 0 0 1 367 1.3a17.1 17.1 0 0 1 7.5 4 17.9 17.9 0 0 1 3 4 22 22 0 0 1 2 6.1 76.7 76.7 0 0 1 1.3 8.9q.5 5.2.7 12.7h-30.6q-.5-6-.8-7.7a8.5 8.5 0 0 0-1-2.7 3.4 3.4 0 0 0-2-1.3 20.2 20.2 0 0 0-4.3-.3h-23a27.3 27.3 0 0 0-4.2.2 3.8 3.8 0 0 0-2 1 4.5 4.5 0 0 0-1.2 2.3 27.8 27.8 0 0 0-.4 5.3 31.6 31.6 0 0 0 .4 5.4 5 5 0 0 0 1.3 2.7 11 11 0 0 0 2.5 1 33.4 33.4 0 0 0 5.2 1l39.6 4.4a44.9 44.9 0 0 1 10.6 2.4 18 18 0 0 1 6 3.8q3.3 3.2 4.5 9.4a101.6 101.6 0 0 1 1.2 17.8Zm18.7 22.8V118h-12.3v-13.5Zm82.5 13.5h-6.7V50.7h-1.2l-22.8 64.8a5.3 5.3 0 0 1-1.2 2 3.3 3.3 0 0 1-2 .5h-3.6a3.6 3.6 0 0 1-2.1-.5 4.3 4.3 0 0 1-1.2-2L421 50.3h-1.2V118h-6.4V44.5h9.7a3.7 3.7 0 0 1 2.3.5 4.7 4.7 0 0 1 1.1 2l22 63.2h1l22-63.2a5 5 0 0 1 1-2 3.5 3.5 0 0 1 2.3-.5h9.7Zm21.8-5.6h38.2v5.6h-44.7V44.5h6.5Z"/>
      </svg>
    </a>
  </h1>
  <h3>
    <span><a href="https://simpleicons.org" target="_blank" rel="noopener noreferrer">2.1k SVG icons</a></span> &middot; 
    <span>dynamic colors API</span> &middot; 
    <span><a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel's Edge Network</a></span>
  </h3>
</header>
`;

let homepage = `
<br>
<div class="zi-card shadow">
<pre class="zi-dark">
${SITE_URL} / <strong>slug*</strong> <em>— color</em> . <em><strong>type</strong></em>†
</pre>
<pre class="zi-dark">
${SITE_URL} / <em>color</em> / <strong>slug*</strong> . <em><strong>type</strong></em>†
</pre>

|         **Parameter** | **Usage**    | **Syntax**                                                                                                   | **Examples**                       |
|----------------------:|:-------------|:-------------------------------------------------------------------------------------------------------------|:-----------------------------------|
| <kbd>\`slug\`\*</kbd> | **required** | Alphanumeric - [see: naming convention ↗](https://github.com/simple-icons/simple-icons/blog/develop/slugs.md) | \`css3\`, \`nextdotjs\`, \`500px\` |
|  <kbd>\`color\`</kbd> | **optional** | Valid CSS colors: hex (3/4/6/8), name, rgb, hsl, ...                                                         | \`fff\`, \`black\`, \`rgb(0,0,0)\` |
| <kbd>\`type\`\†</kbd> | **advised**  | **\`.svg\`** (**\`.png\`** support coming soon)                                                       | \`.svg\`, \`.png\`                 |

<br>

> **Examples**: [**\`${SITE_URL}/vercel.svg\`**](./vercel.svg) , [**\`${SITE_URL}/fc0/github.svg\`**](./fc0/github.svg) , [**\`${SITE_URL}/bmw-black.svg\`**](./bmw-black.svg)  

</div>
<div class="zi-card">
<table width="100%" cellpadding="2" cellspacing="2" class="zi-table">
{{icons}}
</table>
</div>
`;

let homepage_foot = `<footer align="center" class="zi-card zi-dark dark footer">
  <a href="${LICENSE_URL}" target="_blank" rel="noopener noreferrer" title="MIT License" aria-label="MIT License">MIT</a> <small>&copy;</small>
  <a href="${SITE_AUTHOR_URL}" target="_blank" rel="noopener" title="Another Pandemic Project by ${SITE_AUTHOR_NAME}" aria-label="Another Pandemic Project">${SITE_AUTHOR_NAME}</a> &middot; 
  <a href="https://simpleicons.org" target="_blank" rel="noopener noreferrer" title="Icons by SimpleIcons.org" aria-label="Icons by SimpleIcons.org">simpleicons.org</a> &middot;
  <a href="${VERCEL_URL}" target="_blank" rel="noopener noreferrer" title="Deploy on Vercel!" aria-label="Deploy on Vercel">vercel.com</a>
</footer>

<script type="text/javascript">
  var $ = document.querySelector.bind(document);
  var $$ = (s) => [...document.querySelectorAll(s)];

  function $attr (selector, attr, value = null) {
    !!(value) && $(selector).setAttribute(attr, value);
    return $(selector).getAttribute(attr);
  }

  async function clip (slug, base_url = '${SITE_URL}', toast_duration = 3000) {
    const url = new URL(slug+'.svg', base_url).href;
    try {
      await navigator.clipboard.writeText(url);
      $('#url-'+slug).classList.add('success'); 

      setTimeout(() => {
        $('#url-'+slug).classList.remove('success');
      }, toast_duration);
    } catch (err) {
      console.error(err);
    }
  }
</script>
</body>
</html>
`;

const iconsTableRow = `<tr>
  <td width="72">
  <a href="/{{ICON}}" target="_blank" rel="noopener noreferrer" aria-label="{{TITLE}}" title="{{TITLE}}">
    <img src="/{{ICON}}" alt="{{TITLE}}" aria-label="{{TITLE}}" width="72" height="72" class="icon" id="icon-{{slug}}" />
  </a>
  </td>
  <td>
      <a href="javascript:clip('{{SLUG}}');"
         id="copy-{{SLUG}}" 
         class="copyurl"
         data-url="{{URL}}" 
         title="Copy &quot;{{URL}}&quot; to Clipboard"
         style="position:relative"
      >
        <pre id="url-{{SLUG}}" class="url"><span>{{URL}}</span></pre>
      </a>
  </td>
</tr>`;

function parseMarkdownWithIcons(source: string, options: MarkedOptions = {}): string {
  let result = marked.parse(source, Object.assign({}, marked.getDefaults(), options))
  return result.replace(/[{]{1,2}\s?icons\s?[}]{1,2}/ig, randomIcons.map(
    (icon: SimpleIcon): string =>
      iconsTableRow.replace(/[{]{1,2}\s?icon\s?[}]{1,2}/ig, `${icon.slug}.svg`)
          .replace(/[{]{1,2}\s?url\s?[}]{1,2}/ig, `${SITE_URL}/${icon.slug}.svg`)
          .replace(/[{]{1,2}\s?title\s?[}]{1,2}/ig, icon.title)
          .replace(/[{]{1,2}\s?slug\s?[}]{1,2}/ig, icon.slug)
          .replace(/[{]{1,2}\s?hex\s?[}]{1,2}/ig, tc(icon.hex).toHexString())
    ).join('\n'))
}

export default async function handler (req: Request, res: Response) {
  homepage = parseMarkdownWithIcons(homepage, markedOptions);
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.status(200).send(`${homepage_head}${homepage}${homepage_foot}`);
}
