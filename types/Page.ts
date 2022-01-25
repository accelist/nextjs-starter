import React from 'react';

/**
 * Alias of `React.FunctionComponent` but allows attaching another component in the `layout` field.
 * https://nextjs.org/docs/basic-features/layouts#with-typescript
 */
export interface Page<P = Record<string, unknown>> extends React.FunctionComponent<P> {
    layout?: (page: React.ReactElement) => React.ReactNode
}
