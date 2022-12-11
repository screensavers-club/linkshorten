# Linkshorten

A simple self-hosted link shortener Next.js application. Provide these environment variables:

```env
VERCEL_URL=https://link.ly
API_USER=xxxxxxxxxx
API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DATABASE_URL=postgres://...
```

Hit `/api/link` with a `POST` request:

```json
{
  "target": "<target url goes here>"
}
```

Remember to include Basic Auth:

```
username: <API_USER>
password: <API_SECRET>
```

You will receive a short URL back:

```json
{
  "url": "https://link.ly/<slug>"
}
```
