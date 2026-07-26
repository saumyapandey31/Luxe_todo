export default function EmptyState({ icon = "✧", title, body, action }) {
  return (
    <div className="luxe-card px-8 py-16 text-center luxe-fade-in">
      <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-2xl text-brown mx-auto mb-5">
        {icon}
      </div>
      <h3 className="font-display text-xl text-brown-dark mb-2">{title}</h3>
      {body && <p className="text-ink/55 max-w-sm mx-auto mb-6">{body}</p>}
      {action}
    </div>
  );
}
