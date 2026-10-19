// --- 1. DATA STRUCTURES (Sequences & Narratives) ---
const stories = {
  sequenceA: {
    title: "The Spark",
    tagline: "A progression toward vulnerability and connection.",
    steps: [
      {
        stage: "Beginning",
        image: "images/walk.jpg",
        alt: "Two people walking side-by-side along a city sidewalk during the day",
        caption: "A quiet afternoon meetup. Walking side by side through the city, conversation flows effortlessly as curious glances bridge the distance between two strangers."
      },
      {
        stage: "Middle",
        image: "images/dinner.jpg",
        alt: "Candlelit restaurant table with food, juice, and warm ambiance",
        caption: "Dusk arrives over shared food and glowing candlelight. The laughter turns softer and more honest, grounding the feeling that this evening is becoming something special."
      },
      {
        stage: "End",
        image: "images/hands.jpg",
        alt: "Two hands holding over the car gear shift illuminated by red dashboard lights",
        caption: "Midnight on the quiet drive home. Hands find each other across the console under the warm red glow—a quiet unspoken promise that the journey has just begun."
      }
    ]
  },
  sequenceB: {
    title: "The Drift",
    tagline: "A reflection on fading intimacy and growing distance.",
    steps: [
      {
        stage: "Beginning",
        image: "images/hands.jpg",
        alt: "Two hands holding tightly in the glow of car dashboard lights",
        caption: "A late-night drive gripped by heavy tension. Hands hold tight over the gearshift, holding on with urgency as if trying to grasp something that is already slipping away."
      },
      {
        stage: "Middle",
        image: "images/dinner.jpg",
        alt: "A solitary meal at a table with a candle glowing between them",
        caption: "An uneasy dinner under dim candlelight. The gestures are polite and familiar, yet words fall short, and the space across the table feels wider than ever before."
      },
      {
        stage: "End",
        image: "images/walk.jpg",
        alt: "Two people walking away down the sidewalk into the daylight",
        caption: "The morning after in plain daylight. Walking together yet worlds apart, steps falling out of sync as they step back into their separate lives."
      }
    ]
  }
};

// --- 2. STATE VARIABLES ---
let currentSequenceKey = "sequenceA";
let currentStepIndex = 0;

// --- 3. DOM ELEMENT REFERENCES ---
const storyTitleEl = document.getElementById("story-title");
const storyTaglineEl = document.getElementById("story-tagline");
const stageLabelEl = document.getElementById("stage-label");
const storyImgEl = document.getElementById("story-img");
const imageFrameEl = document.getElementById("image-frame");
const storyTextEl = document.getElementById("story-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const tabBtnA = document.getElementById("btn-seq-a");
const tabBtnB = document.getElementById("btn-seq-b");
const dots = document.querySelectorAll(".dot");

// --- 4. FUNCTIONS ---

// Update visual indicators and view content based on current state
function renderStory() {
  const currentStory = stories[currentSequenceKey];
  const step = currentStory.steps[currentStepIndex];

  // Subtle fade transition for smoother interaction
  imageFrameEl.classList.add("fade-out");

  setTimeout(() => {
    // Update texts and image source
    storyTitleEl.textContent = currentStory.title;
    storyTaglineEl.textContent = currentStory.tagline;
    stageLabelEl.textContent = `${step.stage} (${currentStepIndex + 1}/3)`;
    
    storyImgEl.src = step.image;
    storyImgEl.alt = step.alt;
    storyTextEl.textContent = step.caption;

    imageFrameEl.classList.remove("fade-out");
  }, 150);

  // Update button states
  prevBtn.disabled = currentStepIndex === 0;
  nextBtn.disabled = currentStepIndex === currentStory.steps.length - 1;

  // Update step indicator dots
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentStepIndex);
  });
}

// Switch between Sequence A and Sequence B
function switchSequence(sequenceKey) {
  if (currentSequenceKey === sequenceKey) return;

  currentSequenceKey = sequenceKey;
  currentStepIndex = 0; // Reset to Beginning

  // Update active tab styles
  tabBtnA.classList.toggle("active", sequenceKey === "sequenceA");
  tabBtnB.classList.toggle("active", sequenceKey === "sequenceB");

  renderStory();
}

// Next step navigation
function nextStep() {
  if (currentStepIndex < stories[currentSequenceKey].steps.length - 1) {
    currentStepIndex++;
    renderStory();
  }
}

// Previous step navigation
function prevStep() {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    renderStory();
  }
}

// --- 5. EVENT LISTENERS ---

// Sequence toggle buttons
tabBtnA.addEventListener("click", () => switchSequence("sequenceA"));
tabBtnB.addEventListener("click", () => switchSequence("sequenceB"));

// Navigation controls
nextBtn.addEventListener("click", nextStep);
prevBtn.addEventListener("click", prevStep);

// Optional: Clicking directly on the image advances to the next step
storyImgEl.addEventListener("click", () => {
  if (currentStepIndex < stories[currentSequenceKey].steps.length - 1) {
    nextStep();
  } else {
    // Loop back to beginning if at the end
    currentStepIndex = 0;
    renderStory();
  }
});

// Keyboard arrow navigation
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextStep();
  if (e.key === "ArrowLeft") prevStep();
});

// --- 6. INITIALIZATION ---
renderStory();