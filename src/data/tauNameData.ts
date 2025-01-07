export const tauNameData = {
  // Existing data
  castes: {
    fire: "Shas'",
    earth: "Fio'",
    water: "Por'",
    air: "Kor'",
    ethereal: "Aun'"
  },

  ranks: {
    fire: ["la", "ui", "vre", "el", "o"],
    earth: ["la", "ui", "vre", "el", "o"],
    water: ["la", "ui", "vre", "el", "o"],
    air: ["la", "ui", "vre", "el", "o"],
    ethereal: ["ui", "el", "o"]
  },

  septs: [
    "T'au", "Vior'la", "Dal'yth", "Sa'cea", "Bork'an", "Fal'shia",
    "D'yanoi", "N'dras", "Ke'lshan", "Au'taal", "T'olku", "Elsy'eir",
    "Fi'rios", "Mu'gulath", "Ksi'm'yen", "Tash'var"
  ],

  personalNames: [
    "Kais", "Shi", "Or'es", "Ko'vash", "Mont'yr", "Ar'tol", "Ku'nas",
    "Var'el", "Y'eldi", "M'yen", "R'alai", "R'myr", "Sha'vastos",
    "Diram", "Korva", "Mal'caor", "Ny'san", "Puretide", "Shadowsun",
    "Farsight", "Ka'buto", "Val'tos", "Arra", "Volaan", "Ky'jan"
  ],

  teamNumbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],

  titles: [
    "the Skilled", "the Brave", "the Wise", "the Patient", "the Swift",
    "the Resolute", "the Determined", "the Honorable", "the Steadfast",
    "the Enlightened"
  ],

  // New caste-specific data
  casteSpecific: {
    fire: {
      specializations: [
        "Mont'ka", // Killing blow
        "Kauyon", // Patient hunter
        "Ka'leth", // Blade master
        "Vral'ya", // Marksman
        "Monat", // Lone warrior
        "Kai'rotaa" // Battlefield commander
      ],
      battlesuits: [
        "XV8", "XV85", "XV86", "XV88", "XV95", "XV104", "XV109"
      ],
      cadres: [
        "Hunter", "Striker", "Stealth", "Crisis", "Broadside", "Pathfinder", "Breacher"
      ]
    },
    earth: {
      specializations: [
        "Or'es", // Engineer
        "Bon'au", // Researcher
        "Kir'qath", // Inventor
        "Por'taal", // Constructor
        "Kor'vesa", // Drone specialist
        "Bei'gel" // Material scientist
      ],
      projects: [
        "XV-series", "Drone Enhancement", "Shield Technology",
        "Weapon Research", "Battlesuit Development", "Infrastructure"
      ]
    },
    water: {
      specializations: [
        "Mal'caor", // Diplomat
        "Ar'tol", // Negotiator
        "Ka'meer", // Merchant
        "Su'roth", // Cultural expert
        "Phi'len", // Ambassador
        "To'kar" // Mediator
      ],
      spheres: [
        "Trade", "Diplomacy", "Cultural Exchange",
        "Intelligence", "Political Relations", "Resource Management"
      ]
    },
    air: {
      specializations: [
        "Kal'yr", // Pilot
        "Tash'var", // Navigator
        "Yen'sha", // Fleet commander
        "Ko'vash", // Space station commander
        "Ar'nel", // Orbital specialist
        "Val'tos" // Void warfare expert
      ],
      vessels: [
        "Manta", "Orca", "Sun Shark", "Razorshark",
        "Tiger Shark", "Barracuda", "Remora"
      ]
    },
    ethereal: {
      specializations: [
        "Por'o", // Leader
        "Mal'ra", // Philosopher
        "Aun'la", // Spiritual guide
        "Tau'va", // Greater good exemplar
        "Mes'rovah", // Enlightened one
        "Shi'ores" // Path finder
      ],
      disciplines: [
        "Philosophy", "Leadership", "Unity",
        "Cultural Development", "Spiritual Guidance", "Social Engineering"
      ]
    }
  },

  // New honorifics
  honorifics: {
    fire: [
      "Mont'yr (Blooded)", 
      "Kir'la (Warrior Spirit)", 
      "Vash'ya (Heroic Victory)",
      "Ka'mais (Supreme Hunter)"
    ],
    earth: [
      "Dal'yr (Master Creator)", 
      "Ko'vash (Innovation Spirit)", 
      "Fio'ui (Earth Blessed)",
      "Yr'tol (Technical Master)"
    ],
    water: [
      "Por'el (Diplomatic Master)", 
      "Mal'caor (Voice of Unity)", 
      "Aun'shi (Blessed Speaker)",
      "Dal'yr (Cultural Bridge)"
    ],
    air: [
      "Kor'val (Sky Master)", 
      "Yen'ar (Void Walker)", 
      "Tash'var (Star Navigator)",
      "Ko'vash (Wind Spirit)"
    ],
    ethereal: [
      "Aun'va (Supreme Leader)", 
      "O'res (Enlightened Path)", 
      "El'mai (Blessed One)",
      "Va'tai (Unity Bearer)"
    ]
  }
};