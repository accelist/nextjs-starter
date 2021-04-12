import React from 'react';

/**
 * Alias of `React.FunctionComponent` but allows attaching another component in the `layout` field.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export interface Page<P = {}> extends React.FunctionComponent<P> {
    layout?: React.ComponentType
}
