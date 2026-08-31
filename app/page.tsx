'use client';

import { useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Braces,
  Check,
  Code2,
  Compass,
  Copy,
  Eye,
  ScanLine,
} from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const stages = [
  {
    index: '01',
    icon: Braces,
    title: 'Parse the query',
    text: 'Turn free-form language into a viewpoint-aware symbolic program.',
  },
  {
    index: '02',
    icon: Compass,
    title: 'Recover orientation',
    text: 'Estimate object-centric front, left, and up axes from multi-view evidence.',
  },
  {
    index: '03',
    icon: ScanLine,
    title: 'Reason in-frame',
    text: 'Score relations inside the anchor or observer reference frame—not a fixed world axis.',
  },
  {
    index: '04',
    icon: Eye,
    title: 'Resolve visually',
    text: 'Align the visual prompt to that same frame and let a VLM disambiguate the shortlist.',
  },
];

const results = [
  { split: 'Nr3D Overall', baseline: '52.9', ours: '61.3', gain: '+8.4' },
  { split: 'Nr3D Hard', baseline: '45.3', ours: '54.2', gain: '+8.9' },
  { split: 'Nr3D View Dep.', baseline: '49.2', ours: '54.8', gain: '+5.6' },
  { split: 'ScanRefer Acc@0.5', baseline: '32.8', ours: '42.8', gain: '+10.0' },
];

const bibtex = `@inproceedings{origround2026,
  title={OriGround: Orientation-Aware Neuro-Symbolic
         Zero-Shot 3D Visual Grounding},
  author={Anonymous},
  booktitle={EMNLP},
  year={2026}
}`;

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyBibtex = async () => {
    await navigator.clipboard.writeText(bibtex);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="OriGround home">
          <span className="wordmark-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          OriGround
        </a>
        <div className="nav-links">
          <a href="#method">Method</a>
          <a href="#results">Results</a>
          <a href="#visuals">Visuals</a>
          <a href="#citation">Citation</a>
        </div>
        <a
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'nav-code')}
          href="https://github.com/jinji-2005/Origround"
          target="_blank"
          rel="noreferrer"
        >
          <Code2 data-icon="inline-start" />
          Code
        </a>
      </nav>

      <section id="top" className="hero page-shell">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            EMNLP 2026 submission · Zero-shot 3D visual grounding
          </div>
          <h1>
            Ground language in 3D,
            <span>from the right point of view.</span>
          </h1>
          <p className="hero-summary">
            OriGround makes reference frames explicit. It combines object-centric orientation,
            neuro-symbolic reasoning, and perspective-aligned visual prompting to understand
            words like <em>left</em>, <em>behind</em>, and <em>facing</em> without task-specific training.
          </p>
          <div className="hero-actions">
            <a
              className={cn(buttonVariants({ size: 'lg' }), 'primary-action')}
              href="/origround-paper.pdf"
              target="_blank"
            >
              <BookOpen data-icon="inline-start" />
              Read paper
            </a>
            <a
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'secondary-action')}
              href="#visuals"
            >
              Explore the visual reasoning
              <ArrowUpRight data-icon="inline-end" />
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="OriGround orientation example">
          <div className="hero-image-frame">
            <img
              src="/visuals/orientation-full.png"
              alt="An armchair with its estimated front, left, and up orientation axes"
            />
            <div className="frame-label top-label">OBJECT-CENTRIC FRAME</div>
            <div className="frame-label bottom-label">FRONT · LEFT · UP</div>
          </div>
          <div className="metric-card metric-card-main">
            <strong>61.3</strong>
            <span>Nr3D overall</span>
          </div>
          <div className="metric-card metric-card-gain">
            <strong>+8.4</strong>
            <span>over LaSP</span>
          </div>
        </div>
      </section>

      <section className="thesis-strip">
        <div className="page-shell thesis-grid">
          <p className="section-kicker">The core idea</p>
          <p className="thesis-line">
            Spatial language is not ambiguous when the <span>reference frame</span> is explicit.
          </p>
          <p className="thesis-detail">
            Bounding boxes tell us where objects are. OriGround also estimates which way they face,
            then carries that orientation consistently from symbolic execution into the final visual prompt.
          </p>
        </div>
      </section>

      <section id="method" className="section page-shell">
        <div className="section-heading">
          <p className="section-kicker">Method</p>
          <h2>One frame of reference, end to end.</h2>
          <p>
            A compact four-stage pipeline connects language, geometry, viewpoint, and visual evidence.
          </p>
        </div>
        <div className="method-grid">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <article className="method-card" key={stage.index}>
                <div className="method-topline">
                  <Icon aria-hidden="true" />
                  <span>{stage.index}</span>
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </article>
            );
          })}
        </div>

        <div className="program-panel">
          <div className="program-copy">
            <p className="section-kicker">A query becomes geometry</p>
            <blockquote>“The pillow on the left of the bed when facing it.”</blockquote>
            <p>
              The program identifies the bed as both relation anchor and viewpoint anchor. The relation
              is evaluated in that inferred observer frame, rather than against an arbitrary global x-axis.
            </p>
          </div>
          <pre aria-label="Example viewpoint-aware symbolic program"><code>{`{
  "category": "pillow",
  "relations": [{
    "relation_name": "left",
    "anchors": [{ "category": "bed" }],
    "reference_frame": "observer",
    "viewpoint_anchor": "bed"
  }]
}`}</code></pre>
        </div>
      </section>

      <section id="visuals" className="section visual-section">
        <div className="page-shell">
          <div className="section-heading visual-heading">
            <p className="section-kicker">Visual reasoning, made inspectable</p>
            <h2>See the frame change the answer.</h2>
            <p>
              These are outputs from the project’s visualization pipeline—not hand-made diagrams.
            </p>
          </div>

          <Tabs defaultValue="viewpoint" className="visual-tabs">
            <TabsList variant="line" aria-label="Visualization stages">
              <TabsTrigger value="scene">Scene & candidates</TabsTrigger>
              <TabsTrigger value="viewpoint">Viewpoint hypotheses</TabsTrigger>
              <TabsTrigger value="aligned">Perspective aligned</TabsTrigger>
            </TabsList>
            <TabsContent value="scene">
              <VisualFrame
                src="/visuals/scene-topdown.png"
                alt="Top-down point cloud with candidate pillows, a bed anchor, and object orientations"
                step="01 / 03"
                title="Shortlist candidates in 3D"
                description="Symbolic predicates remove incompatible instances while preserving plausible same-category candidates."
              />
            </TabsContent>
            <TabsContent value="viewpoint">
              <VisualFrame
                src="/visuals/scene-viewpoint.png"
                alt="Top-down point cloud annotated with several observer viewpoint hypotheses"
                step="02 / 03"
                title="Infer observer hypotheses"
                description="Anchor orientation and language cues produce explicit viewpoints instead of leaving the perspective implicit."
              />
            </TabsContent>
            <TabsContent value="aligned">
              <VisualFrame
                src="/visuals/scene-aligned.png"
                alt="Top-down point cloud rotated into the selected observer perspective"
                step="03 / 03"
                title="Align what the VLM sees"
                description="The top-down prompt rotates into the selected view, so symbolic and visual reasoning share the same frame."
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="results" className="section page-shell results-section">
        <div className="section-heading">
          <p className="section-kicker">Results</p>
          <h2>Training-free. Orientation-aware. Stronger where perspective matters.</h2>
        </div>
        <div className="results-layout">
          <div className="results-table" role="table" aria-label="OriGround benchmark results">
            <div className="result-row result-header" role="row">
              <span role="columnheader">Benchmark</span>
              <span role="columnheader">Prior best</span>
              <span role="columnheader">OriGround</span>
              <span role="columnheader">Gain</span>
            </div>
            {results.map((result) => (
              <div className="result-row" role="row" key={result.split}>
                <strong role="cell">{result.split}</strong>
                <span role="cell">{result.baseline}</span>
                <span className="ours" role="cell">{result.ours}</span>
                <span className="gain" role="cell">{result.gain}</span>
              </div>
            ))}
          </div>
          <aside className="result-callout">
            <span className="callout-number">8.4</span>
            <p>point overall gain on Nr3D over the strongest training-free baseline.</p>
            <div className="callout-rule" />
            <span className="callout-note">No task-specific grounding supervision.</span>
          </aside>
        </div>
      </section>

      <section id="citation" className="section citation-section">
        <div className="page-shell citation-layout">
          <div>
            <p className="section-kicker">Citation</p>
            <h2>Build on OriGround.</h2>
            <p className="citation-copy">
              The submission is currently anonymous. Citation metadata will be updated after review.
            </p>
          </div>
          <div className="bibtex-card">
            <button className="copy-button" type="button" onClick={copyBibtex}>
              {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy BibTeX'}
            </button>
            <pre><code>{bibtex}</code></pre>
          </div>
        </div>
      </section>

      <footer className="page-shell site-footer">
        <a className="wordmark" href="#top">OriGround</a>
        <p>Orientation-aware neuro-symbolic zero-shot 3D visual grounding.</p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}

function VisualFrame({
  src,
  alt,
  step,
  title,
  description,
}: {
  src: string;
  alt: string;
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="visual-frame">
      <div className="visual-image-wrap">
        <img src={src} alt={alt} />
        <span className="visual-step">{step}</span>
      </div>
      <div className="visual-caption">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
