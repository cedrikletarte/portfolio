# Portfolio — cedrikletarte.com

A multilingual portfolio built with Next.js, TypeScript, Tailwind CSS, and Material UI. Deployed via Docker and GitLab CI/CD.

Live: [cedrikletarte.com](https://www.cedrikletarte.com)

![Thumbnail](/public/thumbnail.png)

---

## Getting Started

```bash
git clone <repository-url>
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

```bash
docker build -f portfolio.cloud.Dockerfile -t portfolio-app .
docker run -d --restart always -p 3000:3000 --name portfolio-app portfolio-app
```
