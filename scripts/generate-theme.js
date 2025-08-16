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

// Read all HTML files to generate a unified theme
const indexHtml = fs.readFileSync('index.html', 'utf8');
const projectsHtml = fs.readFileSync('projects.html', 'utf8');
const aboutHtml = fs.readFileSync('about.html', 'utf8');
const contactHtml = fs.readFileSync('contact.html', 'utf8');

// Combine all HTML content
const allHtmlContent = `
INDEX PAGE:
${indexHtml}

PROJECTS PAGE:
${projectsHtml}

ABOUT PAGE:
${aboutHtml}

CONTACT PAGE:
${contactHtml}
`;

const prompt = `
You are a creative CSS generator. Here are ALL the HTML pages for a portfolio website:

${allHtmlContent}

Generate a unified, visually appealing CSS theme that styles ALL elements and classes used across ALL these pages. This single CSS file should work perfectly for the entire website.

DESIGN INSTRUCTION: ${randomStyle}

THEME MODE: Create a ${randomMode} theme with appropriate colors for ${randomMode} mode.

IMPORTANT: Pay special attention to the PROJECTS page styling and CONTACT page layout. Make sure to include proper CSS for:

PROJECTS PAGE SPECIFIC STYLING:
- #welcome-section: Center the content, add proper spacing and background
- #projects: Style the main projects section with good spacing
- #project-hail: Style the main heading prominently 
- .project-grid: Create a responsive grid layout (3 columns on desktop, 2 on tablet, 1 on mobile)
- .project-tile: Style project cards with hover effects, borders, shadows
- .project-img, .img-proj: Make images responsive and add border radius
- .code: Style code brackets with accent colors
- .pp: Style the paragraph text nicely
- .ppicon: Style the scroll down icon
- .pr-nav: Any special body styling for projects page

CONTACT PAGE SPECIFIC STYLING:
- .contact-wrapper: Create a flex container to center the contact form perfectly in the viewport
- .card.ppmid: Center the contact form card on the page using margin auto and proper positioning
- .card: Style the contact form card with appropriate width, padding, and centering
- .card-header: Style the card header prominently
- .card-body: Add proper padding and spacing
- .form-control: Style all form inputs consistently
- .form-label: Style form labels
- .btn.btn-primary: Style the submit button
- .form-text: Style help text
- Center the entire contact form in the viewport both horizontally and vertically
- Make the contact form responsive on mobile devices

Make sure to style:
- Navigation elements (nav, nav-pills, nav-link, etc.)
- All Bootstrap classes and custom classes
- Form elements (from contact page)
- Project grid and cards with proper responsive layout
- All text elements and headings
- Icons and images
- Hover effects and transitions

Use only the provided class names and structure. Do NOT generate any HTML, only CSS. Make it modern, cohesive, and readable. Output only the CSS code without any markdown formatting or code blocks.
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
  
  fs.writeFileSync('css/themes/theme-hourly.css', css);
  console.log('Theme CSS generated successfully!');
}
generateCSS().catch(err => {
  console.error(err);
  process.exit(1);
});