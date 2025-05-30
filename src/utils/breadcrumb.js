export const generateBreadcrumbs = (pathname) => {
  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  const breadcrumbs = [];
  
  if (pathSegments.length === 0) {
    return [{
      label: 'Dashboard',
      href: '/dashboard',
      current: true
    }];
  }

  let currentPath = '';
  
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    const formattedLabel = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
    breadcrumbs.push({
      label: formattedLabel,
      href: isLast ? null : currentPath,
      current: isLast
    });
  });
  
  return breadcrumbs;
};

export const formatPathSegment = (segment) => {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};