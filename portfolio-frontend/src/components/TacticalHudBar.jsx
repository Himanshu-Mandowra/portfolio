import React, { useEffect, useState } from "react";
import { soundEngine } from "../utils/soundEngine";

function TacticalHudBar({ outbreakMode, setOutbreakMode }) {
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [saveRoomOpen, setSaveRoomOpen] = useState(false);
  const [saveNote, setSaveNote] = useState("");
  const [savedLogs, setSavedLogs] = useState(() => {
    try {
      const raw = localStorage.getItem("requiem_save_slots");
      return raw
        ? JSON.parse(raw)
        : [
            {
              slot: "SLOT 01",
              timestamp: "13:15",
              note: "Initial operative checkpoint recorded.",
            },
          ];
    } catch {
      return [];
    }
  });

  // Easter Egg: Type "UMBRELLA" or "VIRUS" anywhere to toggle Outbreak Mode
  useEffect(() => {
    let buffer = "";
    const handleKeyDown = (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (e.key && e.key.length === 1) {
        buffer = (buffer + e.key.toUpperCase()).slice(-12);
        if (buffer.endsWith("UMBRELLA") || buffer.endsWith("VIRUS")) {
          soundEngine.playBiohazardAlert();
          setOutbreakMode((prev) => !prev);
          buffer = "";
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setOutbreakMode]);

  const handleToggleSfx = () => {
    const next = !sfxEnabled;
    setSfxEnabled(next);
    soundEngine.setEnabled(next);
    if (next) soundEngine.playClick();
  };

  const handleSaveCheckpoint = (e) => {
    e.preventDefault();
    soundEngine.playSaveRoomChord();
    const newEntry = {
      slot: `SLOT 0${savedLogs.length + 1}`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      note: saveNote.trim() || "Visitor checkpoint saved.",
    };
    const updated = [newEntry, ...savedLogs].slice(0, 4);
    setSavedLogs(updated);
    try {
      localStorage.setItem("requiem_save_slots", JSON.stringify(updated));
    } catch {}
    setSaveNote("");
  };

  return (
    <>
      {/* Outbreak Banner when Easter Egg is Active */}
      {outbreakMode && (
        <div className="fixed inset-x-0 top-0 z-[90] flex flex-wrap items-center justify-between gap-2 bg-red-600 px-4 py-1.5 font-mono-tech text-xs font-bold text-white shadow-lg">
          <span>
            ☣ RED QUEEN ALERT: T-VIRUS OVERDRIVE ACTIVE (3D CORE ACCELERATED)
          </span>
          <button
            type="button"
            onClick={() => setOutbreakMode(false)}
            className="rounded bg-white px-2.5 py-0.5 text-[11px] font-bold uppercase text-red-700"
          >
            + RESTORE NORMAL
          </button>
        </div>
      )}

      {/* Clean, Minimal Bottom-Left HUD Pills */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            soundEngine.playSaveRoomChord();
            setSaveRoomOpen(true);
          }}
          className="theme-surface flex items-center gap-1.5 rounded-xl px-3 py-2 font-mono-tech text-xs font-bold uppercase tracking-wider"
          title="Open Typewriter Save Room"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>SAVE ROOM</span>
        </button>

        <button
          type="button"
          onClick={handleToggleSfx}
          className="theme-surface hidden rounded-xl px-3 py-2 font-mono-tech text-xs font-bold uppercase tracking-wider sm:block"
        >
          {sfxEnabled ? "SFX: ON" : "SFX: OFF"}
        </button>

        <button
          type="button"
          onClick={() => {
            soundEngine.playBiohazardAlert();
            setOutbreakMode((prev) => !prev);
          }}
          className="theme-badge rounded-xl px-3 py-2 font-mono-tech text-xs font-bold uppercase tracking-wider"
          title="Toggle T-Virus Easter Egg (or type UMBRELLA)"
        >
          ☣ {outbreakMode ? "ACTIVE" : "BOOST"}
        </button>
      </div>

      {/* Compact Save Room Modal */}
      {saveRoomOpen && (
        <div
          className="fixed inset-0 z-[9500] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setSaveRoomOpen(false)}
        >
          <div
            className="theme-surface w-full max-w-lg rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between border-b pb-3"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div>
                <div className="font-mono-tech text-xs font-bold uppercase text-emerald-500">
                  SAFE ROOM // TYPEWRITER LOG
                </div>
                <h3 className="font-requiem text-xl font-bold theme-text-primary">
                  RECORD CHECKPOINT
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSaveRoomOpen(false)}
                className="theme-badge rounded-lg px-2.5 py-1 font-mono-tech text-xs font-bold"
              >
                CLOSE [X]
              </button>
            </div>

            <form onSubmit={handleSaveCheckpoint} className="mt-4 flex gap-2">
              <input
                type="text"
                value={saveNote}
                onChange={(e) => {
                  soundEngine.playTypewriter();
                  setSaveNote(e.target.value);
                }}
                placeholder="Type a note (listen to the keys)..."
                className="theme-input flex-1 rounded-xl px-3.5 py-2 font-mono-tech text-xs outline-none"
              />
              <button
                type="submit"
                className="theme-accent-bg rounded-xl px-4 py-2 font-mono-tech text-xs font-bold uppercase"
              >
                SAVE
              </button>
            </form>

            <div className="mt-4 space-y-2">
              {savedLogs.map((item, idx) => (
                <div
                  key={idx}
                  className="theme-input flex items-center justify-between rounded-xl px-3.5 py-2 font-mono-tech text-xs"
                >
                  <span>
                    <strong className="theme-accent-text">{item.slot}:</strong>{" "}
                    {item.note}
                  </span>
                  <span className="theme-text-muted text-[10px]">
                    {item.timestamp}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 font-mono-tech text-[11px] theme-text-muted">
              💡 EASTER EGG: Type <strong>UMBRELLA</strong> anywhere on the
              portfolio to trigger 3D overdrive mode!
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default TacticalHudBar;
