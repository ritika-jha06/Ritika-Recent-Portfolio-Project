const express = require('express');
const router = express.Router();

// Static project data — in production, store in MongoDB
const projects = [
  {
    id: 1,
    title: 'Document-Based AI Chatbot',
    emoji: '🤖',
    description: 'AI-powered chatbot for Maharashtra Board educational platform. Uses RAG architecture, PDF parsing, NLP-based query processing, and REST API integration.',
    stack: ['Python', 'NLP', 'REST API', 'AI/ML', 'FastAPI'],
    github: 'https://github.com/ritikajha',
    demo: '#',
    featured: true,
    category: 'AI/ML',
  },
  {
    id: 2,
    title: 'URL Shortener Web App',
    emoji: '⚡',
    description: 'Full-stack URL shortener with custom slugs, click analytics dashboard, link expiry, and MongoDB-backed storage.',
    stack: ['Node.js', 'Express', 'MongoDB', 'HTML', 'CSS'],
    github: 'https://github.com/ritikajha',
    demo: '#',
    featured: true,
    category: 'Full Stack',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    emoji: '🚔',
    description: 'This portfolio — a modern animated app with React.js frontend, Node.js/Express backend, MongoDB for contact storage, dark/light mode, and Framer Motion animations.',
    stack: ['React.js', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    github: 'https://github.com/ritikajha',
    demo: '#',
    featured: true,
    category: 'Full Stack',
  },
  {
    id: 4,
    title: 'Backend API Suite',
    emoji: '🧑‍💻',
    description: 'RESTful API projects with JWT authentication, CRUD operations, middleware design, rate limiting, error handling, and Postman test collections.',
    stack: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Postman'],
    github: 'https://github.com/ritikajha',
    demo: '#',
    featured: false,
    category: 'Backend',
  },
];

// GET /api/projects
router.get('/', (req, res) => {
  const { category, featured } = req.query;
  let filtered = [...projects];
  if (category) filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (featured === 'true') filtered = filtered.filter(p => p.featured);
  res.json({ success: true, data: filtered, count: filtered.length });
});

// GET /api/projects/:id
router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  res.json({ success: true, data: project });
});

module.exports = router;
