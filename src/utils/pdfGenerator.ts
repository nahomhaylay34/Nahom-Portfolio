import { jsPDF } from "jspdf";

export function generateResumePDF() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Margins & general layout settings
  const marginX = 20;
  let y = 15;

  // Title / Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Nahom Haylay Tsadik", 105, y, { align: "center" });
  y += 7;

  // Contact Info
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text(
    "Addis Ababa, Ethiopia  |  +251 954 883 155  |  nahomhaylay34@gmail.com  |  https://github.com/nahomhaylay34",
    105,
    y,
    { align: "center" }
  );
  y += 5;
  doc.text("Available upon request", 105, y, { align: "center" });
  y += 4;

  // Divider Line
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.line(marginX, y, 210 - marginX, y);
  y += 6;

  // Helper function to render a Section Header
  const addSectionHeader = (title: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(title, marginX, y);
    y += 1.5;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(marginX, y, 210 - marginX, y);
    y += 4.5;
  };

  // SUMMARY
  addSectionHeader("SUMMARY");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const summaryText =
    "Electrical & Computer Engineering graduate with hands-on experience developing modern full-stack web and mobile applications using React, React Native, Node.js, Java, MySQL, MongoDB, and PostgreSQL. Completed a Frontend Developer internship where I developed production web applications, integrated REST APIs, and supported business operations through structured data collection. Experienced in building responsive user interfaces, implementing secure JWT authentication, and creating interactive 3D web experiences using Three.js. Passionate about developing scalable, user-focused software solutions and continuously expanding technical expertise through practical projects and professional learning.";
  const splitSummary = doc.splitTextToSize(summaryText, 170);
  splitSummary.forEach((line: string) => {
    doc.text(line, marginX, y);
    y += 4.5;
  });
  y += 3;

  // EDUCATION
  addSectionHeader("EDUCATION");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Aksum University", marginX, y);
  y += 4.5;
  doc.setFont("helvetica", "oblique");
  doc.setFontSize(9);
  
  const eduLine1 = "Bachelor of Science in Electrical & Computer Engineering, CGPA: 3.62 / 4.00, National Exit";
  const eduLine2 = "Examination Score: 91.25 / 100, Graduated: June 2026";
  const eduLine3 = "Relevant Coursework: Object-Oriented Programming, Database Systems, Computer Architecture, C++, Data Structures, Software Engineering, Operating Systems, Computer Networks";
  
  doc.text(eduLine1, marginX, y);
  y += 4.5;
  doc.text(eduLine2, marginX, y);
  y += 4.5;
  
  doc.setFont("helvetica", "normal");
  const splitCoursework = doc.splitTextToSize(eduLine3, 170);
  splitCoursework.forEach((line: string) => {
    doc.text(line, marginX, y);
    y += 4.5;
  });
  y += 3;

  // EXPERIENCE
  addSectionHeader("EXPERIENCE");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Frontend Developer Intern", marginX, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("June 30, 2025 - August 29, 2025", 210 - marginX, y, { align: "right" });
  y += 4.5;
  doc.setFont("helvetica", "bold");
  doc.text("Root Solutions", marginX, y);
  y += 4.5;

  doc.setFont("helvetica", "normal");
  const expBullets = [
    "Developed a full-stack gaming coin purchasing platform using React, Node.js, and MongoDB featuring secure user authentication, account creation, wallet deposits, payment processing, and transaction history.",
    "Designed responsive user interfaces and integrated REST APIs to deliver a seamless purchasing experience.",
    "Collected and organized hundreds of online gaming product records through structured data scraping techniques to support business operations.",
    "Worked independently to translate business requirements into functional web solutions while maintaining clean and maintainable code.",
    "Utilized Git, Microsoft Excel, and API integration throughout the software development lifecycle."
  ];

  expBullets.forEach((bullet) => {
    const splitBullet = doc.splitTextToSize(bullet, 164);
    doc.text("-", marginX, y);
    splitBullet.forEach((line: string, index: number) => {
      doc.text(line, marginX + 4, y);
      y += 4.5;
    });
  });
  y += 3;

  // PROJECTS
  addSectionHeader("PROJECTS");

  // Project 1
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("Spark Security Corporate Website", marginX, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const offset1 = doc.getTextWidth("Spark Security Corporate Website") + 2;
  doc.text("| React * Vite * Tailwind CSS * Three.js * Vercel", marginX + offset1, y);
  y += 4.5;
  const proj1Bullets = [
    "Designed and developed a modern corporate website for Spark Security from concept to deployment.",
    "Built interactive 3D experiences using Three.js to create an engaging and visually dynamic user experience.",
    "Implemented responsive layouts, animated interface components, and interactive content optimized for desktop and mobile devices.",
    "Successfully deployed the production website using Vercel."
  ];
  proj1Bullets.forEach((bullet) => {
    const splitBullet = doc.splitTextToSize(bullet, 164);
    doc.text("-", marginX, y);
    splitBullet.forEach((line: string) => {
      doc.text(line, marginX + 4, y);
      y += 4.5;
    });
  });
  y += 2.5;

  // Project 2
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("Crime Management System (Graduation Project)", marginX, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const offset2 = doc.getTextWidth("Crime Management System (Graduation Project)") + 2;
  doc.text("| React * Node.js * MySQL * JWT Authentication", marginX + offset2, y);
  y += 4.5;
  const proj2Bullets = [
    "Developed a role-based crime management platform with dedicated dashboards for administrators, police officers, and citizens.",
    "Implemented secure authentication and authorization using JWT.",
    "Built RESTful backend services connected to a MySQL database for efficient case management and reporting.",
    "Designed responsive interfaces to improve accessibility and user experience across multiple roles."
  ];
  proj2Bullets.forEach((bullet) => {
    const splitBullet = doc.splitTextToSize(bullet, 164);
    doc.text("-", marginX, y);
    splitBullet.forEach((line: string) => {
      doc.text(line, marginX + 4, y);
      y += 4.5;
    });
  });

  // Page 2
  doc.addPage();
  y = 15;

  // Project 3
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("School Task Management Mobile Application", marginX, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const offset3 = doc.getTextWidth("School Task Management Mobile Application") + 2;
  doc.text("| React Native * Expo * Node.js", marginX + offset3, y);
  y += 4.5;
  const proj3Bullets = [
    "Developed a cross-platform mobile application to help students organize academic tasks and schedules.",
    "Built intuitive mobile interfaces focused on usability and productivity.",
    "Integrated backend services for user data management and task synchronization."
  ];
  proj3Bullets.forEach((bullet) => {
    const splitBullet = doc.splitTextToSize(bullet, 164);
    doc.text("-", marginX, y);
    splitBullet.forEach((line: string) => {
      doc.text(line, marginX + 4, y);
      y += 4.5;
    });
  });
  y += 2.5;

  // Project 4
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("Daycare Management System", marginX, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const offset4 = doc.getTextWidth("Daycare Management System") + 2;
  doc.text("| React * Vite * Node.js * MySQL", marginX + offset4, y);
  y += 4.5;
  const proj4Bullets = [
    "Developed a web-based daycare management system with dedicated dashboards for administrators, staff, and parents.",
    "Designed responsive interfaces to streamline daily management activities and user communication."
  ];
  proj4Bullets.forEach((bullet) => {
    const splitBullet = doc.splitTextToSize(bullet, 164);
    doc.text("-", marginX, y);
    splitBullet.forEach((line: string) => {
      doc.text(line, marginX + 4, y);
      y += 4.5;
    });
  });
  y += 5;

  // TECHNICAL SKILLS
  addSectionHeader("TECHNICAL SKILLS");
  doc.setFontSize(9);
  const skillsList = [
    { label: "Programming Languages: ", val: "JavaScript, Java, C++, HTML5, CSS3" },
    { label: "Frontend: ", val: "React, React Native, Vite, Tailwind CSS, Three.js" },
    { label: "Backend: ", val: "Node.js, REST APIs, JWT Authentication" },
    { label: "Databases: ", val: "MySQL, MongoDB, PostgreSQL" },
    { label: "Tools: ", val: "Git, GitHub, VS Code, Figma, Postman (Basic), Docker (Basic), Microsoft Excel" },
    { label: "Deployment: ", val: "Vercel" }
  ];
  skillsList.forEach((skill) => {
    doc.setFont("helvetica", "bold");
    doc.text(skill.label, marginX, y);
    const labelWidth = doc.getTextWidth(skill.label);
    doc.setFont("helvetica", "normal");
    const valText = doc.splitTextToSize(skill.val, 170 - labelWidth);
    valText.forEach((vLine: string, idx: number) => {
      doc.text(vLine, marginX + labelWidth, y + (idx * 4.5));
    });
    y += Math.max(1, valText.length) * 4.5 + 0.5;
  });
  y += 2;

  // CERTIFICATIONS
  addSectionHeader("CERTIFICATIONS");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("MERN Stack: All You Need to Know with Practical Project - Udemy", marginX, y);
  y += 4.5;
  doc.text("Learn Blockchain and Cryptocurrency from Beginning - Udemy", marginX, y);
  y += 6;

  // LANGUAGES
  addSectionHeader("LANGUAGES");
  doc.setFont("helvetica", "bold");
  doc.text("Amharic - ", marginX, y);
  doc.setFont("helvetica", "normal");
  doc.text("Native", marginX + doc.getTextWidth("Amharic - "), y);
  y += 4.5;
  doc.setFont("helvetica", "bold");
  doc.text("English - ", marginX, y);
  doc.setFont("helvetica", "normal");
  doc.text("Fluent", marginX + doc.getTextWidth("English - "), y);

  doc.save("Nahom_Haylay_Tsadik_Resume.pdf");
}
