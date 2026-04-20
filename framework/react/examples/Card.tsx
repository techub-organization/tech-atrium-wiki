type CardProps = {
  title?: string;
  description?: string;
};

export function Card({
  title = "Techrium Card",
  description = "Reusable UI block for article and comparison pages.",
}: CardProps) {
  return (
    <article
      style={{
        border: "1px solid #d4d4d8",
        borderRadius: "12px",
        padding: "1rem",
      }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  );
}
