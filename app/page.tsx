const results = [
  ['Nr3D Overall Accuracy', '52.9', '61.3', '+8.4'],
  ['Nr3D Hard', '45.3', '54.2', '+8.9'],
  ['Nr3D View-dependent', '49.2', '54.8', '+5.6'],
  ['ScanRefer Overall Acc@0.5', '32.8', '42.8', '+10.0'],
];

const bibtex = `@inproceedings{origround2026,
  title     = {OriGround: Orientation-Aware Neuro-Symbolic
               Zero-Shot 3D Visual Grounding},
  author    = {Anonymous},
  booktitle = {Proceedings of EMNLP},
  year      = {2026}
}`;

function PaperFigure({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string;
  alt: string;
  caption: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={`paper-figure ${className}`}>
      <div className="figure-image">
        <img src={src} alt={alt} />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <div className="page-width nav-inner">
          <a className="site-name" href="#top">OriGround</a>
          <nav aria-label="Primary navigation">
            <a href="#abstract">Abstract</a>
            <a href="#method">Method</a>
            <a href="#results">Results</a>
            <a href="#citation">Citation</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero page-width">
        <p className="venue">EMNLP 2026 Submission</p>
        <h1>OriGround: Orientation-Aware Neuro-Symbolic<br />Zero-Shot 3D Visual Grounding</h1>
        <p className="authors">Anonymous ACL Submission</p>
        <div className="resource-links" aria-label="Project resources">
          <a href="/origround-paper.pdf" target="_blank" rel="noreferrer">Paper</a>
          <a href="https://github.com/jinji-2005/Origround" target="_blank" rel="noreferrer">Code</a>
        </div>
      </section>

      <section className="page-width lead-figure" aria-labelledby="overview-caption">
        <PaperFigure
          src="/paper-figures/figure-2-overview.png"
          alt="Overview of the OriGround framework, including viewpoint-aware parsing, object-centric orientation extraction, symbolic execution, and visual disambiguation"
          caption={<><strong>Figure 2.</strong> Overview of OriGround. The framework makes reference frames explicit across language parsing, object orientation estimation, geometric reasoning, and final VLM disambiguation.</>}
        />
      </section>

      <section id="abstract" className="section page-width narrow-section">
        <h2>Abstract</h2>
        <p>
          Zero-shot 3D visual grounding aims to localize a referred object in a 3D scene without
          task-specific grounding supervision. Existing training-free methods reason mainly over
          categories, centers, and bounding boxes, which do not encode the local reference frames
          needed for viewpoint-dependent expressions such as <em>left of</em>, <em>behind</em>, or
          <em> facing the door</em>. OriGround explicitly models object-centric orientations and
          inferred viewpoints. It parses each query into a viewpoint-aware symbolic program,
          estimates orientation bases from multi-view observations, evaluates relations in the
          appropriate anchor or observer frame, and constructs a reference-frame-aligned visual
          prompt for final VLM-based disambiguation.
        </p>
      </section>

      <section id="method" className="section page-width">
        <div className="section-intro">
          <p className="section-label">Method</p>
          <h2>Explicit reference frames from language to vision</h2>
          <p>
            OriGround uses a four-stage pipeline: viewpoint-aware query parsing, object-centric
            orientation extraction, reference-frame-aware symbolic execution, and holistic visual
            prompting. The same inferred frame is preserved throughout the complete grounding process.
          </p>
        </div>

        <div className="figure-grid">
          <PaperFigure
            src="/paper-figures/figure-3-parser.png"
            alt="Viewpoint-aware query parser and spatial relations encoder from the OriGround paper"
            caption={<><strong>Figure 3.</strong> The parser converts free-form language into a structured program that specifies the relation, anchor, reference frame, and viewpoint anchor.</>}
          />
          <PaperFigure
            src="/paper-figures/figure-4-prompting.png"
            alt="Holistic visual prompting module with viewpoint-aligned candidate projections"
            caption={<><strong>Figure 4.</strong> Holistic visual prompting aligns the final visual evidence with the reference frame used by the symbolic executor.</>}
          />
        </div>

        <PaperFigure
          src="/paper-figures/figure-6-orientation.png"
          alt="Object-centric orientation extraction examples showing front, left, and up axes"
          caption={<><strong>Figure 6.</strong> Object-centric orientation extraction. Multi-view observations are aggregated into a stable local basis for directional reasoning.</>}
          className="full-figure"
        />
      </section>

      <section id="results" className="section section-tinted">
        <div className="page-width">
          <div className="section-intro">
            <p className="section-label">Results</p>
            <h2>Consistent gains on two 3D grounding benchmarks</h2>
            <p>
              OriGround improves the strongest training-free baseline by 8.4 points on Nr3D
              overall accuracy and by 10.0 points on ScanRefer overall Acc@0.5.
            </p>
          </div>

          <PaperFigure
            src="/paper-figures/figure-1-results.png"
            alt="Nr3D performance comparison between training-free methods and OriGround"
            caption={<><strong>Figure 1.</strong> Performance overview on Nr3D. OriGround improves both view-independent and view-dependent grounding while remaining training-free.</>}
          />

          <div className="table-wrap">
            <table>
              <caption>Selected benchmark results reported in the paper.</caption>
              <thead>
                <tr>
                  <th scope="col">Evaluation split</th>
                  <th scope="col">Prior best</th>
                  <th scope="col">OriGround</th>
                  <th scope="col">Gain</th>
                </tr>
              </thead>
              <tbody>
                {results.map(([split, baseline, ours, gain]) => (
                  <tr key={split}>
                    <th scope="row">{split}</th>
                    <td>{baseline}</td>
                    <td><strong>{ours}</strong></td>
                    <td><strong>{gain}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section page-width">
        <div className="section-intro">
          <p className="section-label">Qualitative analysis</p>
          <h2>Observer-oriented spatial reasoning</h2>
          <p>
            The examples below show how explicit observer and anchor frames resolve spatial
            expressions that are ambiguous under a fixed global coordinate system.
          </p>
        </div>
        <PaperFigure
          src="/paper-figures/figure-5-qualitative.png"
          alt="Qualitative grounding examples under observer-oriented spatial descriptions"
          caption={<><strong>Figure 5.</strong> Qualitative results for observer-oriented descriptions. OriGround exposes the selected viewpoint and grounds the referred object under that frame.</>}
        />
      </section>

      <section id="citation" className="section citation-section">
        <div className="page-width narrow-section">
          <h2>Citation</h2>
          <p>If you find this work useful, please cite the paper.</p>
          <pre><code>{bibtex}</code></pre>
        </div>
      </section>

      <footer>
        <div className="page-width footer-inner">
          <span>OriGround · EMNLP 2026</span>
          <span>Orientation-Aware Zero-Shot 3D Visual Grounding</span>
        </div>
      </footer>
    </main>
  );
}
