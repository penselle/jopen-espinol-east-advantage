<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\UserPostRequest;
use App\Services\UserService;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserAPIController extends Controller
{
    public function show(Request $request)
    {
        $roleId = $request->query('roleId');

        $service = new UserService(roleId: $roleId);
        $users = $service->getUserRoles();

        return UserResource::collection($users);
    }

    public function store(UserPostRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt('defaultpassword'),
        ]);

        $user->roles()->attach($request->roles);

        return response()->json($user, 201);
    }
}
