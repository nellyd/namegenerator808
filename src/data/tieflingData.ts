// tieflingData.ts
export type Virtue = { name: string; meaning: string };

export const tieflingData = {
  infernal: {
    starts: [
      'az', 'ael', 'vyr', 'xyr', 'zh', 'thr', 'kr', 'dr', 'zor', 'v', 'r', 'lir', 'vy', 'kez', 'rax'
    ],
    vowels: ['a', 'e', 'i', 'o', 'u', 'ae', 'ia', 'io', 'uu'],
    clusters: ['zh', 'th', 'x', 'r', 'z', 'kh', 'vr', 'gr', 'l', 'rr'],
    endings: {
      male: ['ius', 'on', 'zar', 'rax', 'thar', 'ren', 'mon'],
      female: ['a', 'ara', 'iah', 'ira', 'eth', 'zia', 'yss'],
      neutral: ['is', 'en', 'ar', 'ir', 'yn'],
    },
    // used to bias sound by tone
    harshBias: ['x', 'z', 'zh', 'kh', 'thr', 'gr', 'rax', 'zor', 'thar'],
    elegantBias: ['l', 'r', 'ae', 'ia', 'iah', 'ara', 'is'],
  },
  virtues: [
    { name: 'Ambition', meaning: 'Relentless drive and hunger for greatness.' },
    { name: 'Calamity', meaning: 'Chaos given form.' },
    { name: 'Credence', meaning: 'Faith, trust, or belief.' },
    { name: 'Ember', meaning: 'A small fire, sign of inner warmth.' },
    { name: 'Grace', meaning: 'Redemption through kindness.' },
    { name: 'Honor', meaning: 'Loyalty to a personal code.' },
    { name: 'Mercy', meaning: 'Compassion beyond pain.' },
    { name: 'Penance', meaning: 'Repentance for ancestral sin.' },
    { name: 'Resolve', meaning: 'Unshakable will.' },
    { name: 'Valor', meaning: 'Courage even in defeat.' },
    { name: 'Whisper', meaning: 'Quiet watcher, keeper of secrets.' },
    { name: 'Warden', meaning: 'Protector of others.' },
    { name: 'Temperance', meaning: 'Measured restraint and balance.' },
    { name: 'Vigor', meaning: 'Lively strength and spirit.' },
    { name: 'Reckoning', meaning: 'Judgment and accounting of deeds.' },
    { name: 'Poise', meaning: 'Grace under pressure.' },
    { name: 'Hallow', meaning: 'Sanctified and set apart.' },
    { name: 'Fervor', meaning: 'Burning zeal and passion.' },
    { name: 'Silence', meaning: 'Quiet purpose, hidden depth.' },
    { name: 'Vow', meaning: 'A promise that shapes destiny.' },
  ] as Virtue[],
  humanBase: [
    'Adrian','Marcus','Livia','Corin','Lucia','Mara','Dorian','Cassia','Julian','Selene',
    'Tiber','Serena','Felix','Thea','Lucan','Darian','Elara','Kael','Mira','Rowan',
    'Alicia','Claudia','Victor','Severin','Nora','Rhea','Iris','Talia','Leander','Cyrus'
  ],
  infernalSuffixes: ['zar', 'ius', 'eth', 'yss', 'rax', 'ir', 'thos', 'mon', 'ren', 'ar'],
};

export const tones = ['neutral', 'harsh', 'elegant'] as const;
export type Tone = (typeof tones)[number];

