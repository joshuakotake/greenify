import React, { useEffect, useRef, useState } from "react";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function PlaceAutocomplete({
  labelIcon,
  value, setValue,           // string
  onPick,                    // (item:{label,coords:[lon,lat],place}) => void
  placeholder = "Search place",
  minChars = 2,
}) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  // used to block re-open/refetch right after a pick
  const suppressRef = useRef(false);
  const lastPickedLabel = useRef("");

  // Close when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Fetch suggestions (debounced)
  useEffect(() => {
    if (suppressRef.current) return; // don't refetch right after selection

    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      const q = value?.trim();
      if (!q || q.length < minChars) {
        setItems([]); setOpen(false); return;
      }
      try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          q
        )}.json?autocomplete=true&limit=5&access_token=${TOKEN}`;
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) return;
        const data = await res.json();
        const list = (data.features || []).map(f => ({
          label: f.place_name,
          coords: f.geometry?.coordinates, // [lon,lat]
          place: f
        }));
        setItems(list);
        // Only open if user is still focused and we have results
        if (document.activeElement === inputRef.current && list.length) {
          setOpen(true);
          setActive(0);
        }
      } catch {/* ignore */}
    }, 200);

    return () => { clearTimeout(t); ctrl.abort(); };
  }, [value, minChars]);

  const pick = (item) => {
    // prevent blur → focus → debounce loop
    suppressRef.current = true;
    setTimeout(() => { suppressRef.current = false; }, 300);

    lastPickedLabel.current = item.label;
    setValue(item.label);
    onPick(item);

    // Close and clear
    setOpen(false);
    setItems([]);
    setActive(0);

    // Optionally blur to ensure no immediate reopen
    // inputRef.current?.blur();
  };

  const onKeyDown = (e) => {
    if (!open || items.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault(); setActive(a => (a + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); setActive(a => (a - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      pick(items[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleFocus = () => {
    if (suppressRef.current) return;                // don't reopen after pick
    if (items.length >= 1 && value !== lastPickedLabel.current) {
      setOpen(true);
    }
  };

  return (
    <div className="input-group" ref={boxRef} onKeyDown={onKeyDown}>
      {labelIcon && <span className="input-icon">{labelIcon}</span>}
      <input
        ref={inputRef}
        className="input"
        value={value}
        onChange={(e) => {
          lastPickedLabel.current = "";             // typing invalidates last pick
          setValue(e.target.value);
        }}
        onFocus={handleFocus}
        placeholder={placeholder}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
      />
      {open && items.length > 0 && (
        <div className="pa-menu" role="listbox">
          {items.map((it, i) => (
            <button
              type="button"
              key={it.label + i}
              className={`pa-item ${i === active ? "active" : ""}`}
              // use onMouseDown to fire BEFORE input blur; prevents reopen loop
              onMouseDown={(e) => { e.preventDefault(); pick(it); }}
              onMouseEnter={() => setActive(i)}
              role="option"
              aria-selected={i === active}
              title={it.label}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
