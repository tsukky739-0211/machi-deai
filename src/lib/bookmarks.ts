const STORAGE_KEY = "machi-deai-bookmarks";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getBookmarks(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addBookmark(slug: string): void {
  if (!isBrowser()) return;
  const bookmarks = getBookmarks();
  if (!bookmarks.includes(slug)) {
    bookmarks.push(slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }
}

export function removeBookmark(slug: string): void {
  if (!isBrowser()) return;
  const bookmarks = getBookmarks().filter((s) => s !== slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export function isBookmarked(slug: string): boolean {
  return getBookmarks().includes(slug);
}

export function toggleBookmark(slug: string): boolean {
  if (isBookmarked(slug)) {
    removeBookmark(slug);
    return false;
  } else {
    addBookmark(slug);
    return true;
  }
}
