'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePortfolio } from '@/context/PortfolioContext';
import { Project, CATEGORIES } from '@/data/portfolioData';
import { getYouTubeId } from '@/utils/youtube';
import {
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  LogOut,
  Upload,
  X,
  ShieldCheck,
  ArrowLeft,
  Image as ImageIcon,
  Sparkles,
  Star,
  Check,
  Building2,
  Dices,
  Eye,
  EyeOff,
  Video as VideoIcon
} from 'lucide-react';

// Helper to compress/process file to base64 DataURL
function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    if (file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
      return;
    }

    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_SIZE = 900;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_SIZE) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
        URL.revokeObjectURL(img.src);
        resolve(compressedBase64);
      } else {
        URL.revokeObjectURL(img.src);
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      }
    };
    img.onerror = () => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    };
  });
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { projects, addProject, updateProject, deleteProject, resetToDefault } = usePortfolio();

  // Mode Tab State: 'selected' | 'mercure' | 'cuecorner' | 'gallery'
  const [activeTab, setActiveTab] = useState<'selected' | 'mercure' | 'cuecorner' | 'gallery'>('selected');
  const [filterCategory, setFilterCategory] = useState('all');

  // Bulk Gallery Upload Form State
  const [bulkCategory, setBulkCategory] = useState<Project['category']>('digital');
  const [bulkClient, setBulkClient] = useState('Mercure Karawang');
  const [uploadingCount, setUploadingCount] = useState(0);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');
  const bulkFileInputRef = useRef<HTMLInputElement>(null);
  const mercureFileInputRef = useRef<HTMLInputElement>(null);
  const cueFileInputRef = useRef<HTMLInputElement>(null);

  // Landing Page Project Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [targetModalSection, setTargetModalSection] = useState<'experience' | 'selected'>('selected');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'digital' as Project['category'],
    categoryLabel: 'Digital Media',
    client: 'Mercure Karawang',
    description: '',
    image: '',
    aspectRatio: 'portrait' as 'portrait' | 'landscape' | 'square',
    price: '',
    specs: '',
    tags: ''
  });

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const filteredProjects = filterCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === filterCategory);

  // Mercure Admin Projects Filter
  const mercureProjects = projects.filter((p) => {
    const c = (p.client || '').toLowerCase();
    const t = (p.title || '').toLowerCase();
    const id = (p.id || '').toLowerCase();
    return c.includes('mercure') || c.includes('kunoichi') || t.includes('ramen') || t.includes('shabu') || id.includes('ramen') || id.includes('shabu');
  });

  // Cue Corner Admin Projects Filter
  const cueCornerProjects = projects.filter((p) => {
    const c = (p.client || '').toLowerCase();
    const t = (p.title || '').toLowerCase();
    const id = (p.id || '').toLowerCase();
    return c.includes('cue corner') || c.includes('billiard') || t.includes('billiard') || t.includes('cue corner') || id.includes('cue-corner');
  });

  // Generic Bulk Upload helper
  const handleBulkUploadCustom = async (files: FileList | File[], targetClient: string) => {
    const fileList = Array.from(files);
    if (fileList.length === 0) return;

    setUploadingCount(fileList.length);
    const categoryObj = CATEGORIES.find((c) => c.id === bulkCategory);
    const catLabel = categoryObj ? categoryObj.label : 'Gallery Media';

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const dataUrl = await readFileAsDataURL(file);

      addProject({
        title: file.name.replace(/\.[^/.]+$/, ''),
        category: bulkCategory,
        categoryLabel: catLabel,
        client: targetClient,
        description: '',
        image: dataUrl,
        aspectRatio: 'portrait',
        tags: [bulkCategory, targetClient].filter(Boolean),
        featured: false, // Default to Gallery Only
        inSelectedWorks: false
      });
    }

    setUploadingCount(0);
    setUploadSuccessMessage(`✓ Successfully uploaded ${fileList.length} files to Gallery (${targetClient})!`);
    setTimeout(() => setUploadSuccessMessage(''), 4000);
  };

  const handleOpenAddModal = (targetClient: string = 'Mercure Karawang', targetSection: 'experience' | 'selected' = 'selected') => {
    setEditingProject(null);
    setTargetModalSection(targetSection);
    setFormData({
      title: '',
      category: 'digital',
      categoryLabel: 'Digital Media',
      client: targetClient,
      description: '',
      image: '/images/kunoichi-ramen.svg',
      aspectRatio: 'portrait',
      price: '',
      specs: '',
      tags: 'Digital, Design'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (proj: Project) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      category: proj.category,
      categoryLabel: proj.categoryLabel,
      client: proj.client || 'Mercure Karawang',
      description: proj.description,
      image: proj.image,
      aspectRatio: proj.aspectRatio || (proj.image.toLowerCase().includes('/shorts/') ? 'portrait' : 'portrait'),
      price: proj.details?.price || '',
      specs: proj.details?.specs || '',
      tags: proj.tags.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleFileChangeModal = async (file: File) => {
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    setFormData((prev) => ({
      ...prev,
      image: dataUrl
    }));
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const projectPayload = {
      title: formData.title,
      category: formData.category,
      categoryLabel: formData.categoryLabel || 'Portfolio Project',
      client: formData.client,
      description: formData.description,
      image: formData.image || '/images/kunoichi-ramen.svg',
      aspectRatio: formData.aspectRatio,
      tags: tagArray,
      featured: true,
      inSelectedWorks: targetModalSection === 'selected' ? true : (editingProject ? editingProject.inSelectedWorks === true : false),
      details: {
        price: formData.price,
        specs: formData.specs
      }
    };

    if (editingProject) {
      updateProject(editingProject.id, projectPayload);
    } else {
      addProject(projectPayload);
    }

    setIsModalOpen(false);
  };

  const toggleSelectedStatus = (proj: Project) => {
    const isCurrentSelected = proj.inSelectedWorks === true || (proj.featured === true && proj.inSelectedWorks !== false);
    updateProject(proj.id, {
      inSelectedWorks: !isCurrentSelected,
      featured: true
    });
  };

  const toggleLandingStatus = (proj: Project) => {
    const isCurrentLanding = proj.featured === true;
    updateProject(proj.id, {
      featured: !isCurrentLanding
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-10 font-sans selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-white text-zinc-400 hover:text-white transition-colors"
              title="Return to Main Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                  ADMIN DASHBOARD
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-wide font-serif">
                Bayu Setiaji Media Studio Manager
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetToDefault}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
              title="Reset Data to Default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onLogout}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-white transition-colors"
              title="Logout Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Dedicated Section Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-zinc-800 scrollbar-none">
          <button
            onClick={() => setActiveTab('selected')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'selected'
                ? 'bg-white text-black shadow-lg shadow-white/20'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>1. SELECTED WORKS</span>
          </button>

          <button
            onClick={() => setActiveTab('mercure')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'mercure'
                ? 'bg-white text-black shadow-lg shadow-white/20'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>2. MERCURE KARAWANG</span>
          </button>

          <button
            onClick={() => setActiveTab('cuecorner')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'cuecorner'
                ? 'bg-white text-black shadow-lg shadow-white/20'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
          >
            <Dices className="w-4 h-4" />
            <span>3. CUE CORNER</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'gallery'
                ? 'bg-white text-black shadow-lg shadow-white/20'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>4. UPLOAD GALLERY</span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: DEDICATED SELECTED WORKS MANAGEMENT MENU
           ======================================================== */}
        {activeTab === 'selected' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-white font-serif uppercase tracking-wider flex items-center gap-2">
                  <Star className="w-5 h-5 text-white" />
                  Selected Works Showcase
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Kelola karya yang tampil secara khusus di section &quot;SELECTED WORKS&quot; pada landing page.
                </p>
              </div>

              <button
                onClick={() => handleOpenAddModal('Mercure Karawang', 'selected')}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-extrabold text-xs hover:bg-zinc-200 transition-colors uppercase tracking-wider shadow-lg shadow-white/10 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Selected Work Project</span>
              </button>
            </div>

            {/* Selected Works Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((item) => {
                const isSelected = item.inSelectedWorks === true || (item.featured === true && item.inSelectedWorks !== false);
                const ytId = getYouTubeId(item.image);
                return (
                  <div
                    key={item.id}
                    className={`clean-panel rounded-2xl p-4 flex flex-col justify-between transition-all ${
                      isSelected ? 'border-zinc-500 bg-zinc-950' : 'opacity-60 border-zinc-900'
                    }`}
                  >
                    <div>
                      <div className="aspect-[4/5] rounded-xl overflow-hidden bg-black border border-zinc-800 mb-3 relative flex items-center justify-center">
                        {ytId ? (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                            className="w-full h-full rounded-lg border-0 pointer-events-none"
                          />
                        ) : item.image.endsWith('.mp4') ? (
                          <video src={item.image} className="w-full h-full object-cover rounded-lg" controls={false} />
                        ) : (
                          <Image src={item.image} alt={item.title} fill className="object-cover rounded-lg" unoptimized />
                        )}

                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/90 text-[10px] font-mono text-white border border-zinc-800 uppercase font-bold">
                          {item.categoryLabel}
                        </span>

                        <button
                          onClick={() => toggleSelectedStatus(item)}
                          className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold flex items-center gap-1 border shadow-lg transition-all ${
                            isSelected
                              ? 'bg-white text-black border-white'
                              : 'bg-black/90 text-zinc-400 border-zinc-700 hover:text-white'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3 h-3 text-black" /> SHOWING IN SELECTED
                            </>
                          ) : (
                            '+ ADD TO SELECTED'
                          )}
                        </button>
                      </div>

                      <h3 className="text-sm font-bold text-white mb-1 font-serif">{item.title}</h3>
                      <p className="text-xs text-zinc-400 font-light line-clamp-2 mb-3">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                      <span className="text-[10px] font-mono text-zinc-400">
                        Client: {item.client || 'Portfolio'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-white text-zinc-300 hover:text-white transition-colors"
                          title="Edit Project"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProject(item.id)}
                          className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-white text-zinc-300 hover:text-white transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: MERCURE KARAWANG EXPERIENCE MANAGEMENT MENU
           ======================================================== */}
        {activeTab === 'mercure' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-white font-serif uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-white" />
                  Mercure Karawang Projects ({mercureProjects.length})
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Upload &amp; kelola foto/video Mercure Karawang.
                </p>
              </div>

              <button
                onClick={() => handleOpenAddModal('Mercure Karawang', 'experience')}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-extrabold text-xs hover:bg-zinc-200 transition-colors uppercase tracking-wider shadow-lg shadow-white/10 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project Form</span>
              </button>
            </div>

            {/* Quick Bulk Upload Box for Mercure */}
            <div className="clean-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Upload className="w-4 h-4 text-white" />
                  Quick Bulk Upload Mercure Photos (Drag &amp; Drop Multi-File)
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 font-bold">
                  FAST UPLOAD
                </span>
              </div>

              <div
                onClick={() => mercureFileInputRef.current?.click()}
                className="border-2 border-dashed border-zinc-700 hover:border-white p-6 rounded-2xl bg-zinc-950/80 text-center cursor-pointer transition-all space-y-2 group"
              >
                <input
                  type="file"
                  ref={mercureFileInputRef}
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleBulkUploadCustom(e.target.files, 'Mercure Karawang');
                    }
                  }}
                />

                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 mx-auto flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-white" />
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Pilih / Drag Banyak Foto Mercure Sekaligus
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                    Foto terupload otomatis ke Galeri. Tinggal klik sakelar jika mau tampil di Landing Page.
                  </p>
                </div>
              </div>
            </div>

            {/* Mercure Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mercureProjects.map((item) => {
                const isLanding = item.featured === true;
                const ytId = getYouTubeId(item.image);
                return (
                  <div
                    key={item.id}
                    className={`clean-panel rounded-2xl p-4 flex flex-col justify-between transition-all ${
                      isLanding ? 'border-zinc-500 bg-zinc-950' : 'border-zinc-900 opacity-75'
                    }`}
                  >
                    <div>
                      <div className="aspect-[4/5] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 mb-3 relative flex items-center justify-center p-1">
                        {ytId ? (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                            className="w-full h-full rounded-lg border-0 pointer-events-none"
                          />
                        ) : item.image.endsWith('.mp4') ? (
                          <video src={item.image} className="w-full h-full object-cover rounded-lg" controls={false} />
                        ) : (
                          <Image src={item.image} alt={item.title} fill className="object-cover rounded-lg" unoptimized />
                        )}

                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/90 text-[10px] font-mono text-white border border-zinc-800 uppercase font-bold">
                          {item.categoryLabel}
                        </span>

                        {/* Toggle Landing Page vs Gallery Only */}
                        <button
                          onClick={() => toggleLandingStatus(item)}
                          className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold flex items-center gap-1 border shadow-lg transition-all ${
                            isLanding
                              ? 'bg-white text-black border-white'
                              : 'bg-black/90 text-zinc-400 border-zinc-700 hover:text-white'
                          }`}
                        >
                          {isLanding ? (
                            <>
                              <Eye className="w-3 h-3 text-black" /> LANDING PAGE (ACTIVE)
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 text-zinc-400" /> GALLERY ONLY
                            </>
                          )}
                        </button>
                      </div>

                      <h3 className="text-sm font-bold text-white mb-1 font-serif">{item.title}</h3>
                      <p className="text-xs text-zinc-400 font-light line-clamp-2 mb-3">{item.description || 'Mercure Karawang visual deliverable'}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                      <span className="text-[10px] font-mono text-zinc-400">
                        {isLanding ? '⭐ Appears on Landing' : '🖼️ Gallery Only'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-white text-zinc-300 hover:text-white transition-colors"
                          title="Edit Project"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProject(item.id)}
                          className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-white text-zinc-300 hover:text-white transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: CUE CORNER EXPERIENCE MANAGEMENT MENU
           ======================================================== */}
        {activeTab === 'cuecorner' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-white font-serif uppercase tracking-wider flex items-center gap-2">
                  <Dices className="w-5 h-5 text-white" />
                  Cue Corner Billiard Projects ({cueCornerProjects.length})
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Upload &amp; kelola foto/video Cue Corner.
                </p>
              </div>

              <button
                onClick={() => handleOpenAddModal('Cue Corner', 'experience')}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-extrabold text-xs hover:bg-zinc-200 transition-colors uppercase tracking-wider shadow-lg shadow-white/10 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project Form</span>
              </button>
            </div>

            {/* Quick Bulk Upload Box for Cue Corner */}
            <div className="clean-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Upload className="w-4 h-4 text-white" />
                  Quick Bulk Upload Cue Corner Media (Drag &amp; Drop Multi-File)
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 font-bold">
                  FAST UPLOAD
                </span>
              </div>

              <div
                onClick={() => cueFileInputRef.current?.click()}
                className="border-2 border-dashed border-zinc-700 hover:border-white p-6 rounded-2xl bg-zinc-950/80 text-center cursor-pointer transition-all space-y-2 group"
              >
                <input
                  type="file"
                  ref={cueFileInputRef}
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleBulkUploadCustom(e.target.files, 'Cue Corner');
                    }
                  }}
                />

                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 mx-auto flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-white" />
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Pilih / Drag Banyak Media Cue Corner Sekaligus
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                    Media terupload otomatis ke Galeri. Tinggal klik sakelar jika mau tampil di Landing Page.
                  </p>
                </div>
              </div>
            </div>

            {/* Cue Corner Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cueCornerProjects.map((item) => {
                const isLanding = item.featured === true;
                const ytId = getYouTubeId(item.image);
                return (
                  <div
                    key={item.id}
                    className={`clean-panel rounded-2xl p-4 flex flex-col justify-between transition-all ${
                      isLanding ? 'border-zinc-500 bg-zinc-950' : 'border-zinc-900 opacity-75'
                    }`}
                  >
                    <div>
                      <div className="aspect-[4/5] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 mb-3 relative flex items-center justify-center p-1">
                        {ytId ? (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                            className="w-full h-full rounded-lg border-0 pointer-events-none"
                          />
                        ) : item.image.endsWith('.mp4') ? (
                          <video src={item.image} className="w-full h-full object-cover rounded-lg" controls={false} />
                        ) : (
                          <Image src={item.image} alt={item.title} fill className="object-cover rounded-lg" unoptimized />
                        )}

                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/90 text-[10px] font-mono text-white border border-zinc-800 uppercase font-bold">
                          {item.categoryLabel}
                        </span>

                        {/* Toggle Landing Page vs Gallery Only */}
                        <button
                          onClick={() => toggleLandingStatus(item)}
                          className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold flex items-center gap-1 border shadow-lg transition-all ${
                            isLanding
                              ? 'bg-white text-black border-white'
                              : 'bg-black/90 text-zinc-400 border-zinc-700 hover:text-white'
                          }`}
                        >
                          {isLanding ? (
                            <>
                              <Eye className="w-3 h-3 text-black" /> LANDING PAGE (ACTIVE)
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 text-zinc-400" /> GALLERY ONLY
                            </>
                          )}
                        </button>
                      </div>

                      <h3 className="text-sm font-bold text-white mb-1 font-serif">{item.title}</h3>
                      <p className="text-xs text-zinc-400 font-light line-clamp-2 mb-3">{item.description || 'Cue Corner billiard deliverable'}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                      <span className="text-[10px] font-mono text-zinc-400">
                        {isLanding ? '⭐ Appears on Landing' : '🖼️ Gallery Only'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-white text-zinc-300 hover:text-white transition-colors"
                          title="Edit Project"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProject(item.id)}
                          className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-white text-zinc-300 hover:text-white transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: DEDICATED GENERAL GALLERY UPLOAD MENU
           ======================================================== */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div className="clean-panel p-6 sm:p-8 rounded-3xl border border-zinc-700 space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white font-serif flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-white" />
                    Quick Gallery Bulk Upload
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Upload banyak foto/video sekaligus untuk halaman Galeri tanpa perlu mengisi form judul/deskripsi yang rumit.
                  </p>
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-white font-bold uppercase">
                  ZERO FORM FRICTION
                </span>
              </div>

              {/* Client & Category Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2 font-bold">
                    Target Client / Company
                  </label>
                  <select
                    value={bulkClient}
                    onChange={(e) => setBulkClient(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-white"
                  >
                    <option value="Mercure Karawang">Mercure Karawang (Accor Hotel)</option>
                    <option value="Cue Corner">Cue Corner (Distributor Billiard)</option>
                    <option value="Project Lain">General / Project Pribadi (Freelance / Klien Lain)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2 font-bold">
                    Category Tag
                  </label>
                  <select
                    value={bulkCategory}
                    onChange={(e) => {
                      const catId = e.target.value as Project['category'];
                      setBulkCategory(catId);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-white"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bulk File Drag & Drop Box */}
              <div
                onClick={() => bulkFileInputRef.current?.click()}
                className="border-2 border-dashed border-zinc-700 hover:border-white p-8 rounded-2xl bg-zinc-950/80 text-center cursor-pointer transition-all space-y-3 group"
              >
                <input
                  type="file"
                  ref={bulkFileInputRef}
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleBulkUploadCustom(e.target.files, bulkClient);
                    }
                  }}
                />

                <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-700 mx-auto flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">
                    Pilih / Drag Banyak Foto Sekaligus
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-1">
                    Klik untuk membuka file manager atau drag 5, 10, 20+ foto sekaligus ke area ini.
                  </p>
                </div>

                {uploadingCount > 0 && (
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono text-white animate-pulse">
                    ⚡ Processing {uploadingCount} files into Gallery... Please wait.
                  </div>
                )}

                {uploadSuccessMessage && (
                  <div className="p-3 rounded-xl bg-white text-black font-bold text-xs font-mono">
                    {uploadSuccessMessage}
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Media Grid Header & Filter */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <h3 className="text-lg font-bold text-white font-serif uppercase tracking-wider">
                  Gallery Photos &amp; Media ({projects.length})
                </h3>

                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilterCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors shrink-0 ${
                        filterCategory === cat.id
                          ? 'bg-white text-black font-extrabold'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gallery Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredProjects.map((item) => {
                  const ytId = getYouTubeId(item.image);
                  return (
                    <div
                      key={item.id}
                      className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-white transition-all aspect-[4/5] flex items-center justify-center p-1"
                    >
                      {ytId ? (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                          className="w-full h-full rounded-xl border-0 pointer-events-none"
                        />
                      ) : item.image.endsWith('.mp4') ? (
                        <video src={item.image} className="w-full h-full object-cover rounded-xl" controls={false} />
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={240}
                          height={320}
                          className="w-full h-full object-cover rounded-xl filter contrast-[1.05]"
                          unoptimized
                        />
                      )}

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteProject(item.id)}
                        className="absolute top-2 right-2 p-2 rounded-xl bg-black/90 text-zinc-400 hover:text-white border border-zinc-700 hover:border-white transition-colors z-20 shadow-lg"
                        title="Delete from Gallery"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modal Editor for Landing Page / Selected Projects */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-3xl max-w-xl w-full relative shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-xl font-bold text-white font-serif">
                {editingProject
                  ? 'Edit Project Details'
                  : targetModalSection === 'selected'
                  ? 'Add Project to Selected Works'
                  : 'Add Experience Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-zinc-400 mb-1 font-bold">PROJECT TITLE</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. All About Ramen Campaign"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-white text-xs font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1 font-bold">CATEGORY</label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const catId = e.target.value as Project['category'];
                      const catObj = CATEGORIES.find((c) => c.id === catId);
                      setFormData({
                        ...formData,
                        category: catId,
                        categoryLabel: catObj ? catObj.label : 'Portfolio Project'
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-white text-xs font-sans"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-bold">CLIENT / COMPANY</label>
                  <select
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-white text-xs font-sans"
                  >
                    <option value="Mercure Karawang">Mercure Karawang (Accor Hotel)</option>
                    <option value="Cue Corner">Cue Corner (Distributor Billiard)</option>
                    <option value="Project Lain">General / Project Pribadi (Freelance / Klien Lain)</option>
                  </select>
                </div>
              </div>

              {/* Upload Image or Paste YouTube URL */}
              <div className="space-y-3">
                <label className="block text-zinc-400 font-bold">PROJECT MEDIA</label>
                
                {/* YouTube Link Field */}
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-zinc-300 font-bold">
                    <VideoIcon className="w-4 h-4 text-white" />
                    <span>Option A: Paste YouTube / Shorts URL</span>
                  </div>
                  <input
                    type="url"
                    value={getYouTubeId(formData.image) ? formData.image : ''}
                    onChange={(e) => {
                      const val = e.target.value.trim();
                      if (val) {
                        const isShorts = val.toLowerCase().includes('/shorts/');
                        setFormData((prev) => ({
                          ...prev,
                          image: val,
                          category: 'video',
                          categoryLabel: 'Video Production',
                          aspectRatio: isShorts ? 'portrait' : prev.aspectRatio
                        }));
                      }
                    }}
                    placeholder="https://youtube.com/shorts/xxx or https://youtu.be/xxx"
                    className="w-full px-3.5 py-2 rounded-lg bg-black border border-zinc-800 text-white focus:outline-none focus:border-white text-xs font-sans"
                  />
                </div>

                {/* Aspect Ratio Selector */}
                <div>
                  <label className="block text-zinc-400 mb-1 font-bold">MEDIA ASPECT RATIO / ORIENTATION</label>
                  <select
                    value={formData.aspectRatio}
                    onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value as 'portrait' | 'landscape' | 'square' })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-white text-xs font-sans font-bold"
                  >
                    <option value="portrait">📱 Portrait / Tegak (9:16 - YouTube Shorts, Reels, Poster)</option>
                    <option value="landscape">🖥️ Landscape / Mendatar (16:9 - YouTube Standard Video)</option>
                    <option value="square">🔲 Square / Persegi (1:1 - Post Feed)</option>
                  </select>
                </div>

                <div className="text-center font-mono text-[10px] text-zinc-500 uppercase tracking-widest">- OR OPTION B: UPLOAD LOCAL FILE -</div>

                {/* File Drop Box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-zinc-700 hover:border-white p-4 rounded-xl bg-zinc-900 text-center cursor-pointer transition-colors"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChangeModal(e.target.files[0]);
                      }
                    }}
                  />
                  {formData.image ? (
                    <div className="relative aspect-[4/5] w-full max-h-48 rounded-lg overflow-hidden bg-black border border-zinc-800 mx-auto flex items-center justify-center p-1">
                      {getYouTubeId(formData.image) ? (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(formData.image)}`}
                          className="w-full h-full rounded-lg border-0"
                        />
                      ) : formData.image.endsWith('.mp4') ? (
                        <video src={formData.image} className="w-full h-full object-contain" controls />
                      ) : (
                        <Image src={formData.image} alt="Preview" fill className="object-contain" unoptimized />
                      )}
                    </div>
                  ) : (
                    <span className="text-zinc-400">Click to select photo or video file</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-bold">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your creative work..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-white text-xs font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white font-bold text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
