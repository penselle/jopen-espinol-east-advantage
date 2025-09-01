import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Form } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create User',
        href: '/create-user',
    },
];

interface Role {
    id: number;
    name: string;
}

export default function CreateUser() {

    const [allRoles, setAllRoles] = useState<Role[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState<string[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('/roles');
                console.log('results', response.data);
                setAllRoles(response.data.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
                setError('Something went wrong');
            }
        };

        fetchRoles();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('/store-user', {
                name,
                email,
                roles,
            });
            
            router.visit('/users');
            
        } catch (err : any) {
            setError(err.response.data.message || 'An error occurred');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />
            <div className="flex-1 md:max-w-2xl">
                <section className="max-w-xl space-y-12">
                    <div className="p-12 space-y-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-2 mb-5">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="p-2 block w-full border border-gray-300 rounded"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid gap-2 mb-5">
                                <Label htmlFor="name">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="p-2 block w-full border border-gray-300 rounded"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                            <label htmlFor="roles" className="block text-sm font-medium">Roles</label>
                            <select
                                id="roles"
                                multiple
                                className="p-2 block w-full border border-gray-300 rounded"
                                value={roles}
                                onChange={(e) => setRoles([...e.target.selectedOptions].map(option => option.value))}
                                required
                            >
                                {allRoles.map((role: Role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            </div>

                            {error && <div className="text-red-600">{error}</div>}

                            <div className="mt-4">
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
