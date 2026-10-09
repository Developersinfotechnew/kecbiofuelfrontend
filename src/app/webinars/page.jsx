import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import WebinarCalendar from "../Components/WebinarCalendar";

export const metadata = {
  title: "Webinars & Online Meetings | KEC Biofuel",
  description:
    "View upcoming KEC Biofuel webinars and online meetings on CBG, biogas and clean energy. Pick a date on the calendar, register and pay online.",
};

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const STEPS = [
  { icon: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", title: "Pick a date", text: "Green days have a session." },
  { icon: "M2 7h20v10H2zM2 11h20", title: "Pay securely", text: "UPI, cards or netbanking." },
  { icon: "M15 10l5-3v10l-5-3M3 6h12v12H3z", title: "Join online", text: "Link shows right after payment." },
];

export default function WebinarsPage() {
  return (
    <div className="min-h-screen bg-[#f4f8f4]">
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <section
            className="relative overflow-hidden rounded-3xl bg-[#0b2e22] text-white px-6 py-10 md:px-12 md:py-14 mb-8"
            style={{
              backgroundImage:
                "radial-gradient(600px circle at 100% 0%, rgba(249,115,22,0.28), transparent 60%), radial-gradient(500px circle at 0% 100%, rgba(34,197,94,0.22), transparent 60%)",
            }}
          >
            <div className="relative max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Webinars &amp; online meetings on CBG and clean energy
              </h1>
              <p className="mt-4 text-green-50/80 text-base md:text-lg leading-relaxed">
                Learn biogas and compressed biogas straight from the KEC Biofuel team. Choose a session, register and join from anywhere.
              </p>
            </div>

            <ul className="relative mt-8 grid sm:grid-cols-3 gap-3">
              {STEPS.map((s) => (
                <li key={s.title} className="flex items-center gap-3 rounded-2xl bg-white/[0.07] border border-white/10 px-4 py-3">
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                    <Icon d={s.icon} />
                  </span>
                  <span>
                    <span className="block font-semibold text-sm">{s.title}</span>
                    <span className="block text-xs text-green-50/70">{s.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <WebinarCalendar />
        </div>
      </main>
      <Footer />
    </div>
  );
}