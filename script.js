const WA = "27793340711";
const sel = (n, opts, id) =>
  `<label for="${id}">${n}</label><select id="${id}" name="${n}">${opts.map((o) => `<option>${o}</option>`).join("")}</select>`;
const inp = (n, id, ph = "", t = "text") =>
  `<label for="${id}">${n}</label><input id="${id}" name="${n}" type="${t}" placeholder="${ph}">`;
const ta = (n, id, ph) =>
  `<label for="${id}">${n}</label><textarea id="${id}" name="${n}" placeholder="${ph}"></textarea>`;
const T = {
  commission: {
    t: "Commission",
    p: "From R1000",
    s: "Price varies with artwork size and supplies.",
    d: "A drawing or painting made just for you.",
    f: `<div class="row">${sel("Type", ["Drawing", "Painting"], "c1")}${sel("Paint (if painting)", ["Acrylic", "Watercolour", "Not applicable"], "c2")}</div>
  <div class="row">${sel("Surface", ["Paper", "Canvas"], "c3")}${sel("Size", ["A5", "A4", "A3", "A2", "A1", "Bigger (add measurements below)"], "c4")}</div>
  <div class="row">${inp("Custom measurements (if bigger)", "c5", "e.g. 90cm x 120cm")}${sel("Border (10mm)", ["With border", "No border"], "c6")}</div>
  ${ta("Describe what you want", "c7", "Tell me the story, mood, colours, subject...")}`,
    n: "Have a reference photo? Send it on WhatsApp after you submit.",
  },
  mural: {
    t: "Mural",
    p: "R2500 – R4500",
    s: "Prices can be higher depending on the job.",
    d: "Transform a wall into a statement piece.",
    f: `${inp("Wall dimensions", "m1", "e.g. 3m wide x 2.4m high")}${inp("Wall location", "m2", "Town / area, indoors or outdoors")}
  ${ta("Describe what you want", "m3", "Theme, colours, mood, any must-haves...")}`,
    n: "Murals are a bigger investment. A reference photo is needed, so please send it on WhatsApp after you submit.",
  },
  event: {
    t: "Paint &amp; Sip Event",
    p: "R250 – R300 per person",
    s: "All equipment included.",
    d: "A relaxed creative evening for you and your guests.",
    f: `<div class="row">${inp("Estimated guests", "e1", "e.g. 12", "number")}${inp("Preferred date", "e2", "", "date")}</div>
  ${inp("Venue", "e3", "Venue name and area")}
  ${ta("Objectives for the event", "e4", "Birthday, team building, hen party... what do you want from it?")}`,
    n: "The venue must be booked with the owner's permission. A deposit must be paid to secure the date. I have assistants to help on the day. Want a specific reference painting? Send it on WhatsApp.",
  },
};
const cards = document.getElementById("cards"),
  form = document.getElementById("formWrap");
Object.entries(T).forEach(([k, v]) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "card";
  b.dataset.k = k;
  b.innerHTML = `<svg><use href="#b"/></svg><h3>${v.t}</h3><div class="price">${v.p}</div><small>${v.d}</small>`;
  b.onclick = () => pick(k);
  cards.appendChild(b);
});
function pick(k) {
  const v = T[k];
  document
    .querySelectorAll(".card")
    .forEach((c) => c.classList.toggle("on", c.dataset.k === k));
  form.dataset.k = k;
  form.innerHTML = `<h3>${v.t}</h3><div class="price">${v.p} <span style="color:var(--mute);font-weight:400">· ${v.s}</span></div>
 <div class="note">${v.n}</div>
 <div class="row">${inp("Your name", "n1", "Name")}${inp("Your cell / email", "n2", "So I can reach you")}</div>
 ${v.f}
 <div style="margin-top:22px"><button class="btn" type="submit">Send via WhatsApp</button></div>`;
  form.classList.add("show");
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}
form.onsubmit = (e) => {
  e.preventDefault();
  const v = T[form.dataset.k];
  const lines = [...form.querySelectorAll("input,select,textarea")]
    .filter((x) => x.value)
    .map((x) => `${x.name}: ${x.value}`);
  const msg = `Hi Juanyse! I'd like to enquire about a ${v.t.replace("&amp;", "&")}.\n\n${lines.join("\n")}`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
};
// Add new artworks here: file in /images, description, pixel size (w/h)
// and "size": the real artwork size, e.g. "A4, acrylic on canvas"
const IM = [
  {
    src: "images/sea-turtles-reef.jpg",
    alt: "Two sea turtles swimming over a colourful coral reef with dolphins and tropical fish",
    w: 900,
    h: 685,
    size: "A3, acrylic on canvas",
  },
  {
    src: "images/wolf-in-blossoms.jpg",
    alt: "A grey wolf with amber eyes among white blossoms",
    w: 670,
    h: 900,
    size: "A3, acrylic on canvas",
  },
  {
    src: "images/01-songbirds-blossom.jpg",
    alt: "Two songbirds on a blossom branch with wedding rings, acrylic on canvas",
    w: 648,
    h: 900,
    size: "A4, acrylic on canvas",
  },
  {
    src: "images/02-couple-portrait.jpg",
    alt: "Chalk-style portrait of a couple in festive costume on black paper",
    w: 721,
    h: 900,
    size: "A1, White pencil on black paper",
  },
  {
    src: "images/09-leopard.jpg",
    alt: "Leopard portrait framed by yellow flowers",
    w: 900,
    h: 709,
    size: "*",
  },
  {
    src: "images/04-dogs-and-flowers.jpg",
    alt: "Two small dogs among flowers and gold leaf",
    w: 682,
    h: 900,
    size: "1:1 scale, acrylic on canvas",
  },
  {
    src: "images/05-wine-and-roses.jpg",
    alt: "A glass of white wine beside a bowl of pink roses",
    w: 675,
    h: 900,
    size: "A4, acrylic on canvas",
  },
  {
    src: "images/06-faces-portrait.jpg",
    alt: "Close-up black paper portrait of two faces",
    w: 900,
    h: 681,
    size: "A5, white pencil on black paper",
  },
  {
    src: "images/07-sunflowers-still-life.jpg",
    alt: "Still life of sunflowers, white wine, lemons and grapes",
    w: 720,
    h: 900,
    size: "A2, acrylic on canvas",
  },
  {
    src: "images/horse-eye.jpg",
    alt: "Close-up painting of a black and white horse's eye",
    w: 890,
    h: 619,
    size: "A0, acrylic on canvas",
  },
  {
    src: "images/08-whisky-and-pistol.jpg",
    alt: "A glass of whisky with a hand, pistol and bullets",
    w: 900,
    h: 663,
    size: "A5, acrylic on canvas",
  },
  {
    src: "images/03-siamese-cats.jpg",
    alt: "Two Siamese cats against a dark background",
    w: 720,
    h: 900,
    size: "*",
  },
  {
    src: "images/10-graphite-portrait.jpg",
    alt: "Graphite portrait of a woman with long hair",
    w: 720,
    h: 900,
    size: "*",
  },
  {
    src: "images/11-two-friends.jpg",
    alt: "Playful portrait of two friends, oil on canvas",
    w: 900,
    h: 900,
    size: "*",
  },
];
const g = document.getElementById("gal"),
  lb = document.getElementById("lb");
IM.forEach((m) => {
  const f = document.createElement("figure");
  f.innerHTML = `<img src="${m.src}" alt="${m.alt}" width="${m.w}" height="${m.h}" loading="lazy"><figcaption>${m.size || "Size to be added"}</figcaption>`;
  f.onclick = () => {
    lb.querySelector("img").src = m.src;
    lb.querySelector("img").alt = m.alt;
    lb.classList.add("on");
  };
  g.appendChild(f);
});
lb.onclick = () => lb.classList.remove("on");
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lb.classList.remove("on");
});
document.getElementById("yr").textContent = new Date().getFullYear();

// Floating hero paintings open in the zoom view
document.querySelectorAll(".fl-art").forEach((b) => {
  b.onclick = () => {
    const i = b.querySelector("img");
    lb.querySelector("img").src = i.getAttribute("src");
    lb.querySelector("img").alt = i.alt;
    lb.classList.add("on");
  };
});
