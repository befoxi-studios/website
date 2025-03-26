const html = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <meta name="darkreader-lock" content="true" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.json" />
    <meta property="og:title" content="Befoxi Studios" />
    <meta property="og:description" content="Isn't just a place to make games, it's a place to grow with users." />
    <title>Befoxi Studios</title>
  </head>
  <body>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`

export default {
  fetch() {
    return new Response(html, { headers: { 'Content-Type': 'text/html' }})
  },
}
