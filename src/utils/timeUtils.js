export function calculateTimeLeft(deadlineIso) {
  if (!deadlineIso) return { text: 'Tanggal tidak diketahui', urgency: 'safe' };

  const now = new Date();
  const deadline = new Date(deadlineIso);
  const diffMs = deadline - now;

  if (diffMs <= 0) {
    return { text: 'Sudah terlewat', urgency: 'expired' };
  }

  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffHours / 24;

  if (diffHours < 1) {
    const minutes = Math.ceil(diffMs / (1000 * 60));
    return { text: `${minutes} Menit Lagi`, urgency: 'urgent' };
  }

  if (diffHours < 24) {
    const hours = Math.ceil(diffHours);
    return { text: `${hours} Jam Lagi`, urgency: 'urgent' };
  }

  if (diffDays < 1) {
    return { text: 'Hari Ini', urgency: 'urgent' };
  }

  if (diffDays <= 3) {
    if (diffDays < 1.5) {
      return { text: 'Besok', urgency: 'soon' };
    } else if (diffDays < 2.5) {
      return { text: 'Lusa', urgency: 'soon' };
    } else {
      return { text: `${Math.ceil(diffDays)} Hari Lagi`, urgency: 'soon' };
    }
  }

  if (diffDays <= 7) {
    return { text: `${Math.ceil(diffDays)} Hari`, urgency: 'safe' };
  }

  const weeks = Math.ceil(diffDays / 7);
  return { text: `${weeks} Minggu`, urgency: 'safe' };
}

export function determineUrgency(deadlineIso) {
  const { urgency } = calculateTimeLeft(deadlineIso);
  return urgency;
}
