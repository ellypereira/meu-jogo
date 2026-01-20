/* ===============================
   🖼️ GALLERY — BLOOD AND SILENCE
   =============================== */

document.addEventListener("DOMContentLoaded", () => {

  const gallery = document.getElementById("gallery");

  const CG_LIST = [
    { id: "cg_forest_fall", src: "assets/cg/floresta_queda.jpg" },
    { id: "cg_mansion_room", src: "assets/cg/quarto_mansao.jpg" }
  ];

  CG_LIST.forEach(cg => {
    const img = document.createElement("img");
    img.src = isCGUnlocked(cg.id) ? cg.src : "assets/ui/locked.png";
    img.className = "cg-thumb";

    if (isCGUnlocked(cg.id)) {
      img.onclick = () => openCG(cg.src);
    }

    gallery.appendChild(img);
  });

});

function openCG(src) {
  const modal = document.getElementById("cg-modal");
  const img = document.getElementById("cg-full");

  img.src = src;
  modal.classList.remove("hidden");
}

function closeCG() {
  document.getElementById("cg-modal").classList.add("hidden");
}
