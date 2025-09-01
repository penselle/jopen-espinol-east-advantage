<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Resources\RoleResource;
use App\Models\Role;

class RoleAPIController extends Controller
{
    public function show(Request $request)
    {
        $roles = Role::all();

        return RoleResource::collection($roles);
    }
}
