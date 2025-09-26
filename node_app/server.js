const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for project info
app.get('/api/project-info', (req, res) => {
  res.json({
    name: 'Jenkins CI/CD Pipeline Project',
    version: '1.0.0',
    description:
      'Automated CI/CD pipeline with Jenkins, Docker, and AWS deployment',
    technologies: [
      'Jenkins',
      'Docker',
      'AWS',
      'Terraform',
      'Ansible',
      'Node.js',
    ],
    status: 'Production Ready',
    uptime: '99.9%',
    lastDeployment: new Date().toISOString(),
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

const port = process.env.PORT || 3000;

app.listen(8081, () => {
  console.log(`🚀 Server is running on port 8080`);
  console.log(`📱 Open your browser and navigate to http://localhost:8080`);
  console.log(`🔧 Health check available at http://localhost:8080/health`);
  console.log(`📊 Project info API at http://localhost:8080/api/project-info`);
});
