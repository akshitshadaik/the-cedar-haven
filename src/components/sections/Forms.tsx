"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { rooms, inr } from "@/data/site";

type Errors = Record<string, string>;

const iso = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Demo-only submit: validate, show "Checking...", then a clear not-a-real-booking message. */
function useDemoForm(validate: (v: Record<string, string>) => Errors) {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries([...new FormData(form)].map(([k, v]) => [k, String(v).trim()]));
    const errs = validate(values);
    setErrors(errs);
    setState("idle");
    const first = Object.keys(errs)[0];
    if (first) return (form.elements.namedItem(first) as HTMLElement | null)?.focus();
    setState("loading");
    window.setTimeout(() => setState("done"), 1300);
  };
  return { errors, state, onSubmit };
}

function Field({ name, label, error, full, children }: { name: string; label: string; error?: string; full?: boolean; children: ReactNode }) {
  return (
    <div className={`field${full ? " full" : ""}`}>
      <label htmlFor={`f-${name}`}>{label}</label>
      {children}
      {error && <p className="err" id={`e-${name}`}>{error}</p>}
    </div>
  );
}

const a11y = (name: string, errors: Errors) => ({
  id: `f-${name}`, name, "aria-invalid": errors[name] ? true : undefined, "aria-describedby": errors[name] ? `e-${name}` : undefined,
});

function Submit({ state, label, busy }: { state: string; label: string; busy: string }) {
  return (
    <div className="form-actions">
      <button type="submit" className="btn btn-primary" disabled={state === "loading"}>
        {state === "loading" ? <>{busy} <span className="spinner" aria-hidden="true" /></> : <>{label} <ArrowRight /></>}
      </button>
    </div>
  );
}

function required(v: Record<string, string>, keys: string[]): Errors {
  const e: Errors = {};
  for (const k of keys) if (!v[k]) e[k] = "Please fill this in.";
  if (v.email && !EMAIL.test(v.email)) e.email = "Enter a valid email address.";
  if (v.phone && v.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid phone number.";
  return e;
}

export function BookingForm() {
  const params = useSearchParams();
  const room = params.get("room") ?? "";
  const guests = params.get("guests") ?? "2";
  const checkin = useRef<HTMLInputElement>(null);
  const checkout = useRef<HTMLInputElement>(null);

  // Date limits are set after mount so prerendered HTML never bakes in a stale "today"
  useEffect(() => {
    const today = new Date();
    checkin.current!.min = iso(today);
    checkout.current!.min = iso(new Date(today.getTime() + 864e5));
  }, []);

  const { errors, state, onSubmit } = useDemoForm((v) => {
    const e = required(v, ["name", "email", "phone", "checkin", "checkout", "guests", "room"]);
    if (!e.checkin && v.checkin < iso(new Date())) e.checkin = "Check-in cannot be in the past.";
    if (!e.checkout && v.checkin && v.checkout <= v.checkin) e.checkout = "Check-out must be after check-in.";
    return e;
  });

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <Field name="name" label="Full name" error={errors.name} full><input {...a11y("name", errors)} autoComplete="name" required /></Field>
      <Field name="email" label="Email address" error={errors.email}><input {...a11y("email", errors)} type="email" autoComplete="email" required /></Field>
      <Field name="phone" label="Phone number" error={errors.phone}><input {...a11y("phone", errors)} type="tel" autoComplete="tel" required /></Field>
      <Field name="checkin" label="Check-in" error={errors.checkin}>
        <input {...a11y("checkin", errors)} ref={checkin} type="date" required defaultValue={params.get("checkin") ?? ""}
          onChange={(e) => { if (e.target.value) checkout.current!.min = iso(new Date(new Date(e.target.value).getTime() + 864e5)); }} />
      </Field>
      <Field name="checkout" label="Check-out" error={errors.checkout}><input {...a11y("checkout", errors)} ref={checkout} type="date" required defaultValue={params.get("checkout") ?? ""} /></Field>
      <Field name="guests" label="Guests" error={errors.guests}>
        <select {...a11y("guests", errors)} defaultValue={guests} required>
          <option value="">Select</option>
          {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
        </select>
      </Field>
      <Field name="room" label="Room type" error={errors.room}>
        <select {...a11y("room", errors)} defaultValue={rooms.some((r) => r.id === room) ? room : ""} required>
          <option value="">Select a room</option>
          {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}, {inr(r.price)}/night</option>)}
        </select>
      </Field>
      <Submit state={state} label="Check Availability" busy="Checking..." />
      {state === "done" && <p className="status" role="status"><Check /> Demo only. No live booking has been created.</p>}
    </form>
  );
}

export function ContactForm() {
  const { errors, state, onSubmit } = useDemoForm((v) => required(v, ["name", "email", "message"]));
  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <Field name="name" label="Your name" error={errors.name}><input {...a11y("name", errors)} autoComplete="name" required /></Field>
      <Field name="email" label="Email address" error={errors.email}><input {...a11y("email", errors)} type="email" autoComplete="email" required /></Field>
      <Field name="message" label="Message" error={errors.message} full><textarea {...a11y("message", errors)} required /></Field>
      <Submit state={state} label="Send Message" busy="Sending..." />
      {state === "done" && <p className="status" role="status"><Check /> Demo only. Your message has not been sent anywhere.</p>}
    </form>
  );
}
