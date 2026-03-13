import { useState, useEffect, useRef } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function useWindowSize() {
  const [size, setSize] = useState({ width: typeof window !== "undefined" ? window.innerWidth : 1200 });
  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
}

const PRODUCTS = {
  "Nike Air Max 2025": {
    mentions: 24831, mentionsDelta: "+12%", topChannel: "Reddit", topChannelCount: 6913, decisionConfidence: 81,
    sentimentSplit: { positive: 62, neutral: 21, negative: 17 },
    sources: { "Twitter/X": 34, Reddit: 28, News: 18, Reviews: 12, Search: 8 },
    timeline30: [
      { d: "Jan 29", p: 18, nu: 8, ng: 4 }, { d: "Jan 30", p: 22, nu: 9, ng: 5 }, { d: "Jan 31", p: 19, nu: 11, ng: 6 }, { d: "Feb 1", p: 25, nu: 7, ng: 3 },
      { d: "Feb 2", p: 21, nu: 10, ng: 7 }, { d: "Feb 3", p: 28, nu: 8, ng: 4 }, { d: "Feb 4", p: 24, nu: 12, ng: 5 }, { d: "Feb 5", p: 20, nu: 9, ng: 8 },
      { d: "Feb 6", p: 30, nu: 7, ng: 3 }, { d: "Feb 7", p: 26, nu: 11, ng: 6 }, { d: "Feb 8", p: 23, nu: 10, ng: 5 }, { d: "Feb 9", p: 27, nu: 8, ng: 4 },
      { d: "Feb 10", p: 19, nu: 12, ng: 9 }, { d: "Feb 11", p: 31, nu: 6, ng: 3 }, { d: "Feb 12", p: 22, nu: 9, ng: 7 }, { d: "Feb 13", p: 25, nu: 11, ng: 5 },
      { d: "Feb 14", p: 29, nu: 7, ng: 4 }, { d: "Feb 15", p: 45, nu: 14, ng: 6 }, { d: "Feb 16", p: 52, nu: 18, ng: 8 }, { d: "Feb 17", p: 38, nu: 12, ng: 5 },
      { d: "Feb 18", p: 33, nu: 10, ng: 7 }, { d: "Feb 19", p: 28, nu: 9, ng: 4 }, { d: "Feb 20", p: 26, nu: 11, ng: 6 }, { d: "Feb 21", p: 30, nu: 8, ng: 5 },
      { d: "Feb 22", p: 24, nu: 10, ng: 7 }, { d: "Feb 23", p: 27, nu: 9, ng: 4 }, { d: "Feb 24", p: 32, nu: 7, ng: 3 }, { d: "Feb 25", p: 29, nu: 11, ng: 5 },
      { d: "Feb 26", p: 35, nu: 8, ng: 4 }, { d: "Feb 27", p: 31, nu: 10, ng: 6 }
    ],
    signals: [
      { src: "\u{1F426}", handle: "@sneakerhead_nyc", time: "3m ago", text: "just unboxed the air max 2025s and bro the cushioning is actually insane?? worth every penny no cap", sentiment: "positive" },
      { src: "\u{1F7E0}", handle: "u/kicks_collector", time: "7m ago", text: "been wearing these for 2 weeks, great shoe but runs narrow for sure. if you have wide feet size up or skip", sentiment: "negative" },
      { src: "\u{1F426}", handle: "@resell_radar", time: "11m ago", text: "Air Max 2025 already hitting 2x on GOAT. Nike cooked with this one", sentiment: "positive" },
      { src: "\u{1F4F0}", handle: "Hypebeast", time: "18m ago", text: "Air Max 2025 sees strong first-week sell-through across Foot Locker locations nationwide", sentiment: "positive" },
      { src: "\u2B50", handle: "RunRepeat", time: "24m ago", text: "3/5 \u2014 looks great but sizing runs small, had to return twice before getting right fit", sentiment: "negative" },
      { src: "\u{1F7E0}", handle: "r/running", time: "31m ago", text: "not a running shoe but the react foam is genuinely comfortable for all day wear honestly", sentiment: "positive" },
      { src: "\u{1F50D}", handle: "Google Trends", time: "38m ago", text: "'air max 2025 wide' search volume up 340% week over week", sentiment: "neutral" },
      { src: "\u{1F426}", handle: "@sole_collector", time: "42m ago", text: "the triple black colorway is clean af, copped immediately no hesitation", sentiment: "positive" },
      { src: "\u{1F4F0}", handle: "Complex", time: "51m ago", text: "Nike Q3 outlook boosted by Air Max line performance, analysts note strong momentum", sentiment: "positive" },
      { src: "\u2B50", handle: "Trustpilot", time: "1h ago", text: "delivery was fast but the box came damaged, shoe was fine tho. solid 4 stars", sentiment: "neutral" },
      { src: "\u{1F7E0}", handle: "r/streetwear", time: "1h ago", text: "am2025 with baggy cargos is the move this spring no cap. best silhouette nike dropped in years", sentiment: "positive" },
      { src: "\u{1F426}", handle: "@weartesters", time: "1h ago", text: "cushioning upgrade is real but arch support could be better for flat feet tbh", sentiment: "neutral" }
    ],
    fuzzy: { socialBuzz: 0.83, reviewSentiment: 0.91, newsTone: 0.61, searchVolume: 0.74, returnRate: 0.38 },
    fuzzyOutput: { label: "Moderately Positive", mu: 0.71, position: 68 },
    clusters: [
      { label: "Comfort & Fit", pct: "38%", color: "#6B9E78", dots: [[35, 75], [50, 90], [28, 95], [55, 80], [40, 85], [60, 72], [45, 98]] },
      { label: "Price & Value", pct: "29%", color: "#7B8FD4", dots: [[145, 45], [160, 30], [165, 55], [140, 65], [155, 40], [170, 50]] },
      { label: "Design & Style", pct: "33%", color: "#C9A86B", dots: [[135, 130], [150, 120], [160, 145], [125, 135], [145, 150], [155, 125]] }
    ],
    clusterSignal: "'cushioning quality' \u2014 similarity 0.94",
    gaOpps: [
      { name: "Launch wide-fit variant", fitness: 94, gen: 12 },
      { name: "Expand colorway options", fitness: 87, gen: 10 },
      { name: "Fix sizing guide", fitness: 76, gen: 14 },
      { name: "Add heel strap option", fitness: 68, gen: 11 },
      { name: "Improve lace quality", fitness: 54, gen: 9 }
    ],
    gaParams: "Population: 200 \u00B7 Crossover rate: 0.7 \u00B7 Mutation rate: 0.05 \u00B7 Converged: Gen 12",
    decisions: [
      { status: "UNDER REVIEW", question: "Should we launch a wide-width variant for Q2?", evidence: "14 signals \u00B7 3 sources", assumption: "Wide-fit demand exceeds current variant capacity", metric: "15% reduction in fit-related returns", confidence: 81 },
      { status: "DRAFT", question: "Expand colorway options to include earth tones?", evidence: "9 signals \u00B7 2 sources", assumption: "Color preference signals are strong enough to justify SKU expansion", metric: "20% uplift in repeat purchases", confidence: 67 },
      { status: "APPROVED", question: "Update sizing guide with width measurements", evidence: "22 signals \u00B7 4 sources", assumption: "Sizing confusion is causing preventable returns", metric: "Return rate drops below 8%", confidence: 91 }
    ],
    rationale: "Air Max 2025 is tracking above category average on social sentiment (73%) driven primarily by Reddit enthusiasm around the cushioning upgrade. The neural clustering model has identified \u2018sizing consistency\u2019 as the highest-signal unresolved complaint, appearing in 31% of negative mentions with an embedding similarity of 0.94 \u2014 suggesting a concentrated, addressable issue rather than diffuse dissatisfaction. The genetic prioritizer has converged on two high-fitness opportunities: a wide-fit variant launch (fitness: 94) and an updated sizing guide (fitness: 76), both of which fall within current manufacturing scope. Decision confidence sits at 81%, weighted down primarily by low news coverage (18% source share) \u2014 a signal gap that could be resolved by a targeted press outreach in the next sprint."
  },
  "Samsung Galaxy S25": {
    mentions: 31204, mentionsDelta: "+8%", topChannel: "News", topChannelCount: 8737, decisionConfidence: 67,
    sentimentSplit: { positive: 44, neutral: 28, negative: 28 },
    sources: { "Twitter/X": 26, Reddit: 22, News: 28, Reviews: 16, Search: 8 },
    timeline30: [
      { d: "Jan 29", p: 22, nu: 12, ng: 8 }, { d: "Jan 30", p: 24, nu: 10, ng: 9 }, { d: "Jan 31", p: 20, nu: 14, ng: 11 }, { d: "Feb 1", p: 26, nu: 9, ng: 7 },
      { d: "Feb 2", p: 23, nu: 11, ng: 10 }, { d: "Feb 3", p: 25, nu: 13, ng: 8 }, { d: "Feb 4", p: 21, nu: 10, ng: 12 }, { d: "Feb 5", p: 19, nu: 15, ng: 9 },
      { d: "Feb 6", p: 27, nu: 8, ng: 7 }, { d: "Feb 7", p: 24, nu: 12, ng: 11 }, { d: "Feb 8", p: 22, nu: 11, ng: 10 }, { d: "Feb 9", p: 20, nu: 14, ng: 13 },
      { d: "Feb 10", p: 15, nu: 10, ng: 22 }, { d: "Feb 11", p: 12, nu: 8, ng: 28 }, { d: "Feb 12", p: 10, nu: 6, ng: 35 }, { d: "Feb 13", p: 14, nu: 9, ng: 24 },
      { d: "Feb 14", p: 18, nu: 11, ng: 18 }, { d: "Feb 15", p: 21, nu: 13, ng: 14 }, { d: "Feb 16", p: 23, nu: 10, ng: 11 }, { d: "Feb 17", p: 25, nu: 12, ng: 9 },
      { d: "Feb 18", p: 22, nu: 14, ng: 10 }, { d: "Feb 19", p: 26, nu: 9, ng: 8 }, { d: "Feb 20", p: 24, nu: 11, ng: 7 }, { d: "Feb 21", p: 28, nu: 10, ng: 9 },
      { d: "Feb 22", p: 23, nu: 12, ng: 10 }, { d: "Feb 23", p: 25, nu: 11, ng: 8 }, { d: "Feb 24", p: 27, nu: 9, ng: 7 }, { d: "Feb 25", p: 24, nu: 13, ng: 9 },
      { d: "Feb 26", p: 26, nu: 10, ng: 8 }, { d: "Feb 27", p: 28, nu: 11, ng: 7 }
    ],
    signals: [
      { src: "\u{1F4F0}", handle: "The Verge", time: "2m ago", text: "Samsung addresses overheating reports with emergency firmware patch, says issue affected less than 1% of units", sentiment: "neutral" },
      { src: "\u{1F7E0}", handle: "u/AndroidCentral_fan", time: "5m ago", text: "third day with the S25 and battery is holding up way better than S24, but had one warmth issue during a 4K shoot", sentiment: "neutral" },
      { src: "\u{1F426}", handle: "@MKBHD", time: "9m ago", text: "S25 camera improvements are legit. Night mode is genuinely competitive with the Pixel now", sentiment: "positive" },
      { src: "\u2B50", handle: "GSMArena", time: "14m ago", text: "Battery life test: 11h 42min endurance \u2014 solid improvement over S24 but still behind iPhone 16 Pro", sentiment: "neutral" },
      { src: "\u{1F426}", handle: "@techreviewdaily", time: "20m ago", text: "overheating reports seem isolated to early batch units. Samsung support confirmed a patch is coming", sentiment: "neutral" },
      { src: "\u{1F4F0}", handle: "TechCrunch", time: "28m ago", text: "Samsung Galaxy S25 sales tracking 15% below S24 launch week amid overheating controversy", sentiment: "negative" },
      { src: "\u{1F7E0}", handle: "r/samsung", time: "35m ago", text: "returned my s25 ultra after the overheating thing, went pixel 9 pro and couldn't be happier tbh", sentiment: "negative" },
      { src: "\u{1F426}", handle: "@phonearena", time: "41m ago", text: "one ui 7 on the s25 is buttery smooth, samsung finally nailed the software experience", sentiment: "positive" },
      { src: "\u{1F50D}", handle: "Google Trends", time: "48m ago", text: "'galaxy s25 overheating fix' peaked at 100 trend score, now declining to 45", sentiment: "neutral" },
      { src: "\u2B50", handle: "Amazon Reviewer", time: "55m ago", text: "camera is genuinely next level. the AI photo processing blew my mind. minus one star for the charger not included", sentiment: "positive" },
      { src: "\u{1F4F0}", handle: "Reuters", time: "1h ago", text: "Samsung stock dips 2.3% following viral overheating reports on social media platforms", sentiment: "negative" },
      { src: "\u{1F426}", handle: "@sabordetech", time: "1h ago", text: "battery life on the s25 plus is genuinely all-day, I'm getting 8-9 hours SOT easy no complaints", sentiment: "positive" }
    ],
    fuzzy: { socialBuzz: 0.61, reviewSentiment: 0.54, newsTone: 0.42, searchVolume: 0.73, returnRate: 0.58 },
    fuzzyOutput: { label: "Mixed-Cautious", mu: 0.48, position: 45 },
    clusters: [
      { label: "Battery & Heat", pct: "41%", color: "#C96B6B", dots: [[30, 70], [45, 85], [25, 90], [50, 75], [35, 80], [55, 68], [22, 82], [40, 92]] },
      { label: "Camera Quality", pct: "31%", color: "#6B9E78", dots: [[145, 40], [160, 25], [165, 50], [140, 60], [155, 35], [170, 45]] },
      { label: "Software & AI", pct: "28%", color: "#7B8FD4", dots: [[130, 135], [145, 125], [155, 148], [120, 140], [140, 155], [150, 130]] }
    ],
    clusterSignal: "'thermal throttling' \u2014 similarity 0.91",
    gaOpps: [
      { name: "Optimize thermal management", fitness: 96, gen: 8 },
      { name: "Improve charger bundle", fitness: 88, gen: 11 },
      { name: "Enhance camera low-light", fitness: 79, gen: 13 },
      { name: "Add S-Pen support", fitness: 65, gen: 10 },
      { name: "Improve fingerprint speed", fitness: 51, gen: 9 }
    ],
    gaParams: "Population: 250 \u00B7 Crossover rate: 0.8 \u00B7 Mutation rate: 0.04 \u00B7 Converged: Gen 8",
    decisions: [
      { status: "DRAFT", question: "Release OTA patch to address thermal throttling reports?", evidence: "31 signals \u00B7 5 sources", assumption: "Overheating is software not hardware", metric: "Negative thermal mentions drop by 60%", confidence: 74 },
      { status: "UNDER REVIEW", question: "Include 45W charger in box for premium markets?", evidence: "18 signals \u00B7 3 sources", assumption: "Charger omission is a top purchase blocker", metric: "NPS score improves by 8 points", confidence: 69 },
      { status: "APPROVED", question: "Prioritize low-light camera improvements in next firmware", evidence: "27 signals \u00B7 4 sources", assumption: "Camera quality is primary purchase driver", metric: "Camera review scores average above 4.5 stars", confidence: 88 }
    ],
    rationale: "Galaxy S25 is navigating a sentiment crisis driven by the day-12 overheating thread that went viral on Reddit, generating 35 negative mentions at peak \u2014 a 3.5x spike over baseline negativity. The neural clustering model shows \u2018battery and heat\u2019 dominating 41% of semantic space with a similarity score of 0.91 on \u2018thermal throttling,\u2019 indicating a tightly focused issue rather than broad product dissatisfaction. Camera and software sentiment remain strongly positive (31% and 28% respectively), suggesting the core product proposition is intact. The genetic algorithm converged unusually fast (8 generations) on thermal optimization as the top priority (fitness: 96), reflecting high signal clarity. Decision confidence is suppressed at 67% due to the unresolved nature of the thermal issue."
  },
  "MacBook Air M4": {
    mentions: 18472, mentionsDelta: "+19%", topChannel: "Twitter/X", topChannelCount: 6279, decisionConfidence: 89,
    sentimentSplit: { positive: 76, neutral: 18, negative: 6 },
    sources: { "Twitter/X": 34, Reddit: 18, News: 22, Reviews: 14, Search: 12 },
    timeline30: [
      { d: "Jan 29", p: 14, nu: 4, ng: 1 }, { d: "Jan 30", p: 16, nu: 5, ng: 1 }, { d: "Jan 31", p: 15, nu: 4, ng: 2 }, { d: "Feb 1", p: 18, nu: 5, ng: 1 },
      { d: "Feb 2", p: 17, nu: 6, ng: 1 }, { d: "Feb 3", p: 20, nu: 4, ng: 2 }, { d: "Feb 4", p: 19, nu: 5, ng: 1 }, { d: "Feb 5", p: 22, nu: 6, ng: 1 },
      { d: "Feb 6", p: 21, nu: 4, ng: 2 }, { d: "Feb 7", p: 24, nu: 5, ng: 1 }, { d: "Feb 8", p: 23, nu: 6, ng: 1 }, { d: "Feb 9", p: 25, nu: 4, ng: 2 },
      { d: "Feb 10", p: 26, nu: 5, ng: 1 }, { d: "Feb 11", p: 28, nu: 6, ng: 1 }, { d: "Feb 12", p: 27, nu: 5, ng: 2 }, { d: "Feb 13", p: 30, nu: 4, ng: 1 },
      { d: "Feb 14", p: 29, nu: 6, ng: 1 }, { d: "Feb 15", p: 32, nu: 5, ng: 2 }, { d: "Feb 16", p: 31, nu: 4, ng: 1 }, { d: "Feb 17", p: 34, nu: 6, ng: 1 },
      { d: "Feb 18", p: 33, nu: 5, ng: 2 }, { d: "Feb 19", p: 36, nu: 4, ng: 1 }, { d: "Feb 20", p: 35, nu: 6, ng: 1 }, { d: "Feb 21", p: 38, nu: 5, ng: 2 },
      { d: "Feb 22", p: 37, nu: 4, ng: 1 }, { d: "Feb 23", p: 40, nu: 6, ng: 1 }, { d: "Feb 24", p: 39, nu: 5, ng: 2 }, { d: "Feb 25", p: 42, nu: 4, ng: 1 },
      { d: "Feb 26", p: 41, nu: 6, ng: 1 }, { d: "Feb 27", p: 44, nu: 5, ng: 2 }
    ],
    signals: [
      { src: "\u{1F426}", handle: "@devlife_sf", time: "4m ago", text: "switched from M3 to M4 macbook air and the performance delta for compiling is unreal. this thing rips", sentiment: "positive" },
      { src: "\u{1F7E0}", handle: "u/apple_faithful", time: "8m ago", text: "best laptop apple has made in years. no fans, no heat, just fast. 10/10 no notes", sentiment: "positive" },
      { src: "\u{1F4F0}", handle: "The Verge", time: "13m ago", text: "Apple's M4 Air sets new benchmark for fanless laptop performance, review scores averaging 4.7/5", sentiment: "positive" },
      { src: "\u{1F426}", handle: "@LinusTech", time: "19m ago", text: "$1299 for this performance is actually reasonable? what timeline is this?? apple pricing making sense??", sentiment: "positive" },
      { src: "\u2B50", handle: "Wirecutter", time: "25m ago", text: "Our new top pick. The M4 Air is the laptop we'd recommend to almost everyone, period.", sentiment: "positive" },
      { src: "\u{1F7E0}", handle: "r/apple", time: "32m ago", text: "only 8gb base config in 2025 is still embarrassing tbh, apple tax is real for the upgrade", sentiment: "negative" },
      { src: "\u{1F50D}", handle: "Google Trends", time: "39m ago", text: "'macbook air m4 vs m3' search volume steady at 82, 'macbook air accessories' trending up", sentiment: "neutral" },
      { src: "\u{1F426}", handle: "@aaboronin", time: "45m ago", text: "the midnight color doesn't fingerprint anymore!!! finally!!! only took apple 3 generations lol", sentiment: "positive" },
      { src: "\u{1F4F0}", handle: "Bloomberg", time: "52m ago", text: "Apple expects M4 Air to drive strongest Mac quarter since 2022, supply chain sources report", sentiment: "positive" },
      { src: "\u2B50", handle: "YouTube Comment", time: "58m ago", text: "just watched the 5hr battery test video. 18hrs is not a joke. buying tomorrow", sentiment: "positive" },
      { src: "\u{1F426}", handle: "@UXEmma", time: "1h ago", text: "switched my entire design workflow to the m4 air. figma + chrome + slack + spotify and it doesn't even get warm", sentiment: "positive" },
      { src: "\u{1F7E0}", handle: "r/laptops", time: "1h ago", text: "if you're not in the apple ecosystem there's still better value in the framework 16 imo", sentiment: "neutral" }
    ],
    fuzzy: { socialBuzz: 0.91, reviewSentiment: 0.88, newsTone: 0.85, searchVolume: 0.82, returnRate: 0.12 },
    fuzzyOutput: { label: "Strongly Positive", mu: 0.87, position: 85 },
    clusters: [
      { label: "Performance & Speed", pct: "36%", color: "#6B9E78", dots: [[32, 73], [47, 88], [27, 93], [52, 78], [37, 83], [57, 70], [42, 96]] },
      { label: "Price & Value", pct: "34%", color: "#C9A86B", dots: [[143, 43], [158, 28], [163, 53], [138, 63], [153, 38], [168, 48]] },
      { label: "Accessory Ecosystem", pct: "30%", color: "#7B8FD4", dots: [[133, 133], [148, 123], [158, 146], [123, 138], [143, 153], [153, 128], [138, 148]] }
    ],
    clusterSignal: "'accessory bundle demand' \u2014 similarity 0.89",
    gaOpps: [
      { name: "Bundle USB-C hub", fitness: 91, gen: 14 },
      { name: "Launch midnight matte finish", fitness: 84, gen: 12 },
      { name: "Add HDMI port", fitness: 77, gen: 11 },
      { name: "Improve webcam resolution", fitness: 69, gen: 13 },
      { name: "Offer 3yr AppleCare default", fitness: 58, gen: 10 }
    ],
    gaParams: "Population: 180 \u00B7 Crossover rate: 0.65 \u00B7 Mutation rate: 0.06 \u00B7 Converged: Gen 14",
    decisions: [
      { status: "APPROVED", question: "Bundle a USB-C to HDMI adapter with Pro models?", evidence: "19 signals \u00B7 3 sources", assumption: "Dongle frustration is the #1 unboxing complaint", metric: "Accessories-related negative mentions drop below 5%", confidence: 91 },
      { status: "UNDER REVIEW", question: "Launch a new 'midnight matte' finish for back-to-school?", evidence: "12 signals \u00B7 2 sources", assumption: "Design differentiation drives upgrade cycles", metric: "12% lift in student segment sales", confidence: 72 },
      { status: "DRAFT", question: "Upgrade webcam to 4K in next revision?", evidence: "8 signals \u00B7 2 sources", assumption: "Remote work users are primary webcam complainers", metric: "Webcam satisfaction score >4.0", confidence: 58 }
    ],
    rationale: "MacBook Air M4 is exhibiting the strongest positive signal trajectory of any product currently tracked, with sentiment rising steadily over 30 days and reaching 76% positive \u2014 an unusually high mark for a laptop category that typically plateaus around 55%. The neural model identifies \u2018accessory ecosystem\u2019 as the dominant emerging theme (30% cluster share, similarity 0.89), indicating that buyer behavior has moved past evaluation into active ownership and expansion. The genetic algorithm required 14 generations to converge, reflecting the breadth of viable opportunities rather than signal ambiguity. Top fitness scores cluster around merchandising and content plays rather than product fixes, confirming that the M4 Air\u2019s core proposition is resonating cleanly. Decision confidence is high at 89%, with the primary drag being the recurring 8GB base memory critique (6% negative share)."
  }
};

const PRODUCT_KEYS = Object.keys(PRODUCTS);
let rotationIndex = 0;

function getDatasetForProduct(name) {
  const exact = PRODUCTS[name];
  if (exact) return { data: exact, displayName: name };
  const baseKey = PRODUCT_KEYS[rotationIndex % 3];
  rotationIndex++;
  return { data: PRODUCTS[baseKey], displayName: name };
}

function CountUp({ target, duration = 600 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);
  return <span style={{ fontFamily: 'DM Mono,monospace' }}>{val.toLocaleString()}</span>;
}

function ConfidenceArc({ value, size = 80 }) {
  const r = (size - 8) / 2;
  const circ = Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color = value > 75 ? '#6B9E78' : value >= 50 ? '#C9A86B' : '#C96B6B';
  return (
    <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
      <path d={`M 4 ${size / 2} A ${r} ${r} 0 0 1 ${size - 4} ${size / 2}`} fill="none" stroke="#E8E0D0" strokeWidth="6" strokeLinecap="round" />
      <path d={`M 4 ${size / 2} A ${r} ${r} 0 0 1 ${size - 4} ${size / 2}`} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
      <text x={size / 2} y={size / 2 - 2} textAnchor="middle" style={{ fontSize: size > 72 ? '14px' : '12px', fontFamily: 'DM Mono,monospace', fill: '#1A1714', fontWeight: 700 }}>{value}%</text>
    </svg>
  );
}

const AGENT_STEPS = [
  { name: "Signal Crawler", active: "Scanning Twitter/X \u00B7 Reddit \u00B7 NewsAPI \u00B7 Amazon Reviews \u00B7 Google Trends...", done: "signals collected across 5 sources" },
  { name: "Neural Retrieval Engine", active: "Running embedding model \u00B7 clustering semantic vectors \u00B7 matching product context...", done: "3 intent clusters identified \u00B7 top cluster similarity: 0.94" },
  { name: "Fuzzy Logic Classifier", active: "Computing membership functions \u00B7 reconciling conflicting signals \u00B7 applying soft thresholds...", done: "Sentiment classified: Moderately Positive (\u03BC = 0.71)" },
  { name: "Genetic Algorithm Prioritizer", active: "Initializing population: 200 \u00B7 running 12 generations \u00B7 evaluating fitness functions...", done: "Decision priorities evolved \u00B7 top opportunity fitness: 94" }
];

const ANALYSIS_TIMING = {
  typewriterDelayMin: 18,
  typewriterDelayMax: 34,
  delayAfterStepDoneMs: 1200,
  delayBetweenStepsMs: 450,
  signalsCountDurationMs: 3200,
  delayBeforeDashboardMs: 5500,
  liveStatusRotateMs: 1400,
};

const LIVE_STATUS_ROTATE = [
  ["Connecting to Twitter/X API...", "Polling Reddit r/...", "Fetching NewsAPI stream...", "Indexing Amazon Reviews...", "Pulling Google Trends..."],
  ["Loading embedding model...", "Encoding mention batch...", "Computing pairwise similarity...", "Building cluster graph...", "Extracting top themes..."],
  ["Loading membership rules...", "Reconciling signal conflicts...", "Computing \u03BC values...", "Applying soft thresholds...", "Aggregating sentiment..."],
  ["Seeding population (n=200)...", "Evaluating fitness...", "Running crossover...", "Applying mutation...", "Selecting next generation..."]
];

const MOBILE_BP = 768;
const SMALL_MOBILE_BP = 480;

export default function Pulse() {
  const { width } = useWindowSize();
  const isMobile = width <= MOBILE_BP;
  const isSmallMobile = width <= SMALL_MOBILE_BP;

  const [screen, setScreen] = useState("landing");
  const [productName, setProductName] = useState("");
  const [query, setQuery] = useState("");
  const [productData, setProductData] = useState(null);
  const [timeRange, setTimeRange] = useState("30d");
  const [signalIndex, setSignalIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [fadeState, setFadeState] = useState("in");
  const [agentStep, setAgentStep] = useState(-1);
  const [typeText, setTypeText] = useState("");
  const [stepDone, setStepDone] = useState([false, false, false, false]);
  const [progress, setProgress] = useState(0);
  const [showBrief, setShowBrief] = useState(false);
  const [liveStatus, setLiveStatus] = useState("");
  const [signalsCount, setSignalsCount] = useState(0);
  const typeRef = useRef(null);
  const liveStatusIdx = useRef(0);

  const startAnalysis = (name) => {
    const { data, displayName } = getDatasetForProduct(name);
    setProductName(displayName);
    setProductData(data);
    setFadeState('out');
    setSignalsCount(0);
    setLiveStatus("");
    liveStatusIdx.current = 0;
    setTimeout(() => {
      setScreen('agent');
      setAgentStep(-1);
      setStepDone([false, false, false, false]);
      setTypeText('');
      setProgress(0);
      setShowBrief(false);
      setFadeState('in');
      setTimeout(() => setAgentStep(0), 200);
    }, 300);
  };

  const goHome = () => {
    setFadeState('out');
    setTimeout(() => {
      setScreen('landing');
      setQuery('');
      setProductName('');
      setProductData(null);
      setSignalIndex(0);
      setCardsVisible(false);
      setFadeState('in');
    }, 300);
  };

  useEffect(() => {
    if (screen !== 'agent' || agentStep < 0 || agentStep > 3) return;
    const statuses = LIVE_STATUS_ROTATE[agentStep];
    setLiveStatus(statuses[0] ?? "");
    liveStatusIdx.current = 0;
    const rot = setInterval(() => {
      liveStatusIdx.current = (liveStatusIdx.current + 1) % statuses.length;
      setLiveStatus(statuses[liveStatusIdx.current]);
    }, ANALYSIS_TIMING.liveStatusRotateMs);
    return () => clearInterval(rot);
  }, [screen, agentStep]);

  useEffect(() => {
    if (screen !== 'agent' || agentStep !== 0 || !productData) return;
    const target = productData.mentions;
    const duration = ANALYSIS_TIMING.signalsCountDurationMs;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(1, elapsed / duration);
      const easeOut = 1 - (1 - t) * (1 - t);
      setSignalsCount(Math.floor(easeOut * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [screen, agentStep, productData]);

  useEffect(() => {
    if (screen !== 'agent' || agentStep < 0 || agentStep > 3) return;
    const txt = AGENT_STEPS[agentStep].active;
    let i = 0;
    setTypeText('');
    const scheduleNext = () => {
      i++;
      setTypeText(txt.slice(0, i));
      if (i >= txt.length) {
        setTimeout(() => {
          setStepDone(prev => {
            const n = [...prev];
            n[agentStep] = true;
            return n;
          });
          setProgress((agentStep + 1) / 4 * 100);
          if (agentStep < 3) {
            setTimeout(() => setAgentStep(agentStep + 1), ANALYSIS_TIMING.delayBetweenStepsMs);
          } else {
            setTimeout(() => setShowBrief(true), 400);
            setTimeout(() => {
              setFadeState('out');
              setTimeout(() => {
                setScreen('dashboard');
                setSignalIndex(0);
                setCardsVisible(false);
                setTimeRange('30d');
                setFadeState('in');
                setTimeout(() => setCardsVisible(true), 100);
              }, 300);
            }, ANALYSIS_TIMING.delayBeforeDashboardMs);
          }
        }, ANALYSIS_TIMING.delayAfterStepDoneMs);
        return;
      }
      const delay =
        ANALYSIS_TIMING.typewriterDelayMin +
        Math.random() * (ANALYSIS_TIMING.typewriterDelayMax - ANALYSIS_TIMING.typewriterDelayMin);
      typeRef.current = setTimeout(scheduleNext, delay);
    };
    typeRef.current = setTimeout(scheduleNext, ANALYSIS_TIMING.typewriterDelayMin);
    return () => {
      if (typeRef.current) clearTimeout(typeRef.current);
    };
  }, [screen, agentStep]);

  useEffect(() => {
    if (screen !== 'dashboard' || !productData) return;
    const t = setInterval(() => setSignalIndex(i => (i + 1) % productData.signals.length), 4000);
    return () => clearInterval(t);
  }, [screen, productData]);

  const getTimelineData = () => {
    if (!productData) return [];
    if (timeRange === '7d') return productData.timeline30.slice(-7);
    if (timeRange === '24h') return productData.timeline30.slice(-1);
    return productData.timeline30;
  };

  const visibleSignals = productData ? Array.from({length: 5}, (_, i) => {
    const idx = (signalIndex + i) % productData.signals.length;
    return {...productData.signals[idx], key: signalIndex + '-' + i};
  }) : [];

  const sc = {positive:'#A8D8B9',negative:'#F4A8A8',neutral:'#F5D09A'};
  const stc = {positive:'#2D6A3F',negative:'#7A1F1F',neutral:'#7A5F1F'};
  const statusBg = {DRAFT:'#F5D09A','UNDER REVIEW':'#D4E4F7',APPROVED:'#D4EED9'};
  const statusTc = {DRAFT:'#7A5F1F','UNDER REVIEW':'#1A4A7A',APPROVED:'#1A5C2A'};
  const d = productData;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Mono:wght@400;500&family=Lora:ital,wght@0,400;1,400&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        body{background:#F8F4EE;font-family:system-ui,-apple-system,sans-serif;color:#1A1714;-webkit-font-smoothing:antialiased}
        .fade-in{opacity:1;transition:opacity 300ms ease}
        .fade-out{opacity:0;transition:opacity 300ms ease}
        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.5)}}
        .pdot{display:inline-block;width:8px;height:8px;background:#6B9E78;border-radius:50%;animation:pulseDot 2s ease-in-out infinite;vertical-align:middle}
        @keyframes agentPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
        .agent-active{animation:agentPulse 1.2s ease-in-out infinite}
        .sig-enter{animation:sigSlide 300ms ease forwards}
        @keyframes sigSlide{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
        @media (max-width:768px){
          .pulse-landing-hero{font-size:26px !important;max-width:100% !important}
          .pulse-footer-stats{flex-wrap:wrap;gap:8px;justify-content:center;text-align:center;padding:0 16px 20px !important;font-size:10px !important}
        }
        @media (max-width:480px){
          .pulse-landing-hero{font-size:22px !important}
          .pulse-input-wrap{flex-direction:column;max-width:100% !important}
          .pulse-input-wrap input{border-radius:10px !important;border-right:1.5px solid #E8E0D0 !important}
          .pulse-input-wrap button{border-radius:10px !important;width:100%}
        }
      `}</style>
      <div className={fadeState === 'out' ? 'fade-out' : 'fade-in'} style={{minHeight:'100vh'}}>

        {screen === "landing" && (
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: isSmallMobile ? "24px 16px" : isMobile ? "32px 24px" : "40px 48px",
              maxWidth: 1200,
              margin: "0 auto",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "fixed",
                top: isMobile ? 16 : 28,
                left: isMobile ? 20 : 36,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: isMobile ? 18 : 20 }}>pulse</span>
              <span className="pdot" style={{ width: 7, height: 7 }} />
            </div>
            <h1
              className="pulse-landing-hero"
              style={{
                fontFamily: "Syne,sans-serif",
                fontWeight: 700,
                fontSize: isSmallMobile ? 22 : isMobile ? 26 : 42,
                textAlign: "center",
                lineHeight: 1.2,
                maxWidth: 560,
                color: "#1A1714",
              }}
            >
              What did the world think of your product today?
            </h1>
            <p
              style={{
                fontFamily: "Lora,serif",
                fontStyle: "italic",
                fontSize: isMobile ? 14 : 17,
                color: "#6B6560",
                marginTop: isMobile ? 12 : 16,
                textAlign: "center",
              }}
            >
              Track mentions, sentiment, and decisions across every channel.
            </p>
            <div className="pulse-input-wrap" style={{ display: "flex", width: "100%", maxWidth: 520, marginTop: isMobile ? 24 : 32 }}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) startAnalysis(query.trim());
                }}
                placeholder="Enter your product name..."
                style={{
                  flex: 1,
                  padding: "0 16px",
                  height: isMobile ? 48 : 52,
                  fontSize: 14,
                  fontFamily: "DM Mono,monospace",
                  border: "1.5px solid #E8E0D0",
                  borderRight: "none",
                  borderRadius: "10px 0 0 10px",
                  background: "#FDFAF6",
                  outline: "none",
                  color: "#1A1714",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#6B9E78")}
                onBlur={(e) => (e.target.style.borderColor = "#E8E0D0")}
              />
              <button
                onClick={() => {
                  if (query.trim()) startAnalysis(query.trim());
                }}
                style={{
                  padding: "0 20px",
                  height: isMobile ? 48 : 52,
                  fontFamily: "Syne,sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  background: "#1A1714",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0 10px 10px 0",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Track →
              </button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: isMobile ? 16 : 20,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: isMobile ? 11 : 12, color: "#9C9490" }}>Try a demo:</span>
              {PRODUCT_KEYS.map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setQuery(n);
                    startAnalysis(n);
                  }}
                  style={{
                    padding: "6px 12px",
                    fontSize: isMobile ? 11 : 12,
                    fontFamily: "Syne,sans-serif",
                    fontWeight: 600,
                    border: "1px solid #E8E0D0",
                    borderRadius: 20,
                    background: "transparent",
                    cursor: "pointer",
                    color: "#1A1714",
                    transition: "background 200ms",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#F0EBE0")}
                  onMouseLeave={(e) => (e.target.style.background = "transparent")}
                >
                  {n}
                </button>
              ))}
            </div>
            <div
              className="pulse-footer-stats"
              style={{
                position: "fixed",
                bottom: isMobile ? 16 : 32,
                left: 0,
                right: 0,
                display: "flex",
                gap: isMobile ? 8 : 20,
                justifyContent: "center",
                fontSize: isMobile ? 10 : 11,
                fontFamily: "DM Mono,monospace",
                color: "#9C9490",
              }}
            >
              <span>24,831 signals processed</span>
              <span>·</span>
              <span>3 soft computing models active</span>
              <span>·</span>
              <span>Decision-ready in 4 seconds</span>
            </div>
          </div>
        )}

        {screen === "agent" && (
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: isSmallMobile ? "24px 16px" : isMobile ? "32px 20px" : "40px 48px",
            }}
          >
            <div style={{ maxWidth: 600, width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "DM Mono,monospace", fontSize: isMobile ? 10 : 11, textTransform: "uppercase", letterSpacing: "1.5px", color: "#9C9490" }}>Analyzing</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "DM Mono,monospace", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", color: "#6B9E78", background: "#E8F0EA", padding: "3px 8px", borderRadius: 4 }}>
                  <span className="pdot" style={{ width: 4, height: 4 }} /> Live
                </span>
              </div>
              <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: isMobile ? 22 : 28, color: "#1A1714", marginTop: 8, wordBreak: "break-word" }}>{productName}</h2>
              <p style={{ fontFamily: "Lora,serif", fontStyle: "italic", fontSize: isMobile ? 13 : 14, color: "#6B6560", marginTop: 8 }}>Running soft computing pipeline...</p>
              {liveStatus && (
                <p style={{ fontFamily: "DM Mono,monospace", fontSize: isMobile ? 10 : 11, color: "#9C9490", marginTop: 4, marginBottom: isMobile ? 24 : 36, minHeight: 16, transition: "opacity 200ms" }}>{liveStatus}</p>
              )}
              {!liveStatus && <div style={{ marginBottom: isMobile ? 24 : 36, minHeight: 16 }} />}
              {AGENT_STEPS.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: isMobile ? 12 : 16, alignItems: "flex-start", marginBottom: i < 3 ? 0 : 0, position: "relative" }}>
                  {i < 3 && <div style={{ position: "absolute", left: 11, top: 28, width: 1, height: 32, background: "#E8E0D0" }} />}
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    {stepDone[i] ? (
                      <svg width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#6B9E78" /><path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    ) : agentStep === i ? (
                      <svg width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} viewBox="0 0 24 24" className="agent-active"><circle cx="12" cy="12" r="10" fill="#C9A86B" /></svg>
                    ) : (
                      <svg width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#E8E0D0" strokeWidth="1.5" /></svg>
                    )}
                  </div>
                  <div style={{ flex: 1, paddingBottom: isMobile ? 16 : 20, minWidth: 0 }}>
                    <div style={{ fontFamily: "DM Mono,monospace", fontSize: isMobile ? 12 : 13, fontWeight: 500, color: "#1A1714" }}>{step.name}</div>
                    <div style={{ fontFamily: "DM Mono,monospace", fontSize: isMobile ? 11 : 12, color: stepDone[i] ? "#6B9E78" : "#9C9490", marginTop: 4, lineHeight: 1.5, minHeight: 20, wordBreak: "break-word" }}>
                      {stepDone[i]
                        ? (i === 0 && productData
                          ? `${productData.mentions.toLocaleString()} ${step.done}`
                          : step.done)
                        : agentStep === i
                          ? typeText
                          : ''}
                      {agentStep === i && !stepDone[i] && (
                        i === 0 && productData ? (
                          <span style={{color:'#9C9490'}}> — {signalsCount.toLocaleString()} signals</span>
                        ) : null
                      )}
                      {agentStep === i && !stepDone[i] && i !== 0 && <span style={{borderRight:'2px solid #C9A86B',marginLeft:1,animation:'pulseDot 1s infinite'}}>&nbsp;</span>}
                      {agentStep === i && !stepDone[i] && i === 0 && productData && <span style={{borderRight:'2px solid #C9A86B',marginLeft:1,animation:'pulseDot 1s infinite'}}>&nbsp;</span>}
                    </div>
                  </div>
                  {stepDone[i] && <span style={{ fontFamily: "DM Mono,monospace", fontSize: isMobile ? 9 : 10, color: "#6B9E78", marginTop: 4, whiteSpace: "nowrap" }}>✓ done</span>}
                </div>
              ))}
              <div style={{marginTop:16,height:3,background:'#E8E0D0',borderRadius:2,overflow:'hidden'}}>
                <div style={{height:'100%',background:'#6B9E78',borderRadius:2,width:`${progress}%`,transition:'width 400ms ease'}}/>
              </div>
              {showBrief && <p style={{fontFamily:'Lora,serif',fontStyle:'italic',fontSize:14,color:'#6B6560',marginTop:24,textAlign:'center',opacity:1,transition:'opacity 300ms'}}>Building your Decision Brief...</p>}
            </div>
          </div>
        )}
        {screen === "dashboard" && d && (
          <div>
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                background: "#F8F4EE",
                borderBottom: "1px solid #E8E0D0",
                minHeight: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: isMobile ? "12px 16px" : "0 48px",
                flexWrap: "wrap",
                gap: isMobile ? 8 : 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                <span onClick={goHome} style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: isMobile ? 16 : 18, cursor: "pointer" }}>pulse</span>
                <span style={{ color: "#9C9490", fontFamily: "DM Mono,monospace", fontSize: isMobile ? 11 : 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>/ {productName}</span>
              </div>
              {!isSmallMobile && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: isMobile ? 13 : 15, overflow: "hidden", textOverflow: "ellipsis", maxWidth: isMobile ? 120 : "none" }}>{productName}</span>
                  <span className="pdot" style={{ width: 6, height: 6 }} />
                  <span style={{ fontFamily: "DM Mono,monospace", fontSize: 11, color: "#9C9490" }}>tracking</span>
                </div>
              )}
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button onClick={goHome} style={{ fontFamily: "system-ui", fontSize: isMobile ? 12 : 13, background: "none", border: "none", cursor: "pointer", color: "#6B6560", padding: "4px 0" }}>← New Product</button>
                <button style={{ padding: "6px 12px", fontSize: isMobile ? 11 : 12, fontFamily: "system-ui", border: "1px solid #E8E0D0", borderRadius: 8, background: "#FDFAF6", cursor: "pointer" }}>Export Report</button>
              </div>
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: isSmallMobile ? "20px 16px" : isMobile ? "24px 20px" : "40px 48px" }}>

              <div style={{ display: "grid", gridTemplateColumns: isSmallMobile ? "1fr" : isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? 12 : 16, marginBottom: isMobile ? 32 : 48 }}>
                <div style={{ background: "#FDFAF6", border: "1px solid #E8E0D0", borderRadius: 10, padding: isMobile ? 16 : 24 }}>
                  <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: isMobile ? 11 : 12, textTransform: "uppercase", letterSpacing: ".5px", color: "#9C9490", marginBottom: isMobile ? 8 : 12 }}>Total Mentions</div>
                  <div style={{ fontSize: isMobile ? 26 : 32, fontWeight: 700 }}><CountUp target={d.mentions} /></div>
                  <div style={{ fontFamily: "DM Mono,monospace", fontSize: isMobile ? 10 : 11, color: "#6B9E78", marginTop: 6 }}>{d.mentionsDelta} vs last week</div>
                </div>
                <div style={{ background: "#FDFAF6", border: "1px solid #E8E0D0", borderRadius: 10, padding: isMobile ? 16 : 24 }}>
                  <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: isMobile ? 11 : 12, textTransform: "uppercase", letterSpacing: ".5px", color: "#9C9490", marginBottom: isMobile ? 8 : 12 }}>Fuzzy Sentiment Index</div>
                  <div style={{ height: 8, borderRadius: 4, display: "flex", overflow: "hidden", marginTop: 10, marginBottom: 10 }}>
                    <div style={{ width: `${d.sentimentSplit.positive}%`, background: "#A8D8B9" }} />
                    <div style={{ width: `${d.sentimentSplit.neutral}%`, background: "#F5D09A" }} />
                    <div style={{ width: `${d.sentimentSplit.negative}%`, background: "#F4A8A8" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "DM Mono,monospace", fontSize: isMobile ? 10 : 11 }}>
                    <span style={{ color: "#2D6A3F" }}>{d.sentimentSplit.positive}%</span>
                    <span style={{ color: "#7A5F1F" }}>{d.sentimentSplit.neutral}%</span>
                    <span style={{ color: "#7A1F1F" }}>{d.sentimentSplit.negative}%</span>
                  </div>
                </div>
                <div style={{ background: "#FDFAF6", border: "1px solid #E8E0D0", borderRadius: 10, padding: isMobile ? 16 : 24 }}>
                  <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: isMobile ? 11 : 12, textTransform: "uppercase", letterSpacing: ".5px", color: "#9C9490", marginBottom: isMobile ? 8 : 12 }}>Top Signal Source</div>
                  <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: isMobile ? 20 : 24 }}>{d.topChannel}</div>
                  <div style={{ fontFamily: "DM Mono,monospace", fontSize: isMobile ? 12 : 14, color: "#9C9490", marginTop: 4 }}>{d.topChannelCount.toLocaleString()} mentions</div>
                </div>
                <div style={{ background: "#FDFAF6", border: "1px solid #E8E0D0", borderRadius: 10, padding: isMobile ? 16 : 24 }}>
                  <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: isMobile ? 11 : 12, textTransform: "uppercase", letterSpacing: ".5px", color: "#9C9490", marginBottom: isMobile ? 8 : 12 }}>GA-Weighted Confidence</div>
                  <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}><ConfidenceArc value={d.decisionConfidence} size={isMobile ? 72 : 88} /></div>
                </div>
              </div>

              <div style={{ background: "#FDFAF6", border: "1px solid #E8E0D0", borderRadius: 10, padding: isMobile ? 16 : 28, marginBottom: isMobile ? 32 : 48 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isMobile ? 12 : 20, flexWrap: "wrap", gap: 8 }}>
                  <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: isMobile ? 14 : 15 }}>30-day sentiment pulse</h3>
                  <div style={{ display: "flex", gap: 4 }}>
                    {["30d", "7d", "24h"].map((r) => (
                      <button key={r} onClick={() => setTimeRange(r)} style={{ padding: "4px 10px", fontSize: isMobile ? 10 : 11, fontFamily: "DM Mono,monospace", border: "1px solid #E8E0D0", borderRadius: 6, background: timeRange === r ? "#1A1714" : "transparent", color: timeRange === r ? "#fff" : "#6B6560", cursor: "pointer" }}>{r}</button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={isMobile ? 180 : 220}>
                  <AreaChart data={getTimelineData()}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#F0EBE0"/>
                    <XAxis dataKey="d" tick={{fontSize:11,fontFamily:'DM Mono,monospace',fill:'#9C9490'}} axisLine={{stroke:'#E8E0D0'}} tickLine={false}/>
                    <YAxis tick={{fontSize:11,fontFamily:'DM Mono,monospace',fill:'#9C9490'}} axisLine={false} tickLine={false}/>
                    <Tooltip contentStyle={{fontSize:11,fontFamily:'DM Mono,monospace',background:'#FDFAF6',border:'1px solid #E8E0D0',borderRadius:8}}/>
                    <Area type="monotone" dataKey="ng" stackId="1" stroke="#F4A8A8" fill="#F4A8A8" fillOpacity={0.8} name="Negative"/>
                    <Area type="monotone" dataKey="nu" stackId="1" stroke="#F5D09A" fill="#F5D09A" fillOpacity={0.8} name="Neutral"/>
                    <Area type="monotone" dataKey="p" stackId="1" stroke="#A8D8B9" fill="#A8D8B9" fillOpacity={0.8} name="Positive"/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 20 : 24, marginBottom: isMobile ? 32 : 48 }}>
                <div style={{ flex: isMobile ? "none" : "0 0 60%", width: isMobile ? "100%" : undefined, background: "#FDFAF6", border: "1px solid #E8E0D0", borderRadius: 10, padding: isMobile ? "16px 20px" : "24px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isMobile ? 12 : 16, flexWrap: "wrap", gap: 8 }}>
                    <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: isMobile ? 14 : 15 }}>Incoming signals</h3>
                    <span style={{ fontFamily: "DM Mono,monospace", fontSize: isMobile ? 10 : 11, background: "#F0EBE0", padding: "3px 10px", borderRadius: 10, color: "#6B6560" }}>{d.mentions.toLocaleString()}</span>
                  </div>
                  <div style={{ height: isMobile ? 280 : 340, overflow: "hidden" }}>
                    {visibleSignals.map((s, i) => (
                      <div key={s.key} className="sig-enter" style={{ padding: isMobile ? "10px 0" : "14px 0", borderBottom: "1px solid #F0EBE0", animationDelay: `${i * 60}ms` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, gap: 8 }}>
                          <span style={{ fontFamily: "DM Mono,monospace", fontSize: isMobile ? 11 : 12, color: "#6B6560", overflow: "hidden", textOverflow: "ellipsis" }}>{s.src} {s.handle}</span>
                          <span style={{ fontFamily: "DM Mono,monospace", fontSize: isMobile ? 10 : 11, color: "#9C9490", flexShrink: 0 }}>{s.time}</span>
                        </div>
                        <p style={{ fontSize: isMobile ? 12 : 13, lineHeight: 1.5, color: "#1A1714", marginBottom: 6, wordBreak: "break-word" }}>{s.text}</p>
                        <span style={{ display: "inline-block", fontFamily: "DM Mono,monospace", fontSize: 10, padding: "2px 8px", borderRadius: 10, background: sc[s.sentiment], color: stc[s.sentiment] }}>{s.sentiment}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ flex: isMobile ? "none" : 1, width: isMobile ? "100%" : undefined, background: "#FDFAF6", border: "1px solid #E8E0D0", borderRadius: 10, padding: isMobile ? "16px 20px" : "24px 28px" }}>
                  <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: isMobile ? 14 : 15, marginBottom: isMobile ? 16 : 20 }}>Signal sources</h3>
                  {Object.entries(d.sources).map(([n, p]) => (
                    <div key={n} style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 10, marginBottom: isMobile ? 12 : 16 }}>
                      <span style={{ fontSize: isMobile ? 12 : 13, width: isMobile ? 64 : 72, flexShrink: 0 }}>{n}</span>
                      <div style={{flex:1,height:6,background:'#F0EBE0',borderRadius:3,overflow:'hidden'}}>
                        <div style={{width:`${p}%`,height:'100%',background:'#C9A86B',borderRadius:3,transition:'width 600ms ease'}}/>
                      </div>
                      <span style={{fontFamily:'DM Mono,monospace',fontSize:12,color:'#6B6560',width:32,textAlign:'right'}}>{p}%</span>
                    </div>
                  ))}
                  <p style={{fontSize:12,fontStyle:'italic',color:'#9C9490',marginTop:20,lineHeight:1.5}}>Neural retrieval weights each source by semantic relevance to product category</p>
                </div>
              </div>
              <div style={{ marginBottom: isMobile ? 32 : 48 }}>
                <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: isMobile ? 14 : 15 }}>How Pulse thinks</h3>
                <p style={{ fontSize: isMobile ? 12 : 13, color: "#9C9490", marginBottom: isMobile ? 16 : 20, marginTop: 4 }}>Three models running in parallel</p>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 16 : 20 }}>
                  <div style={{ background: "#FDFAF6", border: "1px solid #E8E0D0", borderLeft: "3px solid #6B9E78", borderRadius: 10, padding: isMobile ? 16 : 24, opacity: cardsVisible ? 1 : 0, transition: "opacity 400ms ease", transitionDelay: "0ms" }}>
                    <h4 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:14}}>Fuzzy Logic</h4>
                    <p style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'#9C9490',marginBottom:16,marginTop:2}}>Signal Reconciliation</p>
                    {Object.entries(d.fuzzy).map(([k,v])=>(
                      <div key={k} style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                        <span style={{fontSize:13,width:110,color:'#6B6560'}}>{k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase())}</span>
                        <div style={{flex:1,height:6,background:'#F0EBE0',borderRadius:3,overflow:'hidden'}}>
                          <div style={{width:`${v*100}%`,height:'100%',background:'#6B9E78',borderRadius:3,transition:'width 800ms ease'}}/>
                        </div>
                        <span style={{fontFamily:'DM Mono,monospace',fontSize:12,width:34,textAlign:'right'}}>{v.toFixed(2)}</span>
                      </div>
                    ))}
                    <div style={{marginTop:16,padding:'12px',background:'#F8F4EE',borderRadius:8}}>
                      <div style={{height:12,borderRadius:6,background:'linear-gradient(90deg,#F4A8A8,#F5D09A,#A8D8B9)',position:'relative',marginBottom:8}}>
                        <div style={{position:'absolute',top:-2,left:`${d.fuzzyOutput.position}%`,transform:'translateX(-50%)'}}><svg width="10" height="16"><polygon points="5,0 10,8 5,16 0,8" fill="#1A1714"/></svg></div>
                      </div>
                      <div style={{display:'flex',justifyContent:'space-between',fontFamily:'DM Mono,monospace',fontSize:10,color:'#9C9490'}}><span>Strongly Negative</span><span>Strongly Positive</span></div>
                      <p style={{fontFamily:'DM Mono,monospace',fontSize:12,color:'#6B9E78',marginTop:8}}>{'\u03BC'} = {d.fuzzyOutput.mu} · {d.fuzzyOutput.label}</p>
                    </div>
                    <p style={{ fontSize: isMobile ? 10 : 11, fontStyle: "italic", color: "#9C9490", borderTop: "1px solid #F0EBE0", paddingTop: 12, marginTop: 12, lineHeight: 1.5 }}>Handles contradictory signals using partial truth membership — not binary classification</p>
                  </div>
                  <div style={{ background: "#FDFAF6", border: "1px solid #E8E0D0", borderLeft: "3px solid #7B8FD4", borderRadius: 10, padding: isMobile ? 16 : 24, opacity: cardsVisible ? 1 : 0, transition: "opacity 400ms ease", transitionDelay: "100ms" }}>
                    <h4 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:14}}>Neural Retrieval</h4>
                    <p style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'#9C9490',marginBottom:16,marginTop:2}}>Semantic Clustering</p>
                    <svg width="100%" viewBox="0 0 200 180" style={{background:'#F8F4EE',borderRadius:8,marginBottom:12}}>
                      {d.clusters.map(c=>c.dots.map(([x,y],i)=>(
                        <circle key={`${c.label}-${i}`} cx={x} cy={y} r={4} fill={c.color} opacity={0.7}/>
                      )))}
                      {d.clusters.map(c=>{
                        const cx=c.dots.reduce((s,p)=>s+p[0],0)/c.dots.length;
                        const cy=c.dots.reduce((s,p)=>s+p[1],0)/c.dots.length;
                        return <g key={c.label}><text x={cx} y={cy-12} textAnchor="middle" style={{fontSize:9,fontFamily:'DM Mono,monospace',fill:c.color}}>{c.label}</text><text x={cx} y={cy-1} textAnchor="middle" style={{fontSize:8,fontFamily:'DM Mono,monospace',fill:c.color}}>{c.pct}</text></g>;
                      })}
                    </svg>
                    <p style={{fontFamily:'DM Mono,monospace',fontSize:12,color:'#7B8FD4'}}>Top signal: {d.clusterSignal}</p>
                    <p style={{ fontSize: isMobile ? 10 : 11, fontStyle: "italic", color: "#9C9490", borderTop: "1px solid #F0EBE0", paddingTop: 12, marginTop: 12, lineHeight: 1.5 }}>Embedding-based semantic grouping of {d.mentions.toLocaleString()} mentions into decision-relevant themes</p>
                  </div>
                  <div style={{ background: "#FDFAF6", border: "1px solid #E8E0D0", borderLeft: "3px solid #C9A86B", borderRadius: 10, padding: isMobile ? 16 : 24, opacity: cardsVisible ? 1 : 0, transition: "opacity 400ms ease", transitionDelay: "200ms" }}>
                    <h4 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:14}}>Genetic Algorithm</h4>
                    <p style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'#9C9490',marginBottom:16,marginTop:2}}>Decision Evolution</p>
                    {d.gaOpps.map((o,i)=>(
                      <div key={i} style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
                        <span style={{fontFamily:'DM Mono,monospace',fontWeight:700,fontSize:11,color:'#C9A86B',width:20}}>{String(i+1).padStart(2,'0')}</span>
                        <span style={{fontSize:13,flex:1,color:'#6B6560'}}>{o.name}</span>
                        <div style={{width:48,height:6,background:'#F0EBE0',borderRadius:3,overflow:'hidden'}}><div style={{width:`${o.fitness}%`,height:'100%',background:'#C9A86B',borderRadius:3}}/></div>
                        <span style={{fontFamily:'DM Mono,monospace',fontSize:12,width:22,textAlign:'right'}}>{o.fitness}</span>
                        <span style={{fontFamily:'DM Mono,monospace',fontSize:9,color:'#9C9490',background:'#F0EBE0',padding:'1px 5px',borderRadius:3}}>Gen {o.gen}</span>
                      </div>
                    ))}
                    <p style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'#9C9490',marginTop:8}}>{d.gaParams}</p>
                    <p style={{ fontSize: isMobile ? 10 : 11, fontStyle: "italic", color: "#9C9490", borderTop: "1px solid #F0EBE0", paddingTop: 12, marginTop: 12, lineHeight: 1.5 }}>Evolves feature priorities by selecting, crossing, and mutating candidate decisions across generations</p>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: isMobile ? 32 : 48 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isMobile ? 16 : 20, flexWrap: "wrap", gap: 8 }}>
                  <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: isMobile ? 14 : 15 }}>Active decisions</h3>
                  <button style={{ padding: "6px 12px", fontSize: isMobile ? 11 : 12, fontFamily: "Syne,sans-serif", fontWeight: 600, border: "1px solid #E8E0D0", borderRadius: 8, background: "transparent", cursor: "pointer", color: "#6B6560" }}>+ New Decision</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 16 : 20 }}>
                  {d.decisions.map((dc, i) => (
                    <div key={i} style={{ background: "#FDFAF6", border: "1px solid #E8E0D0", borderRadius: 10, padding: isMobile ? 16 : 24, display: "flex", flexDirection: "column" }}>
                      <span style={{ display: "inline-block", alignSelf: "flex-start", fontFamily: "DM Mono,monospace", fontSize: 10, textTransform: "uppercase", padding: "3px 10px", borderRadius: 10, background: statusBg[dc.status], color: statusTc[dc.status] }}>{dc.status}</span>
                      <h4 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: isMobile ? 14 : 15, lineHeight: 1.4, marginTop: 10, wordBreak: "break-word" }}>{dc.question}</h4>
                      <div style={{ marginTop: isMobile ? 12 : 16, fontSize: isMobile ? 12 : 13, lineHeight: 2 }}>
                        <div style={{ borderBottom: "1px solid #F0EBE0", paddingBottom: 6, marginBottom: 6, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}><span style={{ fontFamily: "DM Mono,monospace", fontSize: 10, textTransform: "uppercase", color: "#9C9490" }}>Evidence</span><span>{dc.evidence}</span></div>
                        <div style={{ borderBottom: "1px solid #F0EBE0", paddingBottom: 6, marginBottom: 6, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}><span style={{ fontFamily: "DM Mono,monospace", fontSize: 10, textTransform: "uppercase", color: "#9C9490", flexShrink: 0 }}>Assumption</span><span style={{ textAlign: "right", wordBreak: "break-word" }}>{dc.assumption}</span></div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}><span style={{ fontFamily: "DM Mono,monospace", fontSize: 10, textTransform: "uppercase", color: "#9C9490", flexShrink: 0 }}>Success Metric</span><span style={{ textAlign: "right", wordBreak: "break-word" }}>{dc.metric}</span></div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "center", margin: isMobile ? "12px 0" : "16px 0" }}><ConfidenceArc value={dc.confidence} size={isMobile ? 64 : 80} /></div>
                      <div style={{borderTop:'1px solid #F0EBE0',paddingTop:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <span style={{fontSize:11,fontStyle:'italic',color:'#9C9490'}}>AI Drafted · Pending Human Approval</span>
                        <span style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'#9C9490'}}>Feb 27, 2026</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#F5EFE4", border: "1px solid #E0D5C5", borderRadius: 10, padding: isMobile ? "20px 16px" : "28px 32px" }}>
                <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: isMobile ? 14 : 15 }}>Agentic Decision Brief</h3>
                <p style={{ fontSize: isMobile ? 12 : 13, color: "#9C9490", marginTop: 4, marginBottom: isMobile ? 12 : 20 }}>Generated by Pulse AI · Fuzzy + Neural + Genetic synthesis</p>
                <p style={{ fontFamily: "Lora,serif", fontStyle: "italic", fontSize: isMobile ? 13 : 14, color: "#1A1714", lineHeight: 1.8, marginBottom: isMobile ? 16 : 24, wordBreak: "break-word" }}>{d.rationale}</p>
                <div style={{ display: "flex", flexDirection: isSmallMobile ? "column" : "row", gap: 10 }}>
                  <button style={{ padding: isMobile ? "10px 16px" : "10px 20px", fontSize: isMobile ? 11 : 12, fontFamily: "system-ui", fontWeight: 500, border: "none", borderRadius: 8, background: "#6B9E78", color: "#fff", cursor: "pointer", width: isSmallMobile ? "100%" : undefined }}>Approve & Log Decision</button>
                  <button style={{ padding: isMobile ? "10px 16px" : "10px 20px", fontSize: isMobile ? 11 : 12, fontFamily: "system-ui", border: "1px solid #E0D5C5", borderRadius: 8, background: "transparent", cursor: "pointer", color: "#6B6560", width: isSmallMobile ? "100%" : undefined }}>Request AI Revision</button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}
