import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { scoreBand } from "./catalog";
import { LuArrowRight, LuInfo, LuWrench, LuX } from "react-icons/lu";

export function Score({
  score,
  large = false,
}: {
  score: number | null;
  large?: boolean;
}) {
  return (
    <span
      className={`score ${scoreBand(score)} ${large ? "score-large" : ""}`}
      aria-label={
        score === null ? "Not scored" : `Repairability ${score} out of 10`
      }
    >
      <strong>{score ?? "—"}</strong>
      <span>/10</span>
    </span>
  );
}
export function ScoreBars({ score }: { score: number | null }) {
  return (
    <div className={`score-bars ${scoreBand(score)}`} aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => (
        <i key={i} className={score !== null && i < score ? "filled" : ""} />
      ))}
    </div>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="info-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="dialog-title"
    >
      <div className="dialog-heading">
        <h2 id="dialog-title">{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <LuX />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function NotFound({
  title = "This page needs a little repair.",
}: {
  title?: string;
}) {
  return (
    <div className="empty-state not-found">
      <LuWrench />
      <h1>{title}</h1>
      <p>Let’s get you back to the device explorer.</p>
      <Link to="/" className="primary-button">
        Explore devices <LuArrowRight />
      </Link>
    </div>
  );
}

export function CatalogError({
  error,
  retry,
}: {
  error: string;
  retry: () => void;
}) {
  return (
    <div className="empty-state" role="alert">
      <LuInfo />
      <h3>Couldn’t load your device catalog.</h3>
      <p>{error}</p>
      <button onClick={retry} className="primary-button">
        Try again <LuArrowRight />
      </button>
    </div>
  );
}
