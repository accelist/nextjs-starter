import React, { useContext } from "react";

export const AccessTokenContext = React.createContext('');

/**
 * This method can only be used inside `<Authorize>` component.
 * @returns OAuth Access Token for accessing Web API via Authorization Bearer header.
 */
export function useAccessToken(): string {
    return useContext(AccessTokenContext);
}
