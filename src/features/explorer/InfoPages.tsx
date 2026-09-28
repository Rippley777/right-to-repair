import {
  LuArrowUpRight,
  LuBookOpen,
  LuCircuitBoard,
  LuLeaf,
  LuSearch,
  LuWrench,
} from "react-icons/lu";

export function GuidesPage() {
  return (
    <div className="content-page">
      <span className="eyebrow">A GOOD PLACE TO START</span>
      <h1>
        Know your device.
        <br />
        <span>Then get your hands on it.</span>
      </h1>
      <p className="page-intro">
        A few useful resources between “could I fix this?” and your first
        repair.
      </p>
      <div className="guide-grid">
        {[
          {
            number: "01",
            icon: LuSearch,
            title: "Find your exact model",
            text: "On a Mac, open the Apple menu → About This Mac. For the model identifier, open System Information → Hardware. On iPhone or iPad, check Settings → General → About.",
            href: "https://support.apple.com/en-us/102767",
            label: "Identify your MacBook",
          },
          {
            number: "02",
            icon: LuBookOpen,
            title: "Read before you repair",
            text: "A model-specific guide shows the tools, parts, and steps involved. Read the full guide first, including its reassembly instructions.",
            href: "https://www.ifixit.com/Device/Apple",
            label: "Browse iFixit guides",
          },
          {
            number: "03",
            icon: LuWrench,
            title: "Get the right instructions",
            text: "Apple’s Self Service Repair program offers manuals for supported models. Check your exact model and repair before ordering parts or tools.",
            href: "https://support.apple.com/self-service-repair",
            label: "Apple repair resources",
          },
        ].map((item) => (
          <article className="guide-card" key={item.number}>
            <div>
              <item.icon />
              <span>{item.number}</span>
            </div>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.label}
              <LuArrowUpRight />
            </a>
          </article>
        ))}
      </div>
      <section className="editorial-note">
        <LuLeaf />
        <div>
          <h2>Repair starts with understanding.</h2>
          <p>
            A repairability score is a starting point. Your particular repair,
            experience, access to parts, and the condition of the device all
            matter. Use the source guides to decide on your next step.
          </p>
        </div>
      </section>
    </div>
  );
}
export function AboutPage({ openScores }: { openScores: () => void }) {
  return (
    <div className="content-page about-page">
      <span className="eyebrow">OWN IT. UNDERSTAND IT. KEEP IT.</span>
      <h1>
        Good things deserve
        <br />
        <span>a second life.</span>
      </h1>
      <p className="page-intro">
        Right to Repair is an independent guide to understanding the devices we
        own—and what it takes to keep them going.
      </p>
      <div className="about-columns">
        <section>
          <h2>
            Less guesswork.
            <br />
            More possibility.
          </h2>
          <p>
            A great device isn’t just powerful on day one. Being able to replace
            a battery, upgrade storage, or repair a broken part can make all the
            difference years later.
          </p>
          <p>
            We bring those details together so you can explore, save, and
            compare Apple devices with repair in mind.
          </p>
        </section>
        <section>
          <h2>Transparent by design.</h2>
          <p>
            Scores and hardware details come from the connected device catalog.
            Configurations that share a model identifier are listed separately
            so you can check the exact model number and specifications.
          </p>
          <p>
            Scores can change as parts, manuals, and scoring methods improve.
            The original source has the context; our low, medium, and high
            labels simply help you browse.
          </p>
          <button className="secondary-button" onClick={openScores}>
            How the scores work <LuArrowUpRight />
          </button>
        </section>
      </div>
      <section className="editorial-note">
        <LuCircuitBoard />
        <div>
          <h2>Your device. Your possibilities.</h2>
          <p>
            This project is independent of Apple and iFixit. Device names belong
            to their respective owners. Illustrations represent device families;
            check the exact model before using any repair guide.
          </p>
        </div>
      </section>
    </div>
  );
}
