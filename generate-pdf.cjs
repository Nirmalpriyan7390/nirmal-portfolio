const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateResume(outputPath) {
  // A4 size: 595.28 x 841.89 points
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 26, bottom: 22, left: 32, right: 32 },
    autoFirstPage: true
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const primaryColor = '#0f172a'; // slate-900
  const accentColor = '#ea580c';  // orange-600
  const linkColor = '#0284c7';    // sky-600
  const textColor = '#334155';    // slate-700
  const lightGray = '#64748b';    // slate-500
  const ruleColor = '#cbd5e1';    // slate-300

  const contentWidth = 595.28 - 64; // 531.28

  // Helper for section title
  function drawSectionHeader(title) {
    doc.moveDown(0.3);
    doc.font('Helvetica-Bold').fontSize(9).fillColor(primaryColor).text(title.toUpperCase(), 32, doc.y, { characterSpacing: 0.5 });
    doc.strokeColor(ruleColor).lineWidth(0.5).moveTo(32, doc.y + 2).lineTo(595.28 - 32, doc.y + 2).stroke();
    doc.y += 4;
  }

  // Helper for bullet item
  function drawBullet(lead, body) {
    const startY = doc.y;
    doc.font('Helvetica').fontSize(8.2).fillColor(primaryColor).text('•', 36, startY);
    doc.font('Helvetica-Bold').fontSize(8.2).fillColor(primaryColor).text(lead + ' ', 45, startY, {
      continued: true,
      lineGap: 1.1
    });
    doc.font('Helvetica').fontSize(8.2).fillColor(textColor).text(body, {
      width: contentWidth - 13,
      lineGap: 1.1
    });
    doc.y += 1.2;
  }

  // --- HEADER ---
  doc.font('Helvetica-Bold').fontSize(18).fillColor('#090d16').text('NIRMAL PRIYADARSHAN MV', {
    align: 'center',
    characterSpacing: 0.5
  });
  doc.moveDown(0.12);

  doc.font('Helvetica-Bold').fontSize(9.8).fillColor(accentColor).text('AI-Powered Product Designer  |  UI/UX Designer', {
    align: 'center'
  });
  doc.moveDown(0.25);

  // Contact bar with clickable links
  const contactY = doc.y;
  doc.font('Helvetica').fontSize(8.4).fillColor(textColor);

  doc.text('+91 8682834411   |   ', 32, contactY, { continued: true, align: 'center' });
  doc.fillColor(linkColor).text('nirmaluiux7@gmail.com', {
    link: 'mailto:nirmaluiux7@gmail.com',
    continued: true
  });
  doc.fillColor(textColor).text('   |   ', { continued: true });
  doc.fillColor(linkColor).text('linkedin.com/in/nirmal-uiux', {
    link: 'https://linkedin.com/in/nirmal-uiux',
    continued: true
  });
  doc.fillColor(textColor).text('   |   ', { continued: true });
  doc.fillColor(linkColor).text('nirmal-portfolio.vercel.app', {
    link: 'https://nirmal-portfolio.vercel.app',
    underline: true,
    continued: true
  });
  doc.fillColor(textColor).text('   |   Tamil Nadu, India', { align: 'center' });

  doc.moveDown(0.25);
  doc.strokeColor(primaryColor).lineWidth(1.2).moveTo(32, doc.y).lineTo(595.28 - 32, doc.y).stroke();
  doc.y += 3;

  // --- PROFESSIONAL SUMMARY ---
  drawSectionHeader('Professional Summary');
  doc.font('Helvetica').fontSize(8.3).fillColor(textColor).text(
    'Product Designer with 2+ years of experience designing and shipping 6+ live commercial products across Fintech, Healthcare SaaS, and E-Commerce. Combines end-to-end user research, information architecture, and scalable design systems with modern AI-assisted prototyping workflows to ship production-grade digital products 2x faster. Proven track record across active platforms including Index Waves (500+ downloads, 100+ DAU on Google Play), IppoBill (ippobill.com), CareZhen (carezhen.com), and Trackgle (trackgle.jseven.in).',
    32,
    doc.y,
    { width: contentWidth, lineGap: 1.2, align: 'justify' }
  );

  // --- CORE COMPETENCIES & SKILLS ---
  drawSectionHeader('Core Competencies & Skills');
  
  const skillY1 = doc.y;
  doc.font('Helvetica-Bold').fontSize(8.2).fillColor(primaryColor).text('Design Skills: ', 32, skillY1, { continued: true });
  doc.font('Helvetica').fontSize(8.2).fillColor(textColor).text('Product Thinking (0→1), End-to-End UX/UI, Design Systems & Component Tokens, Mobile App UX (iOS & Android), B2B SaaS Dashboard Architecture, Information Architecture, Wireframing & Prototyping, Usability Testing', { width: contentWidth, lineGap: 1.1 });

  doc.moveDown(0.18);
  const skillY2 = doc.y;
  doc.font('Helvetica-Bold').fontSize(8.2).fillColor(primaryColor).text('Tools & AI: ', 32, skillY2, { continued: true });
  doc.font('Helvetica').fontSize(8.2).fillColor(textColor).text('Figma (Auto-Layout, Variables, Tokens), Jira, AI-Assisted Workflows (Cursor, Claude, v0 by Vercel), Git, Responsive Web Design', { width: contentWidth, lineGap: 1.1 });

  doc.moveDown(0.18);
  const skillY3 = doc.y;
  doc.font('Helvetica-Bold').fontSize(8.2).fillColor(primaryColor).text('Frontend: ', 32, skillY3, { continued: true });
  doc.font('Helvetica').fontSize(8.2).fillColor(textColor).text('HTML5, CSS3, Tailwind CSS, Component Architecture, Developer Handoff', { width: contentWidth, lineGap: 1.1 });

  // --- PROFESSIONAL EXPERIENCE ---
  drawSectionHeader('Professional Experience');

  // Job Company Header
  const expY = doc.y;
  doc.font('Helvetica-Bold').fontSize(8.8).fillColor(primaryColor).text('Product Designer · UI/UX Designer', 32, expY, { continued: true });
  doc.font('Helvetica-Bold').fontSize(8.8).fillColor('#475569').text(' | J7 Technology Solutions Pvt Ltd, Tenkasi', { continued: false });
  doc.font('Helvetica-Bold').fontSize(8).fillColor(lightGray).text('March 2024 – Present', 595.28 - 32 - 100, expY, { width: 100, align: 'right' });
  doc.y = expY + 11;

  // 1. Index Waves
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#090d16').text('Index Waves', 32, doc.y, { continued: true });
  doc.font('Helvetica').fontSize(7.8).fillColor(lightGray).text(' · Stock Trading Signals App · ', { continued: true });
  doc.font('Helvetica-Bold').fontSize(7.8).fillColor(linkColor).text('Google Play', { link: 'https://play.google.com/store', continued: true });
  doc.font('Helvetica').fontSize(7.8).fillColor(lightGray).text(' · 500+ Downloads, 100+ DAU');
  drawBullet('0→1 Mobile Trading UX:', 'Designed high-urgency call cards showing entry, dual targets, stop-loss, and live status badges, reducing signal execution time to under 3 seconds.');
  drawBullet('Dual Interfaces:', 'Architected both the trader-facing Android app and an analyst command center for publishing and managing live market calls.');
  drawBullet('Design System:', 'Created a dark-mode design system with monospace tags extended across sibling trading platforms (MCX Premier & Equity Emphas).');

  doc.moveDown(0.2);
  // 2. IppoBill SaaS
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#090d16').text('IppoBill SaaS', 32, doc.y, { continued: true });
  doc.font('Helvetica').fontSize(7.8).fillColor(lightGray).text(' · GST Billing, Inventory & POS Management · ', { continued: true });
  doc.font('Helvetica-Bold').fontSize(7.8).fillColor(linkColor).text('ippobill.com', { link: 'https://www.ippobill.com' });
  drawBullet('MSME Platform Architecture:', 'Designed complete platform for Indian MSMEs: billing, GST invoicing, inventory tracking, and customer ledgers across web and mobile.');
  drawBullet('POS Checkout Optimization:', 'Streamlined counter billing by eliminating 4 manual steps with auto-populated HSN codes and tax splits from product catalogs.');

  doc.moveDown(0.2);
  // 3. CareZhen & Setter
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#090d16').text('CareZhen & Setter', 32, doc.y, { continued: true });
  doc.font('Helvetica').fontSize(7.8).fillColor(lightGray).text(' · Hospital Management & US Healthcare Appointment SaaS · ', { continued: true });
  doc.font('Helvetica-Bold').fontSize(7.8).fillColor(linkColor).text('carezhen.com', { link: 'https://www.carezhen.com' });
  drawBullet('Role-Based Workflows:', 'Designed tailored portals for doctors, receptionists, pharmacists, and admins to ensure zero clinical workflow confusion.');
  drawBullet('Modular Onboarding & Compliance:', 'Created self-serve setup toggles for US clinic networks and surfaced DPDR/SMS compliance warnings inline.');

  doc.moveDown(0.2);
  // 4. Trackgle & Goyab
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#090d16').text('Trackgle & Goyab', 32, doc.y, { continued: true });
  doc.font('Helvetica').fontSize(7.8).fillColor(lightGray).text(' · B2B Sprint & Time Tracking (', { continued: true });
  doc.font('Helvetica-Bold').fontSize(7.8).fillColor(linkColor).text('trackgle.jseven.in', { link: 'https://trackgle.jseven.in', continued: true });
  doc.font('Helvetica').fontSize(7.8).fillColor(lightGray).text(') & Android Productivity App');
  drawBullet('Trackgle SaaS:', 'Designed and shipped full agile sprint board, timesheets, and leave management in a single sprint via AI-assisted workflows.');
  drawBullet('Goyab Mobile App:', 'Designed zero-friction local-first content organizer with Smart Reminders and encrypted Google Drive backup.');

  doc.moveDown(0.2);
  // 5. Layline Campaigns
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#090d16').text('Layline Campaigns', 32, doc.y, { continued: true });
  doc.font('Helvetica').fontSize(7.8).fillColor(lightGray).text(' · SMS & Email Campaign Platform for Healthcare Operators · ', { continued: true });
  doc.font('Helvetica-Bold').fontSize(7.8).fillColor(linkColor).text('campaigns.layline.live', { link: 'https://campaigns.layline.live' });
  drawBullet('Single-Page Builder:', 'Designed 4-step campaign builder on one continuous scroll, eliminating context loss for frequently interrupted healthcare staff.');
  drawBullet('Send-Queue Lifecycle:', 'Engineered 6-state vocabulary (Ready, Sending, Resting, Paused, Stopped, Completed) mapping directly to backend queues.');

  // --- EDUCATION ---
  drawSectionHeader('Education');
  const eduY = doc.y;
  doc.font('Helvetica-Bold').fontSize(8.4).fillColor(primaryColor).text('Bachelor of Information Technology (B.Tech / B.Sc IT)', 32, eduY, { continued: true });
  doc.font('Helvetica').fontSize(8.4).fillColor(textColor).text(' | Karpagam University, Coimbatore', { continued: false });
  doc.font('Helvetica-Bold').fontSize(8).fillColor(lightGray).text('2017 – 2021', 595.28 - 32 - 70, eduY, { width: 70, align: 'right' });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      resolve();
    });
    stream.on('error', reject);
  });
}

async function main() {
  await generateResume(path.join(__dirname, 'public', 'resume.pdf'));
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    await generateResume(path.join(__dirname, 'dist', 'resume.pdf'));
  }
  console.log('Resume PDF generation completed successfully.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
