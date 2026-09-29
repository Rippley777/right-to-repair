import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowLeft,
  LuArrowRight,
  LuArrowUpRight,
  LuChevronDown,
  LuInfo,
  LuLaptop,
  LuSearch,
  LuShieldCheck,
  LuX,
} from "react-icons/lu";
import { DeviceCard } from "./DeviceCard";
import { CatalogError } from "./ui";
import {
  describeClues,
  emptyFinderFields,
  findModelMatches,
  parseModelDetails,
  type FinderFields,
} from "./modelFinder";
import type { SharedProps } from "./types";

const examples = [
  { label: "Part number", value: "MR942LL/A" },
  { label: "Model identifier", value: "MacBookPro15,1" },
  {
    label: "About This Mac",
    value:
      "MacBook Pro (15-inch, 2018)\nProcessor: 2.6 GHz 6-Core Intel Core i7\nMemory: 16 GB\nStorage: 512 GB",
  },
];

export function ModelFinderPage(
  props: SharedProps & {
    loading: boolean;
    error: string | null;
    retry: () => void;
  }
) {
  const [input, setInput] = useState("");
  const [fields, setFields] = useState<FinderFields>(emptyFinderFields);
  const [submitted, setSubmitted] = useState(false);
  const [shown, setShown] = useState(6);
  const resultsRef = useRef<HTMLElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const clues = useMemo(
    () => parseModelDetails(input, fields),
    [input, fields]
  );
  const recognized = describeClues(clues);
  const matches = useMemo(
    () => findModelMatches(props.devices, clues),
    [props.devices, clues]
  );
  const years = [
    ...new Set(props.devices.map((device) => device.year).filter(Boolean)),
  ].sort((a, b) => b - a);
  const sources = [
    ...new Set(
      matches
        .map((match) => match.source)
        .filter((source): source is string => Boolean(source))
    ),
  ];
  const exactPart = matches.length === 1 && matches[0].kind === "part";
  const setField = (key: keyof FinderFields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    setShown(6);
  };
  const clear = () => {
    setInput("");
    setFields(emptyFinderFields);
    setSubmitted(false);
    setShown(6);
    textareaRef.current?.focus();
  };
  const focusResults = () => {
    requestAnimationFrame(() => {
      resultsRef.current?.focus({ preventScroll: true });
      if (window.matchMedia("(max-width: 720px)").matches)
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  };
  const applyExample = (value: string) => {
    setInput(value);
    setFields(emptyFinderFields);
    setSubmitted(true);
    setShown(6);
    focusResults();
  };
  return (
    <div className="content-page finder-page">
      <Link to="/" className="back-link">
        <LuArrowLeft />
        Back to all devices
      </Link>
      <span className="eyebrow">THE MODEL FINDER</span>
      <h1>
        Your Mac.
        <br />
        <span>Down to the details.</span>
      </h1>
      <p className="page-intro">
        Paste details from About This Mac or System Information, or enter the
        model or part number. We’ll match them against your device catalog.
      </p>
      <div className="finder-layout">
        <aside className="finder-input-panel">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
              setShown(6);
              focusResults();
            }}
          >
            <div className="finder-form-heading">
              <h2>
                <LuLaptop />
                Tell us what you know.
              </h2>
              <button type="button" className="text-button" onClick={clear}>
                Clear <LuX />
              </button>
            </div>
            <label htmlFor="model-details" className="finder-label">
              Model details
            </label>
            <textarea
              id="model-details"
              ref={textareaRef}
              value={input}
              maxLength={12000}
              rows={7}
              spellCheck={false}
              aria-describedby="finder-input-help"
              placeholder={
                "MacBook Pro (15-inch, 2018)\nModel Identifier: MacBookPro15,1\nProcessor: 2.6 GHz Intel Core i7\nMemory: 16 GB\n\nOr just: MR942LL/A"
              }
              onChange={(event) => {
                setInput(event.target.value);
                setShown(6);
              }}
            />
            <p id="finder-input-help" className="finder-input-help">
              Model identifiers, A-numbers, and Apple part numbers all work. You
              don’t need a serial number.
            </p>
            {recognized.length > 0 && (
              <div
                className="finder-clues"
                aria-label="Recognized model details"
              >
                <span>Recognized details</span>
                <div>
                  {recognized.map((clue) => (
                    <span key={clue}>{clue}</span>
                  ))}
                </div>
              </div>
            )}
            <fieldset className="finder-extra-fields">
              <legend>
                Narrow it down <span>Optional</span>
              </legend>
              <p>Useful when several configurations share a model.</p>
              <div className="finder-fields-grid">
                <label>
                  Release year
                  <div className="select-wrap">
                    <select
                      aria-label="Release year"
                      value={fields.year}
                      onChange={(event) => setField("year", event.target.value)}
                    >
                      <option value="">Use pasted details</option>
                      {years.map((year) => (
                        <option key={year}>{year}</option>
                      ))}
                    </select>
                    <LuChevronDown />
                  </div>
                </label>
                <label>
                  Processor
                  <input
                    aria-label="Processor"
                    value={fields.chip}
                    onChange={(event) => setField("chip", event.target.value)}
                    placeholder="M1 Pro or Intel i7"
                  />
                </label>
                <label>
                  Memory
                  <div className="select-wrap">
                    <select
                      aria-label="Memory"
                      value={fields.memory}
                      onChange={(event) =>
                        setField("memory", event.target.value)
                      }
                    >
                      <option value="">Use pasted details</option>
                      {[2, 4, 8, 16, 24, 32, 36, 48, 64, 96, 128].map(
                        (size) => (
                          <option key={size} value={`${size} GB`}>
                            {size} GB
                          </option>
                        )
                      )}
                    </select>
                    <LuChevronDown />
                  </div>
                </label>
                <label>
                  Storage
                  <div className="select-wrap">
                    <select
                      aria-label="Storage"
                      value={fields.storage}
                      onChange={(event) =>
                        setField("storage", event.target.value)
                      }
                    >
                      <option value="">Use pasted details</option>
                      {[64, 128, 256, 512, 1024, 2048, 4096, 8192].map(
                        (size) => (
                          <option key={size} value={`${size} GB`}>
                            {size < 1024 ? `${size} GB` : `${size / 1024} TB`}
                          </option>
                        )
                      )}
                    </select>
                    <LuChevronDown />
                  </div>
                </label>
                <label>
                  Display size
                  <div className="select-wrap">
                    <select
                      aria-label="Display size"
                      value={fields.screen}
                      onChange={(event) =>
                        setField("screen", event.target.value)
                      }
                    >
                      <option value="">Use pasted details</option>
                      {[11, 12, 13, 14, 15, 16, 17, 21.5, 24, 27].map(
                        (size) => (
                          <option key={size} value={size}>
                            {size} inches
                          </option>
                        )
                      )}
                    </select>
                    <LuChevronDown />
                  </div>
                </label>
              </div>
            </fieldset>
            <button
              type="submit"
              className="primary-button finder-submit"
              disabled={props.loading || Boolean(props.error)}
            >
              <LuSearch />
              Find my model <LuArrowRight />
            </button>
            <p className="finder-privacy">
              <LuShieldCheck />
              Your pasted details stay in this browser.
            </p>
          </form>
          <details className="finder-instructions">
            <summary>
              Where do I find these details?
              <LuChevronDown />
            </summary>
            <div>
              <h3>Mac</h3>
              <p>
                Apple menu → About This Mac shows the model name, chip, and
                memory. System Information → Hardware shows the model
                identifier. Copy the relevant lines into the box.
              </p>
              <h3>iPhone or iPad</h3>
              <p>
                Settings → General → About shows model information. Tap Model
                Number to switch between the part number and the A-number.
              </p>
              <h3>If it won’t turn on</h3>
              <p>
                Look for the A-number on the enclosure or the part number on the
                original packaging. Add the year or processor if you know them.
              </p>
              <a
                className="source-link"
                href="https://support.apple.com/en-us/102767"
                target="_blank"
                rel="noreferrer"
              >
                Apple’s identification guide <LuArrowUpRight />
              </a>
            </div>
          </details>
        </aside>
        <section
          className="finder-results"
          ref={resultsRef}
          tabIndex={-1}
          aria-label="Model finder results"
        >
          {props.loading ? (
            <div className="empty-state">
              <span className="loading-spinner" />
              <h2>Getting your catalog ready.</h2>
              <p>You can paste your details while the device catalog loads.</p>
            </div>
          ) : props.error ? (
            <CatalogError error={props.error} retry={props.retry} />
          ) : !submitted ? (
            <div className="finder-start">
              <div className="finder-start-icon">
                <LuSearch />
              </div>
              <span className="eyebrow">A LITTLE DETAIL GOES A LONG WAY</span>
              <h2>Let’s put a name to it.</h2>
              <p>
                Try a part number for the closest match, or paste several
                details to narrow down the possibilities.
              </p>
              <div className="finder-examples">
                <span>Try an example</span>
                {examples.map((example) => (
                  <button
                    key={example.label}
                    onClick={() => applyExample(example.value)}
                  >
                    <span>{example.label}</span>
                    <strong>
                      {example.label === "About This Mac"
                        ? "Model + processor + storage"
                        : example.value}
                    </strong>
                    <LuArrowUpRight />
                  </button>
                ))}
              </div>
              <div className="finder-note">
                <LuInfo />
                <p>
                  An A-number or model identifier can cover more than one
                  configuration. The finder keeps those possibilities visible.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div
                className="finder-results-heading"
                role="status"
                aria-live="polite"
              >
                <span className="eyebrow">
                  {exactPart ? "PART NUMBER MATCH" : "CATALOG MATCHES"}
                </span>
                <h2>
                  {!recognized.length
                    ? "Add a model detail to start."
                    : !matches.length
                      ? "No matching configurations yet."
                      : exactPart
                        ? "Your part number matches."
                        : `${matches.length} possible ${matches.length === 1 ? "configuration" : "configurations"}.`}
                </h2>
                <p>
                  {!recognized.length
                    ? "Try an A-number, Apple part number, model identifier, or a model name with its year."
                    : !matches.length
                      ? "Those details don’t match a configuration in the current catalog. Check the model number or remove a detail to broaden the search."
                      : exactPart
                        ? "This catalog record matches the part number you entered. Open it to see repairability and hardware details."
                        : "These records match the details provided. Check their part numbers, processor, and storage before choosing."}
                </p>
              </div>
              {matches.length > 0 && (
                <>
                  <div className="finder-match-grid">
                    {matches.slice(0, shown).map((match) => (
                      <article className="finder-result" key={match.device.id}>
                        <DeviceCard device={match.device} {...props} />
                        <div className="finder-match-details">
                          <h3>
                            {match.kind === "part"
                              ? "Part number matched"
                              : match.kind === "regional"
                                ? "Regional variant"
                                : "Why it matches"}
                          </h3>
                          <ul>
                            {match.reasons.map((reason) => (
                              <li key={reason}>{reason}</li>
                            ))}
                          </ul>
                          {match.undocumented.length > 0 && (
                            <p>
                              Not confirmed:{" "}
                              {match.undocumented.join(", ").toLowerCase()}.
                            </p>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                  {matches.length > shown && (
                    <button
                      className="secondary-button finder-show-more"
                      onClick={() => setShown((current) => current + 6)}
                    >
                      Show more matches ({matches.length - shown} remaining)
                      <LuArrowRight />
                    </button>
                  )}
                  {matches.some((match) => match.undocumented.length > 0) && (
                    <div className="finder-note">
                      <LuInfo />
                      <p>
                        Some specifications aren’t documented in the catalog.
                        Memory entries describe supported sizes, so they don’t
                        confirm the memory installed in an individual device.
                      </p>
                    </div>
                  )}
                  {sources.length > 0 && (
                    <p className="finder-sources">
                      System model identifiers matched through Apple’s model
                      groups:{" "}
                      {sources.map((source) => (
                        <a
                          key={source}
                          href={source}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {source.endsWith("108052")
                            ? "MacBook Pro"
                            : "MacBook Air"}
                          <LuArrowUpRight />
                        </a>
                      ))}
                    </p>
                  )}
                </>
              )}
              {matches.length === 0 && (
                <button className="secondary-button" onClick={clear}>
                  Start again
                  <LuArrowRight />
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
