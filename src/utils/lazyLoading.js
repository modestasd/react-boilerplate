import React, { lazy, Suspense } from 'react';

const lazyLoading = (importStatement, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importStatement);

  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default lazyLoading;
