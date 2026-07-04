'use client'

import { useState, type FormEvent } from 'react'
import {
  Upload, CheckCircle, XCircle, Loader2, Lock, ImagePlus,
  FileText, Users, Trash2, RefreshCw, UserPlus, ShieldCheck, Pencil,
} from 'lucide-react'

const CATEGORIES = [
  { value: 'news-interview', label: 'News & TV Interview' },
  { value: 'newspaper', label: 'Newspaper & Op-Ed Column' },
  { value: 'conference', label: 'Conferences & Keynote Events' },
  { value: 'media-coverage', label: 'Media Coverage & Features' },
] as const

type Tab = 'media' | 'members'

interface MediaRow {
  _id: string
  title: string
  type: string
  outlet: string
  eventDate: string
  externalUrl?: string
  description?: string
  imageUrl: string
}

interface MemberRow {
  _id: string
  name: string
  role: string
  status: 'member' | 'alumni'
  researchTopic?: string
  biography?: string
  order?: number
  imageUrl?: string
}

function Input({ label, required, ...props }: { label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0f172a] mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        {...props}
        className="w-full px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#94a3b8]/30 focus:border-[#64748b] transition-colors"
      />
    </div>
  )
}

function Select({ label, required, children, ...props }: { label: string; required?: boolean; children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0f172a] mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <select
        {...props}
        className="w-full px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#94a3b8]/30 focus:border-[#64748b] transition-colors"
      >
        {children}
      </select>
    </div>
  )
}

function TextArea({ label, required, ...props }: { label: string; required?: boolean } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0f172a] mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <textarea
        {...props}
        className="w-full px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#94a3b8]/30 focus:border-[#64748b] transition-colors resize-y"
      />
    </div>
  )
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [gatePassword, setGatePassword] = useState('')
  const [gateStatus, setGateStatus] = useState<'idle' | 'checking' | 'error'>('idle')
  const [gateError, setGateError] = useState('')

  const [tab, setTab] = useState<Tab>('media')

  // Shared password state (synced after gate unlock)
  const [password, setPassword] = useState('')

  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  // Media form state
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<string>('news-interview')
  const [outlet, setOutlet] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [externalUrl, setExternalUrl] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)

  // Members form state
  const [mName, setMName] = useState('')
  const [mRole, setMRole] = useState('')
  const [mStatus, setMStatus] = useState<'member' | 'alumni'>('member')
  const [mResearch, setMResearch] = useState('')
  const [mBio, setMBio] = useState('')
  const [mOrder, setMOrder] = useState('')
  const [mFile, setMFile] = useState<File | null>(null)
  const [memberStatus, setMemberStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [memberMsg, setMemberMsg] = useState('')

  // Members table
  const [members, setMembers] = useState<MemberRow[]>([])
  const [loadingMembers, setLoadingMembers] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [membersLoaded, setMembersLoaded] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Media table
  const [mediaItems, setMediaItems] = useState<MediaRow[]>([])
  const [loadingMedia, setLoadingMedia] = useState(false)
  const [mediaLoaded, setMediaLoaded] = useState(false)
  const [mediaDeletingId, setMediaDeletingId] = useState<string | null>(null)
  const [mediaEditingId, setMediaEditingId] = useState<string | null>(null)

  const handleUnlock = async () => {
    if (!gatePassword) return
    setGateStatus('checking')
    setGateError('')

    try {
      const res = await fetch(`/api/admin/members?password=${encodeURIComponent(gatePassword)}`)
      if (!res.ok) {
        throw new Error('Incorrect password')
      }
      setPassword(gatePassword)
      setAuthenticated(true)
    } catch (err: unknown) {
      setGateStatus('error')
      setGateError(err instanceof Error ? err.message : 'Verification failed')
    }
  }

  const handleMediaSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('uploading')
    setMessage('Uploading & Saving...')

    const isEditing = !!mediaEditingId

    try {
      let imageUrl: string | undefined

      if (file) {
        const uploadForm = new FormData()
        uploadForm.append('file', file)
        uploadForm.append('password', password)

        const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: uploadForm })
        if (!uploadRes.ok) {
          const err = await uploadRes.json()
          throw new Error(err.error || 'Image upload failed')
        }
        const data = await uploadRes.json()
        imageUrl = data.url
      }

      if (!isEditing && !imageUrl) {
        throw new Error('Please select a photo')
      }

      const payload: Record<string, unknown> = {
        password, title, type: category, outlet, eventDate,
        externalUrl: externalUrl || undefined,
        description: description || undefined,
      }

      if (isEditing) {
        payload._id = mediaEditingId
        if (imageUrl) payload.imageUrl = imageUrl
      } else {
        payload.imageUrl = imageUrl
      }

      const saveRes = await fetch('/api/admin/update', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!saveRes.ok) {
        const err = await saveRes.json()
        throw new Error(err.error || 'Save failed')
      }

      setStatus('success')
      setMessage(isEditing ? 'Media entry updated!' : 'Media entry published successfully!')
      resetMediaForm()
      await loadMedia()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong'
      setStatus('error')
      setMessage(errorMessage)
    }
  }

  const loadMedia = async () => {
    if (!password) return
    setLoadingMedia(true)
    try {
      const res = await fetch(`/api/admin/update?password=${encodeURIComponent(password)}`)
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to load media')
      }
      const data = await res.json()
      setMediaItems(data.items)
      setMediaLoaded(true)
    } catch (err: unknown) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Failed to load media')
    } finally {
      setLoadingMedia(false)
    }
  }

  const resetMediaForm = () => {
    setTitle('')
    setCategory('news-interview')
    setOutlet('')
    setEventDate('')
    setExternalUrl('')
    setDescription('')
    setFile(null)
    setMediaEditingId(null)
  }

  const handleEditMedia = (item: MediaRow) => {
    setTitle(item.title)
    setCategory(item.type)
    setOutlet(item.outlet)
    setEventDate(item.eventDate)
    setExternalUrl(item.externalUrl || '')
    setDescription(item.description || '')
    setFile(null)
    setMediaEditingId(item._id)
    setStatus('idle')
    setMessage('')
  }

  const handleCancelEditMedia = () => {
    resetMediaForm()
  }

  const handleDeleteMedia = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    setMediaDeletingId(id)
    try {
      const res = await fetch(`/api/admin/update?password=${encodeURIComponent(password)}&id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to delete entry')
      }
      setMediaItems((prev) => prev.filter((item) => item._id !== id))
    } catch (err: unknown) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Failed to delete entry')
    } finally {
      setMediaDeletingId(null)
    }
  }

  const loadMembers = async () => {
    if (!password) return
    setLoadingMembers(true)
    try {
      const res = await fetch(`/api/admin/members?password=${encodeURIComponent(password)}`)
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to load members')
      }
      const data = await res.json()
      setMembers(data.members)
      setMembersLoaded(true)
    } catch (err: unknown) {
      setMemberStatus('error')
      setMemberMsg(err instanceof Error ? err.message : 'Failed to load members')
    } finally {
      setLoadingMembers(false)
    }
  }

  const resetMemberForm = () => {
    setMName('')
    setMRole('')
    setMStatus('member')
    setMResearch('')
    setMBio('')
    setMOrder('')
    setMFile(null)
    setEditingId(null)
  }

  const handleEdit = (member: MemberRow) => {
    setMName(member.name)
    setMRole(member.role)
    setMStatus(member.status)
    setMResearch(member.researchTopic || '')
    setMBio(member.biography || '')
    setMOrder(member.order !== undefined ? String(member.order) : '')
    setMFile(null)
    setEditingId(member._id)
    setMemberStatus('idle')
    setMemberMsg('')
  }

  const handleCancelEdit = () => {
    resetMemberForm()
  }

  const handleSaveMember = async (e: FormEvent) => {
    e.preventDefault()
    setMemberStatus('saving')
    setMemberMsg('Saving...')

    const isEditing = !!editingId

    try {
      let imageUrl: string | undefined

      if (mFile) {
        const uploadForm = new FormData()
        uploadForm.append('file', mFile)
        uploadForm.append('password', password)

        const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: uploadForm })
        if (!uploadRes.ok) {
          const err = await uploadRes.json()
          throw new Error(err.error || 'Photo upload failed')
        }
        const data = await uploadRes.json()
        imageUrl = data.url
      }

      const payload: Record<string, unknown> = {
        password,
        name: mName,
        role: mRole,
        status: mStatus,
        researchTopic: mResearch || undefined,
        biography: mBio || undefined,
        order: mOrder ? parseInt(mOrder, 10) : undefined,
      }

      if (isEditing) {
        payload._id = editingId
        if (mFile) payload.imageUrl = imageUrl
      } else {
        if (imageUrl) payload.imageUrl = imageUrl
      }

      const res = await fetch('/api/admin/members', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to save member')
      }

      setMemberStatus('success')
      setMemberMsg(isEditing ? 'Member updated successfully!' : 'Member added successfully!')
      resetMemberForm()
      await loadMembers()
    } catch (err: unknown) {
      setMemberStatus('error')
      setMemberMsg(err instanceof Error ? err.message : 'Failed to save member')
    }
  }

  const handleDeleteMember = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/members?password=${encodeURIComponent(password)}&id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to delete member')
      }
      setMembers((prev) => prev.filter((m) => m._id !== id))
    } catch (err: unknown) {
      setMemberStatus('error')
      setMemberMsg(err instanceof Error ? err.message : 'Failed to delete member')
    } finally {
      setDeletingId(null)
    }
  }

  // ── Password Gate ──────────────────────────────────────
  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="w-full max-w-sm mx-auto px-6">
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-[#0f172a] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#0f172a] tracking-tight mb-2">
              Administration
            </h1>
            <p className="text-sm text-[#64748b]">
              Enter the admin password to access the dashboard.
            </p>
          </div>

          {gateStatus === 'error' && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <XCircle size={18} />
              <span className="text-sm font-medium">{gateError}</span>
            </div>
          )}

          <form
            onSubmit={(e) => { e.preventDefault(); handleUnlock(); }}
            className="space-y-4"
          >
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
              <input
                type="password"
                value={gatePassword}
                onChange={(e) => setGatePassword(e.target.value)}
                placeholder="Admin password"
                autoFocus
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#94a3b8]/30 focus:border-[#64748b] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={gateStatus === 'checking' || !gatePassword}
              className="w-full bg-[#0f172a] text-white py-3 rounded-lg font-medium text-sm hover:bg-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {gateStatus === 'checking' ? (
                <><Loader2 size={16} className="animate-spin" /> Verifying...</>
              ) : (
                'Unlock Dashboard'
              )}
            </button>
          </form>
        </div>
      </main>
    )
  }

  // ── Dashboard ──────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#64748b] mb-3">
            Administration
          </p>
          <h1 className="text-4xl font-serif font-bold text-[#0f172a] tracking-tight">
            Dashboard
          </h1>
        </div>

        {/* Status */}
        {status !== 'idle' && status !== 'uploading' && (
          <div className={`flex items-center gap-2 px-4 py-3 rounded-lg mb-6 ${
            status === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {status === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
            <span className="text-sm font-medium">{message}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-[#f1f5f9] rounded-xl p-1 mb-8">
          <button
            onClick={() => setTab('media')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === 'media'
                ? 'bg-white text-[#0f172a] shadow-sm'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <FileText size={16} />
            Media
          </button>
          <button
            onClick={() => setTab('members')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === 'members'
                ? 'bg-white text-[#0f172a] shadow-sm'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <Users size={16} />
            Group Members
          </button>
        </div>

        {/* Media Tab */}
        {tab === 'media' && (
          <div className="space-y-8">
            {/* Media Form */}
            <form onSubmit={handleMediaSubmit} className="bg-white border border-[#e2e8f0] rounded-xl p-8 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {mediaEditingId ? <Pencil size={20} className="text-[#0f172a]" /> : <FileText size={20} className="text-[#0f172a]" />}
                  <h2 className="text-xl font-serif font-bold text-[#0f172a] tracking-tight">
                    {mediaEditingId ? 'Edit Entry' : 'New Media Entry'}
                  </h2>
                </div>
                {mediaEditingId && (
                  <button type="button" onClick={handleCancelEditMedia}
                    className="text-sm text-[#64748b] hover:text-[#0f172a] transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <Input label="Title / Event Name" required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Discussing Southeast Asian Haze on BBC" />

              <Select label="Category" required value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </Select>

              <Input label="Source / Publisher / Organizer" required type="text" value={outlet} onChange={(e) => setOutlet(e.target.value)} placeholder="e.g., BBC World News, The Star" />

              <Input label="Date" required type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />

              <Input label="Reference URL" type="url" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} placeholder="Paste LinkedIn or Facebook post URL" />

              <TextArea label="Brief Summary / Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Brief description of the event or article..." />

              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1.5">
                  Photo {mediaEditingId ? <span className="text-[#94a3b8] font-normal">(leave empty to keep current)</span> : <span className="text-red-400 ml-0.5">*</span>}
                </label>
                <label htmlFor="photo-upload" className="border-2 border-dashed border-[#e2e8f0] rounded-lg p-6 text-center hover:border-[#94a3b8] transition-colors cursor-pointer block">
                  <input id="photo-upload" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="hidden" />
                  {file ? (
                    <div className="flex items-center justify-center gap-2 text-[#0f172a]">
                      <ImagePlus size={20} />
                      <span className="text-sm font-medium truncate max-w-xs">{file.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[#94a3b8]">
                      <Upload size={24} />
                      <span className="text-sm">Click to upload a photo</span>
                    </div>
                  )}
                </label>
              </div>

              <button type="submit" disabled={status === 'uploading'}
                className="w-full bg-[#0f172a] text-white py-3 rounded-lg font-medium text-sm hover:bg-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {status === 'uploading' ? (
                  <><Loader2 size={16} className="animate-spin" /> Uploading & Saving...</>
                ) : mediaEditingId ? 'Save Changes' : 'Publish Media Entry'}
              </button>
            </form>

            {/* Media Table */}
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-bold text-[#0f172a] tracking-tight">
                  Existing Entries
                  {mediaLoaded && (
                    <span className="text-xs font-sans font-normal text-[#64748b] ml-2">
                      ({mediaItems.length})
                    </span>
                  )}
                </h2>
                <button
                  onClick={loadMedia}
                  disabled={loadingMedia}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#475569] hover:text-[#0f172a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw size={14} className={loadingMedia ? 'animate-spin' : ''} />
                  {loadingMedia ? 'Loading...' : mediaLoaded ? 'Refresh' : 'Load Entries'}
                </button>
              </div>

              {!mediaLoaded && (
                <p className="text-sm text-[#94a3b8] text-center py-8">
                  Click &quot;Load Entries&quot; to view existing items.
                </p>
              )}

              {mediaLoaded && mediaItems.length === 0 && (
                <p className="text-sm text-[#94a3b8] text-center py-8">
                  No entries yet. Add one above.
                </p>
              )}

              {mediaItems.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#e2e8f0]">
                        <th className="text-left font-medium text-[#64748b] pb-3 pr-4">Title</th>
                        <th className="text-left font-medium text-[#64748b] pb-3 pr-4">Source</th>
                        <th className="text-left font-medium text-[#64748b] pb-3 pr-4">Date</th>
                        <th className="text-right font-medium text-[#64748b] pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mediaItems.map((item) => (
                        <tr key={item._id} className="border-b border-[#f1f5f9] last:border-0">
                          <td className="py-3 pr-4 text-[#0f172a] font-medium max-w-[200px] truncate">{item.title}</td>
                          <td className="py-3 pr-4 text-[#475569]">{item.outlet}</td>
                          <td className="py-3 pr-4 text-[#64748b] text-xs">{item.eventDate}</td>
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEditMedia(item)}
                                className="text-[#64748b] hover:text-[#0f172a] transition-colors"
                                title={`Edit ${item.title}`}
                              >
                                <Pencil size={15} />
                              </button>
                              <span className="text-[#e2e8f0]">|</span>
                              <button
                                onClick={() => handleDeleteMedia(item._id, item.title)}
                                disabled={mediaDeletingId === item._id}
                                className="text-red-400 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title={`Delete ${item.title}`}
                              >
                                {mediaDeletingId === item._id
                                  ? <Loader2 size={16} className="animate-spin" />
                                  : <Trash2 size={16} />
                                }
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Members Tab */}
        {tab === 'members' && (
          <div className="space-y-8">
            {/* Add Member Form */}
            <form onSubmit={handleSaveMember} className="bg-white border border-[#e2e8f0] rounded-xl p-8 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {editingId ? <Pencil size={20} className="text-[#0f172a]" /> : <UserPlus size={20} className="text-[#0f172a]" />}
                  <h2 className="text-xl font-serif font-bold text-[#0f172a] tracking-tight">
                    {editingId ? 'Edit Member' : 'Add Member'}
                  </h2>
                </div>
                {editingId && (
                  <button type="button" onClick={handleCancelEdit}
                    className="text-sm text-[#64748b] hover:text-[#0f172a] transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {memberStatus !== 'idle' && (
                <div className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
                  memberStatus === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                    : memberStatus === 'error'
                    ? 'bg-red-50 border border-red-200 text-red-700'
                    : 'bg-blue-50 border border-blue-200 text-blue-700'
                }`}>
                  {memberStatus === 'success' ? <CheckCircle size={18} /> : memberStatus === 'error' ? <XCircle size={18} /> : <Loader2 size={18} className="animate-spin" />}
                  <span className="text-sm font-medium">{memberMsg}</span>
                </div>
              )}

              <Input label="Full Name" required type="text" value={mName} onChange={(e) => setMName(e.target.value)} placeholder="e.g., John Doe" />

              <Input label="Role / Position" required type="text" value={mRole} onChange={(e) => setMRole(e.target.value)} placeholder="e.g., PhD Candidate, Research Assistant" />

              <Select label="Status" required value={mStatus} onChange={(e) => setMStatus(e.target.value as 'member' | 'alumni')}>
                <option value="member">Current Member</option>
                <option value="alumni">Alumni</option>
              </Select>

              <TextArea label="Research Topic / Project Title" value={mResearch} onChange={(e) => setMResearch(e.target.value)} rows={3} placeholder="Brief description of their research work..." />

              <TextArea label="Short Biography" value={mBio} onChange={(e) => setMBio(e.target.value)} rows={3} placeholder="Optional biography..." />

              <Input label="Display Order" type="number" value={mOrder} onChange={(e) => setMOrder(e.target.value)} placeholder="e.g., 1, 2, 3" />

              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1.5">
                  Photo <span className="text-[#94a3b8] font-normal">(optional)</span>
                </label>
                <label htmlFor="member-photo-upload" className="border-2 border-dashed border-[#e2e8f0] rounded-lg p-6 text-center hover:border-[#94a3b8] transition-colors cursor-pointer block">
                  <input id="member-photo-upload" type="file" accept="image/*" onChange={(e) => setMFile(e.target.files?.[0] ?? null)} className="hidden" />
                  {mFile ? (
                    <div className="flex items-center justify-center gap-2 text-[#0f172a]">
                      <ImagePlus size={20} />
                      <span className="text-sm font-medium truncate max-w-xs">{mFile.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[#94a3b8]">
                      <Upload size={24} />
                      <span className="text-sm">Click to upload a photo</span>
                    </div>
                  )}
                </label>
              </div>

              <button type="submit" disabled={memberStatus === 'saving'}
                className="w-full bg-[#0f172a] text-white py-3 rounded-lg font-medium text-sm hover:bg-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {memberStatus === 'saving' ? (
                  <><Loader2 size={16} className="animate-spin" /> Saving...</>
                ) : editingId ? 'Save Changes' : 'Add Member'}
              </button>
            </form>

            {/* Members Table */}
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-bold text-[#0f172a] tracking-tight">
                  Existing Members
                  {membersLoaded && (
                    <span className="text-xs font-sans font-normal text-[#64748b] ml-2">
                      ({members.length})
                    </span>
                  )}
                </h2>
                <button
                  onClick={loadMembers}
                  disabled={loadingMembers}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#475569] hover:text-[#0f172a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw size={14} className={loadingMembers ? 'animate-spin' : ''} />
                  {loadingMembers ? 'Loading...' : membersLoaded ? 'Refresh' : 'Load Members'}
                </button>
              </div>

              {!membersLoaded && (
                <p className="text-sm text-[#94a3b8] text-center py-8">
                  Click &quot;Load Members&quot; to view existing entries.
                </p>
              )}

              {membersLoaded && members.length === 0 && (
                <p className="text-sm text-[#94a3b8] text-center py-8">
                  No members yet. Add one above.
                </p>
              )}

              {members.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#e2e8f0]">
                        <th className="text-left font-medium text-[#64748b] pb-3 pr-4">Name</th>
                        <th className="text-left font-medium text-[#64748b] pb-3 pr-4">Role</th>
                        <th className="text-left font-medium text-[#64748b] pb-3 pr-4">Status</th>
                        <th className="text-left font-medium text-[#64748b] pb-3 pr-4">Order</th>
                        <th className="text-right font-medium text-[#64748b] pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((m) => (
                        <tr key={m._id} className="border-b border-[#f1f5f9] last:border-0">
                          <td className="py-3 pr-4 text-[#0f172a] font-medium">{m.name}</td>
                          <td className="py-3 pr-4 text-[#475569]">{m.role}</td>
                          <td className="py-3 pr-4">
                            <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                              m.status === 'member'
                                ? 'bg-blue-50 text-blue-600'
                                : 'bg-[#f1f5f9] text-[#64748b]'
                            }`}>
                              {m.status === 'member' ? 'Current' : 'Alumni'}
                            </span>
                          </td>
                          <td className="py-3 pr-4 text-[#64748b] text-xs">{m.order ?? '—'}</td>
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEdit(m)}
                                className="text-[#64748b] hover:text-[#0f172a] transition-colors"
                                title={`Edit ${m.name}`}
                              >
                                <Pencil size={15} />
                              </button>
                              <span className="text-[#e2e8f0]">|</span>
                              <button
                                onClick={() => handleDeleteMember(m._id, m.name)}
                                disabled={deletingId === m._id}
                                className="text-red-400 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title={`Delete ${m.name}`}
                              >
                                {deletingId === m._id
                                  ? <Loader2 size={16} className="animate-spin" />
                                  : <Trash2 size={16} />
                                }
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
