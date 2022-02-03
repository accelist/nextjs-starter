import jwtDecode, { JwtPayload } from 'jwt-decode';

/**
 * Checks JWT expiration against current time using the token header metadata.
 * @param accessToken JWT `string`
 * @returns `true` if token is not yet expired, `false` otherwise
 */
export function checkTokenExpiration(accessToken: string) {
    if (!accessToken) {
        return false;
    }

    const { exp } = jwtDecode<JwtPayload>(accessToken);
    if (!exp) {
        return false;
    }

    const currentTime = Date.now() / 1000;
    if (currentTime >= exp) {
        return false;
    }

    return true;
}
