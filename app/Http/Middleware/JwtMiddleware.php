<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddleware
{
    public function handle($request, Closure $next): Response
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            return $this->unauthorizedResponse('Your session has expired. Please log in again.', 'TOKEN_EXPIRED', $request);
        } catch (TokenInvalidException $e) {
            return $this->unauthorizedResponse('Your token is invalid. Please re-authenticate.', 'TOKEN_INVALID', $request);
        } catch (JWTException $e) {
            return $this->unauthorizedResponse('Authorization token not found.', 'TOKEN_MISSING', $request);
        }

        return $next($request);
    }

    protected function unauthorizedResponse($message, $code, Request $request)
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => false,
                'message' => $message,
                'error_code' => $code,
            ], 401);
        }

        return abort(401, $message); // fallback for non-API routes
    }
}
