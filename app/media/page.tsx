import MediaComponent from "@/components/MediaComponent";
import Gallery from "@/components/Gallery";

export default function MediaPage() {
  return (
    <main className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#64748b] mb-3">Media & Coverage</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0f172a] tracking-tight mb-4">Media Room</h1>
            <p className="text-[#64748b] leading-relaxed">
              News interviews, newspaper contributions, key events, and media coverage featuring Prof. Dr. Mohd Talib Latif&apos;s research and expertise in atmospheric chemistry and air quality.
            </p>
          </div>

          <div className="space-y-20">
            <Gallery />
            <MediaComponent />
          </div>
        </div>
      </section>
    </main>
  );
}
