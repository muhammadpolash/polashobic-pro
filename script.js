// script.js
document.addEventListener("DOMContentLoaded", function() {
  // Login Button Event
  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', function() {
    const username = prompt("Enter your name to login:");
    if (username) {
      localStorage.setItem("username", username);
      alert(`Welcome, ${username}`);
    }
  });

  // Dark Mode, Light Mode, and Reading Mode Toggle
  const darkModeButton = document.getElementById('darkModeButton');
  const lightModeButton = document.getElementById('lightModeButton');
  const readingModeButton = document.getElementById('readingModeButton');

  darkModeButton.addEventListener('click', () => {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode', 'reading-mode');
  });

  lightModeButton.addEventListener('click', () => {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode', 'reading-mode');
  });

  readingModeButton.addEventListener('click', () => {
    document.body.classList.add('reading-mode');
    document.body.classList.remove('dark-mode', 'light-mode');
  });

  // Article Upload and Display
  const articleInput = document.getElementById('articleInput');
  const submitArticleButton = document.getElementById('submitArticle');
  const articleContainer = document.getElementById('articleContainer');
  let articleContent = '';

  submitArticleButton.addEventListener('click', () => {
    articleContent = articleInput.value;
    if (articleContent) {
      articleContainer.innerHTML = `<h3>Article</h3><p>${articleContent}</p>`;
      alert('Article submitted successfully!');
    } else {
      alert('Please enter an article.');
    }
  });

  // Exam Questions (10 Questions Derived from Article)
  const questionsContainer = document.getElementById('questionsContainer');
  const questions = [
    { question: "What is the Arabic word for 'book'?", options: ["Kitab", "Qalam", "Sayara"], answer: "Kitab" },
    { question: "What is the Arabic word for 'car'?", options: ["Sayara", "Maktab", "Kitab"], answer: "Sayara" },
    { question: "What is the Arabic word for 'pen'?", options: ["Qalam", "Kitab", "Bab"], answer: "Qalam" },
    { question: "What is the Arabic word for 'door'?", options: ["Bab", "Sayara", "Qalam"], answer: "Bab" },
    { question: "What is the Arabic word for 'house'?", options: ["Bait", "Kitab", "Maktab"], answer: "Bait" },
    { question: "What is the Arabic word for 'teacher'?", options: ["Mudarris", "Sayara", "Bab"], answer: "Mudarris" },
    { question: "What is the Arabic word for 'school'?", options: ["Madrasa", "Bait", "Qalam"], answer: "Madrasa" },
    { question: "What is the Arabic word for 'student'?", options: ["Talib", "Bab", "Mudarris"], answer: "Talib" },
    { question: "What is the Arabic word for 'chair'?", options: ["Kursi", "Madrasa", "Bait"], answer: "Kursi" },
    { question: "What is the Arabic word for 'apple'?", options: ["Tufaha", "Talib", "Kitab"], answer: "Tufaha" },
  ];

  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>${index + 1}. ${q.question}</p>
      ${q.options.map(option => `<label><input type="radio" name="q${index}" value="${option}"> ${option}</label><br>`).join('')}
    `;
    questionsContainer.appendChild(div);
  });

  // Submit Exam and Generate Certificate
  const submitExamButton = document.getElementById('submitExam');
  const certificateContainer = document.getElementById('certificateContainer');

  submitExamButton.addEventListener('click', function() {
    let score = 0;
    questions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected && selected.value === q.answer) {
        score++;
      }
    });

    if (score === 10) {
      const username = localStorage.getItem("username") || "Student";
      const certificateHtml = `
        <div>
          <h3>Certificate of Completion</h3>
          <p>YOU, ${username}, have completed our Polabic Arabic Language course successfully!</p>
          <p>Instructor: Muhammad Polash Khan</p>
          <button id="downloadCertificate">Download Certificate</button>
        </div>
      `;
      certificateContainer.innerHTML = certificateHtml;
      certificateContainer.style.display = "block";

      // Download certificate functionality
      const downloadButton = document.getElementById('downloadCertificate');
      downloadButton.addEventListener('click', function() {
        window.print(); // Basic download as PDF using browser's print functionality
      });
    } else {
      alert(`Your score is ${score}/10. Try again!`);
    }
  });
});
