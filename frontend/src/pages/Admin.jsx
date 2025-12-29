// src/pages/Admin.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  LayoutDashboard, FolderKanban, Newspaper, Wrench, Users,
  Settings as SettingsIcon, Plus, Save, Trash, Pencil,
  Loader2, CloudOff, CheckCircle2, Link2,
} from "lucide-react";

/* ---------------------------------------------------------
   API base + helper
--------------------------------------------------------- */
// FIX: Explicitly point to Render backend in production to prevent 404s
const API_BASE = process.env.NODE_ENV === 'production' 
  ? "https://portfolio-k4cd.onrender.com" 
  : "http://localhost:8000";

async function fetchJSON(path, options = {}) {
  const url =
    path.startsWith("http") || path.startsWith("/")
      ? path
      : `${API_BASE}/api/${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    const err = new Error(msg || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}

/* ---- MINIMAL FIX 1: add normalizers so delete/update always have id ---- */
// normalize Mongo docs so they always have .id
function normalizeItem(it) {
  if (!it) return it;
  if (!it.id && it._id) it.id = it._id;
  return it;
}
function normalizeList(arr) {
  return (arr || []).map(normalizeItem);
}

const uid = () => Math.random().toString(36).slice(2, 9);

/* ---------------------------------------------------------
   Mock/Data Hybrid switch (persists in localStorage)
--------------------------------------------------------- */
function useHybrid(initialMock) {
  const [mockMode, setMockMode] = useState(() => {
    const saved = localStorage.getItem("portfolio_mock_mode");
    return saved ? saved === "true" : initialMock ?? true;
  });
  useEffect(() => {
    localStorage.setItem("portfolio_mock_mode", String(mockMode));
  }, [mockMode]);
  return { mockMode, setMockMode };
}

/* ---------------------------------------------------------
   Seed hydration for EXACT data already on site
   Order (first found wins):
   1) localStorage ('portfolio_{key}')
   2) GET /api/public/{key}
   3) dynamic import('@/data/seed') or '@/data/mock'
   4) GET /data/{key}.json
   5) fallback default
--------------------------------------------------------- */
async function tryDynamicImport(path) {
  try {
    // vite supports this; CRA will just throw and we ignore
    const mod = await import(/* @vite-ignore */ path);
    return mod?.default || mod;
  } catch {
    return null;
  }
}

async function loadSeed(key, fallbackValue) {
  // 1) localStorage
  const ls = localStorage.getItem(`portfolio_${key}`);
  if (ls) {
    try {
      const parsed = JSON.parse(ls);
      if (Array.isArray(fallbackValue)) return Array.isArray(parsed) ? parsed : fallbackValue;
      return parsed ?? fallbackValue;
    } catch {}
  }

  // 2) public read-only API
  try {
    const readOnly = await fetchJSON(`public/${key}`);
    if (readOnly) return readOnly;
  } catch {}

  // 3) optional modules inside repo
  const seed = (await tryDynamicImport("@/data/seed")) || (await tryDynamicImport("@/data/mock"));
  if (seed && seed[key] != null) return seed[key];

  // 4) static JSON under public/
  try {
    const res = await fetch(`/data/${key}.json`);
    if (res.ok) return await res.json();
  } catch {}

  // 5) final fallback
  return fallbackValue;
}

/* ---------------------------------------------------------
   Generic CRUD hook with API + fallback to localStorage
   keys: 'experience' | 'projects' | 'posts' | 'skills' | 'overview'
--------------------------------------------------------- */
function useAdminList(key, { mockMode, defaultValue }) {
  const [items, setItems] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // load
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        if (!mockMode) {
          const data = await fetchJSON(`admin/${key}`);
          if (mounted) {
            const normed = Array.isArray(defaultValue)
              ? normalizeList(Array.isArray(data) ? data : [])
              : normalizeItem(data) ?? defaultValue;
            setItems(normed);
          }
        } else {
          const seed = await loadSeed(key, defaultValue);
          if (mounted) setItems(Array.isArray(defaultValue) ? normalizeList(seed) : normalizeItem(seed));
        }
      } catch {
        // fallback to seed
        const seed = await loadSeed(key, defaultValue);
        if (mounted) setItems(Array.isArray(defaultValue) ? normalizeList(seed) : normalizeItem(seed));
        setError(`Could not reach /api/admin/${key} — using local data.`);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mockMode]);

  // persist locally for mock/hybrid
  useEffect(() => {
    try {
      localStorage.setItem(`portfolio_${key}`, JSON.stringify(items));
    } catch {}
  }, [key, items]);

  const create = useCallback(async (record) => {
    setBusy(true);
    setError("");
    const optimistic = Array.isArray(items) ? [record, ...items] : record;
    setItems(optimistic);
    try {
      if (!mockMode) {
        const saved = await fetchJSON(`admin/${key}`, {
          method: "POST",
          body: JSON.stringify(record),
        });
        if (Array.isArray(items)) {
          setItems((prev) => [normalizeItem(saved), ...prev.filter((p) => p.id !== record.id)]);
        } else {
          /* ---- MINIMAL FIX 2: ensure saved is normalized here too ---- */
          setItems(normalizeItem(saved));
        }
      }
    } catch {
      setError("Create failed. Working locally.");
    } finally {
      setBusy(false);
    }
  }, [items, key, mockMode]);

  const update = useCallback(async (record) => {
    setBusy(true);
    setError("");
    setItems((prev) => {
      if (Array.isArray(prev)) {
        const idx = prev.findIndex((p) => p.id === record.id);
        if (idx >= 0) { const cp = [...prev]; cp[idx] = record; return cp; }
        return [record, ...prev];
      }
      return record;
    });
    try {
      if (!mockMode) {
        await fetchJSON(`admin/${key}/${encodeURIComponent(record.id || record._id)}`, {
          method: "PUT",
          body: JSON.stringify(record),
        });
      }
    } catch {
      setError("Update failed. Working locally.");
    } finally {
      setBusy(false);
    }
  }, [key, mockMode]);

  const remove = useCallback(async (id) => {
    setBusy(true);
    setError("");
    const prev = items;
    setItems((p) => (Array.isArray(p) ? p.filter((x) => x.id !== id) : p));
    try {
      if (!mockMode) {
        await fetchJSON(`admin/${key}/${encodeURIComponent(id)}`, { method: "DELETE" });
      }
    } catch {
      setItems(prev);
      setError("Delete failed. Working locally.");
    } finally {
      setBusy(false);
    }
  }, [items, key, mockMode]);

  return { items, setItems, loading, busy, error, create, update, remove };
}

/* ---------------------------------------------------------
   Admin sections meta
--------------------------------------------------------- */
const adminSections = [
  { id: "overview",   name: "Overview",   description: "Dashboard overview and analytics", icon: LayoutDashboard },
  { id: "projects",   name: "Projects",   description: "Manage portfolio projects",        icon: FolderKanban },
  { id: "blog",       name: "Blog Posts", description: "Create and manage blog content",   icon: Newspaper },
  { id: "skills",     name: "Skills",     description: "Update technical skills",          icon: Wrench },
  { id: "experience", name: "Experience", description: "Manage work experience",           icon: Users },
  { id: "settings",   name: "Settings",   description: "System configuration",             icon: SettingsIcon },
];

/* ---------------------------------------------------------
   EXPERIENCE MANAGER (unchanged logic)
--------------------------------------------------------- */
function ExperienceManager({ mockMode }) {
  const defaults = [
    { id: uid(), company: "Acme Corp", role: "Frontend Developer", start: "2023-01", end: "2024-06", location: "Remote", description: "Built reusable UI components and optimized performance." },
  ];
  const { items, loading, busy, error, create, update, remove } =
    useAdminList("experience", { mockMode, defaultValue: defaults });

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(null);

  const startEdit = (item) => {
    const base = item || { id: uid(), company: "", role: "", start: "", end: "", location: "", description: "" };
    setEditing(base.id);
    setForm(base);
  };
  const cancel = () => { setEditing(null); setForm(null); };
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSave = async () => {
    if (!form) return;
    if (items.find((i) => i.id === form.id)) await update(form);
    else await create(form);
    cancel();
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center"><Users className="h-6 w-6 mr-3" />Experience</CardTitle>
        <CardDescription>Manage work experience</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <Warn msg={error} />}
        <TopBar mockMode={mockMode} onAdd={() => startEdit(null)} />
        {loading ? <Loading /> : items.length === 0 ? <Empty /> : (
          <div className="space-y-3">
            {items.map((it) => (
              <Row key={it.id} title={`${it.role} • ${it.company}`} subtitle={`${it.start} – ${it.end || "Present"} • ${it.location}`} description={it.description}
                   onEdit={() => startEdit(it)} onDelete={() => remove(it.id)} />
            ))}
          </div>
        )}
      </CardContent>
      {editing && (
        <Editor
          busy={busy}
          fields={[
            ["company","Company"],["role","Role"],["start","Start (YYYY-MM)"],["end","End (YYYY-MM or blank)"],
            ["location","Location"],
          ]}
          textField={["description","Description",4]}
          form={form}
          setForm={setForm}
          onChange={onChange}
          onSave={onSave}
          onCancel={cancel}
        />
      )}
    </Card>
  );
}

/* ---------------------------------------------------------
   PROJECTS MANAGER
--------------------------------------------------------- */
function ProjectsManager({ mockMode }) {
  const defaults = [
    { id: uid(), title: "My Portfolio", tagline: "React + Tailwind responsive site", url: "https://example.com", repo: "https://github.com/you/portfolio", tech: ["React","Tailwind"], description: "Clean UI, dark mode, sections for projects/skills/blog." },
  ];
  const { items, loading, busy, error, create, update, remove } =
    useAdminList("projects", { mockMode, defaultValue: defaults });

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(null);

  const startEdit = (item) => {
    const base = item || { id: uid(), title: "", tagline: "", url: "", repo: "", tech: [], description: "" };
    setEditing(base.id); setForm(base);
  };
  const cancel = () => { setEditing(null); setForm(null); };

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onTechChange = (value) =>
    setForm((f) => ({ ...f, tech: value.split(",").map((s) => s.trim()).filter(Boolean) }));

  const onSave = async () => {
    if (!form) return;
    const rec = { ...form, tech: Array.isArray(form.tech) ? form.tech : [] };
    if (items.find((i) => i.id === rec.id)) await update(rec);
    else await create(rec);
    cancel();
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center"><FolderKanban className="h-6 w-6 mr-3" />Projects</CardTitle>
        <CardDescription>Manage portfolio projects</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <Warn msg={error} />}
        <TopBar mockMode={mockMode} onAdd={() => startEdit(null)} />
        {loading ? <Loading /> : items.length === 0 ? <Empty /> : (
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.id} className="rounded-xl border p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="font-semibold">{it.title}</div>
                    {it.tagline && <div className="text-sm text-muted-foreground">{it.tagline}</div>}
                    {it.tech?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {it.tech.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
                      </div>
                    )}
                    {it.description && <p className="text-sm mt-2">{it.description}</p>}
                    <div className="flex gap-3 mt-2">
                      {it.url && <a className="inline-flex items-center text-sm underline" href={it.url} target="_blank" rel="noreferrer"><Link2 className="h-3.5 w-3.5 mr-1" />Live</a>}
                      {it.repo && <a className="inline-flex items-center text-sm underline" href={it.repo} target="_blank" rel="noreferrer">Repo</a>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={() => startEdit(it)}><Pencil className="h-4 w-4 mr-1" />Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => remove(it.id)}><Trash className="h-4 w-4 mr-1" />Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {editing && (
        <Editor
          busy={busy}
          fields={[
            ["title","Title"],["tagline","Tagline"],["url","Live URL"],["repo","Repo URL"],
          ]}
          extra={
            <div>
              <Label htmlFor="tech">Tech (comma separated)</Label>
              <Input id="tech" value={Array.isArray(form.tech) ? form.tech.join(", ") : ""} onChange={(e)=>onTechChange(e.target.value)} placeholder="React, Tailwind, FastAPI" />
            </div>
          }
          textField={["description","Description",4]}
          form={form}
          setForm={setForm}
          onChange={onChange}
          onSave={onSave}
          onCancel={cancel}
        />
      )}
    </Card>
  );
}

/* ---------------------------------------------------------
   BLOG MANAGER
--------------------------------------------------------- */
function BlogManager({ mockMode }) {
  const defaults = [
    { id: uid(), title: "Getting started with my portfolio", slug: "hello-world", date: "2025-01-01", excerpt: "Why I built it and how it works.", content: "Long form content…" },
  ];
  const { items, loading, busy, error, create, update, remove } =
    useAdminList("posts", { mockMode, defaultValue: defaults });

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(null);

  const startEdit = (item) => {
    const base = item || { id: uid(), title: "", slug: "", date: "", excerpt: "", content: "" };
    setEditing(base.id); setForm(base);
  };
  const cancel = () => { setEditing(null); setForm(null); };
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSave = async () => {
    if (!form) return;
    if (items.find((i) => i.id === form.id)) await update(form);
    else await create(form);
    cancel();
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center"><Newspaper className="h-6 w-6 mr-3" />Blog Posts</CardTitle>
        <CardDescription>Create and manage blog content</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <Warn msg={error} />}
        <TopBar mockMode={mockMode} onAdd={() => startEdit(null)} />
        {loading ? <Loading /> : items.length === 0 ? <Empty /> : (
          <div className="space-y-3">
            {items.map((it) => (
              <Row key={it.id}
                   title={it.title}
                   subtitle={`${it.date} • /blog/${it.slug}`}
                   description={it.excerpt}
                   onEdit={() => startEdit(it)}
                   onDelete={() => remove(it.id)} />
            ))}
          </div>
        )}
      </CardContent>
      {editing && (
        <Editor
          busy={busy}
          fields={[["title","Title"],["slug","Slug"],["date","Date (YYYY-MM-DD)"],["excerpt","Excerpt"]]}
          textField={["content","Content",8]}
          form={form}
          setForm={setForm}
          onChange={onChange}
          onSave={onSave}
          onCancel={cancel}
        />
      )}
    </Card>
  );
}

/* ---------------------------------------------------------
   SKILLS MANAGER
--------------------------------------------------------- */
function SkillsManager({ mockMode }) {
  const defaults = [
    { id: uid(), name: "JavaScript", level: 90, category: "Frontend" },
    { id: uid(), name: "React",       level: 85, category: "Frontend" },
    { id: uid(), name: "Python",      level: 80, category: "Backend"  },
  ];
  const { items, loading, busy, error, create, update, remove } =
    useAdminList("skills", { mockMode, defaultValue: defaults });

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(null);

  const startEdit = (item) => {
    const base = item || { id: uid(), name: "", level: 50, category: "" };
    setEditing(base.id); setForm(base);
  };
  const cancel = () => { setEditing(null); setForm(null); };
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSave = async () => {
    if (!form) return;
    const rec = { ...form, level: Number(form.level) || 0 };
    if (items.find((i) => i.id === rec.id)) await update(rec);
    else await create(rec);
    cancel();
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center"><Wrench className="h-6 w-6 mr-3" />Skills</CardTitle>
        <CardDescription>Update technical skills</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <Warn msg={error} />}
        <TopBar mockMode={mockMode} onAdd={() => startEdit(null)} />
        {loading ? <Loading /> : items.length === 0 ? <Empty /> : (
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.id} className="rounded-xl border p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-muted-foreground">{it.category || "General"} • {it.level}%</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => startEdit(it)}><Pencil className="h-4 w-4 mr-1" />Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => remove(it.id)}><Trash className="h-4 w-4 mr-1" />Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {editing && (
        <Editor
          busy={busy}
          fields={[["name","Name"],["category","Category"],["level","Level (0-100)"]]}
          form={form}
          setForm={setForm}
          onChange={onChange}
          onSave={onSave}
          onCancel={cancel}
        />
      )}
    </Card>
  );
}

/* ---------------------------------------------------------
   SETTINGS (same behavior as before)
--------------------------------------------------------- */
function SettingsManager({ mockMode, setMockMode }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedTick, setSavedTick] = useState(false);
  const [cfg, setCfg] = useState({ siteTitle: "Portfolio", defaultDark: false });

  const onChange = (name, value) => setCfg((c) => ({ ...c, [name]: value }));

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true); setError("");
      try {
        if (!mockMode) {
          const data = await fetchJSON("admin/settings");
          if (mounted && data) setCfg((c) => ({ ...c, ...data }));
        } else {
          const local = JSON.parse(localStorage.getItem("portfolio_settings") || "null") || cfg;
          if (mounted) setCfg(local);
        }
      } catch {
        const local = JSON.parse(localStorage.getItem("portfolio_settings") || "null") || cfg;
        setCfg(local);
        setError("Could not reach /api/admin/settings — using local values.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mockMode]);

  useEffect(() => {
    localStorage.setItem("portfolio_settings", JSON.stringify(cfg));
  }, [cfg]);

  const save = async () => {
    setSaving(true); setError("");
    try {
      if (!mockMode) {
        await fetchJSON("admin/settings", { method: "PUT", body: JSON.stringify(cfg) });
      }
      setSavedTick(true); setTimeout(() => setSavedTick(false), 1200);
    } catch {
      setError("Save failed. API not reachable?");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center"><SettingsIcon className="h-6 w-6 mr-3" />Settings</CardTitle>
        <CardDescription>System configuration</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <Warn msg={error} />}
        {loading ? <Loading /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="siteTitle">Site Title</Label>
              <Input id="siteTitle" value={cfg.siteTitle} onChange={(e)=>onChange("siteTitle", e.target.value)} placeholder="My Portfolio" />
            </div>
            <div className="flex items-center gap-3">
              <Switch id="defaultDark" checked={cfg.defaultDark} onCheckedChange={(v)=>onChange("defaultDark", v)} />
              <Label htmlFor="defaultDark">Default to Dark Mode</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="mockMode" checked={mockMode} onCheckedChange={setMockMode} />
              <Label htmlFor="mockMode">Mock/Data Hybrid Mode</Label>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center gap-3">
        <Button onClick={save} disabled={loading || saving}>
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : (savedTick ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />)}
          Save Changes
        </Button>
        <Badge variant={mockMode ? "destructive" : "secondary"}>{mockMode ? "Mock/Data Hybrid" : "Live API"}</Badge>
      </CardFooter>
    </Card>
  );
}

/* ---------------------------------------------------------
   OVERVIEW (simple, pulls read-only metrics list)
--------------------------------------------------------- */
function OverviewManager({ mockMode }) {
  const defaults = [
    { id: uid(), label: "Total Projects", value: 6 },
    { id: uid(), label: "Blog Posts", value: 3 },
    { id: uid(), label: "Years Experience", value: 2 },
  ];
  const { items, loading, error } =
    useAdminList("overview", { mockMode, defaultValue: defaults });

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center"><LayoutDashboard className="h-6 w-6 mr-3" />Overview</CardTitle>
        <CardDescription>Dashboard overview and analytics</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <Warn msg={error} />}
        {loading ? <Loading /> : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {items.map((m) => (
              <div key={m.id} className="rounded-xl border p-4">
                <div className="text-sm text-muted-foreground">{m.label}</div>
                <div className="text-2xl font-semibold">{m.value}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {/* optional: edit inline later if needed */}
    </Card>
  );
}

/* ---------------------------------------------------------
   Shared tiny components
--------------------------------------------------------- */
const Warn = ({ msg }) => (
  <div className="flex items-center gap-2 text-amber-600 mb-4">
    <CloudOff className="h-4 w-4" />
    <p className="text-sm">{msg}</p>
  </div>
);

const Loading = () => (
  <div className="py-16 text-center">
    <Loader2 className="h-6 w-6 mx-auto animate-spin mb-3" />
    <p>Loading…</p>
  </div>
);

const Empty = () => (
  <div className="py-10 text-center text-muted-foreground">Nothing here yet.</div>
);

const Row = ({ title, subtitle, description, onEdit, onDelete }) => (
  <div className="rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center gap-3">
    <div className="flex-1">
      <div className="font-semibold">{title}</div>
      {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
      {description && <p className="text-sm mt-2">{description}</p>}
    </div>
    <div className="flex gap-2">
      <Button variant="secondary" size="sm" onClick={onEdit}><Pencil className="h-4 w-4 mr-1" />Edit</Button>
      <Button variant="destructive" size="sm" onClick={onDelete}><Trash className="h-4 w-4 mr-1" />Delete</Button>
    </div>
  </div>
);

function TopBar({ mockMode, onAdd }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm text-muted-foreground">{mockMode ? "Using local/mock data" : "Using live API"}</div>
      <Button onClick={onAdd} size="sm"><Plus className="h-4 w-4 mr-2" />Add</Button>
    </div>
  );
}

function Editor({ busy, fields, textField, extra, form, setForm, onChange, onSave, onCancel }) {
  return (
    <CardFooter className="flex-col items-stretch gap-4 border-t pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(([name,label]) => (
          <div key={name}>
            <Label htmlFor={name}>{label}</Label>
            <Input id={name} name={name} value={form?.[name] ?? ""} onChange={onChange} />
          </div>
        ))}
        {extra && <div className="md:col-span-2">{extra}</div>}
        {textField && (
          <div className="md:col-span-2">
            <Label htmlFor={textField[0]}>{textField[1]}</Label>
            <Textarea id={textField[0]} name={textField[0]} rows={textField[2] || 4}
              value={form?.[textField[0]] ?? ""} onChange={onChange} />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button onClick={onSave} disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Save
        </Button>
        <Button variant="ghost" onClick={onCancel} disabled={busy}>Cancel</Button>
      </div>
    </CardFooter>
  );
}

/* ---------------------------------------------------------
   PAGE
--------------------------------------------------------- */
export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");
  const { mockMode, setMockMode } = useHybrid(true);

  const ActiveView = useMemo(() => {
    switch (activeTab) {
      case "overview":   return <OverviewManager mockMode={mockMode} />;
      case "projects":   return <ProjectsManager mockMode={mockMode} />;
      case "blog":       return <BlogManager     mockMode={mockMode} />;
      case "skills":     return <SkillsManager   mockMode={mockMode} />;
      case "experience": return <ExperienceManager mockMode={mockMode} />;
      case "settings":   return <SettingsManager mockMode={mockMode} setMockMode={setMockMode} />;
      default:           return <OverviewManager mockMode={mockMode} />;
    }
  }, [activeTab, mockMode, setMockMode]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Admin</h1>
          <p className="text-muted-foreground">Manage your portfolio content and settings</p>
        </div>
        <Badge variant={mockMode ? "destructive" : "secondary"}>
          {mockMode ? "Mock/Data Hybrid" : "Live API"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar */}
        <Card className="h-fit">
          <CardHeader><CardTitle>Admin Sections</CardTitle></CardHeader>
          <CardContent className="p-0">
            <nav className="flex flex-col">
              {adminSections.map((s) => {
                const Icon = s.icon;
                const active = activeTab === s.id;
                return (
                  <button key={s.id} onClick={() => setActiveTab(s.id)}
                    className={`text-left px-4 py-3 border-t first:border-t-0 transition ${active ? "bg-muted" : "hover:bg-muted/60 hover:translate-x-0.5"}`}>
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 mt-0.5" />
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Main */}
        <div>{ActiveView}</div>
      </div>
    </div>
  );
}