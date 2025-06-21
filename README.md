## Getting Started


### 1. Clone the repository

Clone this project to your local machine:

```bash
git clone ssh://git@192.168.2.100:2424/cedrik/portfolio.git
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

## Installation

To automatically install all libraries listed in `requirements.txt`, run the following command in PowerShell and Bash at the root of the project:

```powershell
Get-Content requirements.txt | ForEach-Object { npm install $_ }
```

```bash
xargs -a requirements.txt -n 1 npm install
```

This will install each dependency listed in the file.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deployment

To build a new Docker image of the Next.js app, use the following command at the root of the project:

```bash
docker build -f portfolio.cloud.Dockerfile -t portfolio-app .
```

To run a container from the new image and ensure it always restarts, use:

```bash
docker run -d --restart always -p 3000:3000 --name portfolio-app portfolio-app
```