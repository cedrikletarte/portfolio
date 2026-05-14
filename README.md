# 🚀 Portfolio Next.js

🌐 [Visit the website](https://www.cedrikletarte.com)

A multilingual portfolio built with Next.js, Docker, and CI/CD ready for GitLab Runner.

![Thumbnail](/public/thumbnail.png)

---

## 🏁 Getting Started

### 1. Clone the repository

Clone this project to your local machine:

```bash
git clone <repository-url>
cd portfolio
```

### 2. Install dependencies

Install all required dependencies (this will create the `node_modules` folder):

```bash
npm install
```

### 3. Run the development server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🚀 Manual Deployment

Build a new Docker image for the Next.js app:

```bash
docker build -f portfolio.cloud.Dockerfile -t portfolio-app .
```

Run a container from the new image (with automatic restart):

```bash
docker run -d --restart always -p 3000:3000 --name portfolio-app portfolio-app
```

---

## 🤖 Automatic Deployment (GitLab Runner)

To set up CI/CD with GitLab Runner and Docker, follow these steps:

### 1. Access the GitLab Runner container

```bash
docker exec -it gitlab-runner /bin/bash
```

### 2. Register the runner

```bash
gitlab-runner register --url http://<ip-address-server>:8929 --token <your-token> --docker-network-mode 'host'
```

- **URL**: Use your GitLab instance URL (e.g. `http://gitlab:8929`)
- **Token**: Use the registration token from your GitLab project or group
- **Executor**: Choose `docker`
- **Default Docker image**: `docker:latest`

### 3. Update the runner config for Docker socket access

This allows your CI jobs to build and run Docker containers:

```bash
docker exec gitlab-runner bash -c 'cat > /etc/gitlab-runner/config.toml << '\''EOF'\''
concurrent = 1
check_interval = 0
shutdown_timeout = 0
[session_server]
  session_timeout = 1800
[[runners]]
  name = "docker_runner"
  url = "http://gitlab:8929"
  id = 75
  token = "<your-token>"
  token_obtained_at = 2025-06-21T23:01:30Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "docker"
  [runners.cache]
    MaxUploadedArchiveSize = 0
    [runners.cache.s3]
    [runners.cache.gcs]
    [runners.cache.azure]
  [runners.docker]
    tls_verify = false
    image = "docker:latest"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/var/run/docker.sock:/var/run/docker.sock", "/cache"]
    network_mode = "host"
    shm_size = 0
    network_mtu = 0
EOF'
```

---

## 📝 Notes

- Replace `<your-token>` with your actual GitLab runner registration token.
- The Docker socket volume (`/var/run/docker.sock:/var/run/docker.sock`) is required for Docker-in-Docker builds.
- Make sure your runner has network access to your GitLab instance.
- For more information, see the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment) and [GitLab Runner Docs](https://docs.gitlab.com/runner/).

---

## 🔍 SEO & Indexing (Google + Bing)

### Google Search Console

1. Open Google Search Console and add your domain:  
  https://search.google.com/search-console?resource_id=sc-domain%3Acedrikletarte.com
2. Verify ownership by following Google instructions (recommended: DNS TXT record at the domain level).
3. Once the property is verified, use the **URL Inspection** tool:
  - Enter `https://www.cedrikletarte.com/`.
  - If the page is not indexed, click **Request indexing**.
4. Repeat for other important pages if needed (project pages, etc.).

> Note: indexing is never instant. Even after requesting indexing, Google can take from a few minutes to several days to index or re-index a page.

### Bing / IndexNow

1. Create the IndexNow key file (already done in this project):
  - File: `public/10781fabffa84997949378633b23406e.txt`
  - File content: `10781fabffa84997949378633b23406e`
  - After build and deployment, it must be publicly accessible at:  
    `https://www.cedrikletarte.com/10781fabffa84997949378633b23406e.txt`
2. Build and deploy the Next.js app (Docker or any hosting provider). Bing must be able to access the website on the public internet.
3. Submit a URL to IndexNow (simple GET method):
  - Call this URL in a browser or via curl:  
    `https://api.indexnow.org/indexnow?url=https://www.cedrikletarte.com/&key=10781fabffa84997949378633b23406e&keyLocation=https://www.cedrikletarte.com/10781fabffa84997949378633b23406e.txt`
  - If everything is configured correctly, the API should return HTTP 200.
4. (Optional) Submit multiple URLs with a JSON POST request to `https://api.indexnow.org/indexnow` using the format from the official documentation:  
  https://www.bing.com/indexnow/getstarted#implementation
5. Check in **Bing Webmaster Tools**:
  - Add and verify the site if this is not already done.
  - In the menu, open **IndexNow** / **URL Submission** to confirm URLs were received.

As with Google, receiving URLs does not guarantee instant indexing, but these steps significantly improve the chances of fast crawling and indexing.