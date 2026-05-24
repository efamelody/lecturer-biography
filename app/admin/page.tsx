'use client'

import { useState, useEffect, useCallback } from 'react'

const API_BASE = '/api/content'
const AUTH_HEADER = () => ({ Authorization: `Bearer ${sessionStorage.getItem('admin_pass')}` })

type TabId = 'profile' | 'research' | 'awards' | 'affiliations' | 'contact' | 'members' | 'selected-publications'

const TABS: { id: TabId; label: string }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'research', label: 'Research' },
  { id: 'awards', label: 'Awards' },
  { id: 'affiliations', label: 'Affiliations' },
  { id: 'contact', label: 'Contact' },
  { id: 'members', label: 'Members' },
  { id: 'selected-publications', label: 'Selected Pubs' },
]

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<TabId>('profile')

  useEffect(() => {
    if (sessionStorage.getItem('admin_pass')) {
      setAuthenticated(true)
    }
  }, [])

  const handleLogin = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        sessionStorage.setItem('admin_pass', password)
        setAuthenticated(true)
      } else {
        setError('Wrong password')
      }
    } catch {
      setError('Connection error')
    } finally {
      setLoading(false)
    }
  }, [password])

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('admin_pass')
    setAuthenticated(false)
    setPassword('')
  }, [])

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="bg-white p-8 rounded-lg border border-[#e2e8f0] shadow-sm w-full max-w-sm">
          <h1 className="text-2xl font-serif font-bold text-[#0f172a] mb-6 text-center">Admin Login</h1>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
          />
          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading || !password}
            className="w-full py-2.5 bg-[#0f172a] text-white text-sm font-medium rounded-lg hover:bg-[#1e293b] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Checking...' : 'Login'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <header className="bg-white border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-serif font-bold text-[#0f172a]">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <SeedButton />
          <button onClick={handleLogout} className="text-xs text-[#64748b] hover:text-[#0f172a] transition-colors">
            Logout
          </button>
        </div>
      </header>
      <div className="flex">
        <nav className="w-48 bg-white border-r border-[#e2e8f0] min-h-[calc(100vh-64px)] p-4 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#0f172a] text-white font-medium'
                  : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <main className="flex-1 p-8">
          <SectionEditor section={activeTab} />
        </main>
      </div>
    </div>
  )
}

function SeedButton() {
  const [seeding, setSeeding] = useState(false)
  const [message, setMessage] = useState('')

  const handleSeed = useCallback(async () => {
    if (!confirm('Load all data from JSON files into MongoDB? This will overwrite any existing data.')) return
    setSeeding(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...AUTH_HEADER() },
      })
      const data = await res.json()
      if (data.success) {
        const counts = Object.entries(data.results as Record<string, string>)
          .map(([k, v]) => `${k}: ${v}`).join(', ')
        setMessage(`Seeded: ${counts}`)
      } else {
        setMessage('Seed failed')
      }
    } catch {
      setMessage('Seed error')
    } finally {
      setSeeding(false)
    }
  }, [])

  return (
    <div className="flex items-center gap-2">
      {message && <span className="text-xs text-[#64748b] max-w-60 truncate">{message}</span>}
      <button
        onClick={handleSeed}
        disabled={seeding}
        className="text-xs px-3 py-1.5 bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg hover:bg-[#e2e8f0] disabled:opacity-50 transition-colors"
      >
        {seeding ? 'Seeding...' : 'Seed from JSON'}
      </button>
    </div>
  )
}

function SectionEditor({ section }: { section: TabId }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setLoading(true)
    setMessage('')
    fetch(`${API_BASE}/${section}`)
      .then((r) => r.json())
      .then((d) => setData(d ?? getDefaultData(section)))
      .catch(() => setData(getDefaultData(section)))
      .finally(() => setLoading(false))
  }, [section])

  const handleSave = useCallback(async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch(`${API_BASE}/${section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...AUTH_HEADER() },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setMessage('Saved successfully')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Save failed')
      }
    } catch {
      setMessage('Save error')
    } finally {
      setSaving(false)
    }
  }, [section, data])

  if (loading) return <p className="text-sm text-[#64748b]">Loading...</p>
  if (!data) return <p className="text-sm text-[#64748b]">No data</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-[#0f172a] capitalize">{section.replace('-', ' ')}</h2>
        <div className="flex items-center gap-3">
          {message && <span className="text-xs text-green-600">{message}</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-[#0f172a] text-white text-sm font-medium rounded-lg hover:bg-[#1e293b] disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      {section === 'profile' && <ProfileEditor data={data} setData={setData} />}
      {section === 'research' && <ArrayEditor data={data} setData={setData} fields={['icon', 'title', 'description']} />}
      {section === 'awards' && <ArrayEditor data={data} setData={setData} fields={['year', 'title', 'organization']} />}
      {section === 'affiliations' && <ArrayEditor data={data} setData={setData} fields={['icon', 'name', 'fullName', 'role']} />}
      {section === 'contact' && <ContactEditor data={data} setData={setData} />}
      {section === 'members' && <MembersEditor data={data} setData={setData} />}
      {section === 'selected-publications' && <ArrayEditor data={data} setData={setData} fields={['id', 'title', 'journal', 'year', 'authors']} />}
    </div>
  )
}

function getDefaultData(section: TabId): any {
  switch (section) {
    case 'profile':
      return { name: '', title: '', tagline: '', email: '', location: '', image: '/profile.jpg', roles: [], tags: [], bio: [], education: [] }
    case 'research':
      return []
    case 'awards':
      return []
    case 'affiliations':
      return []
    case 'contact':
      return { email: '', phone: '', address: { line1: '', line2: '', line3: '', line4: '', line5: '' }, profiles: [], officeHours: '', officeHoursNote: '' }
    case 'members':
      return []
    case 'selected-publications':
      return []
    default:
      return null
  }
}

function TextField({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-[#64748b] mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
        />
      )}
    </div>
  )
}

function ProfileEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const update = (key: string, value: any) => setData({ ...data, [key]: value })

  return (
    <div className="max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Name" value={data.name || ''} onChange={(v) => update('name', v)} />
        <TextField label="Title" value={data.title || ''} onChange={(v) => update('title', v)} />
      </div>
      <TextField label="Tagline" value={data.tagline || ''} onChange={(v) => update('tagline', v)} multiline />
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Email" value={data.email || ''} onChange={(v) => update('email', v)} />
        <TextField label="Location" value={data.location || ''} onChange={(v) => update('location', v)} />
      </div>
      <TextField label="Image path" value={data.image || ''} onChange={(v) => update('image', v)} />

      <h3 className="text-sm font-semibold text-[#0f172a] mt-6 mb-2">Roles</h3>
      <StringListEditor values={data.roles || []} onChange={(v) => update('roles', v)} />

      <h3 className="text-sm font-semibold text-[#0f172a] mt-6 mb-2">Tags / Keywords</h3>
      <StringListEditor values={data.tags || []} onChange={(v) => update('tags', v)} />

      <h3 className="text-sm font-semibold text-[#0f172a] mt-6 mb-2">Bio (one paragraph per line)</h3>
      <StringListEditor values={data.bio || []} onChange={(v) => update('bio', v)} multiline />

      <h3 className="text-sm font-semibold text-[#0f172a] mt-6 mb-2">Education</h3>
      <ArrayEditor
        data={data.education || []}
        setData={(v) => update('education', v)}
        fields={['degree', 'year', 'field', 'institution']}
      />
    </div>
  )
}

function StringListEditor({ values, onChange, multiline = false }: { values: string[]; onChange: (v: string[]) => void; multiline?: boolean }) {
  const [input, setInput] = useState('')

  const add = () => {
    if (!input.trim()) return
    onChange([...values, input.trim()])
    setInput('')
  }

  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-2 mb-4">
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          {multiline ? (
            <textarea
              value={v}
              onChange={(e) => {
                const next = [...values]
                next[i] = e.target.value
                onChange(next)
              }}
              rows={2}
              className="flex-1 px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 resize-y"
            />
          ) : (
            <input
              type="text"
              value={v}
              onChange={(e) => {
                const next = [...values]
                next[i] = e.target.value
                onChange(next)
              }}
              className="flex-1 px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
            />
          )}
          <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-xs px-2 py-1">Remove</button>
        </div>
      ))}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="Add new..."
          className="flex-1 px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
        />
        <button onClick={add} className="px-4 py-2 bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg text-sm hover:bg-[#e2e8f0] transition-colors">Add</button>
      </div>
    </div>
  )
}

function ArrayEditor({ data, setData, fields }: { data: any[]; setData: (d: any[]) => void; fields: string[] }) {
  const add = () => {
    const item: Record<string, string> = {}
    fields.forEach((f) => { item[f] = '' })
    setData([...data, item])
  }

  const remove = (i: number) => setData(data.filter((_, idx) => idx !== i))

  const updateItem = (i: number, field: string, value: string) => {
    const next = data.map((item, idx) => (idx === i ? { ...item, [field]: value } : item))
    setData(next)
  }

  return (
    <div className="space-y-4">
      {data.map((item, i) => (
        <div key={i} className="bg-white border border-[#e2e8f0] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#64748b]">Item {i + 1}</span>
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {fields.map((field) => (
              <div key={field}>
                <label className="block text-[10px] font-medium text-[#94a3b8] uppercase mb-1">{field}</label>
                <input
                  type="text"
                  value={item[field] ?? ''}
                  onChange={(e) => updateItem(i, field, e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="w-full py-3 border-2 border-dashed border-[#e2e8f0] rounded-lg text-sm text-[#64748b] hover:border-[#94a3b8] hover:text-[#0f172a] transition-colors"
      >
        + Add Item
      </button>
    </div>
  )
}

function ContactEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const update = (key: string, value: any) => setData({ ...data, [key]: value })
  const updateAddress = (key: string, value: string) => update('address', { ...data.address, [key]: value })

  return (
    <div className="max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Email" value={data.email || ''} onChange={(v) => update('email', v)} />
        <TextField label="Phone" value={data.phone || ''} onChange={(v) => update('phone', v)} />
      </div>

      <h3 className="text-sm font-semibold text-[#0f172a] mt-6 mb-2">Address</h3>
      {['line1', 'line2', 'line3', 'line4', 'line5'].map((line) => (
        <TextField key={line} label={line} value={data.address?.[line] || ''} onChange={(v) => updateAddress(line, v)} />
      ))}

      <h3 className="text-sm font-semibold text-[#0f172a] mt-6 mb-2">Online Profiles</h3>
      <ArrayEditor
        data={data.profiles || []}
        setData={(v) => update('profiles', v)}
        fields={['label', 'url']}
      />

      <TextField label="Office Hours" value={data.officeHours || ''} onChange={(v) => update('officeHours', v)} multiline />
      <TextField label="Office Hours Note" value={data.officeHoursNote || ''} onChange={(v) => update('officeHoursNote', v)} multiline />
    </div>
  )
}

function MembersEditor({ data, setData }: { data: any[]; setData: (d: any[]) => void }) {
  const add = () => {
    const maxId = data.reduce((max: number, m: any) => Math.max(max, m.id || 0), 0)
    setData([...data, { id: maxId + 1, name: '', role: '', affiliation: '', status: 'member', bio: '' }])
  }

  const remove = (i: number) => setData(data.filter((_, idx) => idx !== i))

  const updateItem = (i: number, field: string, value: string | number) => {
    const next = data.map((item, idx) => (idx === i ? { ...item, [field]: value } : item))
    setData(next)
  }

  return (
    <div className="space-y-4">
      {data.map((item, i) => (
        <div key={item.id ?? i} className="bg-white border border-[#e2e8f0] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#64748b]">Member {i + 1}</span>
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-medium text-[#94a3b8] uppercase mb-1">Name</label>
              <input type="text" value={item.name ?? ''} onChange={(e) => updateItem(i, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-[#94a3b8] uppercase mb-1">Role</label>
              <input type="text" value={item.role ?? ''} onChange={(e) => updateItem(i, 'role', e.target.value)}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-[#94a3b8] uppercase mb-1">Affiliation</label>
              <input type="text" value={item.affiliation ?? ''} onChange={(e) => updateItem(i, 'affiliation', e.target.value)}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-[#94a3b8] uppercase mb-1">Status</label>
              <select value={item.status ?? 'member'} onChange={(e) => updateItem(i, 'status', e.target.value)}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 bg-white">
                <option value="member">Member</option>
                <option value="alumni">Alumni</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] font-medium text-[#94a3b8] uppercase mb-1">Bio</label>
              <textarea value={item.bio ?? ''} onChange={(e) => updateItem(i, 'bio', e.target.value)} rows={2}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 resize-y" />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="w-full py-3 border-2 border-dashed border-[#e2e8f0] rounded-lg text-sm text-[#64748b] hover:border-[#94a3b8] hover:text-[#0f172a] transition-colors"
      >
        + Add Member
      </button>
    </div>
  )
}
