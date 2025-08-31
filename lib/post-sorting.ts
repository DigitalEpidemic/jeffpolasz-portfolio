import type { Post } from '@/data/posts';

export type SortOption = 'best' | 'new' | 'demos';

export function sortPostsByBest(a: Post, b: Post): number {
  // First sort by bestIndex (lower number = higher priority)
  // Posts without bestIndex go to the end, sorted by publishedAt (descending - newest first)
  const aHasIndex = a.bestIndex !== undefined;
  const bHasIndex = b.bestIndex !== undefined;

  if (aHasIndex && bHasIndex) {
    // Both have bestIndex, sort by bestIndex (ascending)
    return a.bestIndex! - b.bestIndex!;
  } else if (aHasIndex && !bHasIndex) {
    // a has bestIndex, b doesn't - a comes first
    return -1;
  } else if (!aHasIndex && bHasIndex) {
    // b has bestIndex, a doesn't - b comes first
    return 1;
  } else {
    // Neither has bestIndex, sort by publishedAt (descending - newest first)
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }
}

export function sortPostsByDemos(a: Post, b: Post): number {
  // Priority: bestIndex+demo > demo-only > bestIndex-only > neither
  const aHasIndex = a.bestIndex !== undefined;
  const bHasIndex = b.bestIndex !== undefined;
  const aHasDemo = a.demo !== undefined && a.demo.trim() !== '';
  const bHasDemo = b.demo !== undefined && b.demo.trim() !== '';

  // Determine priority groups (lower number = higher priority)
  const getPriority = (hasIndex: boolean, hasDemo: boolean) => {
    if (hasIndex && hasDemo) return 1; // bestIndex + demo
    if (!hasIndex && hasDemo) return 2; // demo only
    if (hasIndex && !hasDemo) return 3; // bestIndex only
    return 4; // neither
  };

  const aPriority = getPriority(aHasIndex, aHasDemo);
  const bPriority = getPriority(bHasIndex, bHasDemo);

  if (aPriority !== bPriority) {
    return aPriority - bPriority;
  }

  // Within same priority group, sort appropriately
  if (aPriority === 1 || aPriority === 3) {
    // Both have bestIndex, sort by bestIndex
    return a.bestIndex! - b.bestIndex!;
  } else {
    // Sort by date (newest first)
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }
}

export function sortPostsByDate(a: Post, b: Post): number {
  // Sort by date (newest first)
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export function sortPosts(posts: Post[], sortBy: SortOption): Post[] {
  return [...posts].sort((a, b) => {
    switch (sortBy) {
      case 'best':
        return sortPostsByBest(a, b);
      case 'demos':
        return sortPostsByDemos(a, b);
      case 'new':
        return sortPostsByDate(a, b);
      default:
        return 0;
    }
  });
}
