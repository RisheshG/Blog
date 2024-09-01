//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = `
<h2>Rishesh Gangwar</h2>
<p><strong>Information Technology </strong>Student at <em><strong>Motilal Nehru National Institute of Technology, Allahabad (MNNIT)</strong></em></p>
<p>I am a highly motivated and dedicated developer, with degree in <strong>Information Technology.</strong> My academic journey has equipped me with a solid foundation in <strong>programming languages</strong> such as <em><strong>C, C++, and Python</strong></em>, which I have applied to develop a range of projects and solve complex problems.</p>
<p>In addition to my academic studies, I have gained extensive hands-on experience in <strong>web development</strong>, using technologies such as <em><strong>Node.js, React, Express, and MongoDB</strong></em> to create dynamic, responsive, and user-friendly web applications. My passion for technology drives me to tackle real-world problems, and I have successfully solved over <strong>300 coding challenges</strong> on platforms like <em><strong>LeetCode and GeeksforGeeks</strong></em>, further honing my problem-solving and algorithmic skills.</p>
<p>Beyond coding, I am deeply enthusiastic about exploring new technologies and staying current with industry trends. My commitment to continuous learning allows me to adapt quickly to new environments and challenges, making me a versatile and resourceful developer.</p>
<p>As I continue to enhance my skills and knowledge, I am eager to apply my technical expertise to real-world challenges and contribute to impactful projects.</p>
`;

const aboutContent = `
<h3>Education</h3>
<ul>
  <li><strong>Motilal Nehru National Institute of Technology (MNNIT), Allahabad</strong>
    <br>Bachelor of Technology in Information Technology (2020 - 2024) - 7 CGPA</li>
  <li><strong>Indian School Salalah</strong>
    <br>Class X (2018) - CBSE: 82%
    <br>Class XII (2020) - CBSE: 90%</li>
</ul>

<h3>Skills</h3>
<ul>
  <li><strong>Programming Languages:</strong> C, C++, Python</li>
  <li><strong>Web Development:</strong> Node.js, React, Express, EJS, RESTful APIs, Git</li>
  <li><strong>Databases:</strong> SQL, MongoDB, Mongoose</li>
  <li><strong>Data Structures & Algorithms:</strong> Solved over 300 questions on LeetCode and GeeksforGeeks</li>
</ul>

<h3>Certifications</h3>
<ul>
  <li>Web Development Course by Angela Yu - Udemy</li>
  <li>Data Analytics Essentials Course - Cisco</li>
  <li>Introduction to Cybersecurity Course - Cisco</li>
</ul>

<h3>Projects</h3>
<ul>
  <li><strong>F1 Website:</strong> A fully functional website that fetches live data from the F1 API and displays it in real-time. This project, built using React, showcases API integration and responsive design. <a href="https://f1-website-psi.vercel.app/" target="_blank">View Project</a></li>
  
  <li><strong>Spammy Words Checker:</strong> A tool designed for email marketers to identify and highlight spammy words in their content, helping to improve email deliverability. Built using React. <a href="https://spam-words-checker.vercel.app/" target="_blank">View Project</a></li>
  
  <li><strong>DNS Checker:</strong> A DNS record checker that verifies TXT, DKIM, DMARC, and other DNS records. This React-based app provides a user-friendly interface for domain administrators. <a href="https://dnsrecords.netlify.app/" target="_blank">View Project</a></li>
  
  <li><strong>Lead List Verifier:</strong> A bulk email verification tool that validates email lists, making it ideal for email marketing campaigns. Built with React. <a href="https://lead-list-verifier.vercel.app/" target="_blank">View Project</a></li>
  
  <li><strong>E-Commerce Website:</strong> A comprehensive e-commerce platform featuring user authentication, SQL database integration, and a responsive design, all built using React. <a href="https://e-commerce-five-rho-42.vercel.app/" target="_blank">View Project</a></li>
  
  <li><strong>Keeper's App:</strong> A sticky notes application that helps users organize tasks and reminders, created using React. <a href="https://keeper-app-hazel.vercel.app/" target="_blank">View Project</a></li>
  
  <li><strong>ESP Finder:</strong> A tool to find email service providers by verifying MX records. It supports both single and bulk verification. Built using React. <a href="https://github.com/RisheshG/Esp-Finder" target="_blank">View Project</a></li>
  
  <li><strong>Ramp-Up Plan Generator:</strong> A website that generates ramp-up plans for domains, allowing users to download the plan in .csv format. Built using React. <a href="https://rampup-plan.vercel.app/" target="_blank">View Project</a></li>
  
  <li><strong>Blacklist Checker:</strong> A tool that checks the blacklisting status of IPs or domains across multiple websites, built using React. <a href="https://blacklistchecker.netlify.app/" target="_blank">View Project</a></li>
  
  <li><strong>Email Tools Website:</strong> A collection of essential tools for email marketers, including a secondary domain name generator and email header analyzer. Built with React. <a href="https://email-tools.vercel.app/" target="_blank">View Project</a></li>
  
  <li><strong>To-Do List:</strong> A simple yet effective to-do list app that helps users organize tasks. Developed using React. <a href="https://to-do-list-nine-phi-61.vercel.app/" target="_blank">View Project</a></li>
  
  <li><strong>Kanban Board:</strong> A task management board that fetches data from APIs and allows sorting based on user needs. Created using React. <a href="https://kanbanboard-20208105.netlify.app/" target="_blank">View Project</a></li>
  
  <li><strong>Simon Game:</strong> A memory-based game that challenges players to repeat sequences of colors. This classic game was built using HTML, CSS, and JavaScript. <a href="https://risheshg.github.io/Simon-Game/" target="_blank">View Project</a></li>
  
  <li><strong>Python Automation Script:</strong> A Python script designed to automate the manual warmup process for email marketing. <a href="https://github.com/RisheshG/Automation-Script" target="_blank">View Project</a></li>
</ul>

<p><em>And many more smaller projects such as a QR code generator, blog website, and more...</em></p>

<h3>Achievements & Activities</h3>
<ul>
  <li><strong>Professional Experience:</strong> Currently working as an intern at <em>XGrowth</em> (June 2024 - Present), where I am gaining hands-on experience in real-world projects and honing my skills in web and app development.</li>
  
  <li><strong>Projects:</strong> Successfully completed over 30 major and minor projects across diverse domains, showcasing my ability to adapt and deliver in various technical environments. These projects have helped me develop a deep understanding of different technologies and improve my problem-solving skills.</li>
  
  <li><strong>Extracurricular Activities:</strong> Actively participated in numerous literary events, including debates and essay competitions, where I sharpened my communication and critical thinking skills.</li>
  
  <li><strong>Sports:</strong> A dedicated member of the football team, contributing to several victories through teamwork and leadership. I have also earned multiple accolades in various athletic competitions, reflecting my commitment to maintaining a well-rounded lifestyle.</li>
</ul>
`;

const contactContent = `
<p>If you have any questions or would like to discuss potential collaboration opportunities, feel free to get in touch with me through any of the following channels:</p>
<ul>
  <li><strong>Email:</strong> <a href="mailto:rishesh.certificates@gmail.com">rishesh.certificates@gmail.com</a></li>
  <li><strong>GitHub:</strong> <a href="https://github.com/RisheshG" target="_blank">github.com/RisheshG</a></li>
  <li><strong>Phone:</strong> +91 95285 06236</li>
  <li><strong>Address:</strong> Sector 117, NOIDA, Uttar Pradesh, India</li>
</ul>
`;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
