<?php

namespace App\Http\Controllers;

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

class UserController extends Controller
{
    public function show(Request $request)
    {
        return Inertia::render('users');
    }

    public function create(Request $request)
    {
        return Inertia::render('create-user');
    }
}
