'use client';

import { useMemo, useState } from 'react';
import { Copy, CheckCheck, Wand2 } from 'lucide-react';
import { tieflingData, tones, Tone, Virtue } from '@/data/tieflingData';

type NameType = 'infernal' | 'virtue' | 'human';
type Gender = 'male' | 'female' | 'neutral';
type LengthOpt = '1' | '2' | '3+';

function estimateSyllables(s: string) {
  const cleaned = s
    .toLowerCase()
    .replace(/(?:[^laeiouy]|qu)ie$/g, 'i')
    .replace(/(?:[^laeiouy]|qu)y/g, 'i')
    .replace(/e(?:s|d)$/g, '')
    .replace(/[^aeiouy]+/g, ' ');
  const count = cleaned.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, count);
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

// ---- Generators ----------------------------------------------------

function genInfernal(gender: Gender, tone: Tone, targetSyllables: LengthOpt): string {
  const { starts, vowels, clusters, endings, harshBias, elegantBias } = tieflingData.infernal;

  // tone bias pools
  const toneFavs = tone === 'harsh' ? harshBias : tone === 'elegant' ? elegantBias : [];
  const biasedClusters = [...clusters, ...toneFavs.filter(c => c.length <= 2)] as string[];
  const biasedVowels = [...vowels, ...(tone === 'elegant' ? ['ae', 'ia'] : [])] as string[];

  const endPool =
    gender === 'male' ? endings.male :
    gender === 'female' ? endings.female : endings.neutral;

  // build from simple templates
  // try a few attempts to hit syllable target
  for (let attempts = 0; attempts < 12; attempts++) {
    const start = pick(starts);
    const v1 = pick(biasedVowels);
    const cluster = Math.random() < 0.7 ? pick(biasedClusters) : '';
    const v2 = Math.random() < 0.5 ? pick(biasedVowels) : '';
    const ending = pick(endPool);

    const templateChoice = Math.random();
    let name =
      templateChoice < 0.35
        ? `${start}${v1}${ending}`
        : templateChoice < 0.75
        ? `${start}${v1}${cluster}${v2}${ending}`
        : `${start}${v1}r${v2 || pick(biasedVowels)}${ending}`;

    // tone polish
    if (tone === 'harsh' && !/[xzkh]/i.test(name)) name = name.replace(/r/i, 'x');
    if (tone === 'elegant' && !/[lr]/i.test(name)) name = name.replace(/z/i, 'l');

    // syllable gating
    const syl = estimateSyllables(name);
    if (
      (targetSyllables === '1' && syl <= 1) ||
      (targetSyllables === '2' && syl === 2) ||
      (targetSyllables === '3+' && syl >= 3)
    ) {
      return cap(name);
    }
  }
  // fallback
  return cap(`${pick(starts)}${pick(vowels)}${pick(endPool)}`);
}

function genVirtue(): { name: string; blurb: string } {
  const v: Virtue = pick(tieflingData.virtues);
  return { name: v.name, blurb: v.meaning };
}

function genHumanHybrid(gender: Gender, targetSyllables: LengthOpt): string {
  // choose a human base and infernalize it
  let base = pick(tieflingData.humanBase) as string;
  const suffix = pick(tieflingData.infernalSuffixes);
  // tweak: sometimes inject a consonant twist
  if (Math.random() < 0.5) {
    base = base.replace(/r(?![aeiou])/i, 'rz').replace(/n(?![aeiou])/i, 'nz');
  }
  let name = base + (base.toLowerCase().endsWith(suffix) ? '' : suffix);

  // gender soft bias (very light)
  if (gender === 'female' && !/[aeiou]$/.test(name)) name = name + (Math.random() < 0.6 ? 'a' : 'ia');
  if (gender === 'male' && /a$/.test(name)) name = name.replace(/a$/, 'on');

  // syllable adjust
  const syl = estimateSyllables(name);
  if (targetSyllables === '1' && syl > 1) name = name.replace(/[aeiou][^aeiou]+$/i, '');
  if (targetSyllables === '2' && syl !== 2) name = name + (syl < 2 ? 'en' : '');
  // 3+ is fine as-is

  return cap(name);
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ---- Page ----------------------------------------------------------



export default function Page() {
  const [form, setForm] = useState<{
    type: NameType;
    gender: Gender;
    tone: Tone;
    length: LengthOpt;
  }>({
    type: 'infernal',
    gender: 'neutral',
    tone: 'neutral',
    length: '2',
  });

  const [results, setResults] = useState<string[]>([]);
  const [blurbs, setBlurbs] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<number | null>(null);

  const canTone = form.type === 'infernal';
  const canGender = true;

  function generate() {
    const out: string[] = [];
    const info: Record<string, string> = {};

    while (out.length < 10) {
      if (form.type === 'infernal') {
        const n = genInfernal(form.gender, form.tone, form.length);
        out.push(n);
      } else if (form.type === 'virtue') {
        const { name, blurb } = genVirtue();
        out.push(name);
        info[name] = blurb;
      } else {
        const n = genHumanHybrid(form.gender, form.length);
        out.push(n);
      }
    }

    const uniq = unique(out).slice(0, 10);
    setResults(uniq);
    setBlurbs(info);
    setCopied(null);
  }

  async function copyName(name: string, i: number) {
    await navigator.clipboard.writeText(name);
    setCopied(i);
    setTimeout(() => setCopied(null), 1200);
  }

  const faq = useMemo(
    () => [
      {
        q: 'What is a Tiefling name?',
        a: 'Tiefling names often echo Infernal heritage with sharp, fiery sounds. Some choose virtue names like Mercy or Resolve to declare their ideals.',
      },
      {
        q: 'Infernal vs Virtue names — what’s the difference?',
        a: 'Infernal names use guttural or elegant Infernal phonetics. Virtue names are single-word concepts that reflect a Tiefling’s moral stance.',
      },
      {
        q: 'Do Tieflings use human names?',
        a: 'Yes. Human-raised Tieflings may keep human names or blend them with Infernal sounds for a hybrid feel.',
      },
      {
        q: 'Do Tieflings have surnames?',
        a: 'Usually no. Most go by a single chosen name, though titles and epithets are common in play.',
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-2 text-gray-800">
            <Wand2 className="h-8 w-8 text-pink-600" />
            Tiefling Name Generator
          </h1>
          <p className="text-gray-600 mt-3">
            Craft Infernal, Virtue, or Human-raised Tiefling names with real D&D-style phonetics.
            Tune tone and length to match your character’s backstory.
          </p>
        </header>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name Type</label>
              <select
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as NameType })}
              >
                <option value="infernal">Infernal</option>
                <option value="virtue">Virtue</option>
                <option value="human">Human-raised (Hybrid)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value as Gender })}
              >
                <option value="neutral">Neutral</option>
                <option value="male">Male-leaning</option>
                <option value="female">Female-leaning</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
              <select
  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500"
  value={form.tone}
  onChange={(e) => setForm({ ...form, tone: e.target.value as Tone })}
  disabled={!canTone}
>
  {tones.map((t) => (
    <option key={t} value={t}>
      {t.charAt(0).toUpperCase() + t.slice(1)}
    </option>
  ))}
</select>
              {!canTone && <p className="text-xs text-gray-400 mt-1">Tone applies to Infernal names only.</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
              <select
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-pink-500"
                value={form.length}
                onChange={(e) => setForm({ ...form, length: e.target.value as LengthOpt })}
              >
                <option value="1">Short (1 syllable)</option>
                <option value="2">Medium (2 syllables)</option>
                <option value="3+">Long (3+ syllables)</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={generate}
              className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors"
            >
              Generate Names
            </button>
            <button
              onClick={() =>
                setForm({
                  type: (['infernal', 'virtue', 'human'] as NameType[])[Math.floor(Math.random() * 3)],
                  gender: (['neutral', 'male', 'female'] as Gender[])[Math.floor(Math.random() * 3)],
                  tone: (['neutral', 'harsh', 'elegant'] as Tone[])[Math.floor(Math.random() * 3)],
                  length: (['1', '2', '3+'] as LengthOpt[])[Math.floor(Math.random() * 3)],
                })
              }
              className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              Random
            </button>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Suggestions</h2>
            <div className="grid gap-2">
              {results.map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="group p-3 bg-gray-50 rounded-md text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium">{name}</span>
                    {blurbs[name] && (
                      <span className="block text-xs text-gray-500 mt-1">{blurbs[name]}</span>
                    )}
                  </div>
                  <button
                    onClick={() => copyName(name, i)}
                    className="text-gray-400 hover:text-gray-600"
                    title="Copy"
                  >
                    {copied === i ? (
                      <CheckCheck className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="prose prose-pink max-w-3xl">
          <h3>FAQ</h3>
          <details className="mb-2">
            <summary className="cursor-pointer font-medium">What is a Tiefling name?</summary>
            <p>
              Tiefling names often echo Infernal heritage with sharp, fiery sounds. Some choose virtue names like Mercy
              or Resolve to declare their ideals.
            </p>
          </details>
          <details className="mb-2">
            <summary className="cursor-pointer font-medium">Infernal vs Virtue names — what’s the difference?</summary>
            <p>
              Infernal names use guttural or elegant Infernal phonetics. Virtue names are single-word concepts that
              reflect a Tiefling’s moral stance.
            </p>
          </details>
          <details className="mb-2">
            <summary className="cursor-pointer font-medium">Do Tieflings use human names?</summary>
            <p>
              Yes. Human-raised Tieflings may keep human names or blend them with Infernal sounds for a hybrid feel.
            </p>
          </details>
          <details>
            <summary className="cursor-pointer font-medium">Do Tieflings have surnames?</summary>
            <p>
              Usually no. Most go by a single chosen name, though titles and epithets are common in play.
            </p>
          </details>
        </section>
      </div>

      {/* JSON-LD (FAQ + ItemList examples) */}
      <script
        type="application/ld+json"
        // minimal static examples so it validates on first load
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is a Tiefling name?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Tiefling names often echo Infernal heritage with sharp, fiery sounds. Some choose virtue names to declare their ideals.',
                },
              },
              {
                '@type': 'Question',
                name: 'Infernal vs Virtue names — what’s the difference?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Infernal names use guttural or elegant Infernal phonetics. Virtue names are single-word concepts reflecting a moral stance.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
