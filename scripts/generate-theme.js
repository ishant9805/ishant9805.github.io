const fs = require('fs');
const fetch = require('node-fetch');

// Read your main HTML (e.g., index.html)
const html = fs.readFileSync('index.html', 'utf8');

const prompt = `
You are a creative CSS generator. Here is the HTML for a portfolio site:

${html}

Generate a unique, visually appealing CSS theme that styles all elements and classes used above. Use only the provided class names and structure. Do NOT generate any HTML, only CSS. Make it modern and readable. Output only the CSS code.
`;

async function generateCSS() {
  const res = await fetch('https://gemini.googleapis.com/v1beta/models/gemini-pro:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    })
  });
  const data = await res.json();
  const css = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  fs.writeFileSync('css/themes/theme-hourly.css', css);
}
generateCSS().catch(err => {
  console.error(err);
  process.exit(1);
});