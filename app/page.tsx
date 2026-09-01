type ResultRow = {
  method: string;
  supervised: boolean;
  values: string[];
  divider?: boolean;
  ours?: boolean;
};

const nr3dRows: ResultRow[] = [
  { method: 'ViL3DRef', supervised: true, values: ['64.4', '70.2', '57.4', '62.0', '64.5'] },
  { method: 'CoT3DRef', supervised: true, values: ['64.4', '70.0', '59.2', '61.9', '65.7'] },
  { method: '3D-VisTA', supervised: true, values: ['64.2', '72.1', '56.7', '61.5', '65.1'] },
  { method: 'BUTD-DETR', supervised: true, values: ['54.6', '60.7', '48.4', '46.0', '58.0'] },
  { method: 'SAT', supervised: true, values: ['49.2', '56.3', '42.4', '46.9', '50.4'] },
  { method: 'ZSVG3D', supervised: false, values: ['40.2', '49.1', '31.1', '37.8', '41.6'], divider: true },
  { method: 'SeeGround', supervised: false, values: ['46.1', '54.5', '38.3', '42.3', '48.2'] },
  { method: 'VLM-Grounder', supervised: false, values: ['48.0', '55.2', '39.5', '45.8', '49.4'] },
  { method: 'LaSP w/o VLM', supervised: false, values: ['50.7', '58.7', '43.0', '45.6', '53.2'] },
  { method: 'LaSP', supervised: false, values: ['52.9', '60.7', '45.3', '49.2', '54.7'] },
  { method: 'OriGround (ours)', supervised: false, values: ['61.3', '68.5', '54.2', '54.8', '64.4'], ours: true },
];

const scanReferRows: ResultRow[] = [
  { method: 'ScanRefer', supervised: true, values: ['37.3', '24.3', '65.0', '43.3', '30.6', '19.8'] },
  { method: 'TGNN', supervised: true, values: ['34.3', '29.7', '64.5', '53.0', '27.0', '21.9'] },
  { method: 'InstanceRefer', supervised: true, values: ['40.2', '32.9', '77.5', '66.8', '31.3', '24.8'] },
  { method: '3DVG-Transformer', supervised: true, values: ['47.6', '34.7', '81.9', '60.6', '39.3', '28.4'] },
  { method: 'BUTD-DETR', supervised: true, values: ['52.2', '39.8', '84.2', '66.3', '46.6', '35.1'] },
  { method: 'OpenScene', supervised: false, values: ['13.2', '6.5', '20.1', '13.1', '11.1', '4.4'], divider: true },
  { method: 'LLM-Grounder', supervised: false, values: ['17.1', '5.3', '-', '-', '-', '-'] },
  { method: 'ZSVG3D', supervised: false, values: ['36.4', '32.7', '63.8', '58.4', '27.7', '24.6'] },
  { method: 'SeeGround', supervised: false, values: ['44.1', '39.4', '75.7', '68.9', '34.0', '30.0'] },
  { method: 'VLM-Grounder', supervised: false, values: ['51.6', '32.8', '66.0', '29.8', '48.3', '33.5'] },
  { method: 'OriGround (ours)', supervised: false, values: ['52.4', '42.8', '78.3', '69.6', '37.3', '27.2'], ours: true },
];

const bibtex = `@inproceedings{origround2026,
  title     = {OriGround: Orientation-Aware Neuro-Symbolic
               Zero-Shot 3D Visual Grounding},
  author    = {Haochen Li and Jiaxin Shi and Ruonan Liu and Luo Liufu},
  booktitle = {Findings of the Association for Computational
               Linguistics: EMNLP 2026},
  year      = {2026}
}`;

const stages = [
  {
    letter: 'A',
    title: 'Language-to-Symbolic Parser',
    text: 'The parser converts an unrestricted referring expression into a viewpoint-aware symbolic program. Beyond target category and relations, it explicitly records whether the query is viewpoint-dependent, which object defines the viewpoint, and how that anchor should be faced.',
    src: '/paper-figures/stage-a-parser.png',
    alt: 'Language-to-symbolic parser that converts an observer-oriented instruction into a structured program',
  },
  {
    letter: 'B',
    title: 'Object-Centric Orientation Extraction',
    text: 'For every object, multi-view RGB observations and camera poses are aggregated to recover a stable local orientation basis. The estimated front, right, and up axes are projected into the 3D scene, supplying the directional geometry that bounding boxes alone cannot represent.',
    src: '/paper-figures/figure-6-orientation.png',
    alt: 'Object-centric orientation extraction examples with front, right, and up directions',
  },
  {
    letter: 'C',
    title: 'Neural Program Executor',
    text: 'Category scores and unary, binary, ternary, and viewpoint-aware relation scores are composed according to the parsed program. Relations such as left, right, front, and behind are evaluated in the correct anchor or observer frame before a compact top-K candidate set is produced.',
    src: '/paper-figures/stage-c-executor.png',
    alt: 'Neural program executor composing category and relation features into target scores',
  },
  {
    letter: 'D',
    title: 'Visual Prompting and VLM Response',
    text: 'The final prompt combines candidate-centric image evidence with a perspective-aligned top-down map and explicit orientation hints. The VLM therefore receives the same reference frame used by symbolic execution and selects the final target from the shortlisted candidates.',
    src: '/paper-figures/figure-4-prompting.png',
    alt: 'Holistic visual prompting with multi-view instances and a perspective-aligned top-down map',
  },
];

function PaperFigure({ src, alt, caption, compact = false }: { src: string; alt: string; caption: string; compact?: boolean }) {
  return (
    <figure className={`paper-figure${compact ? ' compact' : ''}`}>
      <div className="figure-image">
        {/* oxlint-disable-next-line next/no-img-element -- GitHub Pages has no image optimization server. */}
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function ResultRows({ rows }: { rows: ResultRow[] }) {
  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row.method} className={`${row.divider ? 'group-divider ' : ''}${row.ours ? 'ours-row' : ''}`}>
          <th scope="row">{row.method}</th>
          <td className={row.supervised ? 'supervised-yes' : 'supervised-no'}>{row.supervised ? 'Yes' : 'No'}</td>
          {row.values.map((value, index) => <td key={`${row.method}-${index}`}>{value}</td>)}
        </tr>
      ))}
    </tbody>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#abstract">Skip to paper content</a>
      <main>
      <header className="topbar">
        <div className="page-width nav-inner">
          <a className="site-name" href="#top">OriGround</a>
          <nav aria-label="Primary navigation">
            <a href="#abstract">Abstract</a>
            <a href="#reasoning">Reasoning Results</a>
            <a href="#pipeline">Pipeline</a>
            <a href="#benchmarks">Benchmark Results</a>
            <a href="#citation">Citation</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero page-width">
        <p className="venue">EMNLP 2026 Findings</p>
        <h1>
          <span className="hero-brand">OriGround:</span>{' '}
          <span className="hero-title-copy"><span>Orientation-Aware Neuro-Symbolic</span>{' '}<span>Zero-Shot 3D Visual Grounding</span></span>
        </h1>
        <p className="authors">Haochen Li, Jiaxin Shi, Ruonan Liu, Luo Liufu</p>
        <div className="resource-links" aria-label="Project resources">
          <a href="/origround-paper.pdf" target="_blank" rel="noreferrer">Paper</a>
          <span className="resource-link-disabled" aria-label="Code repository coming soon">Code · Coming Soon</span>
        </div>
      </section>

      <section id="abstract" className="section page-width">
        <div className="section-heading">
          <p className="section-label">Part I</p>
          <h2>Abstract</h2>
        </div>
        <div className="abstract-overview">
          <div className="abstract-lead">
            <p>Core insight</p>
            <h3>Grounding spatial language requires a reference frame—not just a bounding box.</h3>
          </div>
          <div className="abstract-summary">
            <p>OriGround estimates object orientations, parses viewpoint-aware symbolic programs, and evaluates relations in the correct anchor or observer frame before VLM disambiguation.</p>
            <div className="abstract-flow" aria-label="OriGround reasoning flow">
              <span>Parse</span><i>→</i><span>Orient</span><i>→</i><span>Reason</span><i>→</i><span>Ground</span>
            </div>
          </div>
        </div>
        <div className="abstract-highlights">
          <article>
            <span>Reference-aware</span>
            <h3>Explicit local frames</h3>
            <p>Object and observer orientations make <em>left</em>, <em>front</em>, and <em>behind</em> geometrically well-defined.</p>
          </article>
          <article>
            <span>Training-free</span>
            <h3>Neuro-symbolic grounding</h3>
            <p>Symbolic execution filters candidates; aligned visual evidence resolves the remaining ambiguity.</p>
          </article>
          <article>
            <span>Performance</span>
            <h3>Stronger zero-shot results</h3>
            <p><strong>61.3%</strong> Nr3D overall and <strong>52.4 / 42.8%</strong> ScanRefer Acc@0.25 / Acc@0.5—without task-specific grounding supervision.</p>
          </article>
        </div>
        <div className="abstract-examples">
          <div className="examples-heading">
            <p className="section-label">At a glance</p>
            <h3>Observer-Oriented Examples</h3>
          </div>
          <PaperFigure
            src="/paper-figures/figure-5-qualitative.png"
            alt="Ten qualitative examples of observer-oriented 3D visual grounding"
            caption="Ten Observer-Oriented examples from Nr3D-VP. Blue denotes object categories, yellow denotes relation terms, and magenta denotes observer-oriented expressions; green boxes indicate predictions and red boxes indicate competing objects."
          />
        </div>
      </section>

      <section id="reasoning" className="section section-muted">
        <div className="page-width">
          <div className="section-heading">
            <p className="section-label">Part II</p>
            <h2>Reasoning View</h2>
          </div>
          <div className="reasoning-cases">
            <article className="reasoning-case">
              <div className="case-heading">
                <span>Case 01</span>
                <h3>“If you face the whiteboard, the chair is the one on the left closer to the board.”</h3>
              </div>
              <div className="reasoning-pair">
                <PaperFigure
                  src="/paper-figures/reasoning-case1-scenes.png"
                  alt="Multiple room views centered on chair ID 3 near the whiteboard"
                  caption="Instance-Centric Prompting. Multi-view evidence centers on the shortlisted chair."
                />
                <PaperFigure
                  src="/paper-figures/reasoning-case1-topdown.png"
                  alt="Perspective-aligned top-down map of four chairs facing a whiteboard"
                  caption="Perspective-Aligned Prompting. The observer frame makes the whiteboard-relative left direction explicit."
                />
              </div>
            </article>

            <article className="reasoning-case">
              <div className="case-heading">
                <span>Case 02</span>
                <h3>“The lamp to the right if you are lying on the bed. The lamp closest to the doll house.”</h3>
              </div>
              <div className="reasoning-pair">
                <PaperFigure
                  src="/paper-figures/reasoning-scene-views.png"
                  alt="Two bedroom views shown before and after instance-centric lamp annotation"
                  caption="Instance-Centric Prompting. Candidate views expose the lamp and its local bedroom context."
                />
                <PaperFigure
                  src="/paper-figures/reasoning-topdown-view.png"
                  alt="Perspective-aligned top-down map with the bed viewpoint anchor and two candidate lamps"
                  caption="Perspective-Aligned Prompting. The map aligns the two candidate lamps with the predicted bed-centered viewpoint."
                />
              </div>
            </article>

            <article className="reasoning-case">
              <div className="case-heading">
                <span>Case 03</span>
                <h3>“When standing at the foot of the bed, the pillow in the middle on the left hand side.”</h3>
              </div>
              <div className="reasoning-pair">
                <PaperFigure
                  src="/paper-figures/reasoning-case3-scenes.png"
                  alt="Multiple bedroom views centered on pillow ID 12"
                  caption="Instance-Centric Prompting. Candidate views isolate the target pillow among visually similar instances."
                />
                <PaperFigure
                  src="/paper-figures/reasoning-case3-topdown.png"
                  alt="Perspective-aligned top-down map of pillows around a bed"
                  caption="Perspective-Aligned Prompting. The foot-of-bed observer frame resolves the middle-left pillow."
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="pipeline" className="section page-width">
        <div className="section-heading">
          <p className="section-label">Part III</p>
          <h2>Pipeline</h2>
        </div>
        <PaperFigure
          src="/paper-figures/pipeline-complete.png"
          alt="Complete OriGround pipeline showing all four stages and the neural program executor working process"
          caption="Complete OriGround architecture. The upper panel connects language parsing, orientation extraction, orientation-aware execution, and VLM prompting; the lower panel details the neural program executor."
        />

        <div className="stage-list">
          {stages.map((stage) => (
            <article className="stage-block" key={stage.letter}>
              <div className="stage-copy">
                <p className="stage-index">Stage {stage.letter}</p>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </div>
              <PaperFigure src={stage.src} alt={stage.alt} caption={`Stage ${stage.letter}. ${stage.title}.`} compact />
            </article>
          ))}
        </div>
      </section>

      <section id="benchmarks" className="section section-muted">
        <div className="page-width">
          <div className="section-heading">
            <p className="section-label">Part IV</p>
            <h2>Benchmark Results</h2>
          </div>

          <article className="result-table-block">
            <div className="table-heading">
              <h3>Nr3D</h3>
              <p>Accuracy (%) across the standard Overall, Easy, Hard, View-dependent, and View-independent splits.</p>
            </div>
            <div className="table-scroll">
              <table>
                <caption>Comparison of 3D visual grounding results on Nr3D.</caption>
                <thead>
                  <tr>
                    <th scope="col">Method</th>
                    <th scope="col">Supervised</th>
                    <th scope="col">Overall</th>
                    <th scope="col">Easy</th>
                    <th scope="col">Hard</th>
                    <th scope="col">View Dep.</th>
                    <th scope="col">View Indep.</th>
                  </tr>
                </thead>
                <ResultRows rows={nr3dRows} />
              </table>
            </div>
          </article>

          <article className="result-table-block">
            <div className="table-heading">
              <h3>ScanRefer</h3>
              <p>Acc@0.25 and Acc@0.5 (%) on the Overall, Unique, and Multiple splits.</p>
            </div>
            <div className="table-scroll">
              <table>
                <caption>Comparison of 3D visual grounding results on ScanRefer.</caption>
                <thead>
                  <tr>
                    <th scope="col" rowSpan={2}>Method</th>
                    <th scope="col" rowSpan={2}>Supervised</th>
                    <th scope="colgroup" colSpan={2}>Overall</th>
                    <th scope="colgroup" colSpan={2}>Unique</th>
                    <th scope="colgroup" colSpan={2}>Multiple</th>
                  </tr>
                  <tr>
                    <th scope="col">Acc@0.25</th>
                    <th scope="col">Acc@0.5</th>
                    <th scope="col">Acc@0.25</th>
                    <th scope="col">Acc@0.5</th>
                    <th scope="col">Acc@0.25</th>
                    <th scope="col">Acc@0.5</th>
                  </tr>
                </thead>
                <ResultRows rows={scanReferRows} />
              </table>
            </div>
          </article>
        </div>
      </section>

      <section id="citation" className="section citation-section">
        <div className="page-width citation-inner">
          <div className="section-heading">
            <p className="section-label">Reference</p>
            <h2>Citation</h2>
            <p>If you find OriGround useful in your research, please cite our paper.</p>
          </div>
          <pre><code>{bibtex}</code></pre>
        </div>
      </section>

      <footer>
        <div className="page-width footer-inner">
          <span>OriGround · EMNLP 2026 Findings</span>
          <div><a href="/origround-paper.pdf" target="_blank" rel="noreferrer">Paper</a><span>Code coming soon</span></div>
        </div>
        </footer>
      </main>
    </>
  );
}
