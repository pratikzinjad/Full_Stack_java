
========================
Java Basics Test Website
========================

Overview
This is a practice-only test website for assessing fundamental understanding of Java basics. It includes a timed quiz, instant explanations, detailed results, topic-wise breakdown, and light/dark themes. It is intended for learning and self-assessment, not for certification or official evaluation.

Key Features
- Practice-only test banner and badges indicating it is a test/demo website.
- 10 curated multiple-choice questions covering Java syntax, types, OOP, control flow, strings, collections, exceptions, access modifiers, integer division, and generics.
- Timer (10 minutes) with visible countdown.
- Progress indicator reflecting how many questions have been answered.
- Per-question explanations revealed as users navigate.
- Final result with circular score visualization (percentage), raw score, time used, and skill band.
- Topic breakdown to see strengths and weaknesses.
- Full review of all answers with correctness indicators.
- Export result to a text file.
- Saves local attempt history in the browser’s local storage.
- Light/Dark theme with preference saved locally.
- Keyboard navigation (Left/Right arrows).
- Accessible option selection (click anywhere on an option).

Files
- index.html    HTML structure and content of the website.
- styles.css    Styling, layout, and responsive design (including dark theme and test banners).
- script.js     Quiz logic, timer, scoring, rendering, exporting, and local storage.
- readme.txt    This documentation file.

How To Run
1) Download or clone the project into a local folder.
2) Ensure the three files (index.html, styles.css, script.js) are in the same directory.
3) Open index.html in any modern web browser (Chrome, Edge, Firefox, Safari).
4) Click “Start Test” and complete the quiz.
5) View your results, export them if needed, or click “Retry” to take the test again.

How Scoring Works
- Each question is worth one point.
- Score Percentage = (Correct Answers / Total Questions) * 100.
- Banding:
  - 90–100%: Expert
  - 75–89%: Proficient
  - 60–74%: Intermediate
  - 40–59%: Beginner
  - 0–39%: Novice

Topics Covered
- Syntax: main method, general structure.
- Types: primitives, defaults.
- OOP: inheritance, interfaces vs classes.
- Control Flow: increments, evaluation order.
- Strings: equality and comparison.
- Collections: List vs Set vs Queue vs Map.
- Exceptions: checked vs unchecked.
- Modifiers: protected/default/private/public.
- Basics: integer division behavior.
- Generics: method signatures.

Test/Practice Notice
- This is a test/practice website intended for learning.
- Scores are indicative and have no official standing.
- The site includes “TEST” badges, a top test banner, and a watermark on the intro card.
- Robots are instructed not to index this site (noindex, nofollow).

Customization
- To add or edit questions: open script.js and modify the QUESTIONS array (topic, text, choices, correct, explanation).
- To change the time limit: update LIMIT_SECONDS in script.js.
- To adjust color themes and styles: edit CSS variables and classes in styles.css.
- To remove or change the test banner/badges/watermark: edit HTML in index.html and related CSS classes in styles.css.

Troubleshooting
- If the timer does not start, ensure JavaScript is enabled in the browser.
- If styles don’t apply, confirm styles.css is in the same folder and linked correctly in index.html.
- If export does not download, the browser may block popups; allow downloads for the page.
- If nothing appears when opening index.html, try serving via a local server or check the browser console for errors (F12 → Console).

Browser Support
- Latest versions of Chrome, Firefox, Edge, and Safari are recommended.
- Mobile layout is responsive but the quiz is most comfortable on tablet/desktop.

Licensing and Use
- For educational and personal practice use. Adapt as needed for classroom demos or internal training.
- Remove the “TEST” indicators only if publishing a production-ready site and documentation.

Changelog (suggested)
- v1.0.0: Initial release with 10 questions, timer, explanations, results visualization, export, dark mode, and test site indicators.

Contact/Feedback
- Open the project, review script.js and styles.css for customization points.
- For issues, verify file paths and browser console errors first.
