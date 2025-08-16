const fs = require('fs');
// Using Node.js built-in fetch (Node 18+)

// Design style options to randomly choose from
const designStyles = [
  "Add glassmorphism effects with frosted glass backgrounds and subtle transparency",
  "Use neumorphism design with soft shadows and subtle depth effects", 
  "Apply cyberpunk aesthetics with neon colors and futuristic elements",
  "Implement minimalist design with clean lines and lots of whitespace",
  "Create a retro/vintage theme with classic color schemes and typography",
  "Use gradient backgrounds and colorful accent elements",
  "Apply dark academia style with rich, scholarly colors and elegant typography",
  "Implement brutalist design with bold, geometric shapes and stark contrasts",
  "Create a nature-inspired theme with organic shapes and earth tones",
  "Use Memphis design style with bold colors and geometric patterns",
  "Apply art deco styling with golden accents and elegant curves",
  "Implement material design principles with elevation and motion",
  "Create a space/cosmic theme with deep blues and stellar elements",
  "Use warm, cozy colors with soft rounded corners for a friendly feel",
  "Apply high-contrast design for maximum accessibility and impact"
];

// Theme modes to randomly choose from
const themeModes = ["light", "dark"];

// Randomly select design style and theme mode
const randomStyle = designStyles[Math.floor(Math.random() * designStyles.length)];
const randomMode = themeModes[Math.floor(Math.random() * themeModes.length)];

// Read your main HTML (e.g., projects.html)
const html = fs.readFileSync('projects.html', 'utf8');

const prompt = `
You are a creative CSS generator. Here is the HTML for a portfolio site:

${html}

Generate a unique, visually appealing CSS theme that styles all elements and classes used above. 

DESIGN INSTRUCTION: ${randomStyle}

THEME MODE: Create a ${randomMode} theme with appropriate colors for ${randomMode} mode.

Also, if you thing certain styles should be applied to specific classes, do so.
Use !important where necessary to override existing styles.

Use only the provided class names and structure. Do NOT generate any HTML, only CSS. Make it modern and readable. Output only the CSS code without any markdown formatting or code blocks.
`;

console.log(`🎨 Generating ${randomMode} theme with: ${randomStyle}`);

async function generateCSS() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY environment variable is required');
    process.exit(1);
  }
  
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{ 
        parts: [{ text: prompt }] 
      }]
    })
  });
  
  if (!res.ok) {
    console.error('API request failed:', res.status, res.statusText);
    const errorText = await res.text();
    console.error('Error response:', errorText);
    process.exit(1);
  }
  
  const data = await res.json();
  let css = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  // Clean up markdown code blocks if present - handle various formats
  css = css.replace(/^```+css\s*\n?/, '').replace(/\n?```+$/, '').trim();
  // Also handle cases where it starts with just ```
  css = css.replace(/^```\s*\n?/, '').replace(/\n?```$/, '').trim();
  
  console.log('Raw CSS content preview:', css.substring(0, 100) + '...');
  
  // Create css/themes directory if it doesn't exist
  if (!fs.existsSync('css/themes')) {
    fs.mkdirSync('css/themes', { recursive: true });
  }
  
  fs.writeFileSync('css/themes/theme-hourly-projects.css', css);
  console.log('Theme CSS generated successfully!');
}
generateCSS().catch(err => {
  console.error(err);
  process.exit(1);
});