const tops = ["body.png", "camasa.png", "sacou.png"];
const bottoms = ["blugialbastrii.png", "blugigri.png", "rochita.png"];
const shoes = ["pantofigri.png", "tocuri.png"];

let currentTop = 0;
let currentBottom = 0;
let currentShoe = 0;
let shoesActive = false;
let topSelected = false;
let bottomSelected = false;

const infoTexts = {
  top: {
    body: "BODY – 100% TENCEL STRETCH\n✔ Se spală la 30°C, pe un program delicat.\n✔ Ideal este să fie spălat împreună doar cu materiale fine: bumbac, vâscoză, in, poliester delicat.\n✖ Evitați spălarea împreună cu jeansi, lână sau orice material care lasă scame — acestea pot deteriora textura fină a Tencelului.",
    camasa: "TOP ALB – 100% BUMBAC\n✔ Spălare la 30°C.\n✔ Bumbacul este versatil, dar pentru a-l păstra alb și curat:\n✖ Evitați combinarea cu poliester, geacă de fâș, cașmir, mătase sau Tencel – pot apărea scămoșări sau transfer de culoare.",
    sacou: "SACOU – 100% CATIFEA\n✔ Se recomandă spălare manuală sau la curățătorie profesională.\n✔ Catifeaua este un material delicat ce necesită grijă specială.\n✖ Evitați contactul cu haine grele, fermoare, capse, materiale sintetice dure, scai sau textile care lasă culoare."
  },
  bottom: {
    blugialbastrii: "BLUGI ALBAȘTRII – 100% DENIM\n✔ Recomandare: spălare la 30°C, întorși pe dos.\n✖ Nu spălați cu haine deschise la culoare, delicate, pufoase, prosoape, articole cu metal dur, lână sau cașmir – pot provoca decolorare și frecare nedorită.",
    blugigri: "BLUGI GRI – 100% DENIM\n✔ Recomandare: spălare la 30°C, întorși pe dos.\n✖ Nu spălați cu haine deschise la culoare, delicate, pufoase, prosoape, articole cu metal dur, lână sau cașmir – pot provoca decolorare și frecare nedorită.",
    rochita: "ROCHIȚĂ – 100% ELASTAN\n✔ Regim de spălare similar cu Tencel Stretch: 30°C, program delicat.\n✔ Se recomandă spălarea separată sau cu materiale asemănătoare ca finețe.\n✖ Nu combinați cu materiale aspre sau care pot cauza frecare excesivă."
  },
  shoes: {
    pantofigri: "PANTOFI – PIELE ECOLOGICĂ\n✔ Se curăță cu o lavetă umedă și detergent delicat, special pentru materiale sintetice.\n✔ După curățare, se recomandă uscarea naturală, departe de surse directe de căldură.\n✖ Nu se spală la mașină, nu se folosesc perii dure sau soluții pe bază de alcool.\n✖ Evitați depozitarea în spații umede – pielea eco poate crăpa sau se poate exfolia.",
    tocuri: "TOCURI – CATIFEA\n✔ Tocurile din catifea trebuie curățate manual, cu o lavetă moale, uscată sau foarte puțin umedă.\n✔ Pentru pete, se poate folosi o perie moale din cauciuc sau o radieră specială pentru catifea.\n✖ Nu se spală la mașină, nu se înmoaie în apă și nu se folosesc detergenți agresivi.\n✖ Evitați frecarea cu suprafețe dure sau umede – catifeaua își poate pierde textura fină sau se poate păta."
  }
};

function showInfo(section) {
  let name = "";
  if (section === "top") name = tops[currentTop].split('.')[0];
  else if (section === "bottom") name = bottoms[currentBottom].split('.')[0];
  else if (section === "shoes") name = shoes[currentShoe].split('.')[0];

  const info = infoTexts[section][name] || "Informații indisponibile";
  document.getElementById(`info-${section}`).innerText = info;
  document.getElementById(`info-${section}`).style.display = "block";
}

function hideInfo(section) {
  document.getElementById(`info-${section}`).style.display = "none";
}

function updateVideo() {
  const topName = tops[currentTop].split('.')[0];
  const bottomName = bottoms[currentBottom].split('.')[0];
  let videoName = "";

  const isRochita = bottomName === "rochita";

  if (isRochita) {
    videoName = "rochita";
    if (shoesActive) {
      const shoeName = shoes[currentShoe].split('.')[0];
      videoName += `+${shoeName}`;
    }
  } else if (!topSelected && bottomSelected) {
    videoName = `${bottomName}+susinitial`;
  } else if (topSelected && !bottomSelected) {
    videoName = `${topName}+josinitial`;
  } else if (topSelected && bottomSelected) {
    videoName = `${bottomName}+${topName}`;
    if (shoesActive) {
      const shoeName = shoes[currentShoe].split('.')[0];
      videoName += `+${shoeName}`;
    }
  } else {
    videoName = "initialot";
  }

  document.getElementById("video").src = `video-uri/${videoName}.MOV`;
}

function changeTop(dir) {
  currentTop = (currentTop + dir + tops.length) % tops.length;
  topSelected = true;
  document.getElementById("top-img").src = "butoanehaine/" + tops[currentTop];
  updateNextButton();
  updateVideo();
}

function changeBottom(dir) {
  currentBottom = (currentBottom + dir + bottoms.length) % bottoms.length;
  bottomSelected = true;
  document.getElementById("bottom-img").src = "butoanehaine/" + bottoms[currentBottom];
  updateNextButton();
  updateVideo();
}

function changeShoes(dir) {
  currentShoe = (currentShoe + dir + shoes.length) % shoes.length;
  document.getElementById("shoes-img").src = "butoanehaine/" + shoes[currentShoe];
  updateVideo();
}

function updateNextButton() {
  const nextBtn = document.getElementById("next-button");
  const bottomName = bottoms[currentBottom].split('.')[0];
  if (bottomName === "rochita" || (topSelected && bottomSelected)) {
    nextBtn.style.opacity = 1;
    nextBtn.style.pointerEvents = "auto";
  } else {
    nextBtn.style.opacity = 0.5;
    nextBtn.style.pointerEvents = "none";
  }
}

function activateShoes() {
  shoesActive = true;
  document.getElementById("shoes-carousel").style.display = "flex";
  updateVideo();
}

function goFullScreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) elem.requestFullscreen();
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

function restartOutfit() {
  shoesActive = false;
  topSelected = false;
  bottomSelected = false;
  document.getElementById("video").src = "video-uri/initialot.MOV";
  document.getElementById("shoes-carousel").style.display = "none";
  updateNextButton();
}

function saveOutfit() {
  const msg = document.getElementById("save-msg");
  msg.style.display = "block";
  setTimeout(() => msg.style.display = "none", 2000);
}

window.onload = updateNextButton;