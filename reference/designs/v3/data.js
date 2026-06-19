/* ─────────────────────────────────────────────────────────────────────────
   KTDoctor prototype — content data (window.KT)
   NOTE: addresses/phones/hours are realistic PLACEHOLDERS for the prototype.
   Swap with production data later.
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  const REGIONS = {
    sfv: "San Fernando Valley",
    sgv: "San Gabriel Valley",
    west: "Westside & Central",
    south: "South & Southeast LA",
  };

  // 25 clinics from the sitemap, grouped by region.
  const locations = [
    // San Fernando Valley
    { slug: "agoura-hills", name: "Agoura Hills", region: "sfv", addr: "28800 Roadside Dr, Suite 120", city: "Agoura Hills", zip: "91301", phone: "(818) 361-5437", email: "agourahills@ktdoctor.com", hours: "Mon–Fri 9–6 · Sat 9–1", urgent: false },
    { slug: "canyon-country", name: "Canyon Country", region: "sfv", addr: "18861 Soledad Canyon Rd", city: "Santa Clarita", zip: "91351", phone: "(661) 298-7121", email: "canyoncountry@ktdoctor.com", hours: "Mon–Fri 8–7 · Sat 9–2", urgent: true },
    { slug: "mission-hills", name: "Mission Hills", region: "sfv", addr: "11550 Indian Hills Rd", city: "Mission Hills", zip: "91345", phone: "(818) 361-5437", email: "missionhills@ktdoctor.com", hours: "Mon–Fri 9–6 · Sat 9–1", urgent: false },
    { slug: "northridge", name: "Northridge", region: "sfv", addr: "18546 Roscoe Blvd, Suite 200", city: "Northridge", zip: "91324", phone: "(818) 423-5637", email: "northridge@ktdoctor.com", hours: "Mon–Sat 8–8 · Sun 9–3", urgent: true },
    { slug: "san-fernando", name: "San Fernando", region: "sfv", addr: "1212 N Maclay Ave", city: "San Fernando", zip: "91340", phone: "(818) 361-5437", email: "sanfernando@ktdoctor.com", hours: "Mon–Fri 9–6 · Sat 9–1", urgent: false },
    { slug: "tarzana", name: "Tarzana", region: "sfv", addr: "18370 Ventura Blvd, Suite 240", city: "Tarzana", zip: "91356", phone: "(818) 423-5637", email: "tarzana@ktdoctor.com", hours: "Mon–Fri 9–6", urgent: false },
    { slug: "valencia", name: "Valencia", region: "sfv", addr: "23838 Valencia Blvd, Suite 100", city: "Valencia", zip: "91355", phone: "(661) 298-7121", email: "valencia@ktdoctor.com", hours: "Mon–Fri 8–7 · Sat 9–2", urgent: true },
    { slug: "van-nuys", name: "Van Nuys", region: "sfv", addr: "6446 Van Nuys Blvd", city: "Van Nuys", zip: "91401", phone: "(818) 423-5637", email: "vannuys@ktdoctor.com", hours: "Mon–Sat 8–6", urgent: false },
    { slug: "west-hills", name: "West Hills", region: "sfv", addr: "7320 Woodlake Ave, Suite 110", city: "West Hills", zip: "91307", phone: "(818) 361-5437", email: "westhills@ktdoctor.com", hours: "Mon–Fri 9–6 · Sat 9–1", urgent: false },

    // San Gabriel Valley
    { slug: "arcadia", name: "Arcadia", region: "sgv", addr: "612 W Duarte Rd, Suite 305", city: "Arcadia", zip: "91007", phone: "(626) 795-8811", email: "arcadia@ktdoctor.com", hours: "Mon–Fri 9–6 · Sat 9–1", urgent: false },
    { slug: "la-canada", name: "La Cañada", region: "sgv", addr: "1346 Foothill Blvd", city: "La Cañada Flintridge", zip: "91011", phone: "(626) 795-8811", email: "lacanada@ktdoctor.com", hours: "Mon–Fri 9–6", urgent: false },
    { slug: "pasadena", name: "Pasadena", region: "sgv", addr: "960 E Green St, Suite 200", city: "Pasadena", zip: "91106", phone: "(626) 795-8811", email: "pasadena@ktdoctor.com", hours: "Mon–Sat 8–8 · Sun 9–3", urgent: true },
    { slug: "glendale", name: "Glendale", region: "sgv", addr: "1505 Wilson Terrace, Suite 220", city: "Glendale", zip: "91206", phone: "(818) 361-5437", email: "glendale@ktdoctor.com", hours: "Mon–Fri 8–7 · Sat 9–2", urgent: true },
    { slug: "alhambra", name: "Alhambra", region: "sgv", addr: "100 S Garfield Ave, Suite 210", city: "Alhambra", zip: "91801", phone: "(626) 795-8811", email: "alhambra@ktdoctor.com", hours: "Mon–Fri 9–6 · Sat 9–1", urgent: false },

    // Westside & Central
    { slug: "beverly-hills", name: "Beverly Hills", region: "west", addr: "8631 W 3rd St, Suite 540", city: "Los Angeles", zip: "90048", phone: "(626) 795-8811", email: "beverlyhills@ktdoctor.com", hours: "Mon–Fri 9–6", urgent: false },
    { slug: "culver-city", name: "Culver City", region: "west", addr: "3831 Hughes Ave, Suite 100", city: "Culver City", zip: "90232", phone: "(626) 795-8811", email: "culver.city@ktdoctor.com", hours: "Mon–Fri 9–6 · Sat 9–1", urgent: false },
    { slug: "hollywood", name: "Hollywood", region: "west", addr: "1300 N Vermont Ave, Suite 405", city: "Los Angeles", zip: "90027", phone: "(818) 423-5637", email: "hollywood@ktdoctor.com", hours: "Mon–Sat 8–8", urgent: true },
    { slug: "santa-monica", name: "Santa Monica", region: "west", addr: "1260 15th St, Suite 210", city: "Santa Monica", zip: "90404", phone: "(626) 795-8811", email: "santamonica@ktdoctor.com", hours: "Mon–Fri 9–6 · Sat 9–1", urgent: false },
    { slug: "west-la", name: "West LA", region: "west", addr: "11645 Wilshire Blvd, Suite 320", city: "Los Angeles", zip: "90025", phone: "(310) 298-7121", email: "westla@ktdoctor.com", hours: "Mon–Fri 9–6 · Sat 9–1", urgent: false },

    // South & Southeast LA
    { slug: "downey", name: "Downey", region: "south", addr: "11525 Brookshire Ave, Suite 102", city: "Downey", zip: "90241", phone: "(562) 298-7121", email: "downey@ktdoctor.com", hours: "Mon–Fri 8–7 · Sat 9–2", urgent: true },
    { slug: "la-mirada", name: "La Mirada", region: "south", addr: "14601 Imperial Hwy, Suite 8", city: "La Mirada", zip: "90638", phone: "(562) 298-7121", email: "lamirada@ktdoctor.com", hours: "Mon–Fri 9–6 · Sat 9–1", urgent: false },
    { slug: "pico-rivera", name: "Pico Rivera", region: "south", addr: "8527 Whittier Blvd", city: "Pico Rivera", zip: "90660", phone: "(562) 298-7121", email: "picorivera@ktdoctor.com", hours: "Mon–Fri 9–6", urgent: false },
    { slug: "san-pedro", name: "San Pedro", region: "south", addr: "1360 W 6th St, Suite 110", city: "San Pedro", zip: "90732", phone: "(310) 298-7121", email: "sanpedro@ktdoctor.com", hours: "Mon–Fri 9–6 · Sat 9–1", urgent: false },
    { slug: "torrance", name: "Torrance", region: "south", addr: "3640 Lomita Blvd, Suite 305", city: "Torrance", zip: "90505", phone: "(310) 298-7121", email: "torrance@ktdoctor.com", hours: "Mon–Sat 8–6", urgent: false },
    { slug: "whittier", name: "Whittier", region: "south", addr: "12291 Washington Blvd", city: "Whittier", zip: "90606", phone: "(562) 298-7121", email: "whittier@ktdoctor.com", hours: "Mon–Sat 8–8 · Sun 9–3", urgent: true },
  ];

  const clinicEmails = [
    ...locations.map((l) => ({ name: l.name, slug: l.slug, email: l.email })),
    { name: "Santa Monica Adults", slug: "santa-monica-adults", email: "SantaMonicaAdults@ktdoctor.com" },
  ];

  const careTypes = [
    {
      slug: "primary-care",
      icon: "heart-pulse",
      name: "Primary Care",
      tagline: "Check-In Immediately.",
      blurb: "Well-child checkups, vaccines, growth tracking, and the everyday care that keeps kids thriving - with a doctor who knows your family.",
      bullets: ["Care for children 0–21", "Open 9AM to 6PM, Mon to Fri", "Walk in and same day appointments", "Well-child visits & developmental screenings"],
      cta: "Book a checkup",
      accent: "primary",
    },
    {
      slug: "telehealth",
      icon: "video",
      name: "Telehealth",
      tagline: "Connect with your doctor via video call.",
      blurb: "Secure video visits for minor illnesses, follow-ups, prescription refills, and quick questions. No waiting room, no commute across LA traffic.",
      bullets: ["Mon to Sat: 9:00am – 6:00pm", "Mon to Sat: 7:00pm – 9:00pm", "Sun: 12:00pm – 6:00pm", "Available in English & Spanish"],
      cta: "Start a video visit",
      accent: "primary",
    },
    {
      slug: "urgent-care",
      icon: "shield-plus",
      name: "Urgent Care",
      tagline: "Walk-in pediatric care, evenings and weekends.",
      blurb: "When it can't wait for a regular appointment but isn't an emergency - fevers, minor injuries, ear infections. Staffed by pediatric specialists who treat only kids.",
      bullets: ["Immediate Booking Confirmation", "Less Waiting Time", "Pediatric care for Children 0–21", "Extended evening & weekend hours"],
      cta: "Find urgent care near you",
      accent: "primary",
    },
  ];

  const services = [
    "ADHD & Behavioral", "Adolescent Medicine", "Allergies", "Asthma & Allergy Center",
    "Autism / Special Needs", "Childhood Obesity", "Covid-19 Vaccine", "Expectant Parents",
    "Free Vaccines", "Newborn Care", "Nutrition", "Pediatric Infectious Disease",
    "Physicals", "Same-Day Visit", "Sick Visit", "Sports Injuries",
    "Teenage Gynecology", "Telehealth", "Walk-Ins", "Well Child Exam",
  ];

  const partners = [
    { name: "Children's Hospital LA", logo: "uploads/CH.png.webp", type: "Hospital" },
    { name: "Cedars-Sinai", logo: "uploads/Ceders.png", type: "Hospital" },
    { name: "Providence", logo: "uploads/Providence-LA.png", type: "Hospital" },
    { name: "L.A. Care", logo: "uploads/LA-CARE-1.png", type: "Health Plan" },
    { name: "Optum", logo: "uploads/Optum.png.webp", type: "Insurance" },
    { name: "Molina Healthcare", logo: "uploads/2560px-Molina_Healthcare_logo.svg.png.webp", type: "Insurance" },
    { name: "Regal Medical Group", logo: "uploads/Regal.png", type: "Medical Group" },
    { name: "Serendib Healthways", logo: "uploads/Serendib-Healthways-Logo.png", type: "Health Partner" },
  ];

  const stories = [
    { tag: "Wellness", title: "Autism Awareness: spotting the early signs", read: "5 min read", date: "Apr 2026" },
    { tag: "Seasonal", title: "Asthma & winter care: a parent's guide", read: "4 min read", date: "Feb 2026" },
    { tag: "Safety", title: "10 Halloween safety tips for trick-or-treaters", read: "3 min read", date: "Oct 2025" },
    { tag: "Know-how", title: "ER vs. Urgent Care: where should you go?", read: "6 min read", date: "Sep 2025" },
  ];

  const doctors = [
    { slug: "amelia-okafor", name: "Dr. Amelia Okafor, MD", specialty: "Pediatrics", clinic: "Northridge", clinicSlug: "northridge", lang: "English, Igbo", accepting: true,
      bio: "Dr. Okafor has cared for Valley families for over a decade, with a special focus on early childhood development and preventive care. She believes the best medicine starts with listening to parents.",
      focus: ["Well-child visits", "Developmental screening", "Preventive care"], edu: "MD, UCLA · Residency, CHLA" },
    { slug: "daniel-reyes", name: "Dr. Daniel Reyes, MD", specialty: "Adolescent Medicine", clinic: "Downey", clinicSlug: "downey", lang: "English, Spanish", accepting: true,
      bio: "Dr. Reyes specializes in the unique health needs of teens — from sports physicals to mental wellness — and is passionate about meeting adolescents where they are.",
      focus: ["Adolescent medicine", "Sports physicals", "Teen wellness"], edu: "MD, Keck USC · Residency, Cedars-Sinai" },
    { slug: "priya-nair", name: "Dr. Priya Nair, DO", specialty: "Newborn Care", clinic: "Pasadena", clinicSlug: "pasadena", lang: "English, Hindi", accepting: true,
      bio: "Dr. Nair guides new parents through those first precious — and often overwhelming — months, from feeding and sleep to milestones and immunizations.",
      focus: ["Newborn care", "Lactation support", "Infant nutrition"], edu: "DO, Western University · Residency, Children's Hospital LA" },
    { slug: "marcus-lee", name: "Dr. Marcus Lee, MD", specialty: "Pediatrics", clinic: "Hollywood", clinicSlug: "hollywood", lang: "English, Korean", accepting: false,
      bio: "Dr. Lee combines evidence-based pediatric care with a warm, family-centered approach. He has a particular interest in childhood nutrition and obesity prevention.",
      focus: ["General pediatrics", "Nutrition", "Childhood obesity"], edu: "MD, Stanford · Residency, CHLA" },
    { slug: "sofia-haddad", name: "Dr. Sofia Haddad, MD", specialty: "Asthma & Allergy", clinic: "Glendale", clinicSlug: "glendale", lang: "English, Arabic", accepting: true,
      bio: "Dr. Haddad leads our Asthma & Allergy Center, helping kids breathe easier and live fuller lives through personalized treatment plans.",
      focus: ["Pediatric asthma", "Allergy testing", "Immunotherapy"], edu: "MD, UC Irvine · Fellowship, CHLA Allergy & Immunology" },
    { slug: "grace-tanaka", name: "Dr. Grace Tanaka, MD", specialty: "Pediatrics", clinic: "Santa Monica", clinicSlug: "santa-monica", lang: "English, Japanese", accepting: true,
      bio: "Dr. Tanaka has been a trusted Westside pediatrician for 15 years, known for her calm bedside manner and her work with children with special needs.",
      focus: ["General pediatrics", "Special needs care", "ADHD & behavioral"], edu: "MD, UCSF · Residency, UCLA Mattel Children's Hospital" },
  ];

  const jobs = [
    { title: "Pediatrician (MD/DO)", dept: "Clinical", location: "Northridge", type: "Full-time" },
    { title: "Pediatric Nurse Practitioner", dept: "Clinical", location: "Downey", type: "Full-time" },
    { title: "Medical Assistant — Bilingual", dept: "Clinical", location: "Pico Rivera", type: "Full-time" },
    { title: "Front Desk Coordinator", dept: "Operations", location: "Pasadena", type: "Full-time" },
    { title: "Registered Nurse (RN)", dept: "Clinical", location: "Valencia", type: "Part-time" },
    { title: "Patient Services Representative", dept: "Operations", location: "Hollywood", type: "Full-time" },
    { title: "Billing & Insurance Specialist", dept: "Administration", location: "Remote / Hybrid", type: "Full-time" },
    { title: "Care Coordinator — Bilingual", dept: "Clinical", location: "Glendale", type: "Full-time" },
  ];

  const formGroups = [
    { label: "New patients", icon: "file", items: ["New Patient Registration", "Medical History Questionnaire", "Consent for Treatment", "HIPAA Privacy Acknowledgement"] },
    { label: "Prescriptions & refills", icon: "syringe", items: ["Prescription Refill Request", "Medication Authorization", "Pharmacy Transfer Form"] },
    { label: "School & sports", icon: "award", items: ["Sports Physical Form", "School Physical Form", "Immunization Record Request", "Medication-at-School Authorization"] },
    { label: "Records & labs", icon: "locate", items: ["Medical Records Request", "Lab Results Release", "Referral Request", "Disability / FMLA Paperwork"] },
  ];

  const testimonials = [
    { quote: "Every doctor we've seen actually listens. They never rush us, and my kids genuinely look forward to their checkups.", author: "Maria G.", clinic: "Downey", rating: 5 },
    { quote: "We had a scary late-night fever and the urgent care team was calm, fast, and kind. We were seen in 20 minutes.", author: "James T.", clinic: "Pasadena", rating: 5 },
    { quote: "As a Spanish-speaking family, having bilingual staff at every step made such a difference. We finally feel understood.", author: "Lucía R.", clinic: "Pico Rivera", rating: 5 },
    { quote: "The telehealth visit saved me a two-hour round trip with a sick toddler. Same great doctor, from my couch.", author: "Priya S.", clinic: "Telehealth", rating: 5 },
    { quote: "Dr. Tanaka has cared for all three of my kids since they were born. She's part of our family now.", author: "Angela W.", clinic: "Santa Monica", rating: 5 },
    { quote: "Booking online is so easy, and the reminders mean I never miss a vaccine appointment. Highly recommend.", author: "David K.", clinic: "Hollywood", rating: 5 },
  ];

  const stats = [
    { num: "25", label: "Clinics across LA" },
    { num: "0–21", label: "Ages we care for" },
    { num: "18+", label: "Years of service" },
    { num: "20", label: "Specialty services" },
  ];

  /* Extra care types (link to external sister sites) */
  const extraCareTypes = [
    {
      slug: "family-practice",
      icon: "heart",
      name: "Family Practice",
      tagline: "Whole-family care, same trusted team.",
      blurb: "Our family practice locations extend care to parents and adult household members alongside their kids — so your whole family shares one medical home.",
      bullets: ["Adult primary care", "Family wellness visits", "Preventive screenings", "Chronic disease management"],
      cta: "Find a family practice location",
      accent: "primary",
      photo: "uploads/Family-768x384.jpeg.webp",
      promoText: "Providing quality and compassionate care for everyone.",
      promoCta: "Find out more",
      treatment: "light",
      external: "https://ktdoctor.com/family-practice",
    },
    {
      slug: "after-hours",
      icon: "clock",
      name: "After-Hours Care",
      tagline: "Extended evening & weekend care when your regular clinic is closed.",
      blurb: "Eight locations stay open until 8 PM on weekdays and offer Saturday and Sunday hours — so illness doesn't wait for Monday morning.",
      bullets: ["Open until 8 PM weekdays", "Weekend hours at select clinics", "Walk-ins welcome", "Full sick-visit capabilities"],
      cta: "Find an after-hours clinic",
      accent: "warm",
      photo: "uploads/After-Hours-sm.png",
      promoText: "Convenient evening & weekend hours. Urgent care for emergencies, with the continuity of care your family knows.",
      promoCta: "Book now",
      treatment: "dark",
      external: null,
    },
    {
      slug: "hospital-newborn",
      icon: "baby",
      name: "Hospital Newborn Visit",
      tagline: "Your pediatrician visits baby in the hospital — no gap in care.",
      blurb: "Our newborn-care specialists visit partner hospitals (CHLA, Cedars-Sinai, Providence) to see your baby within 24 hours of delivery and coordinate the transition home.",
      bullets: ["In-hospital newborn exam", "Discharge coordination", "NICU follow-up", "Partners with CHLA, Cedars-Sinai"],
      cta: "Learn about newborn hospital visits",
      accent: "accent",
      photo: "uploads/Having-your-baby-sm.png",
      promoTitle: "Delivering your baby at a partner hospital?",
      promoText: "If you are delivering at an affiliated hospital, we can arrange for your selected pediatrician to conduct baby's first visit right there.",
      promoCta: "Find out more",
      treatment: "teal",
      external: "https://ktdoctor.com/newborn-hospital-visit",
    },
  ];
  window.KT = { REGIONS, locations, careTypes, services, partners, stories, doctors, stats, jobs, formGroups, testimonials, extraCareTypes, clinicEmails };
})();
