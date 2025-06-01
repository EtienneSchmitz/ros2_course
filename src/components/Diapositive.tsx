type DiapositiveProps = {
  path: string;        // Exemple : '/slides/introduction/slide_1'
  height?: number;
  title?: string;      // Optionnel : titre à afficher au-dessus
};

export default function Diapositive({ path, height = 650, title }: DiapositiveProps) {
  const htmlPath = `${path}.html`;
  const pdfPath = `${path}.pdf`;

  return (
    <div style={{ margin: '2em 0' }}>
      {title && (
        <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>
          {title}
        </h2>
      )}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <iframe
          src={htmlPath}
          width="100%"
          height={height}
          style={{
            border: 'none',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            borderRadius: '8px',
          }}
          title={`${title ?? "Diapositive " + path}`}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
        <a href={pdfPath} download>
          📥 Télécharger le PDF
        </a>
      </div>
    </div>
  );
}
