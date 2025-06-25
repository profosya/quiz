let InstrumentSans;
let InstrumentSerif;

// Image collections for character parts

let bodyColorImages = {};
let faceImages = {};
let hatsImages = {};
let tshirtImages = {};
let bootsImages = {};
let pantsImages = {};

// Default images

let defaultImages = {};

// Fade animation variables

let fadeState = "none"; // "none", "fadeOut", "fadeIn"
let fadeAlpha = 0;
let fadeContainer = null;
let nextSlideReady = false;

currentSlide = 0;
elements = [];
answers = [];

  // Load fonts

function preload() {

  InstrumentSans = loadFont('InstrumentSans-VariableFont_wdth,wght.ttf');
  InstrumentSerif = loadFont('InstrumentSerif-Regular.ttf');
  
  // Define the image categories and their options
  
  const categories = [
    {name: "bodycolor", options: ["red", "blue", "yellow", "green", "white", "black", "brown", "pink", "purple", "orange"]},
    
    {name: "face", options: ["indifference", "calmness", "excitement", "curiosity", "sadness", "anxiety", "joy", "tiredness", "anger", "boredom"]},
    
    {name: "hats", options: ["city_sounds", "people", "animals", "music", "rain", "home_sounds", "wind", "nature_sounds", "appliances", "silence"]},
    
    {name: "tshirt", options: ["soft", "hard", "smooth", "rough", "warm", "neutral_temperature", "cold", "wet", "nothing", "dry"]},
    
    {name: "boots", options: ["fresh", "floral", "earthy", "smoky", "musty", "nothing", "artificial", "sweet", "spicy", "food_related"]},
    
    {name: "pants", options: ["sweet", "salty", "sour", "bitter", "fruity", "nothing", "creamy", "savory", "fresh", "spicy"]}
  ];
  
  // Create collections for each category
  
  const collections = {
    "bodycolor": bodyColorImages,
    "face": faceImages,
    "hats": hatsImages,
    "tshirt": tshirtImages,
    "boots": bootsImages,
    "pants": pantsImages
  };
  
  // Load all images for each category
  
  categories.forEach(category => {
    category.options.forEach(option => {
      try {
        collections[category.name][option] = loadImage(
          `${category.name}/${option}.png`,
          () => console.log(`Loaded ${category.name}/${option}.png`),
          () => console.log(`Failed to load ${category.name}/${option}.png`)
        );
      } catch (e) {
        console.log(`Error attempting to load ${category.name}/${option}.png:`, e);
      }
    });
  });
}

function setup() {
  createCanvas(0, 0);
  loadSlides();
  createFadeOverlay();
}

  // Create a div that will serve as our fade overlay

function createFadeOverlay() {
  
  fadeContainer = createDiv();
  fadeContainer.position(0, 0);
  fadeContainer.style('position', 'fixed');
  fadeContainer.style('width', '100%');
  fadeContainer.style('height', '100%');
  fadeContainer.style('background-color', 'white');
  fadeContainer.style('opacity', '0');
  fadeContainer.style('pointer-events', 'none'); // Don't block interaction
  fadeContainer.style('z-index', '1000');
  fadeContainer.style('transition', 'opacity 0.7s ease'); // CSS transition for smooth fade
}

function loadSlides() {
  // If coming from a fade transition, handle it
  if (fadeState === "fadeOut") {
    fadeState = "fadeIn";
    fadeAlpha = 1;
    updateFadeOverlay();
    
    // Clear previous slide elements
    
    for (let i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
    elements = [];
    
    // Create the new slide content
    
    createSlideContent();
    
    fadeAlpha = 0;
    updateFadeOverlay();
    setTimeout(() => {
      fadeState = "none";
    }, 700); // Match the CSS transition duration
  } else {
    
    // First time or reset - just load the slide directly
    
    for (let i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
    elements = [];
    createSlideContent();
  }
}

function createSlideContent() {
  if (currentSlide == 0) {
    createSlides0();
  } else if (currentSlide == 1) {
    createSlides1();
  } else if (currentSlide == 2) {
    createSlides2();
  } else if (currentSlide == 3) {
    createSlides3();
  } else if (currentSlide == 4) {
    createSlides4();
  } else if (currentSlide == 5) {
    createSlides5();
  } else if (currentSlide == 6) {
    createSlides6();
  } else if (currentSlide == 7) {
    createSlides7();
  }
}

function updateFadeOverlay() {
  if (fadeContainer) {
    fadeContainer.style('opacity', fadeAlpha);
  }
}

// Button

function drawButton(label, x, y) {
  
  button = createButton(label);
  button.position(x, y);
  button.value(label);
  button.style("font-family", "InstrumentSans");
  button.style("font-size", "24px");
  button.style("padding", "10px 40px");
  button.style("border-radius", "100px");
  button.style("cursor", "pointer");
  button.mousePressed(buttonClick);

  elements.push(button);
}

function drawParagraph(text, x, y) {
  
  p = createP(text);
  p.position(x, y);
  p.style("font-family", "InstrumentSerif");
  p.style("font-size", "96px");
  p.style("line-height", "100%");
  p.style("width", "1040px");
  p.style("z-index", "-1");
  elements.push(p);
}

function drawText(text, x, y) {
  
  t = createP(text);
  t.position(x, y);
  t.style("font-family", "InstrumentSans");
  t.style("font-size", "24px");
  t.style("width", "930px");
  t.style("z-index", "-1");
  
  elements.push(t);
  
}

function buttonClick(event) {
  if (fadeState !== "none") return;
  collectAnswer(event);
  fadeState = "fadeOut";
  fadeAlpha = 1;
  updateFadeOverlay();

  setTimeout(() => {
    currentSlide++;
    loadSlides();
  }, 700); // Match the CSS transition duration
}

function collectAnswer(event) {
  if (currentSlide === 0) {
    console.log("Starting the questionnaire");
  } else {
    answers.push(event.target.value);
    console.log("Collected answer:", event.target.value);
    console.log("answers so far:", answers);
  }
}

function createSlides0() { 
  
  drawParagraph("What Do You Feel?", 178, 320);
  drawText("For each question, please select only one option before moving on to the next. At the end, a surprise awaits you! Are you ready?", 460, 560);
  drawButton("Start", 892, 720);
}

function createSlides1() { 
  drawButton("Red", 337, 231);
  drawButton("Blue", 812, 161);
  drawButton("Yellow", 951, 161);
  drawButton("Green", 1445, 301);
  drawButton("White", 178, 837);
  drawButton("Black", 337, 837);
  drawButton("Brown", 653, 747);
  drawButton("Pink", 970, 747);
  drawButton("Purple", 1128, 837);
  drawButton("Orange", 1287, 667);
  
  drawParagraph("Look around you: what is the first color you saw?", 178, 320);
  drawText("[ Colors ]", 178, 610);
}

function createSlides2() { 
  drawButton("Indifference", 337, 231);
  drawButton("Calmness", 812, 161);
  drawButton("Excitement", 1011, 161);
  drawButton("Curiosity", 1445, 301);
  drawButton("Sadness", 178, 837);
  drawButton("Anxiety", 361, 837);
  drawButton("Joy", 653, 747);
  drawButton("Tiredness", 970, 747);
  drawButton("Anger", 1128, 837);
  drawButton("Boredom", 1287, 667);
  
  drawParagraph("What emotion are you feeling right now?", 178, 320);
  drawText("[ Emotions ]", 178, 610);
}

function createSlides3() { 
  drawButton("City sounds", 337, 231);
  drawButton("People", 812, 161);
  drawButton("Animals", 979, 161);
  drawButton("Music", 1445, 301);
  drawButton("Rain", 178, 837);
  drawButton("Home Sounds", 317, 837);
  drawButton("Wind", 653, 747);
  drawButton("Nature Sounds", 970, 747);
  drawButton("Appliances", 1128, 837);
  drawButton("Silence", 1287, 667);
  
  drawParagraph("Listen to what's happening around you. What stands out the most to your ears?", 178, 260);
  drawText("[ Hearing ]", 178, 650);
}

function createSlides4() { 
  drawButton("Soft", 337, 231);
  drawButton("Hard", 812, 161);
  drawButton("Smooth", 956, 161);
  drawButton("Rough", 1445, 301);
  drawButton("Warm", 178, 837);
  drawButton("Neutral Temperature", 337, 837);
  drawButton("Cold", 653, 747);
  drawButton("Wet", 970, 747);
  drawButton("Nothing", 1128, 837);
  drawButton("Dry", 1287, 667);

  drawParagraph("You’re probably touching some kind of surface right now. What does it feel like?", 178, 260);
  drawText("[ Touching ]", 178, 650);
}


function createSlides5() { 
  drawButton("Fresh", 337, 231);
  drawButton("Floral", 812, 161);
  drawButton("Earthy", 964, 161);
  drawButton("Smoky", 1445, 301);
  drawButton("Musty", 178, 837);
  drawButton("Nothing", 338, 837);
  drawButton("Artificial", 653, 747);
  drawButton("Sweet", 970, 747);
  drawButton("Spicy", 1128, 837);
  drawButton("Food Related", 1287, 667);

  drawParagraph("Pay attention to your surroundings: what smell do you notice right now?", 178, 260);
  drawText("[ Smelling ]", 178, 650);
}

function createSlides6() { 
  drawButton("Sweet", 337, 231);
  drawButton("Salty", 812, 161);
  drawButton("Sour", 957, 161);
  drawButton("Bitter", 1445, 301);
  drawButton("Fruity", 178, 837);
  drawButton("Nothing", 333, 837);
  drawButton("Creamy", 653, 747);
  drawButton("Savory", 970, 747);
  drawButton("Fresh", 1128, 837);
  drawButton("Spicy", 1287, 667);

  drawParagraph("Think about the last taste you had. What flavor was it?", 178, 320);
  drawText("[ Tasting ]", 178, 610);
}

function createSlides7() {
  const resultText = createP("Here's your personalized character!");
  resultText.style("font-family", "InstrumentSerif");
  resultText.style("font-size", "96px");
  resultText.style("text-align", "center");
  resultText.style("margin", "0");
  elements.push(resultText);

  const container = createDiv();
  container.style('width', '800px');
  container.style('height', 'auto');
  container.style('position', 'relative');
  container.style('margin', 'auto');
 
  
  const imageMappings = [
    { answer: answers[0], category: "body_color", collection: bodyColorImages },
    { answer: answers[1], category: "face", collection: faceImages },
    { answer: answers[2], category: "hats", collection: hatsImages },
    { answer: answers[3], category: "tshirt", collection: tshirtImages },
    { answer: answers[4], category: "boots", collection: bootsImages },
    { answer: answers[5], category: "pants", collection: pantsImages }
  ];
  
  const characterCanvas = createGraphics(1600, 1340);
  characterCanvas.background(255, 255, 255, 0);
  
  imageMappings.forEach((mapping, index) => {
    const safeAnswer = mapping.answer ? mapping.answer.toLowerCase().replace(/ /g, '_') : null;
    
    let img = mapping.collection[safeAnswer];
    characterCanvas.image(img, 0, 0, 1600, 1340);
  });
  
  // Create an image from the canvas and add it to the container
  
  const finalCharacter = createImg(characterCanvas.elt.toDataURL(), 'character');
  finalCharacter.parent(container);
  finalCharacter.style('width', '100%');
  finalCharacter.style('height', 'auto');
  finalCharacter.style('padding-left', '45px');
  
  // Initialize opacity to 0 for fade-in effect
  
  finalCharacter.style('opacity', '0');
  
  // Create fade-in animation
  
  let opacity = 0;
  let fadeInterval = setInterval(() => {
    opacity += 0.025;
    if (opacity >= 1) {
      opacity = 1;
      clearInterval(fadeInterval);
    }
    finalCharacter.style('opacity', opacity);
  }, 50);

  const startOverBtn = createButton("Start Again");
  startOverBtn.parent(container);
  startOverBtn.style("font-family", "InstrumentSans");
  startOverBtn.style("font-size", "24px");
  startOverBtn.style("padding", "10px 40px");
  startOverBtn.style("border-radius", "100px");
  startOverBtn.style("cursor", "pointer");
  startOverBtn.style("display", "block");
  startOverBtn.style("margin", "20px auto");
  startOverBtn.mousePressed(resetQuiz);
  
  elements.push(container);
}

function resetQuiz() {
  // Reset all state
  currentSlide = 0;
  answers = [];
  
  // Start fade out
  fadeState = "fadeOut";
  fadeAlpha = 1;
  updateFadeOverlay();
  
  // After fade out completes, reload first slide
  setTimeout(() => {
    // Clear any existing elements
    for (let i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
    elements = [];
    
    loadSlides();
    console.log("Quiz restarted");
  }, 700); // Match the CSS transition duration
}