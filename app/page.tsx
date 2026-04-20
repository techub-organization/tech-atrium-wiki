import { loadHomePageData } from "../lib/api/data-source";

function statusLabel(status: "mock" | "live") {
  return status === "live" ? "Live API" : "Mock Data";
}

export default async function HomePage() {
  const data = await loadHomePageData();

  return (
    <main style={{ padding: "32px 20px 64px" }}>
      <section
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          display: "grid",
          gap: "24px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.78)",
            border: "1px solid rgba(31,41,55,0.12)",
            borderRadius: "28px",
            padding: "32px",
            boxShadow: "0 20px 60px rgba(31,41,55,0.08)",
          }}
        >
          <p style={{ margin: 0, color: "#526072", fontSize: "0.9rem" }}>
            Main Frontend
          </p>
          <h1 style={{ margin: "8px 0 12px", fontSize: "clamp(2.2rem, 6vw, 4.8rem)" }}>
            {data.hero.serviceName}
          </h1>
          <p style={{ margin: 0, maxWidth: "54rem", lineHeight: 1.7, color: "#364152" }}>
            {data.hero.summary}
          </p>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                padding: "8px 12px",
                borderRadius: "999px",
                background: "#ee6c4d",
                color: "#fff",
                fontSize: "0.9rem",
              }}
            >
              label: {data.hero.serviceLabel}
            </span>
            <span
              style={{
                padding: "8px 12px",
                borderRadius: "999px",
                background: "#2a9d8f",
                color: "#fff",
                fontSize: "0.9rem",
              }}
            >
              source: {process.env.TECHRIUM_FRONT_PAGE_API ? "api-ready" : "mock-mode"}
            </span>
          </div>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {data.sources.map((source) => (
            <article
              key={`${source.category}-${source.name}`}
              style={{
                background: "rgba(255,255,255,0.82)",
                border: "1px solid rgba(31,41,55,0.12)",
                borderRadius: "22px",
                padding: "20px",
              }}
            >
              <p style={{ margin: 0, color: "#526072", fontSize: "0.85rem", textTransform: "uppercase" }}>
                {source.category}
              </p>
              <h2 style={{ margin: "10px 0", fontSize: "1.2rem" }}>{source.name}</h2>
              <p style={{ margin: "0 0 12px", color: "#364152", lineHeight: 1.6 }}>{source.note}</p>
              <p style={{ margin: "0 0 8px", fontWeight: 600 }}>{statusLabel(source.status)}</p>
              <code
                style={{
                  display: "block",
                  padding: "10px 12px",
                  borderRadius: "14px",
                  background: "#f3f4f6",
                  color: "#334155",
                  fontSize: "0.82rem",
                  overflowWrap: "anywhere",
                }}
              >
                {source.endpoint ?? "endpoint not connected yet"}
              </code>
            </article>
          ))}
        </section>

        <section
          style={{
            background: "rgba(255,255,255,0.76)",
            border: "1px solid rgba(31,41,55,0.12)",
            borderRadius: "22px",
            padding: "24px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Frontend Override Policy</h2>
          <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: 1.8 }}>
            {data.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
