export const metadata = {
  title: "Sanity Studio — Anayas Jewels",
  description: "Anayas Jewels Admin Console and Order Fulfillment",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[99999] h-screen w-screen overflow-hidden bg-white">
      {children}
    </div>
  );
}
