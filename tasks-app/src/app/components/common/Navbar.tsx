'use client'

import { createAvatar, Result } from '@dicebear/core';
import { miniavs } from '@dicebear/collection';
import { AlignTop } from "@styled-icons/bootstrap"
import { usePathname } from 'next/navigation';
import { useUser } from '@/app/lib/hooks/useUser';
import { useMemo } from 'react';
import { PowerOff } from 'styled-icons/boxicons-regular';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { clearCredentials } from '@/app/lib/features/authDataSlice';

const Navbar = ({}) => {
    const { user, loading: isLoading, error } = useUser()
    const avatar: Result | null = useMemo(() => {
        if (isLoading || error) return null

        return createAvatar(miniavs, {
            seed: `${user.first_name} ${user.last_name}`,
        });
    }, [user, isLoading, error])

    const pathname = usePathname();
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(clearCredentials());
    }

    return pathname === '/authenticate' ? null : (
        <div className="navbar--wrapper w-full border-b">
            <div className="md:w-3/4 w-11/12 mx-auto md:px-4 px-2 py-2 flex items-center justify-between">
                <div className='text-blue-600'>
                    <AlignTop size="30px" />
                </div>
                <div className="user--details">
                    {!isLoading && avatar && (
                        <div className='flex items-center'>
                            <div className="w-[35px] h-[35px] rounded bg-orange-200" dangerouslySetInnerHTML={{ __html: avatar.toString() }}>
                            </div>
                            <button type='button' onClick={handleLogout} className='logout--btn--container ml-2 rounded bg-red-400 p-1'>
                                <PowerOff size="25px" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Navbar;
