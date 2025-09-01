<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserService {

    public function __construct(
        public int $roleId
    ) {}

    public function getUserRoles() : Collection
    {
        $roleId = $this->roleId;
        
        $users = User::with('roles')
                    ->whereHas('roles', function ($query) use ($roleId) {
                        $query->where('role_id', $roleId);
                    })->get();

        return $users;
    }
}
