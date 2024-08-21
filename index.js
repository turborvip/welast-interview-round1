const express = require('express');

const cors = require('cors');
const app = express();
const PORT = 3002;

app.use(cors());

app.get('/repos', async (req, res) => {
    try {
        // Fetch repositories from GitHub API
        const response = await fetch('https://api.github.com/users/freeCodeCamp/repos');
        const data = await response.json();
        const repositories = data;

        // Filter the repositories
        const filteredRepos = repositories?.filter(repo => !repo.fork && repo.forks > 5);

        // Send filtered repositories as JSON
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(filteredRepos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching repositories');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
