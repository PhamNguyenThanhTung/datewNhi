import { useState, useEffect, useRef } from 'react';

/**
 * usePWA — quản lý toàn bộ PWA lifecycle:
 * - Đăng ký Service Worker
 * - A2HS (Add to Home Screen) prompt
 * - Push notification subscription
 * - Online/offline status
 * - SW update detection
 */
export default function usePWA() {
  const [isInstallable, setIsInstallable]   = useState(false);
  const [isInstalled, setIsInstalled]       = useState(false);
  const [isOnline, setIsOnline]             = useState(navigator.onLine);
  const [swRegistered, setSwRegistered]     = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [pushSupported, setPushSupported]   = useState(false);

  const deferredPromptRef = useRef(null);
  const swRegRef          = useRef(null);

  // ─── Register Service Worker ──────────────────────────────────────────────
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        swRegRef.current = reg;
        setSwRegistered(true);
        setPushSupported('PushManager' in window);

        // Detect update available
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker?.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
            }
          });
        });

        // Check for existing update
        if (reg.waiting) setUpdateAvailable(true);
      })
      .catch(err => console.error('[PWA] SW registration failed:', err));

    // Listen for SW-controlled page reload
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }, []);

  // ─── A2HS prompt ────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      deferredPromptRef.current = e;
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    const mq = window.matchMedia('(display-mode: standalone)');
    setIsInstalled(mq.matches || navigator.standalone === true);
    const mqHandler = (e) => setIsInstalled(e.matches);
    mq.addEventListener('change', mqHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      mq.removeEventListener('change', mqHandler);
    };
  }, []);

  // ─── Online/offline ──────────────────────────────────────────────────────
  useEffect(() => {
    const onOnline  = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online',  onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online',  onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  // ─── Actions ─────────────────────────────────────────────────────────────
  const promptInstall = async () => {
    const prompt = deferredPromptRef.current;
    if (!prompt) return false;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    deferredPromptRef.current = null;
    setIsInstallable(false);
    if (outcome === 'accepted') setIsInstalled(true);
    return outcome === 'accepted';
  };

  const applyUpdate = () => {
    swRegRef.current?.waiting?.postMessage({ type: 'SKIP_WAITING' });
    setUpdateAvailable(false);
  };

  const requestPushPermission = async (vapidPublicKey) => {
    if (!swRegRef.current || !pushSupported) return null;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;

    try {
      const sub = await swRegRef.current.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });
      return sub;
    } catch (err) {
      console.error('[PWA] Push subscription failed:', err);
      return null;
    }
  };

  return {
    isInstallable: isInstallable && !isInstalled,
    isInstalled,
    isOnline,
    swRegistered,
    updateAvailable,
    pushSupported,
    promptInstall,
    applyUpdate,
    requestPushPermission,
  };
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64  = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}
