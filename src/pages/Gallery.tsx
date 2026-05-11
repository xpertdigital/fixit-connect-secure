import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock, Upload, Trash2, X, Loader2, ImagePlus, ShieldAlert } from "lucide-react";

const ADMIN_PASSWORD = "Raja@2026!#";

type GalleryImage = {
  id: string;
  storage_path: string;
  url: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
};

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Couldn't load gallery.");
    } else {
      setImages((data as GalleryImage[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <SiteLayout>
      <Helmet>
        <title>Gallery — Digitek Solutions</title>
        <meta
          name="description"
          content="Browse our recent installations and on-site work — CCTV, networking, repairs, and more by Digitek Solutions."
        />
        <meta property="og:title" content="Gallery — Digitek Solutions" />
        <meta
          property="og:description"
          content="A look at our recent projects and installations across the city."
        />
      </Helmet>

      <section className="bg-gradient-hero py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl text-foreground md:text-6xl">
                Our <span className="text-primary">Gallery</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                A snapshot of recent installations, repairs, and projects we're proud of.
                <br />
                Real work, real results — captured on the job by our technicians.
              </p>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-soft transition-smooth hover:border-primary hover:text-primary"
            >
              <Lock className="h-4 w-4" /> Update Gallery
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-20 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : images.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-16 text-center">
            <ImagePlus className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">
              No images yet. Use “Update Gallery” to add the first photos.
            </p>
          </div>
        ) : (
          <div className="columns-2 gap-4 [column-fill:_balance] md:columns-3 lg:columns-4">
            {images.map((img) => (
              <figure
                key={img.id}
                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-smooth hover:shadow-elegant"
              >
                <img
                  src={img.url}
                  alt={img.caption || "Digitek Solutions project photo"}
                  loading="lazy"
                  decoding="async"
                  className="block w-full"
                />
                {img.caption && (
                  <figcaption className="px-4 py-2 text-sm text-muted-foreground">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </section>

      {open && (
        <ManageGalleryModal
          images={images}
          onClose={() => setOpen(false)}
          onChanged={fetchImages}
        />
      )}
    </SiteLayout>
  );
}

function ManageGalleryModal({
  images,
  onClose,
  onChanged,
}: {
  images: GalleryImage[];
  onClose: () => void;
  onChanged: () => void;
}) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password.");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("gallery")
          .upload(path, file, { contentType: file.type, upsert: false });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("gallery").getPublicUrl(path);
        const { error: insErr } = await supabase.from("gallery_images").insert({
          storage_path: path,
          url: pub.publicUrl,
          caption: caption || null,
        });
        if (insErr) throw insErr;
      }
      toast.success("Image(s) added.");
      setCaption("");
      onChanged();
    } catch (err) {
      console.error(err);
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (img: GalleryImage) => {
    if (!confirm("Delete this image?")) return;
    try {
      await supabase.storage.from("gallery").remove([img.storage_path]);
      const { error } = await supabase.from("gallery_images").delete().eq("id", img.id);
      if (error) throw error;
      toast.success("Image deleted.");
      onChanged();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-serif text-xl text-foreground">Manage Gallery</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {!authed ? (
          <form onSubmit={handleUnlock} className="space-y-4 px-6 py-8">
            <div className="flex items-center gap-3 rounded-lg bg-secondary/60 p-4 text-sm text-muted-foreground">
              <ShieldAlert className="h-5 w-5 text-primary" />
              Enter the admin password to manage gallery images.
            </div>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow"
            >
              <Lock className="h-4 w-4" /> Unlock
            </button>
          </form>
        ) : (
          <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
            <div className="rounded-xl border border-dashed border-border p-5">
              <label className="text-sm font-medium text-foreground">Caption (optional)</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. CCTV install — riverside office"
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-smooth hover:bg-primary-glow">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {uploading ? "Uploading…" : "Upload images"}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  disabled={uploading}
                  onChange={handleUpload}
                />
              </label>
            </div>

            <h3 className="mt-6 text-sm font-semibold text-muted-foreground">
              Existing images ({images.length})
            </h3>
            {images.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">No images yet.</p>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {images.map((img) => (
                  <div key={img.id} className="group relative overflow-hidden rounded-lg border border-border">
                    <img src={img.url} alt={img.caption || ""} className="aspect-square w-full object-cover" />
                    <button
                      onClick={() => handleDelete(img)}
                      className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-destructive text-destructive-foreground opacity-0 shadow transition-opacity group-hover:opacity-100"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
