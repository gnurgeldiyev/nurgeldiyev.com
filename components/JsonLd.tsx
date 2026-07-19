// Injects schema.org JSON-LD in a Server Component. JSON.stringify does not
// sanitize, so we escape "<" to < per Next.js guidance to prevent XSS.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
