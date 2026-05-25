import React, { useState, useEffect } from 'react'
import {
  PiggyBank,
  Plus,
  Minus,
  Trash2,
  Edit2,
  RotateCcw,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  GraduationCap,
  Home,
  Car,
  Utensils,
  DollarSign,
  Wallet,
  Percent,
  Calendar,
  Sparkles,
  Check,
  X,
  PlusCircle,
  HelpCircle,
  TrendingUp,
  Info
} from 'lucide-react'

// Map of standard category icons
const ICON_MAP = {
  home: Home,
  education: GraduationCap,
  transport: Car,
  food: Utensils,
  savings: PiggyBank,
  other: DollarSign
}

// Color schemes configurations for buckets
const COLOR_SCHEMES = {
  indigo: {
    border: 'border-indigo-500/30 hover:border-indigo-500/60',
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-400',
    fill: 'bg-indigo-500',
    glow: 'shadow-indigo-500/20',
    accent: 'bg-indigo-500/20',
    badge: 'bg-indigo-950 text-indigo-300 border-indigo-500/30'
  },
  violet: {
    border: 'border-violet-500/30 hover:border-violet-500/60',
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    fill: 'bg-violet-500',
    glow: 'shadow-violet-500/20',
    accent: 'bg-violet-500/20',
    badge: 'bg-violet-950 text-violet-300 border-violet-500/30'
  },
  emerald: {
    border: 'border-emerald-500/30 hover:border-emerald-500/60',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    fill: 'bg-emerald-500',
    glow: 'shadow-emerald-500/20',
    accent: 'bg-emerald-500/20',
    badge: 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
  },
  amber: {
    border: 'border-amber-500/30 hover:border-amber-500/60',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    fill: 'bg-amber-500',
    glow: 'shadow-amber-500/20',
    accent: 'bg-amber-500/20',
    badge: 'bg-amber-950 text-amber-300 border-amber-500/30'
  },
  rose: {
    border: 'border-rose-500/30 hover:border-rose-500/60',
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    fill: 'bg-rose-500',
    glow: 'shadow-rose-500/20',
    accent: 'bg-rose-500/20',
    badge: 'bg-rose-950 text-rose-300 border-rose-500/30'
  }
}

// Initial Mockup Data
const INITIAL_SALARY = 6500000

const INITIAL_BUCKETS = [
  { id: 'b1', name: 'Bayar Kosan', target: 1500000, saved: 1200000, icon: 'home', color: 'indigo' },
  { id: 'b2', name: 'Bayar Kuliah', target: 3000000, saved: 1800000, icon: 'education', color: 'violet' },
  { id: 'b3', name: 'Bensin & Transport', target: 600000, saved: 400000, icon: 'transport', color: 'emerald' },
  { id: 'b4', name: 'Makan Bulanan', target: 1200000, saved: 600000, icon: 'food', color: 'amber' }
]

const INITIAL_TRANSACTIONS = [
  {
    id: 't1',
    type: 'system',
    amount: 0,
    description: 'Inisialisasi sistem pos alokasi keuangan mandiri.',
    timestamp: '25 Mei 2026, 21:00',
    bucketName: null
  },
  {
    id: 't2',
    type: 'deposit',
    amount: 1200000,
    description: 'Alokasi awal untuk Pos Bayar Kosan',
    timestamp: '25 Mei 2026, 21:15',
    bucketName: 'Bayar Kosan'
  },
  {
    id: 't3',
    type: 'deposit',
    amount: 1800000,
    description: 'Menabung sebagian untuk semester depan Pos Bayar Kuliah',
    timestamp: '25 Mei 2026, 21:30',
    bucketName: 'Bayar Kuliah'
  },
  {
    id: 't4',
    type: 'withdraw',
    amount: 50000,
    description: 'Membeli bensin pertalite motor bulanan',
    timestamp: '25 Mei 2026, 23:10',
    bucketName: 'Bensin & Transport'
  }
]

export default function App() {
  // State variables with LocalStorage backup
  const [salary, setSalary] = useState(() => {
    const saved = localStorage.getItem('pb_salary')
    return saved ? parseInt(saved, 10) : INITIAL_SALARY
  })

  const [buckets, setBuckets] = useState(() => {
    const saved = localStorage.getItem('pb_buckets')
    return saved ? JSON.parse(saved) : INITIAL_BUCKETS
  })

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('pb_transactions')
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS
  })

  // Salary Editing State
  const [isEditingSalary, setIsEditingSalary] = useState(false)
  const [salaryInput, setSalaryInput] = useState(salary)

  // Creation State
  const [isAddingBucket, setIsAddingBucket] = useState(false)
  const [newBucketName, setNewBucketName] = useState('')
  const [newBucketTarget, setNewBucketTarget] = useState('')
  const [newBucketIcon, setNewBucketIcon] = useState('savings')
  const [newBucketColor, setNewBucketColor] = useState('indigo')

  // Edit Bucket State
  const [editingBucketId, setEditingBucketId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editTarget, setEditTarget] = useState('')
  const [editIcon, setEditIcon] = useState('savings')
  const [editColor, setEditColor] = useState('indigo')

  // Card Transaction State (Deposit/Withdraw values keyed by bucketId)
  const [cardAmounts, setCardAmounts] = useState({})
  const [cardActionTypes, setCardActionTypes] = useState({}) // 'deposit' or 'withdraw'

  // Transactions list search and filters
  const [txSearch, setTxSearch] = useState('')
  const [txFilter, setTxFilter] = useState('all')

  // Custom alert notifications
  const [notification, setNotification] = useState(null)

  // Auto Dismiss Notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('pb_salary', salary)
  }, [salary])

  useEffect(() => {
    localStorage.setItem('pb_buckets', JSON.stringify(buckets))
  }, [buckets])

  useEffect(() => {
    localStorage.setItem('pb_transactions', JSON.stringify(transactions))
  }, [transactions])

  // Derived Values
  const totalAllocated = buckets.reduce((acc, curr) => acc + curr.saved, 0)
  const totalTarget = buckets.reduce((acc, curr) => acc + curr.target, 0)
  const unallocatedBalance = salary - totalAllocated
  const overallSavedPercent = totalTarget > 0 ? Math.min(Math.round((totalAllocated / totalTarget) * 100), 100) : 0

  // Format IDR Currency
  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val)
  }

  // Get dynamic local timestamp
  const getTimestamp = () => {
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date().toLocaleDateString('id-ID', options)
  }

  // Add notification
  const triggerNotification = (text, type = 'success') => {
    setNotification({ text, type })
  }

  // Handle Salary Update
  const saveSalary = (e) => {
    e.preventDefault()
    const parsed = parseInt(salaryInput, 10)
    if (isNaN(parsed) || parsed < 0) {
      triggerNotification('Jumlah pendapatan tidak valid!', 'error')
      return
    }
    setSalary(parsed)
    setIsEditingSalary(false)

    // Add transaction log
    const newTx = {
      id: 'tx-' + Date.now(),
      type: 'system',
      amount: parsed,
      description: `Mengubah total pendapatan masuk menjadi ${formatRupiah(parsed)}`,
      timestamp: getTimestamp(),
      bucketName: null
    }
    setTransactions([newTx, ...transactions])
    triggerNotification('Pendapatan bulanan berhasil diperbarui.')
  }

  // Create Savings Bucket
  const createBucket = (e) => {
    e.preventDefault()
    if (!newBucketName.trim()) {
      triggerNotification('Nama pos tidak boleh kosong!', 'error')
      return
    }
    const target = parseInt(newBucketTarget, 10)
    if (isNaN(target) || target <= 0) {
      triggerNotification('Target tabungan harus berupa angka positif!', 'error')
      return
    }

    const newBucket = {
      id: 'b-' + Date.now(),
      name: newBucketName.trim(),
      target: target,
      saved: 0,
      icon: newBucketIcon,
      color: newBucketColor
    }

    setBuckets([...buckets, newBucket])

    const newTx = {
      id: 'tx-' + Date.now(),
      type: 'system',
      amount: 0,
      description: `Membuat pos tabungan baru: "${newBucket.name}" dengan target ${formatRupiah(target)}`,
      timestamp: getTimestamp(),
      bucketName: newBucket.name
    }
    setTransactions([newTx, ...transactions])

    // Reset Form
    setNewBucketName('')
    setNewBucketTarget('')
    setIsAddingBucket(false)
    triggerNotification(`Pos tabungan "${newBucket.name}" berhasil dibuat!`)
  }

  // Set up Editing for Bucket
  const startEditingBucket = (bucket) => {
    setEditingBucketId(bucket.id)
    setEditName(bucket.name)
    setEditTarget(bucket.target)
    setEditIcon(bucket.icon)
    setEditColor(bucket.color)
  }

  // Update Savings Bucket details
  const updateBucket = (e) => {
    e.preventDefault()
    if (!editName.trim()) {
      triggerNotification('Nama pos tidak boleh kosong!', 'error')
      return
    }
    const target = parseInt(editTarget, 10)
    if (isNaN(target) || target <= 0) {
      triggerNotification('Target harus berupa angka positif!', 'error')
      return
    }

    setBuckets(buckets.map(b => {
      if (b.id === editingBucketId) {
        return { ...b, name: editName.trim(), target: target, icon: editIcon, color: editColor }
      }
      return b
    }))

    const newTx = {
      id: 'tx-' + Date.now(),
      type: 'system',
      amount: 0,
      description: `Memperbarui info pos tabungan: "${editName}"`,
      timestamp: getTimestamp(),
      bucketName: editName
    }
    setTransactions([newTx, ...transactions])
    setEditingBucketId(null)
    triggerNotification('Detail pos tabungan berhasil diperbarui.')
  }

  // Delete Savings Bucket
  const deleteBucket = (id, name, saved) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus pos "${name}"? Sisa dana di dalamnya (${formatRupiah(saved)}) akan dikembalikan ke saldo yang belum dialokasikan.`)) {
      setBuckets(buckets.filter(b => b.id !== id))

      const newTx = {
        id: 'tx-' + Date.now(),
        type: 'system',
        amount: saved,
        description: `Menghapus pos "${name}" dan mengembalikan ${formatRupiah(saved)} ke saldo tidak teralokasi.`,
        timestamp: getTimestamp(),
        bucketName: name
      }
      setTransactions([newTx, ...transactions])
      triggerNotification(`Pos tabungan "${name}" berhasil dihapus.`)
    }
  }

  // Handle deposit or withdraw inside bucket card
  const processCardTransaction = (bucketId) => {
    const bucket = buckets.find(b => b.id === bucketId)
    if (!bucket) return

    const amount = parseInt(cardAmounts[bucketId], 10)
    const action = cardActionTypes[bucketId] || 'deposit'

    if (isNaN(amount) || amount <= 0) {
      triggerNotification('Masukkan nominal uang yang valid!', 'error')
      return
    }

    if (action === 'deposit') {
      // Validate unallocated balance
      if (amount > unallocatedBalance) {
        triggerNotification(`Saldo tidak teralokasi tidak mencukupi! Sisa saldo Anda: ${formatRupiah(unallocatedBalance)}`, 'error')
        return
      }

      setBuckets(buckets.map(b => {
        if (b.id === bucketId) {
          return { ...b, saved: b.saved + amount }
        }
        return b
      }))

      const newTx = {
        id: 'tx-' + Date.now(),
        type: 'deposit',
        amount: amount,
        description: `Mengalokasikan dana ke Pos "${bucket.name}"`,
        timestamp: getTimestamp(),
        bucketName: bucket.name
      }
      setTransactions([newTx, ...transactions])
      triggerNotification(`Sukses mengalokasikan ${formatRupiah(amount)} ke "${bucket.name}".`)
    } else {
      // Withdrawal / Spend
      if (amount > bucket.saved) {
        triggerNotification(`Dana di pos "${bucket.name}" tidak mencukupi! Dana terisi saat ini: ${formatRupiah(bucket.saved)}`, 'error')
        return
      }

      setBuckets(buckets.map(b => {
        if (b.id === bucketId) {
          return { ...b, saved: b.saved - amount }
        }
        return b
      }))

      const newTx = {
        id: 'tx-' + Date.now(),
        type: 'withdraw',
        amount: amount,
        description: `Memakai dana dari Pos "${bucket.name}"`,
        timestamp: getTimestamp(),
        bucketName: bucket.name
      }
      setTransactions([newTx, ...transactions])
      triggerNotification(`Sukses mengambil ${formatRupiah(amount)} dari "${bucket.name}".`)
    }

    // Reset quick amount inputs for this specific card
    setCardAmounts({ ...cardAmounts, [bucketId]: '' })
  }

  // Preset Buttons click helper
  const setQuickAmount = (bucketId, amount, action) => {
    setCardAmounts({ ...cardAmounts, [bucketId]: amount })
    setCardActionTypes({ ...cardActionTypes, [bucketId]: action })
  }

  // Restore Default App Values
  const resetToDefault = () => {
    if (window.confirm('Apakah Anda yakin ingin mengatur ulang semua data dashboard kembali ke awal? Semua perubahan Anda akan hilang.')) {
      setSalary(INITIAL_SALARY)
      setSalaryInput(INITIAL_SALARY)
      setBuckets(INITIAL_BUCKETS)
      setTransactions(INITIAL_TRANSACTIONS)
      setCardAmounts({})
      setCardActionTypes({})
      setEditingBucketId(null)
      setIsAddingBucket(false)
      triggerNotification('Data dashboard berhasil diatur ulang ke default.')
    }
  }

  // Filtering transactions list
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(txSearch.toLowerCase()) ||
      (tx.bucketName && tx.bucketName.toLowerCase().includes(txSearch.toLowerCase()))

    if (txFilter === 'all') return matchesSearch
    return tx.type === txFilter && matchesSearch
  })

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 animate-bounce ${notification.type === 'error'
            ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
            : 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
          }`}>
          {notification.type === 'error' ? <AlertTriangle className="h-5 w-5 text-rose-400" /> : <Sparkles className="h-5 w-5 text-emerald-400" />}
          <span className="text-sm font-semibold">{notification.text}</span>
          <button onClick={() => setNotification(null)} className="ml-2 hover:opacity-75">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="w-full">
        {/* Header Dashboard */}
        <header className="py-8 flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Pos Keuangan Mandiri
              </h1>
            </div>
            <p className="text-slate-400 text-xs md:text-sm mt-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-indigo-400" />
              <span>Dashboard Alokasi Tabungan & Pendapatan &bull; {getTimestamp()}</span>
            </p>
          </div>
          <div className="flex items-center gap-3 self-end md:self-center">
            <button
              onClick={resetToDefault}
              className="px-4 py-2 text-xs md:text-sm font-medium text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-900 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Data</span>
            </button>
          </div>
        </header>

        {/* Unallocated Warning Alert */}
        {unallocatedBalance < 0 && (
          <div className="mb-6 bg-rose-950/40 border border-rose-500/30 text-rose-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 glow-rose transition-all duration-300">
            <div className="p-2 bg-rose-900/50 rounded-xl text-rose-400 shrink-0">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-rose-200 text-sm md:text-base">Peringatan: Over-Alokasi Dana!</h4>
              <p className="text-xs md:text-sm text-rose-300/80">
                Dana yang sudah dialokasikan ke pos-pos melebihi total pendapatan bulanan Anda sebesar{' '}
                <strong className="text-rose-200">{formatRupiah(Math.abs(unallocatedBalance))}</strong>. Mohon sesuaikan
                alokasi dana atau naikkan target pendapatan.
              </p>
            </div>
          </div>
        )}

        {/* Summary Card Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" aria-label="Ringkasan Finansial">
          {/* Card 1: Total Gaji */}
          <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group border border-slate-800/80 hover:border-slate-700/60 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Pendapatan</span>
              <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
                <Wallet className="h-5 w-5" />
              </div>
            </div>
            {isEditingSalary ? (
              <form onSubmit={saveSalary} className="flex items-center gap-2 mt-2">
                <div className="relative flex-grow">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">Rp</span>
                  <input
                    type="number"
                    value={salaryInput}
                    onChange={(e) => setSalaryInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-lg font-bold rounded-xl glass-input outline-none"
                    autoFocus
                  />
                </div>
                <button type="submit" className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 cursor-pointer">
                  <Check className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingSalary(false)
                    setSalaryInput(salary)
                  }}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
            ) : (
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{formatRupiah(salary)}</span>
                  <button
                    onClick={() => setIsEditingSalary(true)}
                    className="text-indigo-400 hover:text-indigo-300 p-1.5 hover:bg-indigo-500/10 rounded-lg transition-all cursor-pointer"
                    title="Ubah Pendapatan"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-slate-500 text-xs mt-2">Total gaji bulanan masuk yang siap dialokasikan</p>
              </div>
            )}
          </div>

          {/* Card 2: Dialokasikan */}
          <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group border border-slate-800/80 hover:border-slate-700/60 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-3xl group-hover:bg-violet-500/10 transition-all"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Sudah Dialokasikan</span>
              <div className="p-2 bg-violet-500/10 rounded-xl text-violet-400">
                <PiggyBank className="h-5 w-5" />
              </div>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{formatRupiah(totalAllocated)}</span>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-grow bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((totalAllocated / Math.max(salary, 1)) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs font-bold text-violet-400 shrink-0">
                  {Math.round((totalAllocated / Math.max(salary, 1)) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Unallocated Balance */}
          <div className={`glass-panel p-6 rounded-3xl relative overflow-hidden group border transition-all duration-300 ${unallocatedBalance > 0
              ? 'border-emerald-500/20 hover:border-emerald-500/40 glow-emerald'
              : unallocatedBalance === 0
                ? 'border-slate-800/80 hover:border-slate-700/60'
                : 'border-rose-500/30 hover:border-rose-500/50 glow-rose'
            }`}>
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-10 transition-all group-hover:opacity-20 bg-white"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Sisa Saldo (Unallocated)</span>
              <div className={`p-2 rounded-xl ${unallocatedBalance > 0
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : unallocatedBalance === 0
                    ? 'bg-slate-800 text-slate-400'
                    : 'bg-rose-500/10 text-rose-400'
                }`}>
                <Wallet className="h-5 w-5" />
              </div>
            </div>
            <div>
              <span className={`text-2xl md:text-3xl font-extrabold tracking-tight ${unallocatedBalance > 0
                  ? 'text-emerald-400'
                  : unallocatedBalance === 0
                    ? 'text-slate-300'
                    : 'text-rose-400'
                }`}>
                {formatRupiah(unallocatedBalance)}
              </span>
              <p className="text-slate-500 text-xs mt-2 flex items-center gap-1.5">
                {unallocatedBalance > 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-emerald-400/90 font-medium">Uang aman untuk dimasukkan ke pos baru</span>
                  </>
                ) : unallocatedBalance === 0 ? (
                  <span>Semua pendapatan telah dialokasikan dengan pas</span>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                    <span className="text-rose-400/90 font-medium">Kurangi anggaran pos atau naikkan gaji</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Analytics & Breakdown Section (WOW Factor!) */}
        <section className="glass-panel p-6 rounded-3xl border border-slate-800/80 mb-8" aria-label="Analisis Alokasi Tabungan">
          <div className="flex items-center gap-2 mb-6">
            <Percent className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg md:text-xl font-bold text-white">Distribusi Alokasi Tabungan</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* SVG Visual Graphic Donut Chart */}
            <div className="flex flex-col items-center justify-center py-4 border-b lg:border-b-0 lg:border-r border-slate-800/80">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* SVG circular bar representation */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#1e293b"
                    strokeWidth="10"
                  />
                  {/* Dynamic main percentage fill */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="url(#indigoEmeraldGrad)"
                    strokeWidth="10"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * overallSavedPercent) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="indigoEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Inside circle text representation */}
                <div className="absolute text-center">
                  <span className="block text-3xl font-extrabold text-white tracking-tight">{overallSavedPercent}%</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Pendanaan</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center mt-4 max-w-[240px]">
                Pendanaan terkumpul sebesar <strong className="text-indigo-400">{formatRupiah(totalAllocated)}</strong> dari total target <strong className="text-emerald-400">{formatRupiah(totalTarget)}</strong>
              </p>
            </div>

            {/* Custom Interactive Color Striped Allocations */}
            <div className="lg:col-span-2 flex flex-col justify-center gap-4">
              <h3 className="text-sm font-bold text-slate-300 mb-1 flex items-center gap-2">
                <Info className="h-4 w-4 text-indigo-400" />
                <span>Proporsi Pos Tabungan Terhadap Saldo Teralokasi</span>
              </h3>

              {/* Stacked Percentage Bar */}
              <div className="w-full h-7 bg-slate-900 rounded-2xl overflow-hidden flex border border-slate-800 p-0.5">
                {buckets.length === 0 || totalAllocated === 0 ? (
                  <div className="w-full h-full bg-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-500 italic">
                    Belum ada dana yang teralokasi ke pos
                  </div>
                ) : (
                  buckets.map((b) => {
                    const ratio = totalAllocated > 0 ? (b.saved / totalAllocated) * 100 : 0
                    if (ratio <= 0) return null
                    const scheme = COLOR_SCHEMES[b.color] || COLOR_SCHEMES.indigo
                    return (
                      <div
                        key={b.id}
                        className={`${scheme.fill} h-full first:rounded-l-xl last:rounded-r-xl transition-all hover:scale-y-110 duration-300 relative group`}
                        style={{ width: `${ratio}%` }}
                        title={`${b.name}: ${formatRupiah(b.saved)} (${Math.round(ratio)}%)`}
                      >
                        {/* Hover Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] py-1 px-2.5 rounded-lg border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-10">
                          {b.name}: {Math.round(ratio)}%
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Legend Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                {buckets.map((b) => {
                  const ratio = totalAllocated > 0 ? (b.saved / totalAllocated) * 100 : 0
                  const scheme = COLOR_SCHEMES[b.color] || COLOR_SCHEMES.indigo
                  return (
                    <div key={b.id} className="flex items-center gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/40">
                      <div className={`w-3 h-3 rounded-full ${scheme.fill}`}></div>
                      <div className="min-w-0 flex-grow">
                        <p className="text-xs font-semibold text-white truncate">{b.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{Math.round(ratio)}% dari dana</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Savings Buckets Cards Grid */}
        <section className="mb-8" aria-label="Pos Tabungan Saya">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-indigo-400" />
              <h2 className="text-xl md:text-2xl font-black text-white">Daftar Pos Tabungan (Savings Buckets)</h2>
            </div>

            <button
              onClick={() => setIsAddingBucket(!isAddingBucket)}
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs md:text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 self-start cursor-pointer"
            >
              {isAddingBucket ? <X className="h-4.5 w-4.5" /> : <PlusCircle className="h-4.5 w-4.5" />}
              <span>{isAddingBucket ? 'Batal Tambah' : 'Tambah Pos Tabungan'}</span>
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* INLINE ADD BUCKET FORM CARD */}
            {isAddingBucket && (
              <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 glow-indigo animate-pulse-once">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
                    <PlusCircle className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">Buat Pos Baru</h3>
                </div>

                <form onSubmit={createBucket} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="newBucketName" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nama Pos</label>
                    <input
                      id="newBucketName"
                      type="text"
                      placeholder="Contoh: Tabungan Liburan, Bayar Pajak"
                      value={newBucketName}
                      onChange={(e) => setNewBucketName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="newBucketTarget" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Uang (Rp)</label>
                    <input
                      id="newBucketTarget"
                      type="number"
                      placeholder="Contoh: 2000000"
                      value={newBucketTarget}
                      onChange={(e) => setNewBucketTarget(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="newBucketIcon" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ikon</label>
                      <select
                        id="newBucketIcon"
                        value={newBucketIcon}
                        onChange={(e) => setNewBucketIcon(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                      >
                        <option value="savings">💰 Celengan</option>
                        <option value="home">🏠 Kosan / Rumah</option>
                        <option value="education">🎓 Kuliah / Sekolah</option>
                        <option value="transport">🚗 Bensin / Transport</option>
                        <option value="food">🍔 Makan Bulanan</option>
                        <option value="other">💵 Finansial Lainnya</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="newBucketColor" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Warna Kartu</label>
                      <select
                        id="newBucketColor"
                        value={newBucketColor}
                        onChange={(e) => setNewBucketColor(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                      >
                        <option value="indigo">Indigo Blue</option>
                        <option value="violet">Deep Purple</option>
                        <option value="emerald">Emerald Green</option>
                        <option value="amber">Warm Orange</option>
                        <option value="rose">Rose Red</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
                  >
                    Buat Pos Tabungan
                  </button>
                </form>
              </div>
            )}

            {/* list of buckets */}
            {buckets.map((b) => {
              const scheme = COLOR_SCHEMES[b.color] || COLOR_SCHEMES.indigo
              const BucketIcon = ICON_MAP[b.icon] || PiggyBank
              const progressPercent = b.target > 0 ? Math.min(Math.round((b.saved / b.target) * 100), 100) : 0
              const isTargetMet = b.saved >= b.target

              // Check if bucket is in Editing state
              if (editingBucketId === b.id) {
                return (
                  <div key={b.id} className="glass-panel p-6 rounded-3xl border border-indigo-500/30 glow-indigo">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-white text-base">Edit Pos Tabungan</h3>
                      <button onClick={() => setEditingBucketId(null)} className="text-slate-400 hover:text-white">
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <form onSubmit={updateBucket} className="flex flex-col gap-3">
                      <div>
                        <label htmlFor={`editName-${b.id}`} className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Nama Pos</label>
                        <input
                          id={`editName-${b.id}`}
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl glass-input text-xs"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor={`editTarget-${b.id}`} className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Target Baru (Rp)</label>
                        <input
                          id={`editTarget-${b.id}`}
                          type="number"
                          value={editTarget}
                          onChange={(e) => setEditTarget(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl glass-input text-xs"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor={`editIcon-${b.id}`} className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Ikon</label>
                          <select
                            id={`editIcon-${b.id}`}
                            value={editIcon}
                            onChange={(e) => setEditIcon(e.target.value)}
                            className="w-full px-2 py-1.5 rounded-xl glass-input text-xs"
                          >
                            <option value="savings">💰 Celengan</option>
                            <option value="home">🏠 Kosan</option>
                            <option value="education">🎓 Kuliah</option>
                            <option value="transport">🚗 Transport</option>
                            <option value="food">🍔 Makan</option>
                            <option value="other">💵 Lainnya</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor={`editColor-${b.id}`} className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Warna</label>
                          <select
                            id={`editColor-${b.id}`}
                            value={editColor}
                            onChange={(e) => setEditColor(e.target.value)}
                            className="w-full px-2 py-1.5 rounded-xl glass-input text-xs"
                          >
                            <option value="indigo">Indigo Blue</option>
                            <option value="violet">Deep Purple</option>
                            <option value="emerald">Emerald Green</option>
                            <option value="amber">Orange</option>
                            <option value="rose">Rose Red</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <button
                          type="submit"
                          className="flex-grow py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
                        >
                          Simpan Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingBucketId(null)}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs cursor-pointer"
                        >
                          Batal
                        </button>
                      </div>
                    </form>
                  </div>
                )
              }

              // Normal Bucket Card
              return (
                <div
                  key={b.id}
                  className={`glass-card p-6 rounded-3xl border ${scheme.border} flex flex-col justify-between relative group ${isTargetMet ? 'shadow-lg hover:shadow-emerald-500/5' : ''
                    }`}
                >
                  {/* Target Met Sparkle Effect */}
                  {isTargetMet && (
                    <div className="absolute -top-2.5 -right-2.5 bg-emerald-500 text-slate-950 font-black text-[9px] uppercase tracking-wider px-2 py-1 rounded-lg border border-emerald-400 shadow-lg shadow-emerald-500/20 flex items-center gap-1 z-10 select-none">
                      <Sparkles className="h-3 w-3" />
                      <span>Target Terpenuhi</span>
                    </div>
                  )}

                  {/* Bucket Header */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${scheme.bg} ${scheme.text} transition-all`}>
                          <BucketIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-white text-base md:text-lg tracking-tight group-hover:text-indigo-200 transition-colors">
                            {b.name}
                          </h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${scheme.badge}`}>
                            {b.icon === 'home'
                              ? 'Kebutuhan Rumah'
                              : b.icon === 'education'
                                ? 'Pendidikan'
                                : b.icon === 'transport'
                                  ? 'Bensin & Jalan'
                                  : b.icon === 'food'
                                    ? 'Konsumsi'
                                    : 'Tabungan Mandiri'}
                          </span>
                        </div>
                      </div>

                      {/* Config buttons */}
                      <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEditingBucket(b)}
                          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                          title="Edit Pos"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteBucket(b.id, b.name, b.saved)}
                          className="p-1.5 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                          title="Hapus Pos"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Progress details */}
                    <div className="mb-4">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kondisi Tabungan</span>
                        <div className="text-right">
                          <span className="text-sm font-bold text-white block">{formatRupiah(b.saved)}</span>
                          <span className="text-[10px] text-slate-500 font-medium">Target: {formatRupiah(b.target)}</span>
                        </div>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800 p-0.5 relative">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ease-out ${isTargetMet ? 'bg-gradient-to-r from-emerald-500 to-indigo-500' : scheme.fill
                            }`}
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Progres Alokasi</span>
                        <span className={`text-xs font-black ${isTargetMet ? 'text-emerald-400' : scheme.text}`}>
                          {progressPercent}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Deposit / Spend Action Block */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    {/* Toggle Selector */}
                    <div className="grid grid-cols-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800/50 mb-3 text-[10px] font-bold">
                      <button
                        onClick={() => setCardActionTypes({ ...cardActionTypes, [b.id]: 'deposit' })}
                        className={`py-1.5 rounded-lg text-center transition-all cursor-pointer ${(cardActionTypes[b.id] || 'deposit') === 'deposit'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white'
                          }`}
                      >
                        💵 Isi Pos (Simpan)
                      </button>
                      <button
                        onClick={() => setCardActionTypes({ ...cardActionTypes, [b.id]: 'withdraw' })}
                        className={`py-1.5 rounded-lg text-center transition-all cursor-pointer ${cardActionTypes[b.id] === 'withdraw'
                            ? 'bg-rose-950 text-rose-300 border border-rose-500/25 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                          }`}
                      >
                        🛍️ Pakai Pos (Belanja)
                      </button>
                    </div>

                    {/* Quick Preset Amounts Buttons */}
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                      {[(cardActionTypes[b.id] || 'deposit') === 'deposit' ? 100000 : 50000, 200000, 500000].map((preset) => {
                        const action = cardActionTypes[b.id] || 'deposit'
                        return (
                          <button
                            key={preset}
                            onClick={() => setQuickAmount(b.id, preset, action)}
                            className="py-1 text-[10px] font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-850 hover:border-slate-750 rounded-lg transition-colors cursor-pointer"
                          >
                            {action === 'deposit' ? '+' : '-'} {preset / 1000}k
                          </button>
                        )
                      })}
                    </div>

                    {/* Transaction Form Inputs */}
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] font-bold">Rp</span>
                        <input
                          type="number"
                          placeholder="Nominal"
                          value={cardAmounts[b.id] || ''}
                          onChange={(e) => setCardAmounts({ ...cardAmounts, [b.id]: e.target.value })}
                          className="w-full pl-7 pr-2 py-1.5 rounded-xl glass-input text-xs"
                        />
                      </div>
                      <button
                        onClick={() => processCardTransaction(b.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer ${(cardActionTypes[b.id] || 'deposit') === 'deposit'
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/10'
                            : 'bg-rose-700 hover:bg-rose-600 text-white shadow-rose-700/10'
                          }`}
                      >
                        {(cardActionTypes[b.id] || 'deposit') === 'deposit' ? 'Simpan' : 'Pakai'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Empty State Buckets */}
            {buckets.length === 0 && !isAddingBucket && (
              <div className="col-span-full py-12 px-6 rounded-3xl border border-dashed border-slate-800 text-center flex flex-col items-center justify-center">
                <div className="h-16 w-16 bg-slate-900/60 text-slate-500 rounded-full flex items-center justify-center border border-slate-800 mb-4">
                  <Wallet className="h-8 w-8" />
                </div>
                <h4 className="font-extrabold text-white text-base">Belum Ada Pos Tabungan</h4>
                <p className="text-slate-500 text-xs mt-2 max-w-[280px] leading-relaxed">
                  Silakan buat pos tabungan/anggaran spesifik pertama Anda untuk memulai mengalokasikan gaji masuk.
                </p>
                <button
                  onClick={() => setIsAddingBucket(true)}
                  className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Buat Pos Sekarang
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Transaction History Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start" aria-label="Riwayat & Bantuan Finansial">
          {/* Left panel: Activity Log (2 Cols) */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/60 pb-5 mb-5 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-400" />
                <h2 className="text-lg md:text-xl font-bold text-white">Riwayat Transaksi Terkini</h2>
              </div>

              {/* Transaction Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Cari transaksi..."
                  value={txSearch}
                  onChange={(e) => setTxSearch(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg glass-input text-xs w-full sm:w-36 md:w-44"
                />

                <select
                  value={txFilter}
                  onChange={(e) => setTxFilter(e.target.value)}
                  className="px-2 py-1.5 rounded-lg glass-input text-xs text-slate-350"
                >
                  <option value="all">Semua Tipe</option>
                  <option value="deposit">📥 Tabung (+)</option>
                  <option value="withdraw">🛍️ Belanja (-)</option>
                  <option value="system">⚙️ Sistem</option>
                </select>
              </div>
            </div>

            {/* Scrollable Transaction Log */}
            <div className="max-h-[360px] overflow-y-auto pr-1 flex flex-col gap-3">
              {filteredTransactions.map((tx) => {
                const isDeposit = tx.type === 'deposit'
                const isWithdraw = tx.type === 'withdraw'

                return (
                  <div
                    key={tx.id}
                    className="p-3.5 rounded-2xl bg-slate-900/30 border border-slate-850 hover:border-slate-800 transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`p-2 rounded-xl shrink-0 ${isDeposit
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : isWithdraw
                            ? 'bg-rose-500/10 text-rose-400'
                            : 'bg-indigo-500/10 text-indigo-400'
                        }`}>
                        {isDeposit ? (
                          <ArrowUpRight className="h-5 w-5" />
                        ) : isWithdraw ? (
                          <ArrowDownLeft className="h-5 w-5" />
                        ) : (
                          <Check className="h-5 w-5" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs md:text-sm font-semibold text-slate-100 leading-tight">
                          {tx.description}
                        </p>
                        <p className="text-[10px] text-slate-500 font-bold mt-1.5 flex items-center gap-2">
                          <span>{tx.timestamp}</span>
                          {tx.bucketName && (
                            <>
                              <span>&bull;</span>
                              <span className="text-indigo-400 uppercase tracking-wider">{tx.bucketName}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {tx.amount > 0 ? (
                        <span className={`text-xs md:text-sm font-extrabold tracking-tight ${isDeposit ? 'text-emerald-400' : 'text-rose-400'
                          }`}>
                          {isDeposit ? '+' : '-'} {formatRupiah(tx.amount)}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">Sistem</span>
                      )}
                    </div>
                  </div>
                )
              })}

              {filteredTransactions.length === 0 && (
                <div className="py-12 text-center text-slate-500 text-xs italic">
                  Tidak ditemukan riwayat transaksi yang cocok.
                </div>
              )}
            </div>
          </div>

          {/* Right panel: Financial Helper Tip (1 Col) */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 flex flex-col justify-between self-stretch">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-800/60 pb-4 mb-4">
                <HelpCircle className="h-5 w-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white">Panduan Alokasi Pintar</h2>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Metode penganggaran personal yang paling populer dan disarankan adalah aturan finansial **50/30/20**:
              </p>

              <ul className="flex flex-col gap-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div>
                  <div>
                    <strong className="text-white block">50% Kebutuhan Pokok (Needs)</strong>
                    <span className="text-slate-450">Bayar kosan/kontrakan, makan pokok bulanan, bensin, tagihan air & listrik.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0"></div>
                  <div>
                    <strong className="text-white block">30% Keinginan Pribadi (Wants)</strong>
                    <span className="text-slate-450">Belanja pakaian baru, langganan streaming film, makan di kafe, dan hobi.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                  <div>
                    <strong className="text-white block">20% Investasi & Tabungan (Savings)</strong>
                    <span className="text-slate-450">Mengisi dana darurat, menabung investasi reksadana/emas, kuliah lanjut.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800/60 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-2">Target Budgeting Anda Saat Ini</span>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-indigo-950/40 text-indigo-300 border border-indigo-500/20 rounded-2xl text-xs font-bold">
                <span>Tabungan Aktif: {buckets.length} Pos</span>
                <span>&bull;</span>
                <span>Total Target: {formatRupiah(totalTarget)}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer copyright */}
      <footer className="text-center text-slate-600 text-xs mt-16 pt-6 border-t border-slate-900">
        <p>&copy; 2026 Pos Keuangan Mandiri App. Dibuat Wahyu.</p>
      </footer>
    </div>
  )
}
