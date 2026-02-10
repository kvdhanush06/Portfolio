/* ═══════════════════════════════════════════════
   PORTFOLIO — JavaScript
   Terminal engine, typing animation, scroll effects
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── TYPING ANIMATION ───────────────────────────
  const roles = [
    'Backend Developer',
    'ML Engineer',
    'Systems Builder',
    'Python Developer',
    'API Architect',
  ];

  const typedEl = document.getElementById('typedRole');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const TYPING_SPEED = 80;
  const DELETING_SPEED = 40;
  const PAUSE_END = 2000;
  const PAUSE_START = 500;

  function typeRole() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeRole, PAUSE_END);
        return;
      }
      setTimeout(typeRole, TYPING_SPEED);
    } else {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, PAUSE_START);
        return;
      }
      setTimeout(typeRole, DELETING_SPEED);
    }
  }

  typeRole();

  // ─── SCROLL ANIMATIONS (IntersectionObserver) ──
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  fadeEls.forEach((el) => observer.observe(el));

  // ═══════════════════════════════════════════════
  // TERMINAL ENGINE
  // ═══════════════════════════════════════════════

  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalBody = document.getElementById('terminalBody');

  let commandHistory = [];
  let historyIndex = -1;

  // Focus terminal on click anywhere in body
  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.value.trim().toLowerCase();
      if (cmd) {
        commandHistory.push(cmd);
        historyIndex = commandHistory.length;
      }
      addPromptLine(terminalInput.value);
      processCommand(cmd);
      terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      autoComplete(terminalInput.value.trim().toLowerCase());
    }
  });

  function addPromptLine(text) {
    var div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML =
      '<span class="terminal-prompt">visitor@portfolio:~$</span>' +
      '<span class="terminal-text">' + escapeHtml(text) + '</span>';
    terminalOutput.appendChild(div);
  }

  function addResponse(html) {
    var div = document.createElement('div');
    div.className = 'terminal-response';
    div.innerHTML = html;
    terminalOutput.appendChild(div);
    scrollTerminal();
  }

  function scrollTerminal() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  var commands = [
    'help', 'welcome', 'about', 'experience', 'projects', 'skills',
    'certifications', 'por', 'awards', 'contact', 'socials',
    'education', 'resume', 'clear'
  ];

  function autoComplete(partial) {
    if (!partial) return;
    var matches = commands.filter(function (c) { return c.startsWith(partial); });
    if (matches.length === 1) {
      terminalInput.value = matches[0];
    } else if (matches.length > 1) {
      addPromptLine(partial);
      addResponse(matches.join('  '));
    }
  }

  function processCommand(cmd) {
    switch (cmd) {
      case '':
        break;

      case 'welcome':
        addResponse(
          '<pre>' +
          '╔══════════════════════════════════════════════════════════╗\n' +
          '║                                                     ║\n' +
          '║   Welcome to Dhanush\'s Portfolio Terminal v1.0      ║\n' +
          '║                                                     ║\n' +
          '║   Type \'help\' to see available commands.            ║\n' +
          '║                                                     ║\n' +
          '╚══════════════════════════════════════════════════════════╝' +
          '</pre>'
        );
        break;

      case 'help':
        addResponse(
          '<pre>' +
          'Available commands:\n\n' +
          '  welcome          Welcome message\n' +
          '  about            About me\n' +
          '  experience       Work experience\n' +
          '  projects         Featured projects\n' +
          '  skills           Technical skills\n' +
          '  certifications   Certifications\n' +
          '  por              Positions of responsibility\n' +
          '  awards           Honors & awards\n' +
          '  contact          Contact information\n' +
          '  socials          Social links\n' +
          '  education        Education\n' +
          '  resume           Open resume\n' +
          '  clear            Clear terminal\n' +
          '  help             Show this list\n' +
          '</pre>'
        );
        break;

      case 'about':
        addResponse(
          '<pre>' +
          'About\n' +
          '─────\n\n' +
          'Computer Science Engineering undergraduate at VIT-AP\n' +
          'University with experience in building scalable backend\n' +
          'systems, applied AI, and software engineering.\n\n' +
          'Previously, Backend Developer Intern at StudyCubs, where\n' +
          'I developed real-time analytics pipelines and LLM-powered\n' +
          'automation tools, delivering insights with sub-200ms\n' +
          'latency. At AK Capital Advisors, I designed secure APIs\n' +
          'and optimized database systems supporting large-scale\n' +
          'financial workflows across microservices.\n\n' +
          'Currently, Co-Lead of Deep Learning & Computer Vision\n' +
          'Team at The Machine Learning Club VIT-AP, leading\n' +
          'technical initiatives, mentoring teams, and driving\n' +
          'research in generative models and training optimization.\n' +
          '</pre>'
        );
        break;

      case 'experience':
        addResponse(
          '<pre>' +
          'Work Experience\n' +
          '───────────────\n\n' +
          'Backend Developer Intern\n' +
          '<a href="https://www.linkedin.com/company/study-cubs/" target="_blank" rel="noopener">StudyCubs</a>\n' +
          'Dec 2025 – Jan 2026\n' +
          'Pune, Maharashtra, India · Remote\n\n' +
          '– Built a centralized analytics platform integrating\n' +
          '  Terra API data to enable real-time monitoring for\n' +
          '  5k+ users.\n' +
          '– Implemented FastAPI pipelines to process 40+ days of\n' +
          '  historical and streaming data with 200ms latency.\n' +
          '– Modernized data access using PostgreSQL JSONB schemas\n' +
          '  and LLM-powered queries, reducing analysis effort\n' +
          '  by 50%.\n' +
          '– Tech Stack: Python, FastAPI, SQLAlchemy, PostgreSQL,\n' +
          '  Alembic, Postman, Git, GitHub\n\n' +
          '────────────────────────────────────────\n\n' +
          'Backend Developer Intern\n' +
          '<a href="https://www.linkedin.com/company/ak-capital-advisors/" target="_blank" rel="noopener">AK Capital Advisors</a>\n' +
          'Jun 2025 – Aug 2025\n' +
          'Pune, Maharashtra, India · Remote\n\n' +
          '– Developed secure backend systems to streamline digital\n' +
          '  credit card applications, supporting 1k+ monthly\n' +
          '  submissions.\n' +
          '– Architected 30+ APIs using JWT authentication and rate\n' +
          '  limiting, reducing invalid requests by 40%.\n' +
          '– Designed microservice architecture with PostgreSQL and\n' +
          '  Alembic migrations, improving deployment stability\n' +
          '  by 35%.\n' +
          '– Tech Stack: Python, FastAPI, SQLAlchemy, PostgreSQL,\n' +
          '  Alembic, Supabase, Postman, Git, GitHub\n' +
          '</pre>'
        );
        break;

      case 'projects':
        addResponse(
          '<pre>' +
          'Projects\n' +
          '────────\n\n' +
          '<a href="https://github.com/kvdhanush06/EduToolsHub" target="_blank" rel="noopener">EduToolsHub</a>\n' +
          'Workflow Automation Platform\n\n' +
          '– Automated academic workflow management through task\n' +
          '  scheduling services, improving student productivity.\n' +
          '– Integrated external content APIs to aggregate learning\n' +
          '  resources, reducing manual research time by 40%.\n' +
          '– Tech Stack: Python, Django, REST APIs, Requests,\n' +
          '  YouTube API, Wikipedia API\n\n' +
          '────────────────────────────────────────\n\n' +
          '<a href="https://github.com/kvdhanush06/SociaSphere" target="_blank" rel="noopener">SociaSphere</a>\n' +
          'Social Media Platform Backend\n\n' +
          '– Engineered scalable authentication and media services\n' +
          '  to support concurrent user activity on the platform.\n' +
          '– Optimized feed generation using indexed queries and\n' +
          '  caching strategies, cutting average response time\n' +
          '  by 30%.\n' +
          '– Tech Stack: Python, Django, Pillow, REST APIs\n\n' +
          '────────────────────────────────────────\n\n' +
          '<a href="https://github.com/kvdhanush06/united" target="_blank" rel="noopener">United</a>\n' +
          'Real-Time Tournament Platform\n\n' +
          '– Built a real-time tournament management system with\n' +
          '  secure authentication and live leaderboard\n' +
          '  synchronization.\n' +
          '– Developed a React SPA with lazy-loaded routes,\n' +
          '  reducing initial load time by 40%.\n' +
          '– Designed scalable frontend architecture for multi-user\n' +
          '  competition workflows.\n' +
          '– Tech Stack: React, Firebase Authentication, Firestore,\n' +
          '  Google OAuth, Serverless Backend, Auth State Management,\n' +
          '  Environment Configuration, Client-Side Validation,\n' +
          '  Firebase Analytics\n' +
          '</pre>'
        );
        break;

      case 'skills':
        addResponse(
          '<pre>' +
          'Skills\n' +
          '──────\n\n' +
          'Languages\n' +
          '  Python, JavaScript, Java, C, C++, SQL\n\n' +
          'Backend & Systems\n' +
          '  FastAPI, Django, Flask, Node.js, React,\n' +
          '  REST APIs, JSON Web Token (JWT), Google OAuth,\n' +
          '  Microservices, Serverless Backend,\n' +
          '  Auth State Management, Client-Side Validation,\n' +
          '  Caching\n\n' +
          'Databases & Cloud\n' +
          '  PostgreSQL, Supabase, Firebase,\n' +
          '  Firebase Authentication, Firestore,\n' +
          '  Firebase Analytics,\n' +
          '  Amazon Web Services (AWS),\n' +
          '  Oracle Cloud Infrastructure (OCI),\n' +
          '  Render, Query Optimization\n\n' +
          'Data & Machine Learning\n' +
          '  PyTorch, TensorFlow, OpenCV, Scikit-Learn,\n' +
          '  Pandas, NumPy, Matplotlib, MediaPipe,\n' +
          '  Pillow, SQLAlchemy\n\n' +
          'Generative AI\n' +
          '  Generative AI,\n' +
          '  Generative Adversarial Networks (GANs),\n' +
          '  Large Language Models (LLM),\n' +
          '  Transformer Models, LangChain,\n' +
          '  Retrieval Augmented Generation (RAG),\n' +
          '  Prompt Engineering, Fine Tuning,\n' +
          '  AI Agents, Vector Databases\n\n' +
          'Tools\n' +
          '  Git, GitHub, Alembic, Postman, Jupyter,\n' +
          '  Requests, YouTube API, Wikipedia API,\n' +
          '  Environment Configuration\n' +
          '</pre>'
        );
        break;

      case 'certifications':
      case 'certs':
        addResponse(
          '<pre>' +
          'Certifications\n' +
          '──────────────\n\n' +
          'Oracle\n' +
          '<a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=9A0A7CC8C8DBBE15A972B3642518E75372D91D22C1E469A9DCBB6D2E2750F162" target="_blank" rel="noopener">Oracle Cloud Infrastructure 2025 — Certified Generative AI Professional</a>\n' +
          'Jul 2025\n\n' +
          'NVIDIA\n' +
          '<a href="https://learn.nvidia.com/certificates?id=fZPQ-F1qQWOVo1SjcbS9wA" target="_blank" rel="noopener">Building LLM Applications With Prompt Engineering</a>\n' +
          'Apr 2025\n' +
          '</pre>'
        );
        break;

      case 'por':
        addResponse(
          '<pre>' +
          'Positions of Responsibility\n' +
          '───────────────────────────\n\n' +
          '<a href="https://www.linkedin.com/company/machinelearningclubvitap/" target="_blank" rel="noopener">The Machine Learning Club VIT-AP</a>\n' +
          'Part-time · 2 yrs 6 mos\n' +
          'Amaravati, Andhra Pradesh, India · On-site\n\n' +
          '────────────────────────────────────────\n\n' +
          'Co-Lead of Deep Learning & Computer Vision Team\n' +
          'Aug 2025 – Present · 6 mos\n\n' +
          '– Coordinated a 12-member technical team and structured\n' +
          '  project delivery pipelines to improve execution\n' +
          '  efficiency.\n' +
          '– Directed development of GAN-based image synthesis\n' +
          '  systems, enabling automated sketch-to-image\n' +
          '  generation.\n' +
          '– Established model monitoring and evaluation workflows,\n' +
          '  reducing training failures by 25%.\n' +
          '– Tech Stack: Python, TensorFlow, OpenCV, Git\n\n' +
          '────────────────────────────────────────\n\n' +
          'Member of Deep Learning Team\n' +
          'Sep 2024 – Aug 2025 · 1 yr\n\n' +
          '– Engineered a real-time computer vision pipeline using\n' +
          '  OpenCV and PyTorch, achieving 90%+ accuracy at 30 FPS.\n' +
          '– Documented Transformer and self-attention architectures\n' +
          '  to standardize team onboarding and knowledge sharing.\n' +
          '– Improved model convergence by tuning non-convex\n' +
          '  optimization and gradient descent methods for stable\n' +
          '  training.\n' +
          '– Tech Stack: Python, PyTorch, OpenCV, MediaPipe,\n' +
          '  NumPy, Git\n\n' +
          '────────────────────────────────────────\n\n' +
          'Member of Research Team\n' +
          'Oct 2023 – Sep 2024 · 1 yr\n\n' +
          '– Built automated data preprocessing and feature\n' +
          '  engineering pipelines, improving dataset consistency\n' +
          '  by 20%.\n' +
          '– Optimized and benchmarked Scikit-Learn models to\n' +
          '  enable reliable performance comparison across\n' +
          '  experiments.\n' +
          '– Documented BERT-based NLP architectures to standardize\n' +
          '  model development and experimentation workflows.\n' +
          '– Tech Stack: Python, Scikit-Learn, Pandas, Matplotlib,\n' +
          '  Jupyter, Git\n' +
          '</pre>'
        );
        break;

      case 'awards':
        addResponse(
          '<pre>' +
          'Honors & Awards\n' +
          '───────────────\n\n' +
          'Smart India Hackathon 2023 —\n' +
          'National Round Qualifier (Team Leader)\n' +
          'Issued by VIT-AP · Sep 2023\n\n' +
          '– Led a 5-member team to develop a time-series-based\n' +
          '  weather forecasting system with 7-day prediction\n' +
          '  horizon.\n' +
          '– Built an end-to-end pipeline processing 10k+\n' +
          '  historical records from data ingestion to web\n' +
          '  deployment.\n' +
          '– Improved model accuracy by ~20% through feature\n' +
          '  engineering and hyperparameter tuning.\n' +
          '</pre>'
        );
        break;

      case 'education':
        addResponse(
          '<pre>' +
          'Education\n' +
          '─────────\n\n' +
          'VIT-AP University\n' +
          'Bachelor of Technology, Computer Science & Engineering\n' +
          'Sep 2023 – Jun 2027\n' +
          '</pre>'
        );
        break;

      case 'contact':
        addResponse(
          '<pre>' +
          'Contact Me\n' +
          '──────────\n\n' +
          'Email     <a href="mailto:kvdhanush06@gmail.com">kvdhanush06@gmail.com</a>\n' +
          'LinkedIn  <a href="https://www.linkedin.com/in/venkata-dhanush-k/" target="_blank" rel="noopener">linkedin.com/in/venkata-dhanush-k</a>\n' +
          '</pre>'
        );
        break;

      case 'socials':
        addResponse(
          '<pre>' +
          'Socials\n' +
          '───────\n\n' +
          'GitHub    <a href="https://github.com/kvdhanush06" target="_blank" rel="noopener">github.com/kvdhanush06</a>\n' +
          'YouTube   <a href="https://www.youtube.com/@kvdhanush0608" target="_blank" rel="noopener">youtube.com/@kvdhanush0608</a>\n' +
          '</pre>'
        );
        break;

      case 'resume':
        addResponse('Opening resume in new tab...');
        window.open('https://drive.google.com/file/d/1NCT6ZCa_HfxCdScqI-1Q2yA6y2c7O-qA/view?usp=sharing', '_blank');
        break;

      case 'clear':
        terminalOutput.innerHTML = '';
        break;

      default:
        addResponse(
          "Command not found: '" + escapeHtml(cmd) + "'. Type 'help' for available commands."
        );
    }
  }
})();
