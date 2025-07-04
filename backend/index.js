const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());


const headlineTemplates = [
  `Why {name} is {location}'s Best Kept Secret in 2025`,
  `{name}: Revolutionizing {location}'s Business Landscape`,
  `Discover Why {name} Leads {location}'s Market`,
  `{name} - {location}'s Premium Choice for Quality`,
  `The {name} Experience: {location}'s New Standard`,
  `{name}: Where {location} Meets Excellence`,
  `{location}'s Rising Star: The {name} Story`,
  `{name}: {location}'s Hidden Gem Revealed`,
  `Breaking: {name} Transforms {location}'s Industry`,
  `{name} Sets New {location} Standards`,
  `Why Everyone in {location} Chooses {name}`,
  `{name}: The Future of {location} Business`,
  `{location}'s Premier Destination: {name}`,
  `{name} - Redefining Excellence in {location}`,
  `2025's Top Rated: {name} in {location}`,
  `{location}'s #1 Choice: {name} Explained`,
  `The Success Story of {name} in {location}`,
  `Unlock Growth: {name}'s Strategy in {location}`
];


const generateHeadline = (name, location) => {
  const template = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)];
  return template
    .replace(/{name}/g, name)
    .replace(/{location}/g, location);
};


const generateBusinessData = (name, location) => {
 
  const rating = parseFloat((Math.random() * (5.0 - 3.5) + 3.5).toFixed(1));
  
  
  const reviews = Math.floor(Math.random() * 451) + 50;
  
 
  const metrics = {
    visibility: Math.floor(Math.random() * 41) + 60, 
    engagement: Math.floor(Math.random() * 31) + 70, 
    conversion: Math.floor(Math.random() * 21) + 80  
  };
  
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    name,
    location,
    rating,
    reviews,
    headline: generateHeadline(name, location),
    metrics,
    createdAt: new Date().toISOString()
  };
};


const generateHeadlineOptions = (name, location, count = 3) => {
  const options = [];
  while (options.length < count) {
    const headline = generateHeadline(name, location);
    if (!options.includes(headline)) {
      options.push(headline);
    }
  }
  return options;
};


app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  
  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location are required' });
  }
  
  try {
    const businessData = generateBusinessData(name, location);
    const headlineOptions = generateHeadlineOptions(name, location);
    
    res.json({
      ...businessData,
      headlineOptions: [businessData.headline, ...headlineOptions]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate business data' });
  }
});


app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;
  
  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location are required' });
  }
  
  try {
    const headline = generateHeadline(name, location);
    res.json({ headline });
  } catch (error) {
    res.status(500).json({ error: 'Failed to regenerate headline' });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));