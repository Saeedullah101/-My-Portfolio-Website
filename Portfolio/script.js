// Text Animation
let words = document.querySelectorAll(".word");
words.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);

// Active Menu on Scroll
let menuLi = document.querySelectorAll('header ul li a');
let sections = document.querySelectorAll('section');

function activeMenu() {
  let len = sections.length;
  while (--len && window.scrollY + 97 < sections[len].offsetTop) {}
  menuLi.forEach(sec => sec.classList.remove("active"));
  menuLi[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll", activeMenu);

// Sticky Header
const header = document.querySelector('header');
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", this.window.scrollY > 50);
});

// Scroll Animations and Skill Bars Animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add class for section animations
        entry.target.classList.add("in-view");

        // Trigger skill bars animation
        if (entry.target.classList.contains("skills")) {
          const skillBars = entry.target.querySelectorAll(".skill-bar .bar span");
          skillBars.forEach((bar) => {
            bar.style.animation = "fillBar 2s ease-in-out forwards";
          });
        }
      }
    });
  },
  {
    threshold: 0.5, // Trigger when 50% of the element is visible
  }
);

// Observe all sections
sections.forEach((section) => {
  observer.observe(section);
});



// Toggle Mobile Menu
const menuIcon = document.getElementById("menu-icon");
const navlist = document.querySelector(".navlist");

menuIcon.addEventListener("click", () => {
  navlist.classList.toggle("active");
  menuIcon.classList.toggle("bx-x");
});

// Close Mobile Menu When a Link is Clicked
navlist.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navlist.classList.remove("active");
    menuIcon.classList.remove("bx-x");
  });
});




