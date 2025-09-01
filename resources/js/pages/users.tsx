import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

interface Role {
    id: string;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
}

export default function Users() {
    
    const [allRoles, setAllRoles] = useState<Role[]>([]);

    const [users, setUsers] = useState<User[]>([]);
    const [role, setRole] = useState<string>('');

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('/roles');
                console.log('results', response.data);
                setAllRoles(response.data.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const response = await axios.get(`/get-users?roleId=${role}`);
                setUsers(response.data.data);
            } catch (err) {
                console.error('Error:', err);
            }
        };

        fetchUsers();
    }, [role]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="col-span-2 relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="mb-2 p-3">
                        <Select onValueChange={setRole} defaultValue={allRoles[0]?.id}>
                            <SelectTrigger className="w-md">
                                <SelectValue placeholder="SELECT USERS BY ROLE" />
                            </SelectTrigger>
                            <SelectContent>
                                {allRoles.map((role: Role, index: number) => (
                                    <SelectItem key={index} value={role.id}>{role.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Table>
                        <TableCaption>Users by Role.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role(s)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { users.map((user: User, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.roles.map((role: Role, idx: number) => role.name ).join(', ')}</TableCell>
                                </TableRow>
                            ))}
                            
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
