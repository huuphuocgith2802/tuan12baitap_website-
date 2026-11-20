/**
 * TUẦN 12: DATA MANAGEMENT WITH ADVANCED ARRAYS & OBJECTS
 * Author: Huỳnh Hữu Phước (MSSV: 125000155) - Đại học Lạc Hồng
 * Shared Utilities: main.js
 */

// Toast Notification System
function showToast(message, type = 'info', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fas fa-info-circle';
  if (type === 'success') icon = 'fas fa-check-circle';
  if (type === 'danger') icon = 'fas fa-exclamation-triangle';
  if (type === 'warning') icon = 'fas fa-exclamation-circle';

  toast.innerHTML = `
    <i class="${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Format Currency VND
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

// Copy to Clipboard
function copyToClipboard(text, successMsg = 'Đã sao chép vào bộ nhớ tạm!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg, 'success');
    }).catch(err => {
      fallbackCopyText(text, successMsg);
    });
  } else {
    fallbackCopyText(text, successMsg);
  }
}

function fallbackCopyText(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg, 'success');
  } catch (err) {
    showToast('Không thể sao chép!', 'danger');
  }
  document.body.removeChild(textArea);
}

// Console Simulator Helper for Education
class ConsoleSimulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  log(msg, type = 'info') {
    if (!this.container) return;
    const line = document.createElement('div');
    line.className = `console-line console-${type}`;
    
    if (typeof msg === 'object') {
      line.textContent = JSON.stringify(msg, null, 2);
    } else {
      line.textContent = msg;
    }
    
    this.container.appendChild(line);
    this.container.scrollTop = this.container.scrollHeight;
  }

  clear() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

console.log('%c🚀 Tuần 12: Quản lý Dữ liệu với Mảng Nâng Cao & Đối tượng', 'color: #4f46e5; font-size: 16px; font-weight: bold;');
console.log('%cSinh viên: Huỳnh Hữu Phước - MSSV: 125000155 - Đại học Lạc Hồng', 'color: #06b6d4; font-size: 12px;');
