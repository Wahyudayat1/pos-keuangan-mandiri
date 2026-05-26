import React, { useState, useEffect } from 'react'

// --- ZERO-DEPENDENCY INLINE SVG ICONS (Anti-Crash, Safe & Standard) ---
const IconWallet = ({ className = "h-5 w-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
    <path d="M16 14h2" />
  </svg>
)

const IconPiggy = ({ className = "h-5 w-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 5c-1.5 0-2.8 1.4-3 2-2.5-1.7-5.5-1.7-8 0C7.8 6.4 6.5 5 5 5c-2.8 0-5 2.2-5 5 0 3.2 2.2 7.2 5 9h14c2.8-1.8 5-5.8 5-9 0-2.8-2.2-5-5-5Z" />
    <path d="M12 14v4" />
    <path d="M10 18h4" />
    <circle cx="7" cy="11" r="1" />
  </svg>
)

const IconPlus = ({ className = "h-4 w-4" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5v14" />
  </svg>
)

const IconSparkles = ({ className = "h-5 w-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
)

const IconAlert = ({ className = "h-5 w-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" x2="12" y1="9" y2="13" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </svg>
)

const IconTrash = ({ className = "h-4 w-4" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
)

const IconX = ({ className = "h-4 w-4" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
)

// --- Color Scheme Map for Dynamic Cards ---
const COLOR_SCHEMES = {
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20 border',
    text: 'text-rose-400',
    hoverBorder: 'hover:border-rose-500/40',
    btnBg: 'bg-rose-600 hover:bg-rose-500 text-white',
    focusBorder: 'focus:border-rose-500',
    badge: 'bg-rose-950/40 text-rose-450 border-rose-900/40',
    bar: 'bg-rose-500'
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20 border',
    text: 'text-amber-400',
    hoverBorder: 'hover:border-amber-500/40',
    btnBg: 'bg-amber-600 hover:bg-amber-500 text-white',
    focusBorder: 'focus:border-amber-500',
    badge: 'bg-amber-950/40 text-amber-450 border-amber-900/40',
    bar: 'bg-amber-500'
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 border',
    text: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/40',
    btnBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    focusBorder: 'focus:border-emerald-500',
    badge: 'bg-emerald-950/40 text-emerald-450 border-emerald-900/40',
    bar: 'bg-emerald-500'
  },
  sky: {
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20 border',
    text: 'text-sky-400',
    hoverBorder: 'hover:border-sky-500/40',
    btnBg: 'bg-sky-600 hover:bg-sky-500 text-white',
    focusBorder: 'focus:border-sky-500',
    badge: 'bg-sky-950/40 text-sky-450 border-sky-900/40',
    bar: 'bg-sky-500'
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20 border',
    text: 'text-violet-400',
    hoverBorder: 'hover:border-violet-500/40',
    btnBg: 'bg-violet-600 hover:bg-violet-500 text-white',
    focusBorder: 'focus:border-violet-500',
    badge: 'bg-violet-950/40 text-violet-450 border-violet-900/40',
    bar: 'bg-violet-500'
  },
  fuchsia: {
    bg: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-500/20 border',
    text: 'text-fuchsia-400',
    hoverBorder: 'hover:border-fuchsia-500/40',
    btnBg: 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white',
    focusBorder: 'focus:border-fuchsia-500',
    badge: 'bg-fuchsia-950/40 text-fuchsia-450 border-fuchsia-900/40',
    bar: 'bg-fuchsia-500'
  }
}

// --- Helper: Format Angka Ribuan dengan Titik (Auto-Format Rupiah saat mengetik) ---
const formatRibuanString = (strVal) => {
  if (!strVal) return ''
  const cleaned = strVal.toString().replace(/\D/g, '')
  if (!cleaned) return ''
  const numVal = parseInt(cleaned, 10)
  return numVal.toLocaleString('id-ID')
}

// Helper: Ubah String Berformat ke Angka Murni
const parseFormattedToNumber = (strVal) => {
  if (!strVal) return 0
  const cleaned = strVal.toString().replace(/\D/g, '')
  return parseInt(cleaned, 10) || 0
}

// Helper: Format Tampilan Rupiah Lengkap
const formatRupiah = (val) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(val || 0)
}

// --- 5 Pos Bawaan (Default Pos List) beserta Transaksi Dummy Realistik ---
const DEFAULT_POS_LIST = [
  {
    id: 'pos-makan',
    name: 'Makan & Minum',
    emoji: '🍚',
    color: 'rose',
    totalSpent: 350000,
    history: [
      { id: 'mk-1', amount: 150000, note: 'Belanja Sembako & Beras Bulanan', timestamp: '25 Mei, 11:20' },
      { id: 'mk-2', amount: 200000, note: 'Makan Warteg Mingguan', timestamp: '23 Mei, 18:45' }
    ]
  },
  {
    id: 'pos-belanja',
    name: 'Belanja Pribadi',
    emoji: '🛍️',
    color: 'amber',
    totalSpent: 150000,
    history: [
      { id: 'bl-1', amount: 150000, note: 'Checkout Kaos Katun Polos', timestamp: '24 Mei, 16:30' }
    ]
  },
  {
    id: 'pos-keluarga',
    name: 'Keluarga & Orang Tua',
    emoji: '🏠',
    color: 'emerald',
    totalSpent: 200000,
    history: [
      { id: 'kl-1', amount: 200000, note: 'Kirim bulanan untuk Mama', timestamp: '25 Mei, 10:00' }
    ]
  },
  {
    id: 'pos-kendaraan',
    name: 'Kendaraan & Transport',
    emoji: '🛵',
    color: 'sky',
    totalSpent: 80000,
    history: [
      { id: 'kd-1', amount: 50000, note: 'Pertalite motor seminggu', timestamp: '23 Mei, 08:15' },
      { id: 'kd-2', amount: 30000, note: 'Servis busi & ganti oli', timestamp: '22 Mei, 15:40' }
    ]
  },
  {
    id: 'pos-tagihan',
    name: 'Tagihan & Cicilan',
    emoji: '💳',
    color: 'violet',
    totalSpent: 120000,
    history: [
      { id: 'tg-1', amount: 120000, note: 'Paket Internet Kuota Bulanan', timestamp: '21 Mei, 19:20' }
    ]
  }
]

const DUMMY_NABUNG = [
  { id: 'nb-1', amount: 500000, note: 'Beli Reksa Dana Obligasi', timestamp: '26 Mei, 14:00' },
  { id: 'nb-2', amount: 300000, note: 'Celengan Fisik Emas', timestamp: '24 Mei, 09:30' }
]

export default function App() {
  // State 1: Total Pemasukan Utama
  const [totalPemasukan, setTotalPemasukan] = useState(() => {
    try {
      const saved = localStorage.getItem('apk_pemasukan')
      return saved !== null ? parseInt(saved, 10) : 2500000
    } catch (e) {
      return 2500000
    }
  })

  // State 2: Uang Nabung
  const [totalNabung, setTotalNabung] = useState(() => {
    try {
      const saved = localStorage.getItem('apk_nabung_total')
      return saved !== null ? parseInt(saved, 10) : 800000
    } catch (e) {
      return 800000
    }
  })

  // State 3: Riwayat Tabungan
  const [nabungHistory, setNabungHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('apk_nabung_history')
      return saved !== null ? JSON.parse(saved) : DUMMY_NABUNG
    } catch (e) {
      return []
    }
  })

  // State 4: DAFTAR POS PENGELUARAN (Dinamis / Multiple Pos)
  const [posList, setPosList] = useState(() => {
    try {
      const saved = localStorage.getItem('apk_pos_list')
      return saved !== null ? JSON.parse(saved) : DEFAULT_POS_LIST
    } catch (e) {
      return DEFAULT_POS_LIST
    }
  })

  // --- State Form input utama ---
  const [inputPemasukan, setInputPemasukan] = useState('')
  const [inputNabungAmount, setInputNabungAmount] = useState('')
  const [inputNabungNote, setInputNabungNote] = useState('')

  // State form penambahan pos kustom baru
  const [newPosName, setNewPosName] = useState('')
  const [newPosEmoji, setNewPosEmoji] = useState('🍿')
  const [newPosColor, setNewPosColor] = useState('rose')
  const [showCustomPosForm, setShowCustomPosForm] = useState(false)

  // State Notification Toast
  const [toast, setToast] = useState(null)

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('apk_pemasukan', totalPemasukan.toString())
      localStorage.setItem('apk_nabung_total', totalNabung.toString())
      localStorage.setItem('apk_nabung_history', JSON.stringify(nabungHistory))
      localStorage.setItem('apk_pos_list', JSON.stringify(posList))
    } catch (e) {}
  }, [totalPemasukan, totalNabung, nabungHistory, posList])

  // Trigger Toast Notification Helper
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // --- LOGIKA MATEMATIKA SALDO REAL-TIME ---
  const totalPengeluaranSemuaPos = posList.reduce((acc, curr) => acc + (curr.totalSpent || 0), 0)
  const sisaSaldoUtama = totalPemasukan - (totalNabung + totalPengeluaranSemuaPos)

  // --- ACTIONS ---

  // 1. Tambah Pemasukan Baru
  const handleAddPemasukan = (e) => {
    e.preventDefault()
    const rawVal = parseFormattedToNumber(inputPemasukan)

    if (rawVal <= 0) {
      triggerToast('Masukkan nominal pemasukan yang valid!', 'error')
      return
    }

    setTotalPemasukan(prev => prev + rawVal)
    setInputPemasukan('')
    triggerToast(`Sukses menambah Pemasukan sebesar +${formatRupiah(rawVal)}`)
  }

  // 2. Setel Uang Pemasukan Kembali ke 0
  const handleResetPemasukan = () => {
    if (window.confirm('Reset pemasukan akan menyetel total pemasukan Anda kembali ke Rp 0. Lanjutkan?')) {
      setTotalPemasukan(0)
      triggerToast('Total pemasukan diubah menjadi Rp 0', 'error')
    }
  }

  // 3. Tambah Alokasi Tabungan
  const handleAddNabung = (e) => {
    e.preventDefault()
    const amount = parseFormattedToNumber(inputNabungAmount)
    const noteText = inputNabungNote.trim() || 'Alokasi Tabungan Pintar'

    if (amount <= 0) {
      triggerToast('Masukkan nominal tabungan yang valid!', 'error')
      return
    }

    // VALIDASI MATEMATIKA SALDO: Tidak boleh melebihi Sisa Saldo Utama
    if (amount > sisaSaldoUtama) {
      triggerToast(`🚨 Over-Budget! Sisa saldo utama tidak cukup untuk menabung ${formatRupiah(amount)}`, 'error')
      return
    }

    const newTx = {
      id: `nb-${Date.now()}`,
      amount,
      note: noteText,
      timestamp: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
    }

    setTotalNabung(prev => prev + amount)
    setNabungHistory(prev => [newTx, ...prev])
    
    // Reset Form
    setInputNabungAmount('')
    setInputNabungNote('')
    triggerToast(`Sukses mengalokasikan ${formatRupiah(amount)} untuk Tabungan!`)
  }

  // 4. Hapus Alokasi Nabung (Refund ke Sisa Saldo Utama)
  const handleDeleteNabung = (tx) => {
    if (window.confirm(`Hapus alokasi tabungan "${tx.note}"?\nSaldo sebesar ${formatRupiah(tx.amount)} akan dikembalikan ke Sisa Saldo Utama.`)) {
      setTotalNabung(prev => Math.max(0, prev - tx.amount))
      setNabungHistory(prev => prev.filter(item => item.id !== tx.id))
      triggerToast('Alokasi tabungan dihapus, saldo dikembalikan.')
    }
  }

  // 5. Tambah Pengeluaran di Pos Tertentu (Callback dari Sub-Komponen)
  const handleAddPosTransaction = (posId, amount, noteText) => {
    if (amount <= 0) {
      triggerToast('Masukkan nominal pengeluaran yang valid!', 'error')
      return
    }

    // VALIDASI MATEMATIKA SALDO UTAMA
    if (amount > sisaSaldoUtama) {
      triggerToast(`🚨 Over-Budget! Sisa saldo utama tidak cukup untuk pengeluaran sebesar ${formatRupiah(amount)}`, 'error')
      return
    }

    const timestampStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
    const newTx = {
      id: `tx-${Date.now()}`,
      amount,
      note: noteText || 'Pengeluaran Pos',
      timestamp: timestampStr
    }

    setPosList(prevList => prevList.map(pos => {
      if (pos.id === posId) {
        return {
          ...pos,
          totalSpent: (pos.totalSpent || 0) + amount,
          history: [newTx, ...(pos.history || [])]
        }
      }
      return pos
    }))

    const posTarget = posList.find(p => p.id === posId)
    triggerToast(`Sukses mencatat ${formatRupiah(amount)} pada ${posTarget?.name || 'Pos'}`)
  }

  // 6. Hapus Pengeluaran di Pos Tertentu (Refund ke Sisa Saldo Utama)
  const handleDeletePosTransaction = (posId, tx) => {
    if (window.confirm(`Hapus pengeluaran "${tx.note}"?\nDana sebesar ${formatRupiah(tx.amount)} akan dikembalikan ke Sisa Saldo Utama.`)) {
      setPosList(prevList => prevList.map(pos => {
        if (pos.id === posId) {
          return {
            ...pos,
            totalSpent: Math.max(0, (pos.totalSpent || 0) - tx.amount),
            history: (pos.history || []).filter(item => item.id !== tx.id)
          }
        }
        return pos
      }))
      triggerToast('Pengeluaran dihapus, dana dikembalikan.')
    }
  }

  // 7. Tambah Pos Kustom Baru
  const handleCreateCustomPos = (e) => {
    e.preventDefault()
    const name = newPosName.trim()

    if (!name) {
      triggerToast('Nama pos kebutuhan tidak boleh kosong!', 'error')
      return
    }

    // Periksa jika nama pos sudah ada
    const nameExists = posList.some(pos => pos.name.toLowerCase() === name.toLowerCase())
    if (nameExists) {
      triggerToast('Pos kebutuhan dengan nama ini sudah terdaftar!', 'error')
      return
    }

    const newCustomPos = {
      id: `pos-custom-${Date.now()}`,
      name,
      emoji: newPosEmoji,
      color: newPosColor,
      totalSpent: 0,
      history: []
    }

    setPosList(prev => [...prev, newCustomPos])
    setNewPosName('')
    setShowCustomPosForm(false)
    triggerToast(`Pos Kebutuhan "${name}" berhasil ditambahkan!`)
  }

  // 8. Hapus Pos Kustom Pilihan Pengguna (Refund seluruh saldonya jika ada)
  const handleDeleteCustomPos = (posId, name, totalSpent) => {
    const confirmMessage = totalSpent > 0 
      ? `Hapus pos "${name}"? Seluruh pengeluaran yang teralokasi (${formatRupiah(totalSpent)}) akan dikembalikan ke Sisa Saldo Utama.`
      : `Hapus pos kebutuhan "${name}"?`

    if (window.confirm(confirmMessage)) {
      setPosList(prev => prev.filter(pos => pos.id !== posId))
      triggerToast(`Pos Kebutuhan "${name}" berhasil dihapus.`)
    }
  }

  // 9. Reset Seluruh Aplikasi dari Nol
  const handleResetSemua = () => {
    if (window.confirm('🚨 PERINGATAN! Anda yakin ingin menghapus seluruh data dan memulai dari nol kembali?')) {
      setTotalPemasukan(0)
      setTotalNabung(0)
      setNabungHistory([])
      setPosList(DEFAULT_POS_LIST)
      triggerToast('Seluruh data berhasil disetel ulang!', 'error')
    }
  }

  // --- CALC PERCENTAGES FOR DYNAMIC STACKED CHART ---
  const pctSisa = totalPemasukan > 0 ? Math.max(0, Math.min(100, (sisaSaldoUtama / totalPemasukan) * 100)) : 0
  const pctNabung = totalPemasukan > 0 ? Math.max(0, Math.min(100, (totalNabung / totalPemasukan) * 100)) : 0
  const pctSemuaPos = totalPemasukan > 0 ? Math.max(0, Math.min(100, (totalPengeluaranSemuaPos / totalPemasukan) * 100)) : 0

  // Warning Level Border & Glow Styles
  let safetyBorder = 'border-slate-800'
  let safetyGlow = 'glow-emerald'
  let safetyLabel = 'Keuangan Aman 🍀'
  let safetyDesc = 'Dana Anda teralokasi dengan proporsional dan sisa saldo masih sangat mencukupi kebutuhan.'

  if (sisaSaldoUtama < 100000 && totalPemasukan > 0) {
    safetyBorder = 'border-rose-800/80'
    safetyGlow = 'glow-rose'
    safetyLabel = 'Kritis / Menipis 🚨'
    safetyDesc = 'Sisa Saldo Utama Anda hampir habis. Kurangi pengeluaran baru hingga pemasukan berikutnya.'
  } else if (sisaSaldoUtama < 500000 && totalPemasukan > 0) {
    safetyBorder = 'border-amber-800/60'
    safetyGlow = 'glow-indigo'
    safetyLabel = 'Perlu Hemat ⚠️'
    safetyDesc = 'Sisa saldo tersisa kurang dari Rp 500.000. Batasi pengeluaran non-primer Anda.'
  }

  // Emoji options for custom pos form
  const emojiOptions = ['🍿', '🎮', '🏥', '📚', '🧸', '✈️', '🎁', '💇', '🍕', '🍻']
  const colorOptions = ['rose', 'amber', 'emerald', 'sky', 'violet', 'fuchsia']

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans antialiased pb-16 pt-6 px-4 selection:bg-emerald-500 selection:text-white">
      
      {/* Background glowing rings */}
      <div className="fixed top-[-10%] left-[-15%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-15%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none z-0"></div>

      {/* CSS Styles for smoother micro-interactions */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInSlide {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadein {
          animation: fadeInSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .glass-card {
          background: rgba(30, 41, 59, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glow-emerald {
          box-shadow: 0 0 30px -5px rgba(16, 185, 129, 0.18);
        }
        .glow-rose {
          box-shadow: 0 0 30px -5px rgba(244, 63, 94, 0.18);
        }
        .glow-indigo {
          box-shadow: 0 0 30px -5px rgba(245, 158, 11, 0.18);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
      `}} />

      {/* Global Dynamic Notification Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 ${
          toast.type === 'error'
            ? 'bg-rose-950/95 border-rose-800 text-rose-300'
            : 'bg-emerald-950/95 border-emerald-800 text-emerald-300'
        }`}>
          {toast.type === 'error' ? <IconAlert className="h-5 w-5 shrink-0" /> : <IconSparkles className="h-5 w-5 shrink-0" />}
          <span className="text-xs font-bold tracking-wide">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-1 hover:opacity-75 focus:outline-none">
            <IconX className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* CENTRALIZED WRAPPER CONTAINER (MOBILE-FIRST VIEWPORT) */}
      <div className="w-full max-w-md mx-auto relative z-10 animate-fadein">
        
        {/* PREMIUM STATUS BAR & HEADER */}
        <header className="flex justify-between items-center mb-6 px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              💼
            </div>
            <div>
              <h1 className="text-sm font-extrabold tracking-tight text-white leading-none">Pos Keuangan Mandiri</h1>
              <span className="text-[9px] font-black text-slate-450 uppercase tracking-widest block mt-1">Sistem Alokasi Multi-Pos</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetSemua}
              className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50 text-slate-400 hover:text-rose-450 transition-colors"
              title="Reset Semua Data"
            >
              <IconTrash className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* 1. DYNAMIC SUMMARY DASHBOARD */}
        <section className={`glass-card rounded-2xl p-5 mb-5 border ${safetyBorder} ${safetyGlow}`}>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Dashboard Ringkasan</span>
            <span className={`text-[9px] font-black border px-2 py-0.5 rounded-full uppercase tracking-wider ${
              sisaSaldoUtama <= 100000 && totalPemasukan > 0 
                ? 'text-rose-400 bg-rose-950/40 border-rose-900/40' 
                : sisaSaldoUtama <= 500000 && totalPemasukan > 0
                ? 'text-amber-400 bg-amber-950/40 border-amber-900/40'
                : 'text-emerald-400 bg-emerald-950/40 border-emerald-900/40'
            }`}>
              {safetyLabel}
            </span>
          </div>

          {/* Core balances */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-950/35 border border-slate-850/80 rounded-xl p-3.5">
              <span className="text-[9px] text-slate-450 uppercase block mb-1 font-bold">Total Pemasukan</span>
              <h3 className="text-base font-black text-white truncate">{formatRupiah(totalPemasukan)}</h3>
            </div>
            <div className="bg-slate-950/50 border border-emerald-900/20 rounded-xl p-3.5">
              <span className="text-[9px] text-emerald-450 uppercase block mb-1 font-bold">Sisa Saldo Utama</span>
              <h3 className={`text-base font-black truncate ${sisaSaldoUtama <= 100000 && totalPemasukan > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {formatRupiah(sisaSaldoUtama)}
              </h3>
            </div>
          </div>

          {totalPemasukan > 0 && (
            <p className="text-[10px] text-slate-450 leading-relaxed italic bg-slate-900/20 p-2.5 rounded-lg border border-slate-850/40 text-center">
              "{safetyDesc}"
            </p>
          )}
        </section>

        {/* 2. DYNAMIC STACKED PROGRESS GRAPH & ALLOCATION RATIOS */}
        <section className="glass-card rounded-2xl p-5 mb-5 border border-slate-800">
          <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <span className="p-0.5 bg-slate-850 rounded text-xs">📊</span>
            <span>Grafik Distribusi Dana</span>
          </h3>

          {totalPemasukan === 0 ? (
            <div className="py-6 text-center text-slate-500 text-xs italic bg-slate-950/20 rounded-xl border border-slate-850/50">
              Masukkan total pemasukan terlebih dahulu untuk mengaktifkan grafik kontribusi.
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Stacked Progress Bar */}
              <div className="w-full bg-slate-950/80 h-5 rounded-full p-0.5 overflow-hidden flex border border-slate-850">
                {/* Sisa Saldo Utama (Emerald) */}
                {pctSisa > 0 && (
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-l-full transition-all duration-500"
                    style={{ 
                      width: `${pctSisa}%`,
                      borderTopRightRadius: pctNabung === 0 && pctSemuaPos === 0 ? '9999px' : '0px',
                      borderBottomRightRadius: pctNabung === 0 && pctSemuaPos === 0 ? '9999px' : '0px'
                    }}
                    title={`Sisa Saldo: ${Math.round(pctSisa)}%`}
                  ></div>
                )}
                {/* Uang Ditabung (Indigo/Violet) */}
                {pctNabung > 0 && (
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-500"
                    style={{ 
                      width: `${pctNabung}%`,
                      borderTopLeftRadius: pctSisa === 0 ? '9999px' : '0px',
                      borderBottomLeftRadius: pctSisa === 0 ? '9999px' : '0px',
                      borderTopRightRadius: pctSemuaPos === 0 ? '9999px' : '0px',
                      borderBottomRightRadius: pctSemuaPos === 0 ? '9999px' : '0px'
                    }}
                    title={`Uang Ditabung: ${Math.round(pctNabung)}%`}
                  ></div>
                )}
                {/* Gabungan Semua Pos Pengeluaran (Rose/Orange) */}
                {pctSemuaPos > 0 && (
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-rose-450 rounded-r-full transition-all duration-500"
                    style={{ 
                      width: `${pctSemuaPos}%`,
                      borderTopLeftRadius: pctSisa === 0 && pctNabung === 0 ? '9999px' : '0px',
                      borderBottomLeftRadius: pctSisa === 0 && pctNabung === 0 ? '9999px' : '0px'
                    }}
                    title={`Pengeluaran Pos: ${Math.round(pctSemuaPos)}%`}
                  ></div>
                )}
              </div>

              {/* Legenda Ringkasan Persentase Tiga Sektor */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                  <span className="block font-black text-emerald-400">{Math.round(pctSisa)}%</span>
                  <span className="text-[8px] text-slate-450 uppercase block font-semibold">Sisa Saldo</span>
                </div>
                <div className="p-1.5 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                  <span className="block font-black text-indigo-400">{Math.round(pctNabung)}%</span>
                  <span className="text-[8px] text-slate-450 uppercase block font-semibold">Uang Nabung</span>
                </div>
                <div className="p-1.5 rounded-lg bg-rose-500/5 border border-rose-500/10">
                  <span className="block font-black text-rose-400">{Math.round(pctSemuaPos)}%</span>
                  <span className="text-[8px] text-slate-450 uppercase block font-semibold">Total Pos</span>
                </div>
              </div>

              {/* GRID PERSENTASE DETAIL PER MASING-MASING POS KEBUTUHAN */}
              <div className="pt-2.5 border-t border-slate-850 space-y-2">
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">Kontribusi Pengeluaran Per Pos:</span>
                <div className="grid grid-cols-2 gap-2 max-h-[140px] overflow-y-auto pr-1 custom-scrollbar">
                  {posList.map((pos) => {
                    const pctOfPemasukan = totalPemasukan > 0 ? Math.round((pos.totalSpent / totalPemasukan) * 105) / 1.05 : 0
                    const scheme = COLOR_SCHEMES[pos.color] || COLOR_SCHEMES.rose
                    return (
                      <div key={pos.id} className="flex items-center justify-between text-[10px] bg-slate-950/20 px-2 py-1.5 rounded-lg border border-slate-850/50">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="shrink-0">{pos.emoji}</span>
                          <span className="truncate text-slate-300 font-semibold">{pos.name}</span>
                        </div>
                        <span className={`shrink-0 font-bold ${scheme.text}`}>{pctOfPemasukan.toFixed(1)}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          )}
        </section>

        {/* 3. FORM INPUT PEMASUKAN UTAMA */}
        <section className="glass-card rounded-2xl p-5 mb-5 border border-slate-800">
          <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <span className="p-0.5 bg-slate-850 rounded text-xs">💰</span>
            <span>Pemasukan Utama</span>
          </h3>

          <form onSubmit={handleAddPemasukan} className="space-y-3.5">
            <div>
              <label htmlFor="pemasukan-input" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Nominal Pendapatan (Rupiah)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-500">Rp</span>
                <input
                  id="pemasukan-input"
                  type="text"
                  value={inputPemasukan}
                  onChange={(e) => setInputPemasukan(formatRibuanString(e.target.value))}
                  placeholder="Contoh: 1.500.000"
                  className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-650 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleResetPemasukan}
                className="w-full py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold text-center cursor-pointer transition-colors"
              >
                Reset ke 0
              </button>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black uppercase tracking-widest py-2.5 rounded-xl transition-all shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-1"
              >
                <IconPlus className="h-3.5 w-3.5 stroke-[3] text-slate-950" />
                <span>Tambah Uang</span>
              </button>
            </div>
          </form>
        </section>

        {/* 4. POS TABUNGAN (INTERAKTIF CELENGAN) */}
        <section className="glass-card rounded-2xl p-5 mb-5 border border-slate-800">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest block mb-0.5">Pos Tabungan</span>
              <h3 className="text-xl font-black text-white">{formatRupiah(totalNabung)}</h3>
              <span className="text-[9px] text-slate-450 block mt-0.5">Anggaran Khusus untuk Celengan Masa Depan</span>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 shrink-0">
              <IconPiggy className="h-6 w-6" />
            </div>
          </div>

          {/* Form Nabung */}
          <form onSubmit={handleAddNabung} className="space-y-3 p-3 bg-slate-950/25 border border-slate-850 rounded-xl mb-4">
            <span className="text-[9px] font-black text-indigo-350 uppercase tracking-wider block">Tambah Celengan</span>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="nabung-amount" className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Jumlah (Rp)</label>
                <input
                  id="nabung-amount"
                  type="text"
                  value={inputNabungAmount}
                  onChange={(e) => setInputNabungAmount(formatRibuanString(e.target.value))}
                  placeholder="Contoh: 100.000"
                  className="w-full bg-slate-950/60 border border-slate-800/80 rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="nabung-note" className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Catatan</label>
                <input
                  id="nabung-note"
                  type="text"
                  value={inputNabungNote}
                  onChange={(e) => setInputNabungNote(e.target.value)}
                  placeholder="Beli emas / reksa dana"
                  className="w-full bg-slate-950/60 border border-slate-800/80 rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-650 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest py-2 rounded-lg transition-all cursor-pointer"
            >
              Masukkan Celengan
            </button>
          </form>

          {/* Riwayat Tabungan */}
          <div className="space-y-2">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Alokasi Terakhir</span>
            {nabungHistory.length === 0 ? (
              <div className="py-4 text-center text-slate-550 text-[11px] italic bg-slate-950/15 rounded-lg border border-slate-850/40">
                Belum ada celengan tabungan yang ditambahkan.
              </div>
            ) : (
              <div className="max-h-[140px] overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                {nabungHistory.map((tx) => (
                  <div key={tx.id} className="group p-2.5 bg-slate-950/30 border border-slate-850 rounded-lg flex items-center justify-between gap-3 hover:border-slate-800 transition-all">
                    <div className="min-w-0">
                      <h5 className="text-[11px] font-bold text-slate-200 truncate">{tx.note}</h5>
                      <span className="text-[8px] text-slate-500 block mt-0.5">{tx.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-black text-indigo-400">+{formatRupiah(tx.amount)}</span>
                      <button
                        onClick={() => handleDeleteNabung(tx)}
                        className="p-1 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Hapus Alokasi"
                      >
                        <IconTrash className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 5. MULTIPLE DYNAMIC POS PENGELUARAN CARDS (Rose, Amber, Emerald, Sky, Violet, etc.) */}
        <section className="space-y-5">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-[10px] font-extrabold text-slate-450 uppercase tracking-widest">
              Daftar Pos Kebutuhan ({posList.length})
            </h3>
            <button
              onClick={() => setShowCustomPosForm(prev => !prev)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700/50 text-[10px] font-bold text-emerald-400 flex items-center gap-1 transition-all cursor-pointer"
            >
              <span>{showCustomPosForm ? 'Batal ❌' : '➕ Tambah Pos Baru'}</span>
            </button>
          </div>

          {/* DYNAMIC FORM TAMBAH POS KUSTOM BARU */}
          {showCustomPosForm && (
            <form onSubmit={handleCreateCustomPos} className="glass-card rounded-2xl p-5 border border-slate-800 animate-fadein space-y-4">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">➕ Buat Pos Kebutuhan Baru</span>
              
              <div>
                <label htmlFor="custom-pos-name" className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-1">Nama Pos Kustom</label>
                <input
                  id="custom-pos-name"
                  type="text"
                  value={newPosName}
                  onChange={(e) => setNewPosName(e.target.value)}
                  placeholder="Contoh: Pos Nonton Bioskop / Kopi"
                  className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Emoji Selector */}
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-2">Pilih Emoji Representatif</span>
                <div className="flex flex-wrap gap-2">
                  {emojiOptions.map(em => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => setNewPosEmoji(em)}
                      className={`w-8 h-8 rounded-lg text-lg flex items-center justify-center transition-all border ${
                        newPosEmoji === em 
                          ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-950/20' 
                          : 'bg-slate-950/40 border-slate-850 hover:border-slate-750 text-slate-400'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color Selector */}
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-2">Pilih Aksen Warna Kartu</span>
                <div className="flex gap-3">
                  {colorOptions.map(col => {
                    const theme = COLOR_SCHEMES[col]
                    return (
                      <button
                        key={col}
                        type="button"
                        onClick={() => setNewPosColor(col)}
                        className={`w-6 h-6 rounded-full ${theme.bar} transition-all border-2 ${
                          newPosColor === col ? 'border-white scale-110 shadow-lg shadow-slate-950/30' : 'border-transparent scale-100 opacity-60'
                        }`}
                        title={col}
                      ></button>
                    )
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black uppercase tracking-widest py-2.5 rounded-xl transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
              >
                Buat Kartu Pos
              </button>
            </form>
          )}

          {/* RENDER KARTU POS SECARA DINAMIS (Makan, Belanja, Keluarga, Transport, dll) */}
          <div className="space-y-4">
            {posList.map((pos) => {
              const isCustom = pos.id.startsWith('pos-custom-')
              return (
                <PosCard
                  key={pos.id}
                  pos={pos}
                  isCustom={pos.id.startsWith('pos-custom-')}
                  onAddTransaction={handleAddPosTransaction}
                  onDeleteTransaction={handleDeletePosTransaction}
                  onDeletePos={handleDeleteCustomPos}
                  sisaSaldo={sisaSaldoUtama}
                  formatRupiah={formatRupiah}
                />
              )
            })}
          </div>
        </section>

      </div>
    </div>
  )
}

// --- Helper: Dapatkan Placeholder Catatan Pengeluaran Dinamis Berdasarkan Kategori Pos ---
const getNotePlaceholder = (pos) => {
  const nameLower = pos.name.toLowerCase()
  if (pos.id === 'pos-makan' || nameLower.includes('makan') || nameLower.includes('minum')) {
    return 'Contoh: Makan siang / Kopi'
  }
  if (pos.id === 'pos-belanja' || nameLower.includes('belanja') || nameLower.includes('pribadi')) {
    return 'Contoh: Checkout baju / Sepatu'
  }
  if (pos.id === 'pos-tagihan' || nameLower.includes('tagihan') || nameLower.includes('cicilan') || nameLower.includes('listrik') || nameLower.includes('internet')) {
    return 'Contoh: Bayar listrik / Kuota internet'
  }
  if (pos.id === 'pos-kendaraan' || nameLower.includes('kendaraan') || nameLower.includes('transport') || nameLower.includes('bensin') || nameLower.includes('ojek')) {
    return 'Contoh: Bensin motor / Servis'
  }
  if (pos.id === 'pos-keluarga' || nameLower.includes('keluarga') || nameLower.includes('mama') || nameLower.includes('ortu')) {
    return 'Contoh: Kirim ke Mama / Belanja bulanan'
  }
  if (nameLower.includes('kampus') || nameLower.includes('kuliah') || nameLower.includes('tugas') || nameLower.includes('sekolah') || nameLower.includes('kas')) {
    return 'Contoh: Uang kas / Fotokopi tugas'
  }
  return 'Contoh: Tulis rincian pengeluaran...'
}

// --- SUB-KOMPONEN MODULAR: PosCard (Isolasi State Form & Render Riwayat) ---
function PosCard({ pos, isCustom, onAddTransaction, onDeleteTransaction, onDeletePos, sisaSaldo, formatRupiah }) {
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  const theme = COLOR_SCHEMES[pos.color] || COLOR_SCHEMES.rose

  const handleSubmit = (e) => {
    e.preventDefault()
    const parsedAmount = parseFormattedToNumber(amount)
    const parsedNote = note.trim() || `Pengeluaran ${pos.name}`

    // Trigger callback ke parent
    onAddTransaction(pos.id, parsedAmount, parsedNote)
    
    // Reset Form Local
    setAmount('')
    setNote('')
  }

  return (
    <div className={`glass-card rounded-2xl p-5 ${theme.glow} ${theme.border}`}>
      
      {/* Header Kartu Pos */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl ${theme.bg} ${theme.text} border ${theme.border} flex items-center justify-center text-xl shrink-0`}>
            {pos.emoji}
          </div>
          <div>
            <h4 className="font-extrabold text-white text-xs tracking-wide uppercase leading-none">{pos.name}</h4>
            <h3 className={`text-base font-black mt-1 ${theme.text}`}>{formatRupiah(pos.totalSpent)}</h3>
            <span className="text-[8px] text-slate-450 block mt-0.5">Sudah Terpakai</span>
          </div>
        </div>

        {/* Hapus Tombol khusus Pos Kustom buatan user */}
        {isCustom && (
          <button
            onClick={() => onDeletePos(pos.id, pos.name, pos.totalSpent)}
            className="p-1 rounded text-slate-500 hover:text-rose-500 transition-colors focus:outline-none shrink-0 cursor-pointer"
            title="Hapus Pos Kebutuhan"
          >
            <IconX className="h-4.5 w-4.5" />
          </button>
        )}
      </div>

      {/* Form Tambah Pengeluaran Unik Kartu Pos */}
      <form onSubmit={handleSubmit} className="space-y-2.5 p-3 bg-slate-950/20 border border-slate-850 rounded-xl mb-4">
        <span className={`text-[8.5px] font-black uppercase tracking-wider block ${theme.text}`}>Catat Transaksi Baru</span>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor={`amount-${pos.id}`} className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Nominal (Rp)</label>
            <input
              id={`amount-${pos.id}`}
              type="text"
              value={amount}
              onChange={(e) => setAmount(formatRibuanString(e.target.value))}
              placeholder="Contoh: 15.000"
              className={`w-full bg-slate-950/60 border border-slate-800/85 rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-650 focus:outline-none ${theme.focusBorder}`}
            />
          </div>
          <div>
            <label htmlFor={`note-${pos.id}`} className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Catatan</label>
            <input
              id={`note-${pos.id}`}
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={getNotePlaceholder(pos)}
              className={`w-full bg-slate-950/60 border border-slate-800/85 rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-650 focus:outline-none ${theme.focusBorder}`}
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full text-[9px] font-black uppercase tracking-widest py-2 rounded-lg transition-all cursor-pointer ${theme.btnBg}`}
        >
          Kurangi Saldo & Catat
        </button>
      </form>

      {/* Riwayat Log Pengeluaran Unik Kartu Pos */}
      <div className="space-y-2">
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Riwayat Transaksi</span>
        {(pos.history || []).length === 0 ? (
          <div className="py-3 text-center text-slate-550 text-[10px] italic bg-slate-950/15 rounded-lg border border-slate-850/40">
            Belum ada catatan pengeluaran di pos ini.
          </div>
        ) : (
          <div className="max-h-[120px] overflow-y-auto pr-1 space-y-2 custom-scrollbar">
            {(pos.history || []).map((tx) => (
              <div key={tx.id} className="group p-2.5 bg-slate-950/30 border border-slate-850 rounded-lg flex items-center justify-between gap-3 hover:border-slate-800 transition-all">
                <div className="min-w-0">
                  <h5 className="text-[10px] font-bold text-slate-200 truncate">{tx.note}</h5>
                  <span className="text-[7.5px] text-slate-500 block mt-0.5">{tx.timestamp}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-black text-rose-400">-{formatRupiah(tx.amount)}</span>
                  <button
                    onClick={() => onDeleteTransaction(pos.id, tx)}
                    className="p-1 text-slate-550 hover:text-rose-500 hover:bg-rose-500/10 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                    title="Hapus Transaksi"
                  >
                    <IconTrash className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
