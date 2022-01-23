import React from 'react';

/**
 * Alias of `React.FunctionComponent` but allows attaching another component in the `layout` field.
 */
export interface Page<P = Record<string, unknown>> extends React.FunctionComponent<P> {
    layout?: React.ComponentType
}
