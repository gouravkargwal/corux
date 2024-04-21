from jose import JWTError, jwt
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import datetime, timedelta
from schema.user import JWTPayload
import traceback,os

security = HTTPBearer()


class JWTAuth:
    secret_key = os.getenv('secret_key')
    algorithm =  os.getenv('algorithm')
    
    def encode_token(self, payload):
        asof = datetime.now()
        payload.update(
            {
                "scope": "access_token",
                "iat": asof.timestamp(),
                "exp": (asof + timedelta(hours=12)).timestamp(),
            }
        )
        return jwt.encode(
            payload,
            self.secret_key,
            algorithm=self.algorithm,
        )

    def decode_token(self, token):
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            if payload["scope"] == "access_token":
                return payload
            raise HTTPException(
                status_code=401, detail="Scope for the token is invalid"
            )
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.JWTError:
            traceback.print_exc()
            raise HTTPException(status_code=401, detail="Invalid token")

    def encode_refresh_token(self, payload):
        asof = datetime.now()
        payload.update(
            {
                "scope": "refresh_token",
                "iat": asof.timestamp(),
                "exp": (asof + timedelta(days=1)).timestamp(),
            }
        )
        return jwt.encode(payload, self.secret_key, algorithm=self.algorithm)

    def refresh_token(self, refresh_token):
        try:
            if not refresh_token:
                raise HTTPException(status_code=401, detail="Refresh token is missing")
            payload = jwt.decode(
                refresh_token, self.secret_key, algorithms=[self.algorithm]
            )

            if payload["scope"] == "refresh_token":
                # Separate update to payload
                payload.update({"scope": "refresh_token"})
                new_refresh_token = self.encode_refresh_token(payload)

                # Separate update to payload
                payload.update({"scope": "access_token"})
                new_token = self.encode_token(payload)

                return new_token, new_refresh_token
            raise HTTPException(status_code=401, detail="Invalid scope for token")
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Refresh token expired")
        except jwt.JWTError as err:
            print("JWT Error:", err)
            raise HTTPException(status_code=401, detail="Invalid refresh token")


async def authenticate_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> JWTPayload:
    auth_handler = JWTAuth()
    payload = auth_handler.decode_token(credentials.credentials)
    return JWTPayload(
        **{"mobile_number": payload["mobile_number"], "user_id": payload["user_id"]}
    )
