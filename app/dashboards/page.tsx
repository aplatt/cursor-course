'use client';

import { useEffect, useState } from 'react';
import ApiKeyModal from './components/ApiKeyModal';
import ApiKeysTable from './components/ApiKeysTable';
import CopyNoticeToast from './components/CopyNoticeToast';
import DashboardHeader from './components/DashboardHeader';
import DashboardSidebar from './components/DashboardSidebar';
import DeleteConfirmToast from './components/DeleteConfirmToast';
import PlanCard from './components/PlanCard';
import type { ApiKey, CopyNotice } from './types';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [formData, setFormData] = useState({ name: '', key: '' });
  const [keyType, setKeyType] = useState<'development' | 'production'>('development');
  const [limitEnabled, setLimitEnabled] = useState(false);
  const [monthlyLimit, setMonthlyLimit] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ApiKey | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [copyNotice, setCopyNotice] = useState<CopyNotice>(null);

  // Fetch API keys
  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/keys');
      const data = await response.json();
      setApiKeys(data);
    } catch (error) {
      console.error('Failed to fetch API keys:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create new API key
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdKey =
        formData.key.trim() ||
        `key_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, key: createdKey }),
      });
      
      if (response.ok) {
        await fetchApiKeys();
        setIsModalOpen(false);
        setFormData({ name: '', key: '' });
      }
    } catch (error) {
      console.error('Failed to create API key:', error);
    }
  };

  // Update API key
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingKey) return;

    try {
      const response = await fetch(`/api/keys/${editingKey.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchApiKeys();
        setEditingKey(null);
        setFormData({ name: '', key: '' });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to update API key:', error);
    }
  };

  // Delete API key
  const handleDelete = async (id: string) => {

    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchApiKeys();
        setCopyNotice({ type: 'error', message: 'API key deleted.' });
        setTimeout(() => setCopyNotice(null), 2000);
      }
    } catch (error) {
      console.error('Failed to delete API key:', error);
      setCopyNotice({ type: 'error', message: 'Failed to delete API key.' });
      setTimeout(() => setCopyNotice(null), 2000);
    }
  };

  const requestDelete = (apiKey: ApiKey) => {
    setCopyNotice(null);
    setDeleteTarget(apiKey);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const deletingId = deleteTarget.id;
    setDeleteTarget(null);
    await handleDelete(deletingId);
  };

  // Open modal for creating
  const openCreateModal = () => {
    setEditingKey(null);
    setFormData({ name: '', key: '' });
    setKeyType('development');
    setLimitEnabled(false);
    setMonthlyLimit('');
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (apiKey: ApiKey) => {
    setEditingKey(apiKey);
    setFormData({ name: apiKey.name, key: apiKey.key });
    setKeyType('development');
    setLimitEnabled(false);
    setMonthlyLimit('');
    setIsModalOpen(true);
  };

  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (!successful) {
      throw new Error('Copy command was unsuccessful');
    }
  };

  const handleCopy = async (apiKey: ApiKey) => {
    try {
      setDeleteTarget(null);
      await copyToClipboard(apiKey.key);
      setCopiedId(apiKey.id);
      setTimeout(() => setCopiedId(null), 1500);
      setCopyNotice({ type: 'success', message: 'API key copied to clipboard.' });
      setTimeout(() => setCopyNotice(null), 2000);
    } catch (error) {
      console.error('Failed to copy API key:', error);
      setCopyNotice({ type: 'error', message: 'Failed to copy API key.' });
      setTimeout(() => setCopyNotice(null), 2000);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingKey(null);
    setFormData({ name: '', key: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <CopyNoticeToast notice={copyNotice} />
      <div className="flex min-h-screen">
        <DashboardSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed((current) => !current)}
        />
        <main className="flex-1 px-10 py-8">
          <DashboardHeader />
          <PlanCard />
          <ApiKeysTable
            apiKeys={apiKeys}
            isLoading={isLoading}
            copiedId={copiedId}
            onCreate={openCreateModal}
            onCopy={handleCopy}
            onEdit={openEditModal}
            onDeleteRequest={requestDelete}
          />
        </main>
      </div>

      <ApiKeyModal
        isOpen={isModalOpen}
        editingKey={editingKey}
        formData={formData}
        keyType={keyType}
        limitEnabled={limitEnabled}
        monthlyLimit={monthlyLimit}
        onChange={setFormData}
        onKeyTypeChange={setKeyType}
        onLimitEnabledChange={setLimitEnabled}
        onMonthlyLimitChange={setMonthlyLimit}
        onSubmit={editingKey ? handleUpdate : handleCreate}
        onCancel={closeModal}
      />

      <DeleteConfirmToast
        deleteTarget={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

