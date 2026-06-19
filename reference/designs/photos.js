/* ═══════════════════════════════════════════════════════════════════════════
   photos.js — Curated photos for every image slot.
   Doctors: randomuser.me (free, reliable portrait photos).
   Context photos: Unsplash free license (unsplash.com/license).
   Replace any value with your own URL to override.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  var U = "https://images.unsplash.com/photo-";
  var q = "?auto=format&fit=crop&q=80";

  /* Doctor headshots via randomuser.me — 100% reliable photographic portraits.
     Gender-aware: female names → women portraits, otherwise men portraits.     */
  var FEMALE_FIRST = [
    "amelia","priya","sofia","grace","lisa","sarah","emily","jennifer",
    "diana","fatima","patricia","linda","aisha","yuki","anna","nina",
    "rachel","sandra","jessica","helen","rosa","carmen","elena","mariela",
    "angela","isabel","mei","cze","aria","banpreet","cze-ja"
  ];
  var femaleN = 10, maleN = 10;
  var doctorPhotos = {};
  var docs = (window.KT && window.KT.doctors) ? window.KT.doctors : [];
  docs.forEach(function (d) {
    /* Extract first name from "Dr. FirstName LastName, MD" */
    var parts = d.name.replace(/,.*$/, "").split(" ");
    var first = (parts[1] || "").toLowerCase();
    var isFemale = FEMALE_FIRST.some(function (n) { return first.startsWith(n); });
    if (isFemale) {
      doctorPhotos["doc-" + d.slug] =
        "https://randomuser.me/api/portraits/women/" + (femaleN++) + ".jpg";
      if (femaleN > 70) femaleN = 10;
    } else {
      doctorPhotos["doc-" + d.slug] =
        "https://randomuser.me/api/portraits/men/" + (maleN++) + ".jpg";
      if (maleN > 70) maleN = 10;
    }
  });

  window.KT_PHOTOS = Object.assign({

    /* ── Heroes ──────────────────────────────────────────────────────────── */
    "hero-split-photo":
      "assets/hero-clinic-sm.png",   // user-provided: bright pediatric clinic, doctor + family
    "hero-center-photo":
      U + "1555252333-9f8e92e65df9"    + q + "&w=1600&h=640",  // parents with baby
    "hero-video-bg":
      U + "1519494026892-80bbd2d6fd0d" + q + "&w=1920&h=1080", // bright clinic interior

    /* ── Care pages ──────────────────────────────────────────────────────── */
    "care-primary-care-photo":
      U + "1576091160399-112ba8d25d1d" + q + "&w=800&h=680",  // pediatric exam room
    "care-telehealth-photo":
      U + "1587614382346-4ec70e388b28" + q + "&w=800&h=680",  // telehealth / laptop call
    "care-urgent-care-photo":
      U + "1576765608535-5f04d1e3f289" + q + "&w=800&h=680",  // doctor & child

    /* ── Extra care types ────────────────────────────────────────────────── */
    "extra-care-family-practice-photo":
      U + "1576765608535-5f04d1e3f289" + q + "&w=800&h=680",  // family consultation
    "extra-care-after-hours-photo":
      U + "1587614382346-4ec70e388b28" + q + "&w=800&h=680",  // clinic after hours
    "extra-care-hospital-newborn-photo":
      U + "1555252333-9f8e92e65df9"    + q + "&w=800&h=680",  // newborn care

    /* ── About ───────────────────────────────────────────────────────────── */
    "about-interior":
      U + "1519494026892-80bbd2d6fd0d" + q + "&w=900&h=680",  // bright clinic interior

    /* ── Stories / blog ──────────────────────────────────────────────────── */
    "story-0":
      U + "1535268647677-300dbf3d78d1" + q + "&w=640&h=400",  // child portrait, warm
    "story-1":
      U + "1576091160550-2173dba999ef" + q + "&w=640&h=400",  // medical / health
    "story-2":
      U + "1476234251651-f353703a034d" + q + "&w=640&h=400",  // kids outdoors / seasonal
    "story-3":
      U + "1582750433449-648ed127bb54" + q + "&w=640&h=400",  // medical team

    /* ── Careers ─────────────────────────────────────────────────────────── */
    "careers-team-photo": "uploads/careers-team-sm.png",  // KT medical team

    /* ── Patient portal ──────────────────────────────────────────────────── */
    "resources-photo":
      U + "1555252333-9f8e92e65df9"    + q + "&w=760&h=900",  // parents with baby
    "portal-screenshot":
      U + "1576091160550-2173dba999ef" + q + "&w=640&h=400",  // laptop health app

  }, doctorPhotos);
})();
