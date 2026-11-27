import type { Lang } from "@/lib/i18n";

/**
 * JOB POSTINGS
 * ------------------------------------------------------------------
 * ⚠️  The postings below are SAMPLE CONTENT to show the layout.
 *     Replace them with GMRA's real vacancies before going live.
 *
 * To add a job: copy one object, give it a unique `slug` and `ref`,
 * and fill in both English (en) and French (fr) text.
 * To close a job: delete it from the list (or move `deadline` into the past —
 * expired jobs are hidden automatically).
 */

type T = Record<Lang, string>;
type TL = Record<Lang, string[]>;

export type Job = {
  slug: string;
  ref: string;
  title: T;
  department: T;
  location: string;
  type: T;
  posted: string; // ISO date
  deadline: string; // ISO date
  summary: T;
  responsibilities: TL;
  requirements: TL;
  offer: TL;
};

export const jobs: Job[] = [
  {
    slug: "medical-coordinator",
    ref: "GMRA-2026-014",
    title: { en: "Medical Coordinator", fr: "Coordinateur·rice médical·e" },
    department: { en: "Health programmes", fr: "Programmes de santé" },
    location: "Kinshasa",
    type: { en: "Full-time · 12 months", fr: "Temps plein · 12 mois" },
    posted: "2026-11-15",
    deadline: "2027-01-15",
    summary: {
      en: "Lead the planning, quality and follow-up of GMRA’s health activities, working closely with partner health centres and community teams.",
      fr: "Piloter la planification, la qualité et le suivi des activités de santé de GMRA, en lien étroit avec les centres de santé partenaires et les équipes communautaires.",
    },
    responsibilities: {
      en: [
        "Plan and coordinate health activities in line with GMRA’s objectives",
        "Support partner health centres and assess sanitary conditions",
        "Supervise and train field health staff",
        "Prepare monthly activity reports and contribute to annual reporting",
        "Represent GMRA in health coordination meetings",
      ],
      fr: [
        "Planifier et coordonner les activités de santé conformément aux objectifs de GMRA",
        "Appuyer les centres de santé partenaires et évaluer les conditions sanitaires",
        "Encadrer et former le personnel de santé de terrain",
        "Préparer les rapports mensuels d’activités et contribuer aux rapports annuels",
        "Représenter GMRA lors des réunions de coordination santé",
      ],
    },
    requirements: {
      en: [
        "Medical degree (MD) registered with the Ordre des Médecins",
        "At least 3 years’ experience in public health or humanitarian programmes",
        "Strong coordination, reporting and team-leadership skills",
        "Fluent French; working English and Lingala are an advantage",
        "Willingness to travel regularly to the field",
      ],
      fr: [
        "Diplôme de docteur en médecine, inscrit à l’Ordre des Médecins",
        "Au moins 3 ans d’expérience en santé publique ou en programmes humanitaires",
        "Solides compétences en coordination, rédaction de rapports et gestion d’équipe",
        "Français courant ; anglais professionnel et lingala sont un atout",
        "Disponibilité pour des déplacements réguliers sur le terrain",
      ],
    },
    offer: {
      en: ["A meaningful role serving vulnerable communities", "A committed, multidisciplinary team", "Field experience and professional growth"],
      fr: ["Un poste porteur de sens au service des communautés vulnérables", "Une équipe engagée et pluridisciplinaire", "Expérience de terrain et évolution professionnelle"],
    },
  },
  {
    slug: "community-health-officer",
    ref: "GMRA-2026-015",
    title: { en: "Community Health Officer", fr: "Agent·e de santé communautaire" },
    department: { en: "Health programmes", fr: "Programmes de santé" },
    location: "Goma",
    type: { en: "Full-time · 6 months", fr: "Temps plein · 6 mois" },
    posted: "2026-11-18",
    deadline: "2026-12-31",
    summary: {
      en: "Carry out awareness and follow-up activities with families, schools and community leaders to improve health and hygiene practices.",
      fr: "Mener des activités de sensibilisation et de suivi auprès des familles, des écoles et des leaders communautaires pour améliorer les pratiques de santé et d’hygiène.",
    },
    responsibilities: {
      en: [
        "Organise health and hygiene awareness sessions in communities and schools",
        "Identify vulnerable households and refer them to appropriate services",
        "Collect field data and contribute to needs assessments",
        "Work with local leaders and partner organisations",
      ],
      fr: [
        "Organiser des séances de sensibilisation à la santé et à l’hygiène dans les communautés et les écoles",
        "Identifier les ménages vulnérables et les orienter vers les services appropriés",
        "Collecter des données de terrain et contribuer aux évaluations des besoins",
        "Collaborer avec les leaders locaux et les organisations partenaires",
      ],
    },
    requirements: {
      en: [
        "Diploma in nursing, public health or a related field",
        "Experience in community work is an advantage",
        "Excellent communication skills; fluent French and Swahili",
        "Based in or willing to relocate to Goma",
      ],
      fr: [
        "Diplôme en soins infirmiers, santé publique ou domaine connexe",
        "Une expérience en travail communautaire est un atout",
        "Excellentes capacités de communication ; français et swahili courants",
        "Basé·e à Goma ou disposé·e à s’y installer",
      ],
    },
    offer: {
      en: ["Direct impact with communities", "Training and supervision", "Supportive team environment"],
      fr: ["Un impact direct auprès des communautés", "Formation et encadrement", "Un environnement d’équipe bienveillant"],
    },
  },
  {
    slug: "logistics-assistant",
    ref: "GMRA-2026-016",
    title: { en: "Logistics Assistant", fr: "Assistant·e logistique" },
    department: { en: "Logistics & operations", fr: "Logistique & opérations" },
    location: "Kinshasa",
    type: { en: "Full-time · Permanent", fr: "Temps plein · CDI" },
    posted: "2026-11-20",
    deadline: "2027-01-10",
    summary: {
      en: "Support the logistics officer with fleet, procurement and stock management to keep field missions running smoothly and safely.",
      fr: "Appuyer le chargé de logistique dans la gestion du parc automobile, des achats et des stocks afin d’assurer le bon déroulement et la sécurité des missions.",
    },
    responsibilities: {
      en: [
        "Plan vehicle movements and monitor fleet maintenance",
        "Manage stock, inventories and supply requests",
        "Support procurement processes and supplier follow-up",
        "Prepare logistics for field missions and events",
      ],
      fr: [
        "Planifier les mouvements de véhicules et suivre l’entretien du parc",
        "Gérer les stocks, les inventaires et les demandes d’approvisionnement",
        "Appuyer les processus d’achat et le suivi des fournisseurs",
        "Préparer la logistique des missions de terrain et des événements",
      ],
    },
    requirements: {
      en: [
        "Degree or diploma in logistics, management or a related field",
        "2 years’ experience in logistics, ideally in an NGO",
        "Good computer skills (Excel) and organisational skills",
        "Valid driving licence is an advantage",
      ],
      fr: [
        "Diplôme en logistique, gestion ou domaine connexe",
        "2 ans d’expérience en logistique, idéalement en ONG",
        "Bonne maîtrise de l’informatique (Excel) et sens de l’organisation",
        "Un permis de conduire valide est un atout",
      ],
    },
    offer: {
      en: ["Permanent contract", "Varied, hands-on role", "Opportunities to grow within operations"],
      fr: ["Contrat à durée indéterminée", "Un poste varié et concret", "Des perspectives d’évolution au sein des opérations"],
    },
  },
  {
    slug: "administrative-finance-officer",
    ref: "GMRA-2026-017",
    title: { en: "Administrative & Finance Officer", fr: "Chargé·e administratif·ve et financier·e" },
    department: { en: "Administration & finance", fr: "Administration & finances" },
    location: "Kinshasa",
    type: { en: "Full-time · 12 months", fr: "Temps plein · 12 mois" },
    posted: "2026-11-22",
    deadline: "2027-01-20",
    summary: {
      en: "Ensure sound administrative and financial management, supporting GMRA’s commitment to transparent accounts.",
      fr: "Assurer une gestion administrative et financière rigoureuse, au service de l’engagement de GMRA pour la transparence des comptes.",
    },
    responsibilities: {
      en: [
        "Keep accounting records and prepare monthly financial reports",
        "Manage cash, payments and supporting documents",
        "Support budget preparation and monitoring",
        "Handle HR administration and contract files",
      ],
      fr: [
        "Tenir la comptabilité et préparer les rapports financiers mensuels",
        "Gérer la caisse, les paiements et les pièces justificatives",
        "Appuyer l’élaboration et le suivi budgétaire",
        "Assurer l’administration RH et la gestion des dossiers contractuels",
      ],
    },
    requirements: {
      en: [
        "Degree in accounting, finance or management",
        "At least 3 years’ experience in a similar role",
        "Knowledge of accounting software and OHADA principles",
        "Rigour, integrity and confidentiality",
      ],
      fr: [
        "Diplôme en comptabilité, finance ou gestion",
        "Au moins 3 ans d’expérience à un poste similaire",
        "Maîtrise des logiciels comptables et des principes OHADA",
        "Rigueur, intégrité et confidentialité",
      ],
    },
    offer: {
      en: ["Key role in a growing organisation", "Collaborative team", "Professional development"],
      fr: ["Un rôle clé dans une organisation en développement", "Une équipe collaborative", "Développement professionnel"],
    },
  },
];

/** Jobs whose deadline has not passed yet, newest first. */
export const openJobs = (now = new Date()) =>
  jobs
    .filter((j) => new Date(j.deadline + "T23:59:59") >= now)
    .sort((a, b) => b.posted.localeCompare(a.posted));

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
